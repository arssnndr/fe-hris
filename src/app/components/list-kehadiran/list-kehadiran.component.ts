import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { ApiService } from 'src/app/shared/api.service';
import { utils, writeFileXLSX } from 'xlsx';
import { ModalStatusKehadiranComponent } from '../status-kehadiran/modal-status-kehadiran/modal-status-kehadiran.component';
import { ModalListKehadiranComponent } from './modal-list-kehadiran/modal-list-kehadiran.component';

@Component({
  selector: 'app-list-kehadiran',
  templateUrl: './list-kehadiran.component.html',
  styleUrls: ['./list-kehadiran.component.css'],
})
export class ListKehadiranComponent implements OnInit {
  tableDetail = 'trx_listkehadiran/';
  dataDetailAll: any[] = [{ jadwal_kerja: '' }];
  idProfil!: number;
  dataDetailProfil = {
    id: '',
    nama_lengkap: '',
    nip: '',
    jadwal_kerja: '',
    jabatan: '',
    lokasi: '',
    divisi: '',
    departemen: '',
    sub_departemen: '',
  };
  dataDetailJadwalKerja!: any;
  dataDetailJadwalKerjaPerMonth: any[] = [];
  yearMonth = moment().format('YYYY-MM');
  dataSearchNip: any[] = [];

  constructor(private api: ApiService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.api.getData(this.tableDetail).subscribe((res) => {
      this.dataDetailAll = res;
      this.dataDetailProfil = res[0];
      this.selectProfil(res[0].id);
      this.dataDetailJadwalKerja = res[0].jadwal_kerja;
      this.selectMonth();
    });
  }

  dateFormat(date: any) {
    return moment(date, 'DD-MM-YYYY').format('DD MMM YYYY');
  }

  sliceTime(time: any) {
    return time.slice(0, 2);
  }

  selectProfil(id: any) {
    this.idProfil = id;
    this.dataDetailAll.map((res: any) => {
      if (res.id === id) {
        this.dataDetailProfil = res;
      }
    });
    this.dataDetailJadwalKerja = this.dataDetailProfil.jadwal_kerja;
    this.selectMonth();
  }

  selectMonth() {
    this.dataDetailJadwalKerjaPerMonth = [];
    this.dataDetailJadwalKerja[
      Number(moment(this.yearMonth, 'YYYY-MM').format('MM')) - 1
    ].map((res: any) => {
      if (
        res.tgl.includes(moment(this.yearMonth, 'YYYY-MM').format('MM-YYYY'))
      ) {
        this.dataDetailJadwalKerjaPerMonth.push(res);
      }
    });
  }

  searchNip(nip: any) {
    this.dataSearchNip = [];
    this.dataDetailAll.map((res: any) => {
      if (res.nip.includes(nip.value)) {
        this.dataSearchNip.push(res);
      }
    });
  }

  selectNip(data: any) {
    this.dataDetailProfil = data;
    this.dataDetailJadwalKerja = data.jadwal_kerja;
    this.selectMonth();
  }

  editKehadiran(index: number) {
    const dialogRef = this.dialog.open(ModalListKehadiranComponent, {
      data: {
        name: 'editKehadiran',
        data: this.dataDetailProfil,
        index: {
          indexBln: Number(moment(this.yearMonth, 'YYYY-MM').format('MM')) - 1,
          indexTgl: index,
        },
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'simpan') {
        let catchResult = this.api.catchData();
        this.api
          .updateData(this.tableDetail, catchResult, catchResult.id)
          .subscribe(() => {
            this.selectProfil(catchResult.id);
          });
      }
    });
  }

  cutiTahunan(index: number) {
    const dialogRef = this.dialog.open(ModalStatusKehadiranComponent, {
      data: {
        name: 'cutiTahunan',
        nip: this.dataDetailProfil.nip,
        nama_lengkap: this.dataDetailProfil.nama_lengkap,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'simpan') {
        this.api.getData(this.tableDetail + this.idProfil).subscribe((res) => {
          res.jadwal_kerja[
            Number(moment(this.yearMonth, 'YYYY-MM').format('MM')) - 1
          ][index].status_kehadiran.cuti = this.api.catchData().cuti;
          res.jadwal_kerja[
            Number(moment(this.yearMonth, 'YYYY-MM').format('MM')) - 1
          ][index].status_kehadiran.keterangan =
            this.api.catchData().keterangan;
          this.api
            .updateData(this.tableDetail, res, res.id)
            .subscribe((res) => {
              this.ngOnInit();
            });
        });
      }
    });
  }

  cutiKhusus(index: number) {
    const dialogRef = this.dialog.open(ModalStatusKehadiranComponent, {
      data: {
        name: 'cutiKhusus',
        nip: this.dataDetailProfil.nip,
        nama_lengkap: this.dataDetailProfil.nama_lengkap,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'simpan') {
        this.api.getData(this.tableDetail + this.idProfil).subscribe((res) => {
          res.jadwal_kerja[
            Number(moment(this.yearMonth, 'YYYY-MM').format('MM')) - 1
          ][index].status_kehadiran.cuti = this.api.catchData().cuti;
          res.jadwal_kerja[
            Number(moment(this.yearMonth, 'YYYY-MM').format('MM')) - 1
          ][index].status_kehadiran.keterangan =
            this.api.catchData().keterangan;
          this.api
            .updateData(this.tableDetail, res, res.id)
            .subscribe((res) => {
              this.ngOnInit();
            });
        });
      }
    });
  }

