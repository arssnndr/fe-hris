import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/api.service';

import * as moment from 'moment';
moment.locale('id');

@Component({
  selector: 'app-modal-setup-jadwal-kerja',
  templateUrl: './modal-setup-jadwal-kerja.component.html',
  styleUrls: ['./modal-setup-jadwal-kerja.component.css'],
})
export class ModalSetupJadwalKerjaComponent implements OnInit {
  editDetail = false;
  tambahCategory = false;
  deleteCategory = false;
  editCategory = false;
  tambahIndividu = false;
  deleteIndividu = false;
  editIndividu = false;

  tableJadwalKerja = 'trx_jadwalkerja';
  allJadwalKerja!: any;
  selectedJadwalKerja!: any;

  tableBagianKerja = 'ms_bagiankerja';
  allBagianKerja!: any;

  tableKaryawan = 'ms_karyawan/';
  dataKaryawan!: any;
  filteredKaryawan: any[] = [];

  dataForUploadCategory: any = {
    lokasi: '',
    divisi: '',
    departemen: '',
    sub_departemen: '',
    jadwal_kerja: [],
  };

  dataForUploadIndividu: any = {
    nip: '',
    nama_lengkap: '',
    departemen: '',
    perusahaan: '',
    dari: moment().format('YYYY-MM-DD'),
    sampai: '',
    jadwal_kerja: [],
  };

  minggu: any[] = [
    {
      hari: 'Senin',
      id_jadwal_kerja: '',
      masuk: '',
      keluar: '',
      mulai_istirahat: '',
      selesai_istirahat: '',
      total: 0,
    },
    {
      hari: 'Selasa',
      id_jadwal_kerja: '',
      masuk: '',
      keluar: '',
      mulai_istirahat: '',
      selesai_istirahat: '',
      total: 0,
    },
    {
      hari: 'Rabu',
      id_jadwal_kerja: '',
      masuk: '',
      keluar: '',
      mulai_istirahat: '',
      selesai_istirahat: '',
      total: 0,
    },
    {
      hari: 'Kamis',
      id_jadwal_kerja: '',
      masuk: '',
      keluar: '',
      mulai_istirahat: '',
      selesai_istirahat: '',
      total: 0,
    },
    {
      hari: 'Jumat',
      id_jadwal_kerja: '',
      masuk: '',
      keluar: '',
      mulai_istirahat: '',
      selesai_istirahat: '',
      total: 0,
    },
    {
      hari: 'Sabtu',
      id_jadwal_kerja: '',
      masuk: '',
      keluar: '',
      mulai_istirahat: '',
      selesai_istirahat: '',
      total: 0,
    },
    {
      hari: 'Minggu',
      id_jadwal_kerja: '',
      masuk: '',
      keluar: '',
      mulai_istirahat: '',
      selesai_istirahat: '',
      total: 0,
    },
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { name: string; data: any },
    private api: ApiService
  ) {
    switch (data.name) {
      case 'editDetail':
        this.editDetail = true;

        this.selectedJadwalKerja =
          data.data.dataProfil.jadwal_kerja[data.data.indexBln][
            data.data.indexTgl
          ];
        break;
      case 'tambahCategory':
        this.tambahCategory = true;
        break;
      case 'deleteCategory':
        this.deleteCategory = true;
        break;
      case 'editCategory':
        this.editCategory = true;
        break;
      case 'tambahIndividu':
        this.tambahIndividu = true;
        break;
      case 'deleteIndividu':
        this.deleteIndividu = true;
        break;
      case 'editIndividu':
        this.editIndividu = true;
        break;
    }
  }

