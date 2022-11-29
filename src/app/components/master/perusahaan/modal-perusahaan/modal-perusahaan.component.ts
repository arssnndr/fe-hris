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
  isTambah = true;
  isDelete = false;

  idValue = this.data.id;
  inisialValue = '';
  namaValue = '';
  alamatValue = '';

  perusahaan: Perusahaan | undefined;

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
    this.perusahaan = {
      id: this.idValue,
      inisial: this.inisialValue,
      nama_perusahaan: this.namaValue,
      alamat_perusahaan: this.alamatValue,
    };
    this.api.throwData(this.perusahaan);
  }
}
