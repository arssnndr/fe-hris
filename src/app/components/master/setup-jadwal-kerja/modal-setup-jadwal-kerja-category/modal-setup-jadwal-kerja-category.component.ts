import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-modal-setup-jadwal-kerja-category',
  templateUrl: './modal-setup-jadwal-kerja-category.component.html',
  styleUrls: ['./modal-setup-jadwal-kerja-category.component.css'],
})
export class ModalSetupJadwalKerjaCategoryComponent {
  akses = this.api.akses.role_setup_jadwal_kerja.edit;
  isData = false;
  data: any;

  constructor(private api: ApiService, @Inject(MAT_DIALOG_DATA) data: any) {
    if (data != null) {
      this.isData = true;
      this.data = data;
    } else {
      this.isData = false;
    }

    api.getData(this.tabelBagianKerja).subscribe((res) => {
      let temp: any;
      this.formTambahJadwalKerja.forEach((val: any, index: number) => {
        switch (val.id) {
          case 'lokasi':
            temp = [];
            temp.push(...new Set(res.map((ress: any) => ress.lokasi)));
            temp = temp.filter((value: any) => value != '').sort();
            temp.splice(0, 0, 'Pilih lokasi..');
            this.formTambahJadwalKerja[index].value = temp;
            data !== null
              ? (this.setData.lokasi = data.lokasi)
              : (this.setData.lokasi = temp[0]);
            break;
          case 'divisi':
            temp = [];
            temp.push(...new Set(res.map((ress: any) => ress.divisi)));
            temp = temp.filter((value: any) => value != '').sort();
            temp.splice(0, 0, 'Pilih divisi..');
            this.formTambahJadwalKerja[index].value = temp;
            data !== null
              ? (this.setData.divisi = data.divisi)
              : (this.setData.divisi = temp[0]);
            break;
          case 'departemen':
            temp = [];
            temp.push(...new Set(res.map((ress: any) => ress.departemen)));
            temp = temp.filter((value: any) => value != '').sort();
            temp.splice(0, 0, 'Pilih departemen..');
            this.formTambahJadwalKerja[index].value = temp;
            data !== null
              ? (this.setData.departemen = data.departemen)
              : (this.setData.departemen = temp[0]);
            break;
          case 'sub_departemen':
            temp = [];
            temp.push(...new Set(res.map((ress: any) => ress.sub_departemen)));
            temp = temp.filter((value: any) => value != '').sort();
            temp.splice(0, 0, 'Pilih sub departemen..');
            this.formTambahJadwalKerja[index].value = temp;
            data !== null
              ? (this.setData.sub_departemen = data.sub_departemen)
              : (this.setData.sub_departemen = temp[0]);
            break;
        }
      });
    });

    api.getData(this.tabelJadwalKerja).subscribe((res) => {
      this.dataJadwalKerja = res;

      this.dataIdJadwalKerja.push('OFF');
      this.dataIdJadwalKerja.push(
        ...new Set(res.map((ress: any) => ress.id_jadwal_kerja))
      );
    });

    if (data !== null) {
      this.setData = data;
      this.tabelContents.forEach((res: any, index: number) => {
        const tmp = data.jadwal_kerja[index];
        this.tabelContents[index].jamKerja = tmp.masuk + ' - ' + tmp.keluar;
        this.tabelContents[index].jamIstirahat =
          tmp.start_break + ' - ' + tmp.end_break;
        this.tabelContents[index].total = tmp.total;
      });
    }
  }

  tabelBagianKerja = 'ms_bagiankerja/';
  tabelJadwalKerja = 'trx_jadwalkerja/';
  dataJadwalKerja: any[] = [];
  dataIdJadwalKerja: any[] = [];

  formTambahJadwalKerja = [
    { id: 'lokasi', label: 'Lokasi', value: [''] },
    { id: 'divisi', label: 'Divisi', value: [''] },
    { id: 'departemen', label: 'Departemen', value: [''] },
    { id: 'sub_departemen', label: 'Sub Departemen', value: [''] },
  ];

