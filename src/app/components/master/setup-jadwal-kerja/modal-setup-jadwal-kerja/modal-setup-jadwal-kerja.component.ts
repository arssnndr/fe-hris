import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { ApiService } from 'src/app/shared/api.service';
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
    });
  }

  filterJadwalKerja() {
    this.allJadwalKerja.map((res: any) => {
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
    });
  }

  dateFormat(date: any) {
    return moment(date, 'DD-MM-YYYY').format('DD MMM YYYY');
  }

  throwResult() {
    this.api.throwData(this.data.data.dataProfil);
  }
}
