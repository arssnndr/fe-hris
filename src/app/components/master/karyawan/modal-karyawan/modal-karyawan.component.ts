import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Karyawan } from 'src/app/interfaces/karyawan';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-modal-karyawan',
  templateUrl: './modal-karyawan.component.html',
  styleUrls: ['./modal-karyawan.component.css'],
})
export class ModalKaryawanComponent implements OnInit {
  isTambah = true;
  isDelete = false;

  idValue = this.data.id;
  keteranganValue = '';
  inisialValue = '';
  alamatValue = '';

  karyawan: Karyawan | undefined;

  constructor(
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: { name: string; id: number }
  ) {}

  ngOnInit(): void {
    if (this.data.name === 'tambah') {
      this.isTambah = true;
      this.isDelete = false;
    } else if (this.data.name === 'delete') {
      this.isTambah = false;
      this.isDelete = true;
    }
  }

  throwResult() {
    // this.karyawan = {
    //   id: this.idValue,
    //   keterangan: this.keteranganValue,
    //   inisial_lokasi: this.inisialValue,
    //   alamat_lokasi: this.alamatValue,
    // };
    // this.api.throwData(this.karyawan);
  }
}
