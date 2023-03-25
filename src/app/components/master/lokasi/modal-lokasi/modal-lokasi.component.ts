import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Lokasi } from 'src/app/interfaces/lokasi';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-modal-lokasi',
  templateUrl: './modal-lokasi.component.html',
  styleUrls: ['./modal-lokasi.component.css'],
})
export class ModalLokasiComponent implements OnInit {
  isTambah = false;
  isDelete = false;
  isEdit = false;

  idValue = 0;
  keteranganValue = '';
  inisialValue = '';
  alamatValue = '';

  lokasi: Lokasi | undefined;

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
        this.keteranganValue = this.data.data.nama;
        this.inisialValue = this.data.data.inisial;
        this.alamatValue = this.data.data.alamat;
        break;
    }
  }

  throwResult() {
    this.lokasi = {
      nama: this.keteranganValue,
      inisial: this.inisialValue,
      alamat: this.alamatValue,
    };
    this.api.throwData(this.lokasi);
  }
}
