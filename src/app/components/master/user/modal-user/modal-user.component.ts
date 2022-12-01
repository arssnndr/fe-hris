import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/interfaces/user';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.css'],
})
export class ModalUserComponent implements OnInit {
  isTambah = true;
  isDelete = false;
  hide1 = true;
  hide2 = true;

  idValue = this.data.id;
  keteranganValue = '';
  inisialValue = '';
  alamatValue = '';
  aksesValue = '';

  user: User | undefined;

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
    this.user = {
      id: this.idValue,
      keterangan: this.keteranganValue,
      inisial_lokasi: this.inisialValue,
      alamat_lokasi: this.alamatValue,
    };
    this.api.throwData(this.user);
  }
}
