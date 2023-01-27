import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-modal-lembur',
  templateUrl: './modal-lembur.component.html',
  styleUrls: ['./modal-lembur.component.css'],
})
export class ModalLemburComponent {
  isTambah: boolean = false;
  isDelete: boolean = false;
  isEdit: boolean = false;

  jenisLembur = ['Lembur Biasa', 'Tanpa Istirahat'];
  jenisLemburValue = this.jenisLembur[0];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: ApiService
  ) {
    switch (data.name) {
      case 'delete':
        this.isDelete = true;
        break;
      case 'tambah':
        this.isTambah = true;
        break;
      case 'edit':
        this.isEdit = true;
        break;
    }
  }

  throwResult() {
    console.log('throw');
  }
}
