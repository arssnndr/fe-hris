import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JadwalKerja } from 'src/app/interfaces/jadwal-kerja';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-modal-jadwal-kerja',
  templateUrl: './modal-jadwal-kerja.component.html',
  styleUrls: ['./modal-jadwal-kerja.component.css'],
})
export class ModalJadwalKerjaComponent implements OnInit {
  isTambah = false
  isDelete = false
  isEdit = false

  jadwalKerja: JadwalKerja = {
    id_jadwal_kerja: '',
    lokasi: '',
    shift: '',
    type: '',
    masuk: '',
    keluar: '',
    mulai_istirahat: '',
    selesai_istirahat: '',
    total: 0,
  };

  lokasi = [
    { value: 'TMS HO', val: 'TMS0' },
    { value: 'TMS 1', val: 'TMS1' },
    { value: 'TMS 2', val: 'TMS2' },
    { value: 'TMS 3', val: 'TMS3' },
    { value: 'TMS 4', val: 'TMS4' },
  ];
  lokasiValue = '';
  lokasiVal = '';

  shift = [
    { value: 'Non Shift', val: 'S0' },
    { value: 'Shift 1', val: 'S1' },
    { value: 'Shift 2', val: 'S2' },
  ];
  shiftValue = '';
  shiftVal = '';

  jamKerja = [
    { value: 'Normal', val: 'N' },
    { value: 'Pendek', val: 'P' },
  ];
  jamKerjaValue = '';
  jamKerjaVal = '';

  constructor(
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: { name: string; data: any }
  ) {}

  ngOnInit(): void {
    switch (this.data.name) {
      case 'tambah':
        this.isTambah = true;

        this.lokasiVal = this.lokasi[0].val;
        this.shiftVal = this.shift[0].val;
        this.jamKerjaVal = this.jamKerja[0].val;

        this.jadwalKerja.id_jadwal_kerja =
          this.lokasiVal + this.shiftVal + this.jamKerjaVal;
        this.jadwalKerja.lokasi = this.lokasi[0].value;
        this.jadwalKerja.shift = this.shift[0].value;
        this.jadwalKerja.type = this.jamKerja[0].value;
        break;
      case 'delete':
        this.isDelete = true;
        break;
      case 'edit':
        this.isEdit = true;

        this.jadwalKerja = this.data.data;
        this.lokasiValue = this.data.data.lokasi;
        this.shiftValue = this.data.data.shift;
        this.jamKerjaValue = this.data.data.type;

        this.lokasi.find((res) => {
          if (res.value === this.jadwalKerja.lokasi) {
            this.lokasiVal = res.val;
          }
        });
        this.shift.find((res) => {
          if (res.value === this.jadwalKerja.shift) {
            this.shiftVal = res.val;
          }
        });
        this.jamKerja.find((res) => {
          if (res.value === this.jadwalKerja.type) {
            this.jamKerjaVal = res.val;
          }
        });
        break;
    }
  }

  onChange(data: any) {
    this.lokasi.find((res) => {
      if (res.value === data.value) {
        this.lokasiVal = res.val;
        this.jadwalKerja.lokasi = res.value;
      }
    });
    this.shift.find((res) => {
      if (res.value === data.value) {
        this.shiftVal = res.val;
        this.jadwalKerja.shift = res.value;
      }
    });
    this.jamKerja.find((res) => {
      if (res.value === data.value) {
        this.jamKerjaVal = res.val;
        this.jadwalKerja.type = res.value;
      }
    });

    this.jadwalKerja.id_jadwal_kerja =
      this.lokasiVal +
      this.shiftVal +
      this.jamKerjaVal +
      this.jadwalKerja.masuk.slice(0, -3) +
      this.jadwalKerja.keluar.slice(0, -3);

    let keluar = parseInt(this.jadwalKerja.keluar.slice(0, -3));
    let masuk = parseInt(this.jadwalKerja.masuk.slice(0, -3));
    let mIstirahat = parseInt(this.jadwalKerja.selesai_istirahat.slice(0, -3));
    let sIstirahat = parseInt(this.jadwalKerja.mulai_istirahat.slice(0, -3));

    this.jadwalKerja.selesai_istirahat === '' ||
    this.jadwalKerja.mulai_istirahat === ''
      ? (this.jadwalKerja.total = keluar - masuk)
      : (this.jadwalKerja.total = keluar - masuk - (mIstirahat - sIstirahat));
  }

  throwResult() {
    this.api.throwData(this.jadwalKerja);
  }
}
