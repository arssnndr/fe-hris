import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Perusahaan } from 'src/app/interfaces/perusahaan';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-modal-perusahaan',
  templateUrl: './modal-perusahaan.component.html',
  styleUrls: ['./modal-perusahaan.component.css'],
})
export class ModalPerusahaanComponent implements OnInit {
  isTambah = false;
  isDelete = false;
  isEdit = false;

  idValue = 0;
  inisialValue = '';
  namaValue = '';
  alamatValue = '';

  perusahaan: Perusahaan | undefined;

  constructor(
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: { name: string; data: any }
  ) {}

  ngOnInit(): void {
    switch (this.data.name) {
      case 'tambah':
        this.isTambah = true;

        this.idValue = this.data.data;
        break;
      case 'delete':
        this.isDelete = true;
        break;
      case 'edit':
        this.isEdit = true;

        this.idValue = this.data.data.id;
        this.inisialValue = this.data.data.inisial;
        this.namaValue = this.data.data.nama_perusahaan;
        this.alamatValue = this.data.data.alamat_perusahaan;
        break;
    }
  }

  inisial(data: any) {
    this.inisialValue = data.value;
  }

  nama(data: any) {
    this.namaValue = data.value;
  }

  alamat(data: any) {
    this.alamatValue = data.value;
  }

  throwResult() {
    this.perusahaan = {
      inisial: this.inisialValue,
      nama_perusahaan: this.namaValue,
      alamat_perusahaan: this.alamatValue,
    };
    this.api.throwData(this.perusahaan);
  }
}
