import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Perusahaan } from 'src/app/interfaces/perusahaan';
import { ApiService } from 'src/app/shared/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modal-perusahaan',
  templateUrl: './modal-perusahaan.component.html',
  styleUrls: ['./modal-perusahaan.component.css'],
})
export class ModalPerusahaanComponent implements OnInit {
  akses = this.api.akses.role_perusahaan.edit;

  isTambah = false;
  isEdit = false;
  isBlur = false;

  idValue = 0;
  inisialValue = '';
  namaValue = '';
  alamatValue = '';

  perusahaan: Perusahaan | undefined;

  constructor(
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) data: { name: string; data: any },
    private dialogRef: MatDialogRef<ModalPerusahaanComponent>
  ) {
    switch (data.name) {
      case 'tambah':
        this.isTambah = true;

        api.getData(environment.tabelPerusahaan).subscribe((result) => {
          this.idValue = Math.max(...result.map((res: any) => res.id)) + 1;
        });
        break;
      case 'edit':
        this.isEdit = true;

        this.idValue = data.data.id;
        this.inisialValue = data.data.inisial;
        this.namaValue = data.data.nama;
        this.alamatValue = data.data.alamat;
        break;
    }
  }

  ngOnInit(): void {}

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
      this.api.getData(environment.tabelPerusahaan).subscribe((res) => {
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
          this.dialogRef.close(this.perusahaan);
        }
      });
    }
  }
}
