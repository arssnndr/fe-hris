import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { ApiService } from 'src/app/shared/api.service';
import { utils, writeFileXLSX } from 'xlsx';
import { ModalJadwalKerjaComponent } from './modal-jadwal-kerja/modal-jadwal-kerja.component';

@Component({
  selector: 'app-jadwal-kerja',
  templateUrl: './jadwal-kerja.component.html',
  styleUrls: ['./jadwal-kerja.component.css'],
})
export class JadwalKerjaComponent implements OnInit {
  table = 'trx_jadwalkerja/';
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

  constructor(private api: ApiService, public dialog: MatDialog) {}

  tambahData() {
    const dialogRef = this.dialog.open(ModalJadwalKerjaComponent, {
      data: { name: 'tambah' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      if (result === 'simpan') {
        this.catchResult = this.api.catchData();
        this.api.postData(this.table, this.catchResult).subscribe(() => {
          this.ngOnInit();
        });
      }
    });
  }

  editData(data: any) {
    let id = data.id;
    const dialogRef = this.dialog.open(ModalJadwalKerjaComponent, {
      data: { name: 'edit', data: data },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'simpan') {
        this.catchResult = this.api.catchData();
        let data = this.catchResult;
        this.api.updateData(this.table, data, id).subscribe(() => {
          this.ngOnInit();
        });
      }
      this.ngOnInit();
    });
  }

  deleteData(id: number) {
    const dialogRef = this.dialog.open(ModalJadwalKerjaComponent, {
      data: { name: 'delete' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'ya') {
        this.api.deleteData(this.table + id).subscribe(() => {
          this.ngOnInit();
        });
      }
    });
  }

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData() {
    if (this.lokasiValue === 'All') {
      this.api.getData(this.table).subscribe((res) => {
        this.data = res;
      });
    } else {
      this.api
        .getData(this.table + '?lokasi_like=' + this.lokasiValue)
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
      'Jadwal Jam Mulai Istirahat': res.mulai_istirahat,
      'Jadwal jam Selesai Istirahat': res.selesai_istirahat,
      'Total Jam Kerja': res.total,
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
