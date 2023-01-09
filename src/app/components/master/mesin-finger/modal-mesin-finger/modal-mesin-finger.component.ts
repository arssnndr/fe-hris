import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-modal-mesin-finger',
  templateUrl: './modal-mesin-finger.component.html',
  styleUrls: ['./modal-mesin-finger.component.css'],
})
export class ModalMesinFingerComponent implements OnInit {
  isDelete = false;
  isTambah = false;
  isEdit = false;

  tambahData = {
    nama: '',
    serial: '',
    lokasi: '',
    ip: '',
    port: '',
    finger: false,
    kartu: false,
    wajah: false,
    status: true,
  };
  lokasi: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { name: string; data: any },
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
        this.tambahData = data.data;
        break;
    }

    api.getData('ms_lokasi/').subscribe((res: any) => {
      this.lokasi = res;
      this.isTambah ? (this.tambahData.lokasi = res[0].inisial) : null;
    });
  }

  ngOnInit(): void {}

  throwResult() {
    this.api.throwData(this.tambahData);
  }
}
