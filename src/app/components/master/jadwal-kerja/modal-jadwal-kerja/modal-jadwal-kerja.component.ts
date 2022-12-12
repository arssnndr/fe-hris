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
  isTambah!: boolean;
  isDelete!: boolean;
  isEdit!: boolean;

  jadwalKerja: JadwalKerja = {
    id: '',
    id_lokasi: '',
    id_shift: '',
    jam_kerja: '',
    in: '',
    out: '',
    mulai_istirahat: '',
    selesai_istirahat: '',
    total_jam_kerja: 0,
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
    if (this.data.name === 'tambah') {
      this.isTambah = true;
      this.isDelete = false;
      this.isEdit = false;

      this.lokasiVal = this.lokasi[0].val;
      this.shiftVal = this.shift[0].val;
      this.jamKerjaVal = this.jamKerja[0].val;

      this.jadwalKerja.id = this.lokasiVal + this.shiftVal + this.jamKerjaVal;
      this.jadwalKerja.id_lokasi = this.lokasi[0].value;
      this.jadwalKerja.id_shift = this.shift[0].value;
      this.jadwalKerja.jam_kerja = this.jamKerja[0].value;
    } else if (this.data.name === 'delete') {
      this.isTambah = false;
      this.isDelete = true;
      this.isEdit = false;
    } else if (this.data.name === 'edit') {
      this.isTambah = false;
      this.isDelete = false;
      this.isEdit = true;

      this.jadwalKerja = this.data.data;
      this.lokasiValue = this.data.data.id_lokasi;
      this.shiftValue = this.data.data.id_shift;
      this.jamKerjaValue = this.data.data.jam_kerja;

      this.lokasi.find((res) => {
        if (res.value === this.jadwalKerja.id_lokasi) {
          this.lokasiVal = res.val;
        }
      });
      this.shift.find((res) => {
        if (res.value === this.jadwalKerja.id_shift) {
          this.shiftVal = res.val;
        }
      });
      this.jamKerja.find((res) => {
        if (res.value === this.jadwalKerja.jam_kerja) {
          this.jamKerjaVal = res.val;
        }
      });
    }
  }

  onChange(data: any) {
    this.lokasi.find((res) => {
      if (res.value === data.value) {
        this.lokasiVal = res.val;
        this.jadwalKerja.id_lokasi = res.value;
      }
    });
    this.shift.find((res) => {
      if (res.value === data.value) {
        this.shiftVal = res.val;
        this.jadwalKerja.id_shift = res.value;
      }
    });
    this.jamKerja.find((res) => {
      if (res.value === data.value) {
        this.jamKerjaVal = res.val;
        this.jadwalKerja.jam_kerja = res.value;
      }
    });

    this.jadwalKerja.id =
      this.lokasiVal +
      this.shiftVal +
      this.jamKerjaVal +
      this.jadwalKerja.in.slice(0, -3) +
      this.jadwalKerja.out.slice(0, -3);

    let keluar = parseInt(this.jadwalKerja.out.slice(0, -3));
    let masuk = parseInt(this.jadwalKerja.in.slice(0, -3));
    let mIstirahat = parseInt(this.jadwalKerja.selesai_istirahat.slice(0, -3));
    let sIstirahat = parseInt(this.jadwalKerja.mulai_istirahat.slice(0, -3));
    if (
      this.jadwalKerja.selesai_istirahat === '' ||
      this.jadwalKerja.mulai_istirahat === ''
    ) {
      this.jadwalKerja.total_jam_kerja = keluar - masuk;
    } else {
      this.jadwalKerja.total_jam_kerja =
        keluar - masuk - (mIstirahat - sIstirahat);
    }
  }

  throwResult() {
    this.api.throwData(this.jadwalKerja);
  }
}
