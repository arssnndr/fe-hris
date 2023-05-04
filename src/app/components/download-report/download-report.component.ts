import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ApiService } from 'src/app/shared/api.service';
import { environment } from 'src/environments/environment';
import { utils, writeFileXLSX } from 'xlsx';

@Component({
  selector: 'app-download-report',
  templateUrl: './download-report.component.html',
  styleUrls: ['./download-report.component.css'],
})
export class DownloadReportComponent {
  akses = this.api.akses.role_download_report;

  dataLokasi: any[] = [];
  dataPerusahaan: any[] = [];
  dataDivisi: any[] = [];
  dataDepartemen: any[] = [];
  dataSubDepartemen: any[] = [];
  dataStatus: any[] = [
    'Cuti Tahunan',
    'Cuti Khusus',
    'Izin Penuh',
    'Izin Setengah Hari',
    'Dinas Dalam Kota',
    'Dinas Luar Kota',
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
    status: this.dataStatus[0],
  };

  downloadData: any[] = [];

  constructor(
    private api: ApiService,
    private dialogRef: MatDialogRef<DownloadReportComponent>,
    router: Router
  ) {
    if (!this.akses.view) router.navigate(['dashboard']);

    api.getData(environment.tabelLokasi).subscribe((res) => {
      this.dataLokasi.push(...new Set(res.map((val: any) => val.inisial)));
      this.data.lokasi = this.dataLokasi[0];
    });

    api.getData(environment.tabelPerusahaan).subscribe((res) => {
      this.dataPerusahaan.push(...new Set(res.map((val: any) => val.nama)));
      this.data.perusahaan = this.dataPerusahaan[0];
    });

    api.getData(environment.tabelBagianKerja).subscribe((res) => {
      this.dataDivisi.push(...new Set(res.map((val: any) => val.divisi)));
      this.data.divisi = this.dataDivisi[0];

      this.dataDepartemen.push(
        ...new Set(res.map((val: any) => val.departemen))
      );
      this.data.departemen = this.dataDepartemen[0];

      this.dataSubDepartemen.push(
        ...new Set(res.map((val: any) => val.sub_departemen))
      );
      this.data.subDepartemen = this.dataSubDepartemen[0];
    });
  }

  formatDate(date: string) {
    return moment(date).format('DD MMM YYYY');
  }

  isDownloadAkses() {
    this.akses.download
      ? this.getDownloadData()
      : alert('Anda tidak memiliki Akses');
  }

  getDownloadData() {
    let statusCuti: string = '';
    const {
      lokasi,
      perusahaan,
      divisi,
      departemen,
      subDepartemen,
      startDate,
      endDate,
      status,
    } = this.data;
    const filter =
      '&lokasi_like=' +
      lokasi +
      '&perusahaan_like=' +
      perusahaan +
      '&divisi_like=' +
      divisi +
      '&departemen_like=' +
      departemen +
      '&sub_departemen_like=' +
      subDepartemen;

    const statusKehadiran = () => {
      this.api
        .getData(environment.tabelStatusKehadiran + statusCuti + filter)
        .subscribe((res) => {
          this.downloadData = res.filter(
            (val: any) =>
              (val.tgl_mulai_cuti >= startDate &&
                val.tgl_mulai_cuti <= endDate) ||
              (val.tgl_selesai_cuti >= startDate &&
                val.tgl_selesai_cuti <= endDate) ||
              (val.tgl_mulai_izin >= startDate &&
                val.tgl_mulai_izin <= endDate) ||
              (val.tgl_selesai_izin >= startDate &&
                val.tgl_selesai_izin <= endDate)
          );

          if (res.length !== 0) {
            this.printData('Laporan ' + this.data.status);
          } else {
            window.alert('Data tidak ditemukan!');
          }
        });
    };

    const lembur = () => {
      this.api
        .getData(environment.tabelLembur + '?' + filter.slice(1))
        .subscribe((res) => {
          this.downloadData = res.filter(
            (val: any) => val.tgl >= startDate && val.tgl <= endDate
          );

          if (res.length !== 0) {
            this.printData('Laporan ' + status);
          } else {
            window.alert('Data tidak ditemukan!');
          }
        });
    };

    switch (this.data.status) {
      case this.dataStatus[0]:
        statusCuti = '?status_cuti_like=' + status;
        statusKehadiran();
        break;
      case this.dataStatus[1]:
        statusCuti = '?status_cuti_like=' + status;
        statusKehadiran();
        break;
      case this.dataStatus[2]:
        statusCuti =
          '?status_cuti_like=Izin' + '&izin_sehari_penuh_like=' + true;
        statusKehadiran();
        break;
      case this.dataStatus[3]:
        statusCuti =
          '?status_cuti_like=Izin' + '&izin_sehari_penuh_like=' + false;
        statusKehadiran();
        break;
      case this.dataStatus[4]:
        statusCuti =
          '?status_cuti_like=dinas' + '&dinas_luar_kota_like=' + false;
        statusKehadiran();
        break;
      case this.dataStatus[5]:
        statusCuti =
          '?status_cuti_like=dinas' + '&dinas_luar_kota_like=' + false;
        statusKehadiran();
        break;
      case this.dataStatus[6]:
        lembur();
        break;
      case this.dataStatus[7]:
        statusKehadiran();
        break;
    }
  }

