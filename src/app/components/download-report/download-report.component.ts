import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { ApiService } from 'src/app/shared/api.service';
import { utils, writeFileXLSX } from 'xlsx';

@Component({
  selector: 'app-download-report',
  templateUrl: './download-report.component.html',
  styleUrls: ['./download-report.component.css'],
})
export class DownloadReportComponent {
  tableLokasi: string = 'ms_lokasi/';
  tablePerusahaan: string = 'ms_perusahaan/';
  tableBagianKerja: string = 'ms_bagiankerja/';
  tableListKehadiran: string = 'trx_listkehadiran/';

  dataLokasi: any[] = [];
  dataPerusahaan: any[] = [];
  dataBagianKerja: any[] = [];

  status: string[] = [
    'Cuti Tahunan',
    'Cuti Khusus',
    'Dinas Dalam Kota',
    'Dinas Luar Kota',
    'Izin Sehari Penuh',
    'Izin Setengah Hari',
    'Lembur',
    'Sisa Cuti Tahunan',
  ];

  data: any = {
    lokasi: '',
    perusahaan: '',
    divisi: '',
    departemen: '',
    subDepartemen: '',
    startDate: moment().format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
    status: this.status[0],
  };

  constructor(
    private api: ApiService,
    private dialogRef: MatDialogRef<DownloadReportComponent>
  ) {
    api.getData(this.tableLokasi).subscribe((res) => {
      this.dataLokasi = res;
      this.data.lokasi = res[0].inisial;
    });
    api.getData(this.tablePerusahaan).subscribe((res) => {
      this.dataPerusahaan = res;
      this.data.perusahaan = res[0].nama;
    });
    api
      .getData(this.tableBagianKerja + '?jenis_bagian=Divisi')
      .subscribe((res) => {
        this.dataBagianKerja = res;
        this.data.divisi = res[0].divisi;
        this.data.departemen = res[0].departemen;
        this.data.subDepartemen = res[0].sub_departemen;
      });
  }

  formatDate(date: string) {
    return moment(date).format('DD MMM YYYY');
  }

  download() {
    let duration = moment
      .duration(moment(this.data.endDate).diff(moment(this.data.startDate)))
      .asDays();
    if (duration > 31) {
      window.alert('Rentan Waktu Melebihi 31 Hari!.');
    } else {
      this.api
        .getData(
          this.tableListKehadiran +
            '?lokasi_like=' +
            this.data.lokasi +
            '&divisi_like=' +
            this.data.divisi +
            '&departemen_like=' +
            this.data.departemen +
            '&sub_departemen_like=' +
            this.data.subDepartemen
        )
        .subscribe((result) => {
          let name = this.data.status;
          let header: any[] = [];
          let content;
          let column;
          header = [
            ['A1', name],
            ['A2', 'Tanggal :'],
            ['B2', this.formatDate(this.data.startDate)],
            ['C2', 's.d'],
            ['D2', this.formatDate(this.data.endDate)],
            ['L1', 'Tanggal Download'],
            ['L2', 'User'],
            ['M1', ': ' + moment().format('DD MMM YYYY')],
            ['M2', ': ' + window.localStorage.getItem('key')],
          ];
          let dataCuti = result.map((res: any) =>
            res.jadwal_kerja[Number(this.data.startDate.split('-')[1]) - 1].map(
              (val: any, index: number) => {
                if (
                  val.status_kehadiran.keterangan.length !== 0 &&
                  index >= Number(this.data.startDate.split('-')[2]) - 1 &&
                  index <= Number(this.data.endDate.split('-')[2]) - 1
                ) {
                  return val;
                }
              }
            )
          );
          function cuti(index: number): any {
            let result;
            dataCuti[index].forEach((res: any) => {
              if (res !== undefined) {
                result = res;
              }
            });
            return result;
          }
          content = result.map((res: any, index: number) => ({
            NIP: res.nip,
            'Nama Karyawan': res.nama_lengkap,
            Jabatan: res.jabatan,
            Lokasi: res.lokasi,
            Divisi: res.divisi,
            Departemen: res.departemen,
            'Sub Departemen': res.sub_departemen,
            'No Form': cuti(index).status_kehadiran.cuti.no_form,
            'Tanggal Cuti (ambil)': this.formatDate(
              cuti(index).status_kehadiran.cuti.tgl_mulai
            ),
            'Tanggal Cuti (selesai)': this.formatDate(
              cuti(index).status_kehadiran.cuti.tgl_selesai
            ),
            'Cuti Yang Diambil':
              moment
                .duration(
                  moment(
                    moment(
                      cuti(index).status_kehadiran.cuti.tgl_selesai
                    ).format('YYYY-MM-DD')
                  ).diff(
                    moment(
                      moment(
                        cuti(index).status_kehadiran.cuti.tgl_mulai
                      ).format('YYYY-MM-DD')
                    )
                  )
                )
                .asDays() + 1,
            Keterangan: cuti(index).status_kehadiran.keterangan,
            'Nama Petugas Pengganti':
              cuti(index).status_kehadiran.cuti.petugas_pengganti === undefined
                ? ''
                : cuti(index).status_kehadiran.cuti.petugas_pengganti
                    .nama_lengkap,
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
                    wsTemp[
                      'A' + String.fromCharCode(65 + index - 26) + (i + 1)
                    ])
                : (ws[String.fromCharCode(65 + index) + (i + gap)] =
                    wsTemp[String.fromCharCode(65 + index) + (i + 1)]);
            });
          }

          const wb = utils.book_new();

          utils.book_append_sheet(wb, ws);
          writeFileXLSX(wb, name + '.xlsx');
        });
      this.dialogRef.close();
    }
  }
}