  ngOnInit(): void {
    this.api.getData(this.tableJadwalKerja).subscribe((res) => {
      this.allJadwalKerja = res;

      if (this.tambahCategory || this.tambahIndividu) {
        this.minggu.forEach((ress, index) => {
          [
            this.minggu[index].id_jadwal_kerja,
            this.minggu[index].masuk,
            this.minggu[index].keluar,
            this.minggu[index].mulai_istirahat,
            this.minggu[index].selesai_istirahat,
            this.minggu[index].total,
          ] = [
            res[0].id_jadwal_kerja,
            res[0].masuk,
            res[0].keluar,
            res[0].mulai_istirahat,
            res[0].selesai_istirahat,
            res[0].total,
          ];
        });
      } else if (this.editCategory || this.editIndividu) {
        this.minggu.forEach((ress, index) => {
          this.minggu[index] = this.data.data.jadwal_kerja[index];
        });
      }
    });

    this.api.getData(this.tableBagianKerja).subscribe((res) => {
      this.allBagianKerja = res;
      [
        this.dataForUploadCategory.lokasi,
        this.dataForUploadCategory.divisi,
        this.dataForUploadCategory.departemen,
        this.dataForUploadCategory.sub_departemen,
      ] = [
        res[0].lokasi,
        res[0].divisi,
        res[0].departemen,
        res[0].sub_departemen,
      ];
    });

    this.api.getData(this.tableKaryawan).subscribe((res) => {
      this.dataKaryawan = res;
    });
  }

  selectJadwalKerja() {
    this.allJadwalKerja.map((res: any) => {
      if (this.editDetail) {
        if (
          res.id_jadwal_kerja ===
          this.data.data.dataProfil.jadwal_kerja[this.data.data.indexBln][
            this.data.data.indexTgl
          ].id_jadwal_kerja
        ) {
          this.selectedJadwalKerja = res;
          this.data.data.dataProfil.jadwal_kerja[this.data.data.indexBln][
            this.data.data.indexTgl
          ].masuk = res.masuk;
          this.data.data.dataProfil.jadwal_kerja[this.data.data.indexBln][
            this.data.data.indexTgl
          ].keluar = res.keluar;
          this.data.data.dataProfil.jadwal_kerja[this.data.data.indexBln][
            this.data.data.indexTgl
          ].mulai_istirahat = res.mulai_istirahat;
          this.data.data.dataProfil.jadwal_kerja[this.data.data.indexBln][
            this.data.data.indexTgl
          ].selesai_istirahat = res.selesai_istirahat;
          this.data.data.dataProfil.jadwal_kerja[this.data.data.indexBln][
            this.data.data.indexTgl
          ].total = res.total;
        }
      } else {
        this.minggu.forEach((ress, index) => {
          if (res.id_jadwal_kerja === this.minggu[index].id_jadwal_kerja) {
            [
              this.minggu[index].masuk,
              this.minggu[index].keluar,
              this.minggu[index].mulai_istirahat,
              this.minggu[index].selesai_istirahat,
              this.minggu[index].total,
            ] = [
              res.masuk,
              res.keluar,
              res.mulai_istirahat,
              res.selesai_istirahat,
              res.total,
            ];
          }
        });
      }
    });
  }

  dateFormat(date: any) {
    return moment(date, 'DD-MM-YYYY').format('DD MMM YYYY');
  }

  filterNip() {
    this.filteredKaryawan = [];
    this.dataKaryawan.map((res: any) => {
      if (res.nip.includes(this.dataForUploadIndividu.nip)) {
        this.filteredKaryawan.push(res);
      }
    });
  }

  selectNip(data: any) {
    [
      this.dataForUploadIndividu.nip,
      this.dataForUploadIndividu.nama_lengkap,
      this.dataForUploadIndividu.departemen,
      this.dataForUploadIndividu.perusahaan,
    ] = [data.nip, data.nama_lengkap, data.departemen, data.perusahaan];
  }

  throwResult() {
    if (this.editDetail) {
      this.api.throwData(this.data.data.dataProfil);
    } else if (this.tambahCategory) {
      this.dataForUploadCategory.jadwal_kerja = this.minggu;
      this.api.throwData(this.dataForUploadCategory);
    } else if (this.editCategory) {
      this.data.data.jadwal_kerja = this.minggu;
      this.api.throwData(this.data.data);
    } else if (this.tambahIndividu) {
      this.dataForUploadIndividu.jadwal_kerja = this.minggu;
      this.api.throwData(this.dataForUploadIndividu);
    } else if (this.editIndividu) {
      this.data.data.jadwal_kerja = this.minggu;
      this.api.throwData(this.data.data);
    }
  }
}
