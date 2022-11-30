import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/api.service';
import { BagianKerja } from '../../../../interfaces/bagian-kerja';

@Component({
  selector: 'app-modal-bagian-kerja',
  templateUrl: './modal-bagian-kerja.component.html',
  styleUrls: ['./modal-bagian-kerja.component.css'],
})
export class ModalBagianKerjaComponent implements OnInit {
  isTambah = false;
  isDelete = false;
  isEdit = false;
  isDepartemen = false;
  isSubDepartemen = false;

  jenisValue = '';
  lokasiValue = 0;
  divisiValue = '';
  departemenValue = '';
  deskripsiValue = '';
  forUplink = '';

  jenis = [
    { value: 'Divisi' },
    { value: 'Departemen' },
    { value: 'Sub Departemen' },
  ];

  lokasi = [
    { value: 'The Master Steel HO' },
    { value: 'The Master Steel 1' },
    { value: 'The Master Steel 2' },
    { value: 'The Master Steel 3' },
  ];

  divisi = [{ value: 'IT' }, { value: 'GA' }, { value: 'Finance' }];

  departemen = [
    { value: 'SAT' },
    { value: 'IT Support' },
    { value: 'Jaringan' },
  ];

  bagiankerja: BagianKerja | undefined;

  constructor(
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: { name: string; edit: any }
  ) {}

  ngOnInit(): void {
    if (this.data.name === 'tambah') {
      this.isTambah = true;
      this.isDelete = false;
      this.isEdit = false;
    } else if (this.data.name === 'delete') {
      this.isTambah = false;
      this.isDelete = true;
      this.isEdit = false;
    } else if (this.data.name === 'edit') {
      this.isTambah = false;
      this.isDelete = false;
      this.isEdit = true;

      this.jenisValue = this.data.edit.jenis_bagian;
      this.lokasiValue = this.data.edit.id_lokasi;
      this.forUplink = this.data.edit.uplink;

      // // get lokasi name from id lokasi
      // this.api
      //   .getData('ms_lokasi/' + this.data.edit.id_lokasi)
      //   .subscribe((res) => {
      //     this.lokasiValue = res.inisial_lokasi;
      //   });
    }
  }

  onKey(event: any) {
    this.deskripsiValue = event.value;
  }

  throwResult() {
    if (this.data.name === 'tambah') {
      this.divisiValue === ''
        ? (this.forUplink = this.departemenValue)
        : (this.forUplink = this.divisiValue);
    }
    this.bagiankerja = {
      jenis_bagian: this.jenisValue,
      id_lokasi: this.lokasiValue,
      // id_lokasi: Math.floor(Math.random() * 300 + 1),
      uplink: this.forUplink,
      keterangan: this.deskripsiValue,
    };
    if (this.data.name === 'edit') {
      this.api.throwData({ data: this.bagiankerja, id: this.data.edit.id });
    } else {
      this.api.throwData(this.bagiankerja);
    }
  }
}
