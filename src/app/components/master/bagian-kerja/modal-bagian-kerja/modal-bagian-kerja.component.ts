import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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

  tabelBagianKerja = 'ms_bagiankerja/';

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

  isBlur = false;

  constructor(
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: { name: string; edit: any },
    private dialogRef: MatDialogRef<ModalBagianKerjaComponent>
  ) {}

  ngOnInit(): void {
    switch (this.data.name) {
      case 'tambah':
        this.isTambah = true;

        this.jenisValue = this.jenis[0].value;
        this.lokasiValue = this.lokasi[0].value;
        this.divisiValue = this.divisi[0].value;
        this.departemenValue = this.departemen[0].value;
        break;
      case 'delete':
        this.isDelete = true;
        break;
      case 'edit':
        this.isEdit = true;

        this.jenisValue = this.data.edit.jenis_bagian;
        this.lokasiValue = this.data.edit.lokasi;
        this.divisiValue = this.data.edit.divisi;
        this.departemenValue = this.data.edit.departemen;
        this.subDepartemenValue = this.data.edit.sub_departemen;
        break;
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
    this.api.getData(this.tabelBagianKerja).subscribe((res) => {
      let isAlert;
      for (let val of res) {
        if (
          val.lokasi === this.lokasiValue &&
          val.sub_departemen === this.subDepartemenValue
        ) {
          isAlert = true;
          break;
        } else {
          isAlert = false;
        }
      }
      if (isAlert) {
        window.alert('Nama sudah ada.');
      } else {
        this.api.throwData(this.bagiankerja);
        this.dialogRef.close('simpan');
      }
    });
  }
}
