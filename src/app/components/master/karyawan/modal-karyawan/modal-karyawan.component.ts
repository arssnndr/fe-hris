import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-modal-karyawan',
  templateUrl: './modal-karyawan.component.html',
  styleUrls: ['./modal-karyawan.component.css'],
})
export class ModalKaryawanComponent implements OnInit {
  isTambah = false;
  isDelete = false;
  isEdit = false;
  isFilter = false;

  tableLokasi: string = 'ms_lokasi/';
  dataLokasi: any[] = [''];

  tablePerusahaan: string = 'ms_perusahaan/';
  dataPerusahaan: any[] = [''];

  tableBagianKerja: string = 'ms_bagiankerja/';
  dataBagianKerja: any[] = [''];

  filter = {
    lokasi: '',
    divisi: '',
    departemen: '',
    subDepartemen: '',
    perusahaan: '',
  };

  constructor(
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: { name: string; data: any }
  ) {
    switch (data.name) {
      case 'tambah':
        this.isTambah = true;
        break;
      case 'edit':
        this.isEdit = true;
        break;
      case 'delete':
        this.isDelete = true;
        break;
      case 'filter':
        this.isFilter = true;

        if (data.data !== undefined) {
          this.filter = data.data;
        }
        api.getData(this.tableLokasi).subscribe((res) => {
          this.dataLokasi = res;
        });

        api.getData(this.tablePerusahaan).subscribe((res) => {
          this.dataPerusahaan = res;
        });

        api.getData(this.tableBagianKerja).subscribe((res) => {
          this.dataBagianKerja = res;
        });
        break;
    }
  }

  ngOnInit(): void {}
}