  printData(name: string) {
    let header: any[] = [];
    let content: any;
    let column;
    header = [
      ['A1', name],
      ['A2', 'Tanggal :'],
      ['B2', this.formatDate(this.data.startDate)],
      ['C2', 's.d'],
      ['D2', this.formatDate(this.data.endDate)],
      ['L1', 'Tanggal Cetak :'],
      ['L2', 'User :'],
      ['M1', moment().format('DD MMM YYYY')],
      ['M2', this.api.akses.username],
    ];

    switch (this.data.status) {
      case this.dataStatus[0]:
        content = this.downloadData.map((res: any) => ({
          NIP: res.nip,
          'Nama Karyawan': res.nama_lengkap,
          Jabatan: res.jabatan,
          Lokasi: res.lokasi,
          Divisi: res.divisi,
          Departemen: res.departemen,
          'Sub Departemen': res.sub_departemen,
          'No Form': res.no_form,
          'Tanggal Mulai Cuti': this.formatDate(res.tgl_mulai_cuti),
          'Tanggal Selesai Cuti': this.formatDate(res.tgl_selesai_cuti),
          'Cuti Yang Diambil': res.hak_cuti_diambil,
          Keterangan: res.keterangan,
          'Nama Petugas Pengganti': res.nama_pengganti,
        }));
        break;
      case this.dataStatus[1]:
        content = this.downloadData.map((res: any) => ({
          NIP: res.nip,
          'Nama Karyawan': res.nama_lengkap,
          Jabatan: res.jabatan,
          Lokasi: res.lokasi,
          Divisi: res.divisi,
          Departemen: res.departemen,
          'Sub Departemen': res.sub_departemen,
          'No Form': res.no_form,
          'Tanggal Mulai Cuti': this.formatDate(res.tgl_mulai_cuti),
          'Tanggal Selesai Cuti': this.formatDate(res.tgl_selesai_cuti),
          'Hak Cuti': res.hak_cuti_tersedia,
          'Cuti Yang Diambil': res.hak_cuti_diambil,
          Keterangan: res.keterangan,
          'Nama Petugas Pengganti': res.nama_pengganti,
        }));
        break;
      case this.dataStatus[2]:
        content = this.downloadData.map((res: any) => ({
          NIP: res.nip,
          'Nama Karyawan': res.nama_lengkap,
          Jabatan: res.jabatan,
          Lokasi: res.lokasi,
          Divisi: res.divisi,
          Departemen: res.departemen,
          'Sub Departemen': res.sub_departemen,
          'No Form': res.no_form,
          'Tanggal Mulai Izin': this.formatDate(res.tgl_mulai_cuti),
          'Tanggal Selesai Izin': this.formatDate(res.tgl_selesai_cuti),
          'Jumlah Hari Izin': res.jumlah_hari_izin,
          Keterangan: res.keterangan,
          'Nama Petugas Pengganti': res.nama_pengganti,
        }));
        break;
      case this.dataStatus[3]:
        content = this.downloadData.map((res: any) => ({
          NIP: res.nip,
          'Nama Karyawan': res.nama_lengkap,
          Jabatan: res.jabatan,
          Lokasi: res.lokasi,
          Divisi: res.divisi,
          Departemen: res.departemen,
          'Sub Departemen': res.sub_departemen,
          'No Form': res.no_form,
          'Tanggal Izin': this.formatDate(res.tgl_mulai_cuti),
          'Jam Mulai Izin': res.waktu_izin_mulai,
          'Jam Selesai Izin': res.waktu_izin_selesai,
          'Total Waktu Izin': res.total_waktu_izin,
          Keterangan: res.keterangan,
        }));
        break;
      case this.dataStatus[4]:
        header = [
          ['A1', name],
          ['A2', 'Tanggal :'],
          ['B2', this.formatDate(this.data.startDate)],
          ['C2', 's.d'],
          ['D2', this.formatDate(this.data.endDate)],
          ['M1', 'Tanggal Cetak :'],
          ['M2', 'User :'],
          ['N1', moment().format('DD MMM YYYY')],
          ['N2', this.api.akses.username],
        ];

        content = this.downloadData.map((res: any) => ({
          NIP: res.nip,
          'Nama Karyawan': res.nama_lengkap,
          Jabatan: res.jabatan,
          Lokasi: res.lokasi,
          Divisi: res.divisi,
          Departemen: res.departemen,
          'Sub Departemen': res.sub_departemen,
          'No Form': res.no_form,
          'Alamat Tujuan Dinas': res.alamat_tujuan_dinas,
          'Tanggal Keberangkatan': this.formatDate(res.tgl_berangkat),
          'Tanggal Kepulangan': this.formatDate(res.tgl_pulang),
          'Jam Keberangkatan': res.tgl_berangkat.split('T')[1],
          'Jam Kepulangan': res.tgl_pulang.split('T')[1],
          Keterangan: res.keterangan,
        }));
        break;
      case this.dataStatus[5]:
        header = [
          ['A1', name],
          ['A2', 'Tanggal :'],
          ['B2', this.formatDate(this.data.startDate)],
          ['C2', 's.d'],
          ['D2', this.formatDate(this.data.endDate)],
          ['N1', 'Tanggal Cetak :'],
          ['N2', 'User :'],
          ['O1', moment().format('DD MMM YYYY')],
          ['O2', this.api.akses.username],
        ];

        content = this.downloadData.map((res: any) => ({
          NIP: res.nip,
          'Nama Karyawan': res.nama_lengkap,
          Jabatan: res.jabatan,
          Lokasi: res.lokasi,
          Divisi: res.divisi,
          Departemen: res.departemen,
          'Sub Departemen': res.sub_departemen,
          'No Form': res.no_form,
          'Kota Tujuan Dinas': res.kota_tujuan_dinas,
          'Alamat Tujuan Dinas': res.alamat_tujuan_dinas,
          'Tanggal Keberangkatan': this.formatDate(res.tgl_berangkat),
          'Tanggal Kepulangan': this.formatDate(res.tgl_pulang),
          'Jam Keberangkatan': res.tgl_berangkat.split('T')[1],
          'Jam Kepulangan': res.tgl_pulang.split('T')[1],
          Keterangan: res.keterangan,
        }));
        break;
      case this.dataStatus[6]:
        header = [
          ['A1', name],
          ['A2', 'Tanggal :'],
          ['B2', this.formatDate(this.data.startDate)],
          ['C2', 's.d'],
          ['D2', this.formatDate(this.data.endDate)],
          ['O1', 'Tanggal Cetak :'],
          ['O2', 'User :'],
          ['P1', moment().format('DD MMM YYYY')],
          ['P2', this.api.akses.username],
        ];

        content = this.downloadData.map((res: any) => ({
          NIP: res.nip,
          'Nama Karyawan': res.nama_lengkap,
          Jabatan: res.jabatan,
          Lokasi: res.lokasi,
          Divisi: res.divisi,
          Departemen: res.departemen,
          'Sub Departemen': res.sub_departemen,
          'No SPKL': res.no_spkl,
          'Tanggal Lembur': this.formatDate(res.tgl),
          'Jenis Lembur': res.jenis_lembur,
          'Alasan Lembur': res.alasan_lembur,
          'Jam Lembur Mulai': res.jam_lembur_mulai,
          'Jam Lembur Selesai': res.jam_lembur_selesai,
          'Tanpa Istirahat (Jam)': res.tanpa_istirahat ? 1 : 0,
          'Jam Lembur Hari Ini': res.jam_lembur_hariini,
          'Akumulasi Jam Lembur Bulan Ini': res.total_lembur_bulanini,
        }));
        break;
      case this.dataStatus[7]:
        header = [
          ['A1', name],
          ['K1', 'Tanggal Cetak :'],
          ['K2', 'User :'],
          ['L1', moment().format('DD MMM YYYY')],
          ['L2', this.api.akses.username],
        ];

        content = this.downloadData.map((res: any) => ({
          NIP: res.nip,
          'Nama Karyawan': res.nama_lengkap,
          Jabatan: res.jabatan,
          Lokasi: res.lokasi,
          Divisi: res.divisi,
          Departemen: res.departemen,
          'Sub Departemen': res.sub_departemen,
          'Tanggal Mulai Hak Cuti': this.formatDate(res.tgl_muncul_hak_cuti),
          'Tanggal Berakhir Hak Cuti': this.formatDate(
            res.tgl_berakhir_hak_cuti
          ),
          'Hak Cuti Tersedia': res.hak_cuti_tersedia,
          'Hak Cuti Telah Diambil': res.hak_cuti_telah_diambil,
          'Sisa Hak Cuti': res.hak_cuti_tersisa,
        }));
        break;
    }

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

    this.dialogRef.close();
  }
}
