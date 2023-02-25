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

  tabelBagianKerja = 'ms_bagiankerja/';

  tambahData: any = {
    tgl: moment().format('YYYY-MM-DD'),
    hari: '',
    keterangan: '',
    lokasi: '',
    divisi: '',
    departemen: '',
    sub_departemen: '',
    potong_cuti: false,
  };

  setForm = [
    { id: 'tgl', form: 'input', type: 'date', label: 'Tanggal' },
    { id: 'keterangan', form: 'input', type: 'text', label: 'Keterangan' },
    { id: 'lokasi', form: 'select', label: 'Lokasi', value: [] },
    { id: 'divisi', form: 'select', label: 'Divisi', value: [] },
    { id: 'departemen', form: 'select', label: 'Departemen', value: [] },
    {
      id: 'sub_departemen',
      form: 'select',
      label: 'Sub Departemen',
      value: [],
    },
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { name: string; data: any },
    api: ApiService
  ) {
    this.getHari();
    api.getData(this.tabelBagianKerja).subscribe((res) => {
      this.setForm.map((val: any) => {
        switch (val.id) {
          case 'lokasi':
            val.value.push(...new Set(res.map((ress: any) => ress.lokasi)));
            this.tambahData.lokasi = val.value[0];
            break;
          case 'divisi':
            val.value.push(...new Set(res.map((ress: any) => ress.divisi)));
            this.tambahData.divisi = val.value[0];
            break;
          case 'departemen':
            val.value.push(...new Set(res.map((ress: any) => ress.departemen)));
            this.tambahData.departemen = val.value[0];
            break;
          case 'sub_departemen':
            val.value.push(
              ...new Set(res.map((ress: any) => ress.sub_departemen))
            );
            this.tambahData.sub_departemen = val.value[0];
            break;
        }
      });
    });

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

    this.getHari();
  }

  ngOnInit(): void {}

  getHari() {
    this.tambahData.hari = moment(this.tambahData.tgl).format('dddd');
  }
}