  tabelContents = [
    { hari: 'Senin', jamKerja: '', jamIstirahat: '', total: '' },
    { hari: 'Selasa', jamKerja: '', jamIstirahat: '', total: '' },
    { hari: 'Rabu', jamKerja: '', jamIstirahat: '', total: '' },
    { hari: 'Kamis', jamKerja: '', jamIstirahat: '', total: '' },
    { hari: 'Jumat', jamKerja: '', jamIstirahat: '', total: '' },
    { hari: 'Sabtu', jamKerja: '', jamIstirahat: '', total: '' },
    { hari: 'Minggu', jamKerja: '', jamIstirahat: '', total: '' },
  ];

  setData: any = {
    lokasi: '',
    divisi: '',
    departemen: '',
    sub_departemen: '',
    jadwal_kerja: [
      {
        hari: 'Senin',
        id_jadwal_kerja: 'OFF',
        masuk: '',
        keluar: '',
        start_break: '',
        end_break: '',
        total: 0,
      },
      {
        hari: 'Selasa',
        id_jadwal_kerja: 'OFF',
        masuk: '',
        keluar: '',
        start_break: '',
        end_break: '',
        total: 0,
      },
      {
        hari: 'Rabu',
        id_jadwal_kerja: 'OFF',
        masuk: '',
        keluar: '',
        start_break: '',
        end_break: '',
        total: 0,
      },
      {
        hari: 'Kamis',
        id_jadwal_kerja: 'OFF',
        masuk: '',
        keluar: '',
        start_break: '',
        end_break: '',
        total: 0,
      },
      {
        hari: 'Jumat',
        id_jadwal_kerja: 'OFF',
        masuk: '',
        keluar: '',
        start_break: '',
        end_break: '',
        total: 0,
      },
      {
        hari: 'Sabtu',
        id_jadwal_kerja: 'OFF',
        masuk: '',
        keluar: '',
        start_break: '',
        end_break: '',
        total: 0,
      },
      {
        hari: 'Minggu',
        id_jadwal_kerja: 'OFF',
        masuk: '',
        keluar: '',
        start_break: '',
        end_break: '',
        total: 0,
      },
    ],
  };

  selectIdChange(data: any, id: string) {
    if (data.value === 'OFF') {
      this.setData.jadwal_kerja.forEach((val: any, index: number) => {
        if (id === val.hari) {
          this.setData.jadwal_kerja[index].id_jadwal_kerja = 'OFF';
          this.setData.jadwal_kerja[index].masuk = '';
          this.setData.jadwal_kerja[index].keluar = '';
          this.tabelContents[index].jamKerja = '';

          this.setData.jadwal_kerja[index].start_break = '';
          this.setData.jadwal_kerja[index].end_break = '';
          this.tabelContents[index].jamIstirahat = '';

          this.setData.jadwal_kerja[index].total = '';
          this.tabelContents[index].total = '';
        }
      });
    }
    this.dataJadwalKerja.forEach((res: any) => {
      if (data.value === res.id_jadwal_kerja) {
        this.setData.jadwal_kerja.forEach((val: any, index: number) => {
          if (id === val.hari) {
            this.setData.jadwal_kerja[index].id_jadwal_kerja =
              res.id_jadwal_kerja;
            this.setData.jadwal_kerja[index].masuk = res.masuk;
            this.setData.jadwal_kerja[index].keluar = res.keluar;
            this.tabelContents[index].jamKerja = res.masuk + ' - ' + res.keluar;

            this.setData.jadwal_kerja[index].start_break = res.start_break;
            this.setData.jadwal_kerja[index].end_break = res.end_break;
            this.tabelContents[index].jamIstirahat =
              res.start_break + ' - ' + res.end_break;

            this.setData.jadwal_kerja[index].total = res.total;
            this.tabelContents[index].total = res.total;
          }
        });
      }
    });
  }
}
