import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-modal-kalender-kerja',
  templateUrl: './modal-kalender-kerja.component.html',
  styleUrls: ['./modal-kalender-kerja.component.css'],
})
export class ModalKalenderKerjaComponent implements OnInit {
  isDelete = false;
  isTambah = false;
  isEdit = false;

  tambahData = {
    tgl: '',
    hari: '',
    keterangan: '',
    lokasi: '',
    divisi: '',
    departemen: '',
    sub_departemen: '',
    potong_cuti: false,
  };

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
        this.tambahData = {
          tgl: moment().format('YYYY-MM-DD'),
          hari: '',
          keterangan: '',
          lokasi: this.data.data[0].id_lokasi,
          divisi: this.data.data[0].divisi,
          departemen: this.data.data[0].departemen,
          sub_departemen: this.data.data[0].sub_departemen,
          potong_cuti: false,
        };
        break;
      case 'edit':
        this.isEdit = true;
        this.tambahData = data.data.dataEdit;
        break;
    }

    this.getHari();
  }

  ngOnInit(): void {}

  onChange(label: string, data: any) {
    switch (label) {
      case 'lokasi':
        this.tambahData.lokasi = data.value;
        break;
      case 'divisi':
        this.tambahData.divisi = data.value;
        break;
      case 'departemen':
        this.tambahData.departemen = data.value;
        break;
      case 'subDepartemen':
        this.tambahData.sub_departemen = data.value;
        break;
    }
  }

  getHari() {
    this.tambahData.hari = moment(this.tambahData.tgl).format('dddd');
  }

  throwResult() {
    this.api.throwData(this.tambahData);
  }
}