  izin(index: number) {
    const dialogRef = this.dialog.open(ModalStatusKehadiranComponent, {
      data: {
        name: 'izin',
        nip: this.dataDetailProfil.nip,
        nama_lengkap: this.dataDetailProfil.nama_lengkap,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'simpan') {
        this.api.getData(this.tableDetail + this.idProfil).subscribe((res) => {
          res.jadwal_kerja[
            Number(moment(this.yearMonth, 'YYYY-MM').format('MM')) - 1
          ][index].status_kehadiran.cuti = this.api.catchData().cuti;
          res.jadwal_kerja[
            Number(moment(this.yearMonth, 'YYYY-MM').format('MM')) - 1
          ][index].status_kehadiran.keterangan =
            this.api.catchData().keterangan;
          this.api
            .updateData(this.tableDetail, res, res.id)
            .subscribe((res) => {
              this.ngOnInit();
            });
        });
      }
    });
  }

  perjalananDinas(index: number) {
    const dialogRef = this.dialog.open(ModalStatusKehadiranComponent, {
      data: {
        name: 'perjalananDinas',
        nip: this.dataDetailProfil.nip,
        nama_lengkap: this.dataDetailProfil.nama_lengkap,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'simpan') {
        this.api.getData(this.tableDetail + this.idProfil).subscribe((res) => {
          res.jadwal_kerja[
            Number(moment(this.yearMonth, 'YYYY-MM').format('MM')) - 1
          ][index].status_kehadiran.cuti = this.api.catchData().cuti;
          res.jadwal_kerja[
            Number(moment(this.yearMonth, 'YYYY-MM').format('MM')) - 1
          ][index].status_kehadiran.keterangan =
            this.api.catchData().keterangan;
          this.api
            .updateData(this.tableDetail, res, res.id)
            .subscribe((res) => {
              this.ngOnInit();
            });
        });
      }
    });
  }

  statusKehadiran(data: any) {
    switch (data.cuti.status) {
      case 'Cuti Tahunan':
        return 'Cuti';
      case 'Cuti Khusus':
        return 'CK';
      case 'Izin':
        return data.cuti.izin_seharian ? 'ISP' : 'ISH';
      case 'Perjalanan Dinas':
        return data.cuti.dinas_dalkot ? 'DDK' : 'DLK';
      case 'Mangkir':
        return 'Mangkir';
      default:
        return 'Hadir';
    }
  }

  printData(name: string) {
    let header: any[] = [];
    let content;
    let column;
    header = [
      ['A1', 'NIP'],
      ['A2', 'Nama Karyawan'],
      ['A3', 'Jabatan'],
      ['A4', 'Lokasi Kerja'],
      ['A5', 'Divisi'],
      ['A6', 'Departemen'],
      ['A7', 'Sub Departemen'],
      ['A8', 'Periode'],
      ['B1', ': ' + this.dataDetailProfil.nip],
      ['B2', ': ' + this.dataDetailProfil.nama_lengkap],
      ['B3', ': ' + this.dataDetailProfil.jabatan],
      ['B4', ': ' + this.dataDetailProfil.lokasi],
      ['B5', ': ' + this.dataDetailProfil.divisi],
      ['B6', ': ' + this.dataDetailProfil.departemen],
      ['B7', ': ' + this.dataDetailProfil.sub_departemen],
      ['B8', ': ' + moment(this.yearMonth, 'YYYY-MM').format('MMM YYYY')],
      ['J1', 'Tanggal Cetak'],
      ['J2', 'User'],
      ['K1', ': ' + moment().format('DD MMM YYYY')],
      ['K2', ': ' + window.localStorage.getItem('key')],
    ];
    content = this.dataDetailJadwalKerjaPerMonth.map((res: any) => ({
      Tanggal: this.dateFormat(res.tgl),
      Hari: res.hari,
      'ID Jadwal Kerja': res.id_jadwal_kerja,
      'Jadwal Kerja':
        this.sliceTime(res.masuk) + ' - ' + this.sliceTime(res.keluar),
      'Jadwal Istirahat':
        this.sliceTime(res.mulai_istirahat) +
        ' - ' +
        this.sliceTime(res.selesai_istirahat),
      'Jam masuk': res.masuk,
      'Jam Keluar': res.keluar,
      Status: this.statusKehadiran(res.status_kehadiran),
      'JK (Jam Kerja)': res.total,
      'TI (Tanpa Istirahat)': '',
      'OT (Over Time)': '',
    }));

    column =
      Object.keys(content[0]).length > 25
        ? 'A' + String.fromCharCode((Object.keys(content[0]).length % 26) + 64)
        : String.fromCharCode(Object.keys(content[0]).length + 64);

    const ws = utils.json_to_sheet(content);
    const wsTemp = utils.json_to_sheet(content);

    let length = Number(ws['!ref']?.split(column, 2)[1]);
    let gap = 10;

    ws['!ref'] = 'A1:' + column + (length + gap);
    for (let i = 1; i <= gap; i++) {
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
