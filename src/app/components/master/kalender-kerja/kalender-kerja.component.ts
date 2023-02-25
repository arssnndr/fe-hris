import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/api.service';
import { ModalKalenderKerjaComponent } from './modal-kalender-kerja/modal-kalender-kerja.component';
import * as moment from 'moment';
import { utils, writeFileXLSX } from 'xlsx';
moment.locale('id');

@Component({
  selector: 'app-kalender-kerja',
  templateUrl: './kalender-kerja.component.html',
  styleUrls: ['./kalender-kerja.component.css'],
})
export class KalenderKerjaComponent implements OnInit {
  tableKalenderKerja = 'ms_kalenderkerja/';
  dataKalenderKerja!: any;

  setYear: any[] = [];
  setLokasi: any[] = [];

  filterYear = '';
  filterLokasi = '';

  constructor(private api: ApiService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.api.getData(this.tableKalenderKerja).subscribe((res) => {
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

  tambahData() {
    this.dialog
      .open(ModalKalenderKerjaComponent, {
        data: { name: 'tambah' },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result !== undefined) {
          this.api.postData(this.tableKalenderKerja, result).subscribe(() => {
            this.filter();
          });
        }
      });
  }

  editData(data: any) {
    let id = data.id;
    const dialogRef = this.dialog.open(ModalKalenderKerjaComponent, {
      data: {
        name: 'edit',
        data: data,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'simpan') {
        let catchResult = this.api.catchData();
        this.api
          .updateData(this.tableKalenderKerja, catchResult, id)
          .subscribe(() => {
            this.filter();
          });
      }
    });
  }

  deleteData(id: number) {
    const dialogRef = this.dialog.open(ModalKalenderKerjaComponent, {
      data: { name: 'delete' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'ya') {
        this.api.deleteData(this.tableKalenderKerja + id).subscribe(() => {
          this.filter();
        });
      }
    });
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
        this.tableKalenderKerja + '?tgl_like=' + tgl + '&lokasi_like=' + lokasi
      )
      .subscribe((res) => (this.dataKalenderKerja = res));
  }

  printData(name: string) {
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
        ? 'A' + String.fromCharCode((Object.keys(content[0]).length % 26) + 64)
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
  }
}
