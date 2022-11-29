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
  isTambah = true;
  isDelete = false;
  isDepartemen = false;
  isSubDepartemen = false;

  jenisValue = '';
  lokasiValue = '';
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
    @Inject(MAT_DIALOG_DATA) public data: { name: string }
  ) {}

  ngOnInit(): void {
    if (this.data.name === 'tambah') {
      this.isTambah = true;
      this.isDelete = false;
    } else if (this.data.name === 'delete') {
      this.isTambah = false;
      this.isDelete = true;
    }
  }

  throwResult() {
    this.divisiValue === ''
      ? (this.forUplink = this.departemenValue)
      : (this.forUplink = this.divisiValue);
    this.bagiankerja = {
      jenis_bagian: this.jenisValue,
      // id_lokasi: this.lokasiValue,
      id_lokasi: Math.floor(Math.random() * 300 + 1),
      uplink: this.forUplink,
      keterangan: this.deskripsiValue,
    };
    this.api.throwData(this.bagiankerja);
  }
}
