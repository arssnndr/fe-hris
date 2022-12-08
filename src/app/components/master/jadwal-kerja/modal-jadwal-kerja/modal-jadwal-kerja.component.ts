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

  jadwalKerja!: JadwalKerja;

  lokasi = [
    { value: 'TMS HO' },
    { value: 'TMS 1' },
    { value: 'TMS 2' },
    { value: 'TMS 3' },
    { value: 'TMS 4' },
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { name: string; edit: any }
  ) {}

  ngOnInit(): void {
    if (this.data.name === 'tambah') {
      this.isTambah = true;
      this.isDelete = false;
      this.isEdit = false;

      this.jadwalKerja.id_lokasi = this.lokasi[0].value;
      console.log(this.jadwalKerja)
      console.log(this.lokasi);
    } else if (this.data.name === 'delete') {
      this.isTambah = false;
      this.isDelete = true;
      this.isEdit = false;
    } else if (this.data.name === 'edit') {
      this.isTambah = false;
      this.isDelete = false;
      this.isEdit = true;
    }
  }

  throwResult() {
    console.log(this.jadwalKerja);
  }
}
