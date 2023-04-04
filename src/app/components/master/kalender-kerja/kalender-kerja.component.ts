import { Component, OnInit, assertPlatform } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/api.service';
import { ModalKalenderKerjaComponent } from './modal-kalender-kerja/modal-kalender-kerja.component';
import * as moment from 'moment';
import { utils, writeFileXLSX } from 'xlsx';
import { environment } from 'src/environments/environment';
import { VoidComponent } from '../../modals/void/void.component';
moment.locale('id');

@Component({
  selector: 'app-kalender-kerja',
  templateUrl: './kalender-kerja.component.html',
  styleUrls: ['./kalender-kerja.component.css'],
})
export class KalenderKerjaComponent implements OnInit {
  akses = this.api.akses.role_kalender_kerja;

  dataKalenderKerja!: any;

  setYear: any[] = [];
  setLokasi: any[] = [];

  filterYear = '';
  filterLokasi = '';

  constructor(private api: ApiService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.api.getData(environment.tabelKalenderKerja).subscribe((res) => {
      this.dataKalenderKerja = res;

      this.setYear.push('All');
      this.setYear.push(
        ...new Set(res.map((val: any) => val.tgl.split('-', 1)[0]))
      );
      this.filterYear = this.setYear[0];

      this.setLokasi.push('All');
      this.setLokasi.push(...new Set(res.map((val: any) => val.lokasi)));
      this.filterLokasi = this.setLokasi[0];
    });
  }

  alert() {
    window.alert('Anda tidak memilii Akses');
  }

  tambahData() {
    if (this.akses.edit) {
      this.dialog
        .open(ModalKalenderKerjaComponent)
        .afterClosed()
        .subscribe((result) => {
          if (result !== undefined) {
            this.api
              .postData(environment.tabelKalenderKerja, result)
              .subscribe(() => {
                this.filter();
              });
          }
        });
    } else {
      this.alert();
    }
  }

  editData(data: any) {
    this.dialog
      .open(ModalKalenderKerjaComponent, {
        data: data,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result != undefined) {
          this.api
            .updateData(environment.tabelKalenderKerja, result, result.id)
            .subscribe(() => {
              this.filter();
            });
        } else {
          this.ngOnInit();
        }
      });
  }

  deleteData(id: number) {
    if (this.akses.edit) {
      this.dialog
        .open(VoidComponent)
        .afterClosed()
        .subscribe((result) => {
          if (result === 'ya') {
            this.api
              .deleteData(environment.tabelKalenderKerja + id)
              .subscribe(() => {
                this.filter();
              });
          }
        });
    } else {
      this.alert();
    }
  }

  dateFormat(date: any) {
    return moment(date, 'YYYY-MM-DD').format('DD MMM YYYY');
  }

  filter() {
    let tgl = '';
    let lokasi = '';
    this.filterYear === 'All' ? (tgl = '') : (tgl = this.filterYear);
    this.filterLokasi === 'All' ? (lokasi = '') : (lokasi = this.filterLokasi);
    this.api
      .getData(
        environment.tabelKalenderKerja +
          '?tgl_like=' +
          tgl +
          '&lokasi_like=' +
          lokasi
      )
      .subscribe((res) => (this.dataKalenderKerja = res));
  }

  printData(name: string) {
    if (this.akses.download) {
      let header: any[] = [];
      let content;
      let column;
      header = [
        ['A1', name],
        ['G1', 'Tanggal Cetak'],
        ['G2', 'User :'],
        ['H1', moment().format('DD MMM YYYY')],
        ['H2', window.localStorage.getItem('key')],
      ];
      content = this.dataKalenderKerja.map((res: any) => ({
        Hari: res.hari,
        Tanggal: this.dateFormat(res.tgl),
        Keterangan: res.keterangan,
        Lokasi: res.lokasi,
        Divisi: res.divisi,
        Departemen: res.departemen,
        'Sub Departemen': res.sub_departemen,
        'Potong/Tidak Potong Cuti Tahunan': res.potong_cuti
          ? 'Potong Cuti Tahunan'
          : 'Tidak Potong Cuti Tahunan',
      }));

      column =
        Object.keys(content[0]).length > 25
          ? 'A' +
            String.fromCharCode((Object.keys(content[0]).length % 26) + 64)
          : String.fromCharCode(Object.keys(content[0]).length + 64);

      const ws = utils.json_to_sheet(content);
      const wsTemp = utils.json_to_sheet(content);

      let length = Number(ws['!ref']?.split(column, 2)[1]);
      let gap = 4;

      ws['!ref'] = 'A1:' + column + (length + gap);
      for (let i = 1; i <= 4; i++) {
        Object.keys(content[0]).forEach((_, index) => {
          index > 25
            ? (ws['A' + String.fromCharCode(65 + index - 26) + i] = {
                t: 's',
                v: '',
              })
            : (ws[String.fromCharCode(65 + index) + i] = { t: 's', v: '' });
        });
      }

      header.forEach((res) => (ws[res[0]] = { t: 's', v: res[1] }));

      for (let i = 0; i < length; i++) {
        Object.keys(content[0]).forEach((_, index) => {
          index > 25
            ? (ws['A' + String.fromCharCode(65 + index - 26) + (i + gap)] =
                wsTemp['A' + String.fromCharCode(65 + index - 26) + (i + 1)])
            : (ws[String.fromCharCode(65 + index) + (i + gap)] =
                wsTemp[String.fromCharCode(65 + index) + (i + 1)]);
        });
      }

      const wb = utils.book_new();

      utils.book_append_sheet(wb, ws);
      writeFileXLSX(wb, name + '.xlsx');
    } else {
      this.alert();
    }
  }
}
