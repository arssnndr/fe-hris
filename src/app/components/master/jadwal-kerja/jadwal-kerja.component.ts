import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { ApiService } from 'src/app/shared/api.service';
import { utils, writeFileXLSX } from 'xlsx';
import { ModalJadwalKerjaComponent } from './modal-jadwal-kerja/modal-jadwal-kerja.component';
import { VoidComponent } from '../../modals/void/void.component';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-jadwal-kerja',
  templateUrl: './jadwal-kerja.component.html',
  styleUrls: ['./jadwal-kerja.component.css'],
})
export class JadwalKerjaComponent implements OnInit {
  akses = this.api.akses.role_jadwal_kerja;

  data!: any;
  catchResult: any;
  getMaxId = 0;

  lokasi = [
    { value: 'All' },
    { value: 'TMS HO' },
    { value: 'TMS 1' },
    { value: 'TMS 2' },
    { value: 'TMS 3' },
    { value: 'TMS 4' },
  ];
  lokasiValue = this.lokasi[0].value;

  constructor(
    private api: ApiService,
    private dialog: MatDialog,
    router: Router
  ) {
    if (!this.akses.view) router.navigate(['/dashboard']);
  }

  tambahData() {
    if (this.akses.edit) {
      this.dialog
        .open(ModalJadwalKerjaComponent)
        .afterClosed()
        .subscribe((result) => {
          if (result != undefined) {
            this.api
              .postData(environment.tabelJadwalKerja, result)
              .subscribe(() => {
                this.ngOnInit();
              });
          }
        });
    } else {
      window.alert('Anda tidak memiliki Akses');
    }
  }

  editData(data: any) {
    this.dialog
      .open(ModalJadwalKerjaComponent, {
        data: data,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result != undefined) {
          this.api
            .updateData(environment.tabelJadwalKerja, result, result.id)
            .subscribe(() => {
              this.ngOnInit();
            });
        }
        this.ngOnInit();
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
              .deleteData(environment.tabelJadwalKerja + id)
              .subscribe(() => {
                this.ngOnInit();
              });
          }
        });
    } else {
      window.alert('Anda tidak memiliki Akses');
    }
  }

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData() {
    if (this.lokasiValue === 'All') {
      this.api.getData(environment.tabelJadwalKerja).subscribe((res) => {
        this.data = res;
      });
    } else {
      this.api
        .getData(
          environment.tabelJadwalKerja + '?lokasi_like=' + this.lokasiValue
        )
        .subscribe((res) => {
          this.data = res;
        });
    }
  }

  searchData() {
    this.getAllData();
  }

  formatDate(date: string) {
    return moment(date).format('DD MMM YYYY');
  }

  printData(name: string) {
    if (this.akses.download) {
      let header: any[] = [];
      let content;
      let column;
      header = [
        ['A1', name],
        ['H1', 'Tanggal Cetak'],
        ['H2', 'User :'],
        ['I1', moment().format('DD MMM YYYY')],
        ['I2', window.localStorage.getItem('key')],
      ];
      content = this.data.map((res: any) => ({
        'ID Jadwal Kerja': res.id_jadwal_kerja,
        Lokasi: res.lokasi,
        Shift: res.shift,
        'Jam Kerja': res.type,
        'Jadwal Jam masuk': res.masuk,
        'Jadwal Jam Pulang': res.keluar,
        'Jadwal Jam Mulai Istirahat': res.start_break,
        'Jadwal jam Selesai Istirahat': res.end_break,
        'Total Jam Kerja': res.total,
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
      window.alert('Anda tidak memiliki Akses');
    }
  }
}
