import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-modal-status-kehadiran',
  templateUrl: './modal-status-kehadiran.component.html',
  styleUrls: ['./modal-status-kehadiran.component.css'],
})
export class ModalStatusKehadiranComponent implements OnInit {
  isTambah: boolean = false;

  dataForUpload = {
    nip: '',
    nama_lengkap: '',
    cuti: {},
    keterangan: '',
  };

  tableKaryawan: string = 'ms_karyawan/';
  allKaryawan: any[] = [];
  filteredKaryawan: any[] = [];

  cuti: any[] = ['Cuti Tahunan', 'Cuti Khusus', 'Izin', 'Perjalanan Dinas'];
  selectedCuti: string = this.cuti[0];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { name: string; data: any },
    private api: ApiService
  ) {
    api.getData(this.tableKaryawan).subscribe((res) => {
      this.allKaryawan = res;
    });

    switch (data.name) {
      case 'tambah':
        this.isTambah = true;
        break;
    }
  }

  ngOnInit(): void {}

  searchNip() {
    this.filteredKaryawan = [];
    this.allKaryawan.filter((res) => {
      if (res.nip.includes(this.dataForUpload.nip)) {
        this.filteredKaryawan.push(res);
      }
    });
  }

  selectNip(data: any) {
    this.dataForUpload.nip = data.nip;
    this.dataForUpload.nama_lengkap = data.nama_lengkap;
  }

  changeStatus() {
    switch (this.selectedCuti) {
      case this.cuti[0]:
        console.log('tahunan');
        break;
      case this.cuti[1]:
        console.log('khusus');
        break;
      case this.cuti[2]:
        console.log('izin');
        break;
      case this.cuti[3]:
        console.log('dinas');
        break;
    }
  }

  throwResult() {
    console.log(this.selectedCuti);
    this.api.throwData(this.dataForUpload);
  }
}
