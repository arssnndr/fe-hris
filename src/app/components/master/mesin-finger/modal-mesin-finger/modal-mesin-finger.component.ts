import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modal-mesin-finger',
  templateUrl: './modal-mesin-finger.component.html',
  styleUrls: ['./modal-mesin-finger.component.css'],
})
export class ModalMesinFingerComponent {
  akses = this.api.akses.role_mesin_finger.edit;

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

  constructor(@Inject(MAT_DIALOG_DATA) data: any, private api: ApiService) {
    api.getData(environment.tabelLokasi).subscribe((res) => {
      this.lokasi.push(...res.map((val: any) => val.inisial));
    });

    this.tambahData.lokasi = this.lokasi[0];

    if (data != null) this.tambahData = data;
  }
}
