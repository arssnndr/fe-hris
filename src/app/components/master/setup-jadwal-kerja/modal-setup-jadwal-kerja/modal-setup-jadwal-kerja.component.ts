import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { ApiService } from 'src/app/shared/api.service';
moment.locale('id');

interface UpdateJamKerja {
  id_jadwalkerja: string;
  tgl: string;
  hari: string;
  in: string;
  out: string;
  mulai_istirahat: string;
  selesai_istirahat: string;
  total_jam_kerja: number;
}

@Component({
  selector: 'app-modal-setup-jadwal-kerja',
  templateUrl: './modal-setup-jadwal-kerja.component.html',
  styleUrls: ['./modal-setup-jadwal-kerja.component.css'],
})
export class ModalSetupJadwalKerjaComponent implements OnInit {
  editDetail = false;
  table = 'trx_jadwalkerja/';
  allData = this.data.data.all;
  jadwalKerja!: any;
  jamKerja = this.data.data.dataJadwalKerja;
  idJadwalKerja = this.data.data.dataJadwalKerja.id_jadwalkerja;
  updateJamKerja: UpdateJamKerja = this.jamKerja;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { name: string; data: any },
    private api: ApiService
  ) {
    if (data.name === 'editDetail') {
      this.editDetail = true;
    }
  }

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData() {
    this.api.getData(this.table).subscribe((res) => {
      this.jadwalKerja = res;
    });
  }

  filter() {
    this.jadwalKerja.filter((res: any) => {
      if (res.id === this.idJadwalKerja) {
        this.jamKerja = res;
      }
    });
    this.updateJamKerja = {
      id_jadwalkerja: this.jamKerja.id,
      tgl: this.data.data.dataJadwalKerja.tgl,
      hari: this.data.data.dataJadwalKerja.hari,
      in: this.jamKerja.in,
      out: this.jamKerja.out,
      mulai_istirahat: this.jamKerja.mulai_istirahat,
      selesai_istirahat: this.jamKerja.selesai_istirahat,
      total_jam_kerja: this.jamKerja.total_jam_kerja,
    };
  }

  dateFormat(date: any) {
    return moment(date, 'DD-MM-YYYY').format('DD MMM YYYY');
  }

  throwResult() {
    this.allData.jadwal_kerja[this.data.data.indexJadwalKerja] =
      this.updateJamKerja;
    this.api.throwData(this.allData);
  }
}
