import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-modal-lembur',
  templateUrl: './modal-lembur.component.html',
  styleUrls: ['./modal-lembur.component.css'],
})
export class ModalLemburComponent {
  akses = this.api.akses.role_lembur.edit;

  jenisLembur = ['Lembur Biasa', 'Tanpa Istirahat'];

  tableKaryawan = 'trx_jadwalkerjadetail';
  searchNipKaryawan!: any;

  dataForUpload = {
    nip: '',
    nama_lengkap: '',
    no_spkl: '',
    tgl: moment().format('YYYY-MM-DD'),
    jenis_lembur: this.jenisLembur[0],
    masuk: '',
    keluar: '',
    jam_lembur_mulai: '',
    jam_lembur_selesai: '',
    mulai_istirahat: '',
    selesai_istirahat: '',
    tanpa_istirahat: '',
    jam_lembur_hariini: 0,
    total_lembur_bulanini: 0,
    alasan_lembur: '',
    lokasi: '',
    perusahaan: '',
    jabatan: '',
    divisi: '',
    departemen: '',
    sub_departemen: '',
  };

  constructor(@Inject(MAT_DIALOG_DATA) data: any, private api: ApiService) {
    if (data != null) this.dataForUpload = data;
  }

  searchNip(data: any) {
    this.api
      .getData(this.tableKaryawan + '?nip_like=' + data.value)
      .subscribe((res) => {
        this.searchNipKaryawan = res;
      });
  }

  selectKaryawan(data: any) {
    this.dataForUpload.nip = data.nip;
    this.dataForUpload.nama_lengkap = data.nama_lengkap;
    this.dataForUpload.lokasi = data.lokasi;
    this.dataForUpload.perusahaan = data.perusahaan;
    this.dataForUpload.jabatan = data.jabatan;
    this.dataForUpload.divisi = data.divisi;
    this.dataForUpload.departemen = data.departemen;
    this.dataForUpload.sub_departemen = data.sub_departemen;
    this.dataForUpload.masuk =
      data.jadwal_kerja[Number(this.dataForUpload.tgl.split('-')[1]) - 1].masuk;
    this.dataForUpload.keluar =
      data.jadwal_kerja[
        Number(this.dataForUpload.tgl.split('-')[1]) - 1
      ].keluar;
    this.dataForUpload.mulai_istirahat = data.jadwal_kerja[
      Number(this.dataForUpload.tgl.split('-')[1]) - 1
    ].start_break.split(':', 1);
    this.dataForUpload.selesai_istirahat = data.jadwal_kerja[
      Number(this.dataForUpload.tgl.split('-')[1]) - 1
    ].end_break.split(':', 1);
  }

  akumulasi() {
    this.dataForUpload.jam_lembur_hariini =
      Number(this.dataForUpload.jam_lembur_selesai.split(':', 1)) -
      Number(this.dataForUpload.jam_lembur_mulai.split(':', 1));
    this.dataForUpload.total_lembur_bulanini =
      this.dataForUpload.jam_lembur_hariini;
  }
}
