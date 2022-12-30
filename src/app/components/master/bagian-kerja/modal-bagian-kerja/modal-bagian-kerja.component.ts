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
  lokasiValue = '';
  divisiValue = '';
  departemenValue = '';
  subDepartemenValue = '';

  jenis = [
    { value: 'Divisi' },
    { value: 'Departemen' },
    { value: 'Sub Departemen' },
  ];

  lokasi = [
    { value: 'TMS HO' },
    { value: 'TMS 1' },
    { value: 'TMS 2' },
    { value: 'TMS 3' },
    { value: 'TMS 4' },
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

      this.jenisValue = this.jenis[0].value;
      this.lokasiValue = this.lokasi[0].value;
      this.divisiValue = this.divisi[0].value;
      this.departemenValue = this.departemen[0].value;
    } else if (this.data.name === 'delete') {
      this.isTambah = false;
      this.isDelete = true;
      this.isEdit = false;
    } else if (this.data.name === 'edit') {
      this.isTambah = false;
      this.isDelete = false;
      this.isEdit = true;

      this.jenisValue = this.data.edit.jenis_bagian;
      this.lokasiValue = this.data.edit.lokasi;
      this.subDepartemenValue = this.data.edit.sub_departemen;
    }
  }

  onKey(event: any) {
    this.subDepartemenValue = event.value;
  }

  throwResult() {
    this.bagiankerja = {
      jenis_bagian: this.jenisValue,
      lokasi: this.lokasiValue,
      divisi: this.divisiValue,
      departemen: this.departemenValue,
      sub_departemen: this.subDepartemenValue,
    };
    this.api.throwData(this.bagiankerja);
  }
}
