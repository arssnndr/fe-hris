import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-modal-setup-jadwal-kerja-individu',
  templateUrl: './modal-setup-jadwal-kerja-individu.component.html',
  styleUrls: ['./modal-setup-jadwal-kerja-individu.component.css'],
})
export class ModalSetupJadwalKerjaIndividuComponent {
  akses = this.api.akses.role_setup_jadwal_kerja.edit;

  constructor(private api: ApiService, @Inject(MAT_DIALOG_DATA) data: any) {
    if (data !== null) {
      this.dataJadwalKerjaIndividu = data;

      data.jadwal_kerja.forEach((res: any, index: number) => {
        this.tabelContents[index].jamKerja = res.masuk + ' - ' + res.keluar;
        this.tabelContents[index].jamIstirahat =
          res.start_break + ' - ' + res.end_break;
        this.tabelContents[index].total = res.total;
      });
    }
    api.getData(this.tabelJadwalKerja).subscribe((res) => {
      this.dataIdJadwalKerja.push('OFF');
      this.dataIdJadwalKerja.push(
        ...res.map((val: any) => val.id_jadwal_kerja)
      );
    });
  }

  dataJadwalKerjaIndividu = {
    nip: '',
    nama_lengkap: '',
    departemen: '',
    perusahaan: '',
    dari: '',
    sampai: '',
    jadwal_kerja: [
      {
        hari: 'Senin',
        id_jadwal_kerja: '',
        masuk: '',
        keluar: '',
        start_break: '',
        end_break: '',
        total: 0,
      },
      {
        hari: 'Selasa',
        id_jadwal_kerja: '',
        masuk: '',
        keluar: '',
        start_break: '',
        end_break: '',
        total: 0,
      },
      {
        hari: 'Rabu',
        id_jadwal_kerja: '',
        masuk: '',
        keluar: '',
        start_break: '',
        end_break: '',
        total: 0,
      },
      {
        hari: 'Kamis',
        id_jadwal_kerja: '',
        masuk: '',
        keluar: '',
        start_break: '',
        end_break: '',
        total: 0,
      },
      {
        hari: 'Jumat',
        id_jadwal_kerja: '',
        masuk: '',
        keluar: '',
        start_break: '',
        end_break: '',
        total: 0,
      },
      {
        hari: 'Sabtu',
        id_jadwal_kerja: '',
        masuk: '',
        keluar: '',
        start_break: '',
        end_break: '',
        total: 0,
      },
      {
        hari: 'Minggu',
        id_jadwal_kerja: '',
        masuk: '',
        keluar: '',
        start_break: '',
        end_break: '',
        total: 0,
      },
    ],
  };

  tabelKaryawan = 'ms_karyawan/';
  filteredKaryawan: any[] = [];
  selectedKaryawan: any;

  tabelJadwalKerja = 'trx_jadwalkerja/';
  dataIdJadwalKerja: any[] = [];

  tabelContents = [
    { hari: 'Senin', jamKerja: '', jamIstirahat: '', total: '' },
    { hari: 'Selasa', jamKerja: '', jamIstirahat: '', total: '' },
    { hari: 'Rabu', jamKerja: '', jamIstirahat: '', total: '' },
    { hari: 'Kamis', jamKerja: '', jamIstirahat: '', total: '' },
    { hari: 'Jumat', jamKerja: '', jamIstirahat: '', total: '' },
    { hari: 'Sabtu', jamKerja: '', jamIstirahat: '', total: '' },
    { hari: 'Minggu', jamKerja: '', jamIstirahat: '', total: '' },
  ];

  filterKaryawan(nip: any) {
    this.api
      .getData(this.tabelKaryawan + '?nip_like=' + nip.value)
      .subscribe((res) => (this.filteredKaryawan = res));
  }

  selectKaryawan(data: any) {
    this.dataJadwalKerjaIndividu.nip = data.nip;
    this.dataJadwalKerjaIndividu.nama_lengkap = data.nama_lengkap;
    this.dataJadwalKerjaIndividu.departemen = data.departemen;
    this.dataJadwalKerjaIndividu.perusahaan = data.perusahaan;
  }

  cehckUndefined(data: any) {
    let result;
    data === undefined ? (result = '') : (result = data);
    return result;
  }

  change(idJadwalKerja: any, hari: string) {
    idJadwalKerja = idJadwalKerja.value;
    this.api
      .getData(this.tabelJadwalKerja + '?id_jadwal_kerja_like=' + idJadwalKerja)
      .subscribe((res) => {
        res = res[0];
        this.dataJadwalKerjaIndividu.jadwal_kerja.forEach(
          (val: any, index: number) => {
            if (val.hari === hari) {
              this.dataJadwalKerjaIndividu.jadwal_kerja[index].id_jadwal_kerja =
                this.cehckUndefined(res?.id_jadwal_kerja);

              this.dataJadwalKerjaIndividu.jadwal_kerja[index].masuk =
                this.cehckUndefined(res?.masuk);
              this.dataJadwalKerjaIndividu.jadwal_kerja[index].keluar =
                this.cehckUndefined(res?.keluar);
              this.tabelContents[index].jamKerja =
                this.cehckUndefined(res?.masuk) +
                ' - ' +
                this.cehckUndefined(res?.keluar);

              this.dataJadwalKerjaIndividu.jadwal_kerja[index].start_break =
                this.cehckUndefined(res?.start_break);
              this.dataJadwalKerjaIndividu.jadwal_kerja[index].end_break =
                this.cehckUndefined(res?.end_break);
              this.tabelContents[index].jamIstirahat =
                this.cehckUndefined(res?.start_break) +
                ' - ' +
                this.cehckUndefined(res?.end_break);

              this.dataJadwalKerjaIndividu.jadwal_kerja[index].total =
                this.cehckUndefined(res?.total);
              this.tabelContents[index].total = this.cehckUndefined(res?.total);
            }
          }
        );
      });
  }
}
