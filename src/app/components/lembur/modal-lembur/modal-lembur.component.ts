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
  isTambah: boolean = false;
  isDelete: boolean = false;
  isEdit: boolean = false;

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
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: ApiService
  ) {
    switch (data.name) {
      case 'delete':
        this.isDelete = true;
        break;
      case 'tambah':
        this.isTambah = true;
        break;
      case 'edit':
        this.isEdit = true;
        this.dataForUpload = data.data;
        break;
    }
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
    this.dataForUpload.masuk = data.jadwal_kerja[0][0].masuk;
    this.dataForUpload.keluar =
      data.jadwal_kerja[Number(this.dataForUpload.tgl.split('-')[1]) - 1][
        Number(this.dataForUpload.tgl.split('-')[2])
      ].keluar;
    this.dataForUpload.mulai_istirahat =
      data.jadwal_kerja[Number(this.dataForUpload.tgl.split('-')[1]) - 1][
        Number(this.dataForUpload.tgl.split('-')[2])
      ].mulai_istirahat;
    this.dataForUpload.selesai_istirahat =
      data.jadwal_kerja[Number(this.dataForUpload.tgl.split('-')[1]) - 1][
        Number(this.dataForUpload.tgl.split('-')[2])
      ].selesai_istirahat;
  }

  akumulasi() {
    this.dataForUpload.jam_lembur_hariini =
      Number(this.dataForUpload.jam_lembur_selesai.split(':', 1)) -
      Number(this.dataForUpload.jam_lembur_mulai.split(':', 1));
    this.dataForUpload.total_lembur_bulanini =
      this.dataForUpload.jam_lembur_hariini;
  }

  throwResult() {
    this.api.throwData(this.dataForUpload);
  }
}
