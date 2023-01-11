import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-modal-setup-mesin-finger',
  templateUrl: './modal-setup-mesin-finger.component.html',
  styleUrls: ['./modal-setup-mesin-finger.component.css'],
})
export class ModalSetupMesinFingerComponent implements OnInit {
  isKaryawan: string = 'semuaKaryawan';
  isSemuaKaryawan: boolean = true;

  data = { lokasi: '', mesin: { nama: '', ip: '', lokasi: '' } };

  tableKaryawan = 'ms_karyawan/';
  dataKaryawan!: any[];
  nip!: string;
  filteredKaryawan!: any[];
  selectedKaryawan: any[] = [
    {
      nip: '',
      nama_lengkap: '',
      lokasi: '',
      departemen: '',
    },
  ];

  tableMesin = 'ms_mesinfinger/';
  mesin: any[] = [];

  tableLokasi = 'ms_lokasi/';
  lokasi: any[] = [];

  tarik: string = 'log';
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

  funcTarik() {
    this.tarik === 'finger' ? (this.isFinger = true) : (this.isFinger = false);
  }

  searchNip() {
    this.filteredKaryawan = [];
    this.dataKaryawan.filter((res: any) => {
      if (res.nip.includes(this.nip)) {
        this.filteredKaryawan.push(res);
      }
    });
  }

  selectKaryawan(data: any) {
    if (
      this.selectedKaryawan[0] === undefined ||
      this.selectedKaryawan[0].nip === ''
    ) {
      this.selectedKaryawan = [];
    }
    this.selectedKaryawan.push(data);
  }

  deleteKaryawan(index: number) {
    this.selectedKaryawan.splice(index, 1);
  }

  throwResult() {
    this.api.throwData(this.data);
  }
}
