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
  akses = this.api.akses.role_jadwal_kerja.edit;

  isTambah = false;
  isEdit = false;

  jadwalKerja: JadwalKerja = {
    id_jadwal_kerja: '',
    lokasi: '',
    shift: '',
    type: '',
    masuk: '',
    keluar: '',
    start_break: '',
    end_break: '',
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
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    if (data !== null) {
      this.isEdit = true;

      this.jadwalKerja = this.data;
      this.lokasiValue = this.data.lokasi;
      this.shiftValue = this.data.shift;
      this.jamKerjaValue = this.data.type;

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
    } else {
      this.isTambah = true;

      this.lokasiVal = this.lokasi[0].val;
      this.shiftVal = this.shift[0].val;
      this.jamKerjaVal = this.jamKerja[0].val;

      this.jadwalKerja.id_jadwal_kerja =
        this.lokasiVal + this.shiftVal + this.jamKerjaVal;
      this.jadwalKerja.lokasi = this.lokasi[0].value;
      this.jadwalKerja.shift = this.shift[0].value;
      this.jadwalKerja.type = this.jamKerja[0].value;
    }
  }

  ngOnInit(): void {}

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
    let mIstirahat = parseInt(this.jadwalKerja.start_break.slice(0, -3));
    let sIstirahat = parseInt(this.jadwalKerja.end_break.slice(0, -3));

    this.jadwalKerja.start_break == '' && this.jadwalKerja.end_break == ''
      ? (this.jadwalKerja.total = keluar - masuk)
      : (this.jadwalKerja.total = keluar - masuk - (sIstirahat - mIstirahat));
  }
}
