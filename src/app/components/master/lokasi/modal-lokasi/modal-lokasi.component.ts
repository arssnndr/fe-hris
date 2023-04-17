import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modal-lokasi',
  templateUrl: './modal-lokasi.component.html',
  styleUrls: ['./modal-lokasi.component.css'],
})
export class ModalLokasiComponent implements OnInit {
  akses = this.api.akses.role_lokasi.edit;

  isTambah = false;
  isEdit = false;

  isSimpan: boolean = false;

  idValue = 0;

  lokasi: any = {
    nama: '',
    inisial: '',
    alamat: '',
  };

  constructor(
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: { name: string; data: any }
  ) {}

  cekForm() {
    this.isSimpan =
      (this.lokasi.nama.length < 3 ? false : true) &&
      (this.lokasi.inisial.length < 3 ? false : true) &&
      (this.lokasi.alamat.length < 3 ? false : true);
  }

  ngOnInit(): void {
    switch (this.data.name) {
      case 'tambah':
        this.isTambah = true;

        this.api.getData(environment.tabelLokasi).subscribe((result) => {
          this.idValue = Math.max(...result.map((res: any) => res.id)) + 1;
        });
        break;
      case 'edit':
        this.isEdit = true;

        this.idValue = this.data.data.id;
        this.lokasi.nama = this.data.data.nama;
        this.lokasi.inisial = this.data.data.inisial;
        this.lokasi.alamat = this.data.data.alamat;
        break;
    }
  }
}
