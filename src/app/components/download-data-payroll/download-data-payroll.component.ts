import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { ApiService } from 'src/app/shared/api.service';
import { environment } from 'src/environments/environment';
import { utils, writeFileXLSX } from 'xlsx';

@Component({
  selector: 'app-download-data-payroll',
  templateUrl: './download-data-payroll.component.html',
  styleUrls: ['./download-data-payroll.component.css'],
})
export class DownloadDataPayrollComponent {
  dataPerusahaan: any[] = [];
  dataLokasi: any[] = [];

  data: any = {
    startDate: moment().format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
    perusahaan: '',
    lokasi: '',
  };

  constructor(
    private api: ApiService,
    public dialogRef: MatDialogRef<DownloadDataPayrollComponent>
  ) {
    api.getData(environment.tabelPerusahaan).subscribe((res) => {
      this.dataPerusahaan = res;
      this.data.perusahaan = res[0].nama;
    });
    api.getData(environment.tabelLokasi).subscribe((res) => {
      this.dataLokasi = res;
      this.data.lokasi = res[0].inisial;
    });
  }

  download() {
    let duration = moment
      .duration(moment(this.data.endDate).diff(moment(this.data.startDate)))
      .asDays();
    if (duration >= 31) {
      window.alert('Rentan Waktu Melebihi 31 Hari!.');
    } else {
      this.api
        .getData(
          environment.tabelListKehadiran +
            '?perusahaan_like=' +
            this.data.perusahaan +
            '&lokasi_like=' +
            this.data.lokasi
        )
        .subscribe((result) => {
          const data: any[] = [];
          const dataKehadiran: any[] = [];

          result.forEach((res: any, index: number) => {
            data.push(res);

            data[index].jadwal_kerja = res.jadwal_kerja.filter(
              (ress: any) =>
                ress.tgl >= this.data.startDate && ress.tgl <= this.data.endDate
            );
          });

          for (let res of data) {
            dataKehadiran.push([
              ...res.jadwal_kerja.map((ress: any) => ({
                tgl: ress.tgl,
                status_cuti: ress.status_cuti,
              })),
            ]);
          }

          data.length < 1
            ? window.alert('Data tidak ditemukan')
            : this.printExcel('Laporan Data Payroll', data, dataKehadiran);
        });
    }
  }

  formatDate(date: string) {
    return moment(date).format('DD MMM YYYY');
  }

  printExcel(name: string, printData: any, dataKehadiran: any) {
    let header: any[] = [];
    let content: any;
    let column;

    header = [
      ['A1', name],
      ['A2', 'Tanggal :'],
      ['B2', this.formatDate(this.data.startDate)],
      ['C2', 's.d'],
      ['D2', this.formatDate(this.data.endDate)],
      ['G1', 'Tanggal Cetak :'],
      ['G2', 'User :'],
      ['H1', this.formatDate(moment().format())],
      ['H2', window.localStorage.getItem('key')],
      ['I4', 'Status Kehadiran'],
    ];

    content = printData.map((res: any) => ({
      NIP: res.nip,
      'Nama Karyawan': res.nama_lengkap,
      Perusahaan: res.perusahaan,
      Lokasi: res.lokasi,
      Jabatan: res.jabatan,
      'Gaji Pokok': res.gaji_pokok,
      'Uang Makan': res.uang_makan,
      'Uang Transport': res.uang_transport,
    }));

    dataKehadiran.forEach((res: any, index: number) => {
      res.forEach((ress: any) => {
        content[index][moment(ress.tgl).format('DD/MM/YY')] = ress.status_cuti;
      });
    });

    column =
      Object.keys(content[0]).length > 25
        ? 'A' + String.fromCharCode((Object.keys(content[0]).length % 26) + 64)
        : String.fromCharCode(Object.keys(content[0]).length + 64);

    const ws = utils.json_to_sheet(content);
    const wsTemp = utils.json_to_sheet(content);

    let length = Number(ws['!ref']?.split(column, 2)[1]);
    let gap = 5;

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

    this.dialogRef.close();
  }
}
