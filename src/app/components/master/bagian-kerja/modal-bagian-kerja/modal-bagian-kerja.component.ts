import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modal-bagian-kerja',
  templateUrl: './modal-bagian-kerja.component.html',
  styleUrls: ['./modal-bagian-kerja.component.css'],
})
export class ModalBagianKerjaComponent implements OnInit {
  akses = this.api.akses.role_bagian_kerja.edit;

  jenis = ['Divisi', 'Departemen', 'Sub Departemen'];
  lokasi = ['TMS HO', 'TMS 1', 'TMS 2', 'TMS 3', 'TMS 4'];
  divisi = ['IT', 'GA', 'Finance'];
  departemen = ['SAT', 'IT Support', 'Jaringan'];

  bagianKerja = {
    jenis_bagian: '',
    lokasi: '',
    divisi: '',
    departemen: '',
    sub_departemen: '',
  };

  isBlur = false;
  isDivisi = false;
  isDepartemen = false;

  constructor(
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) data: any,
    private dialogRef: MatDialogRef<ModalBagianKerjaComponent>
  ) {
    if (data !== null) {
      this.bagianKerja = data;
      this.changeBagianKerja();
    } else {
      this.bagianKerja.jenis_bagian = this.jenis[0];
      this.bagianKerja.lokasi = this.lokasi[0];
    }
  }

  ngOnInit(): void {}

  changeBagianKerja() {
    switch (this.bagianKerja.jenis_bagian) {
      case this.jenis[0]:
        this.isDivisi = false;
        this.bagianKerja.divisi = '';

        this.isDepartemen = false;
        this.bagianKerja.departemen = '';
        break;
      case this.jenis[1]:
        this.isDivisi = true;
        this.bagianKerja.divisi = this.divisi[0];

        this.isDepartemen = false;
        this.bagianKerja.departemen = '';
        break;
      case this.jenis[2]:
        this.isDivisi = false;
        this.bagianKerja.divisi = '';

        this.isDepartemen = true;
        this.bagianKerja.departemen = this.departemen[0];
        break;
    }
  }

  actionSimpan() {
    this.bagianKerja.sub_departemen.length < 2
      ? (this.isBlur = true)
      : this.api.getData(environment.tabelBagianKerja).subscribe((result) => {
          let isAlert;

          for (let value of result) {
            if (
              value.jenis_bagian === this.bagianKerja.jenis_bagian &&
              value.lokasi === this.bagianKerja.lokasi &&
              value.sub_departemen === this.bagianKerja.sub_departemen
            ) {
              isAlert = true;
              break;
            } else {
              isAlert = false;
            }
          }

          if (isAlert) {
            window.alert('Nama sudah ada');
          } else {
            this.dialogRef.close(this.bagianKerja);
          }
        });
  }
}
