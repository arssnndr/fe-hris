import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-modal-setup-mesin-finger',
  templateUrl: './modal-setup-mesin-finger.component.html',
  styleUrls: ['./modal-setup-mesin-finger.component.css'],
})
export class ModalSetupMesinFingerComponent implements OnInit {
  isKaryawan: string = 'semuaKaryawan';
  isSemuaKaryawan: boolean = false;

  data = { lokasi: '', mesin: { nama: '', ip: '', lokasi: '' } };

  tableKaryawan = 'ms_karyawan/';
  dataKaryawan!: any[];

  tableMesin = 'ms_mesinfinger/';
  mesin: any[] = [];

  tableLokasi = 'ms_lokasi/';
  lokasi: any[] = [];

  tarik: string = 'log';
  funcTarik() {
    this.tarik === 'finger' ? (this.isFinger = true) : (this.isFinger = false);
  }

  isFinger: boolean = false;
  finger: string = 'tarik';

  delSing!: string;

  constructor(public api: ApiService) {
    api.getData(this.tableLokasi).subscribe((res: any) => {
      this.data.lokasi = res[0].inisial;
      this.lokasi = [];
      res.map((value: any) => {
        this.lokasi.push(value.inisial);
      });
    });
    api.getData(this.tableMesin).subscribe((res: any) => {
      this.data.mesin = {
        nama: res[0].nama,
        ip: res[0].ip,
        lokasi: res[0].lokasi,
      };
      this.mesin = [];
      res.map((value: any) => {
        this.mesin.push({
          nama: value.nama,
          ip: value.ip,
          lokasi: value.lokasi,
        });
      });
    });
    api.getData(this.tableKaryawan).subscribe((res: any) => {
      this.dataKaryawan = res;
    });
  }

  ngOnInit(): void {
    this.changeKaryawan();
  }

  changeKaryawan() {
    this.isKaryawan === 'karyawan'
      ? (this.isSemuaKaryawan = false)
      : (this.isSemuaKaryawan = true);
  }

  throwResult() {}
}
