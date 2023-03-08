import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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

  isBlur = false;

  tabelPerusahaan = 'ms_perusahaan/';

  idValue = 0;
  inisialValue = '';
  namaValue = '';
  alamatValue = '';

  perusahaan: Perusahaan | undefined;

  constructor(
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: { name: string; data: any },
    private dialogRef: MatDialogRef<ModalPerusahaanComponent>
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
        this.namaValue = this.data.data.nama;
        this.alamatValue = this.data.data.alamat;
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
      nama: this.namaValue,
      alamat: this.alamatValue,
    };

    let isValid = false;

    if (
      this.inisialValue.length === 0 ||
      this.namaValue.length === 0 ||
      this.alamatValue.length === 0
    ) {
      window.alert('Data belum lengkap.');
    } else {
      this.api.getData(this.tabelPerusahaan).subscribe((res) => {
        for (let val of res) {
          if (this.isEdit) {
            isValid = true;
            break;
          }
          if (val.nama === this.namaValue) {
            window.alert('Nama Perusahaan sudah di insert.');
            isValid = false;
            break;
          } else {
            isValid = true;
          }
        }
        if (isValid) {
          this.api.throwData(this.perusahaan);
          this.dialogRef.close('simpan');
        }
      });
    }
  }
}
