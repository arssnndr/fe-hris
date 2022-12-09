import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JadwalKerja } from 'src/app/interfaces/jadwal-kerja';

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
    total_jam_kerja: '',
  };

  lokasi = [
    { value: 'TMS HO', val: 'TMS0' },
    { value: 'TMS 1', val: 'TMS1' },
    { value: 'TMS 2', val: 'TMS2' },
    { value: 'TMS 3', val: 'TMS3' },
    { value: 'TMS 4', val: 'TMS4' },
  ];
  lokasiValue = this.lokasi[0].val;

  shift = [
    { value: 'Non Shift', val: 'S0' },
    { value: 'Shift 1', val: 'S1' },
    { value: 'Shift 2', val: 'S2' },
  ];
  shiftValue = this.shift[0].val;

  jamKerja = [
    { value: 'Normal', val: 'N' },
    { value: 'Pendek', val: 'P' },
  ];
  jamKerjaValue = this.jamKerja[0].val;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { name: string; data: any }
  ) {}

  ngOnInit(): void {
    if (this.data.name === 'tambah') {
      this.isTambah = true;
      this.isDelete = false;
      this.isEdit = false;

      this.jadwalKerja.id =
        this.lokasiValue + this.shiftValue + this.jamKerjaValue;
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
    }
  }

  onChange(data: any) {
    this.lokasi.find((res) => {
      if (res.value === data.value) {
        this.lokasiValue = res.val;
      }
    });
    this.shift.find((res) => {
      if (res.value === data.value) {
        this.shiftValue = res.val;
      }
    });
    this.jamKerja.find((res) => {
      if (res.value === data.value) {
        this.jamKerjaValue = res.val;
      }
    });

    this.jadwalKerja.id =
      this.lokasiValue +
      this.shiftValue +
      this.jamKerjaValue +
      this.jadwalKerja.in.slice(0, -3) +
      this.jadwalKerja.out.slice(0, -3);
    console.log(this.jadwalKerja.id);
  }

  throwResult() {
    console.log(this.jadwalKerja);
  }
}
