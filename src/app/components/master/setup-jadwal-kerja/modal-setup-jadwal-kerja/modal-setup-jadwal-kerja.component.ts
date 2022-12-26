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

interface JadwalKerjaCategory {
  id_jadwalkerja: string;
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
  tambahCategory = false;
  deleteCategory = false;
  editCategory = false;
  table = 'trx_jadwalkerja/';
  tableBagiankerja = 'ms_bagiankerja/';
  dataBagianKerja!: any;
  dataEditCategory!: any;
  lokasiValue!: string;
  divisiValue!: string;
  departemenValue!: string;
  subDepartemenValue!: string;
  bagianKerjaFiltered: {
    id_lokasi: string;
    divisi: string;
    departemen: string;
    sub_departemen: string;
    senin: {};
  }[] = [];
  allData!: any;
  jadwalKerja!: any;
  jamKerja!: any;
  idJadwalKerja!: any;
  updateJamKerja!: UpdateJamKerja;
  senin: JadwalKerjaCategory = {
    id_jadwalkerja: '',
    hari: '',
    in: '',
    out: '',
    mulai_istirahat: '',
    selesai_istirahat: '',
    total_jam_kerja: 0,
  };
  selasa: JadwalKerjaCategory = {
    id_jadwalkerja: '',
    hari: '',
    in: '',
    out: '',
    mulai_istirahat: '',
    selesai_istirahat: '',
    total_jam_kerja: 0,
  };
  rabu: JadwalKerjaCategory = {
    id_jadwalkerja: '',
    hari: '',
    in: '',
    out: '',
    mulai_istirahat: '',
    selesai_istirahat: '',
    total_jam_kerja: 0,
  };
  kamis: JadwalKerjaCategory = {
    id_jadwalkerja: '',
    hari: '',
    in: '',
    out: '',
    mulai_istirahat: '',
    selesai_istirahat: '',
    total_jam_kerja: 0,
  };
  jumat: JadwalKerjaCategory = {
    id_jadwalkerja: '',
    hari: '',
    in: '',
    out: '',
    mulai_istirahat: '',
    selesai_istirahat: '',
    total_jam_kerja: 0,
  };
  sabtu: JadwalKerjaCategory = {
    id_jadwalkerja: '',
    hari: '',
    in: '',
    out: '',
    mulai_istirahat: '',
    selesai_istirahat: '',
    total_jam_kerja: 0,
  };
  minggu: JadwalKerjaCategory = {
    id_jadwalkerja: '',
    hari: '',
    in: '',
    out: '',
    mulai_istirahat: '',
    selesai_istirahat: '',
    total_jam_kerja: 0,
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { name: string; data: any },
    private api: ApiService
  ) {
    if (data.name === 'editDetail') {
      this.editDetail = true;

      this.allData = data.data.all;
      this.jamKerja = data.data.dataJadwalKerja;
      this.idJadwalKerja = data.data.dataJadwalKerja.id_jadwalkerja;
      this.updateJamKerja = this.jamKerja;
    } else if (data.name === 'tambahCategory') {
      this.tambahCategory = true;
    } else if (data.name === 'deleteCategory') {
      this.deleteCategory = true;
    } else if (data.name === 'editCategory') {
      this.editCategory = true;

      this.dataEditCategory = data.data;
      this.senin = data.data.senin;
      this.selasa = data.data.selasa;
      this.rabu = data.data.rabu;
      this.kamis = data.data.kamis;
      this.jumat = data.data.jumat;
      this.sabtu = data.data.sabtu;
      this.minggu = data.data.minggu;
    }
  }

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData() {
    this.api.getData(this.table).subscribe((res) => {
      this.jadwalKerja = res;
      if (this.tambahCategory) {
        this.senin.id_jadwalkerja = res[0].id;
        this.selasa.id_jadwalkerja = res[0].id;
        this.rabu.id_jadwalkerja = res[0].id;
        this.kamis.id_jadwalkerja = res[0].id;
        this.jumat.id_jadwalkerja = res[0].id;
        this.sabtu.id_jadwalkerja = res[0].id;
        this.minggu.id_jadwalkerja = res[0].id;
      }
      this.category('senin');
      this.category('selasa');
      this.category('rabu');
      this.category('kamis');
      this.category('jumat');
      this.category('sabtu');
      this.category('minggu');
    });
    this.api.getData(this.tableBagiankerja).subscribe((res) => {
      this.dataBagianKerja = res;
      this.lokasiValue = res[0].id_lokasi;
      this.divisiValue = res[0].divisi;
      this.departemenValue = res[0].departemen;
      this.subDepartemenValue = res[0].sub_departemen;

      this.filterBagianKerja();
    });
  }

  category(day: string) {
    this.jadwalKerja.filter((res: any) => {
      switch (day) {
        case 'senin':
          if (this.senin.id_jadwalkerja === res.id) {
            this.senin.hari = 'Senin';
            this.senin.in = res.in;
            this.senin.out = res.out;
            this.senin.mulai_istirahat = res.mulai_istirahat;
            this.senin.selesai_istirahat = res.selesai_istirahat;
            this.senin.total_jam_kerja = res.total_jam_kerja;
          }
          break;
        case 'selasa':
          if (this.selasa.id_jadwalkerja === res.id) {
            this.selasa.hari = 'Selasa';
            this.selasa.in = res.in;
            this.selasa.out = res.out;
            this.selasa.mulai_istirahat = res.mulai_istirahat;
            this.selasa.selesai_istirahat = res.selesai_istirahat;
            this.selasa.total_jam_kerja = res.total_jam_kerja;
          }
          break;
        case 'rabu':
          if (this.rabu.id_jadwalkerja === res.id) {
            this.rabu.hari = 'Rabu';
            this.rabu.in = res.in;
            this.rabu.out = res.out;
            this.rabu.mulai_istirahat = res.mulai_istirahat;
            this.rabu.selesai_istirahat = res.selesai_istirahat;
            this.rabu.total_jam_kerja = res.total_jam_kerja;
          }
          break;
        case 'kamis':
          if (this.kamis.id_jadwalkerja === res.id) {
            this.kamis.hari = 'Kamis';
            this.kamis.in = res.in;
            this.kamis.out = res.out;
            this.kamis.mulai_istirahat = res.mulai_istirahat;
            this.kamis.selesai_istirahat = res.selesai_istirahat;
            this.kamis.total_jam_kerja = res.total_jam_kerja;
          }
          break;
        case 'jumat':
          if (this.jumat.id_jadwalkerja === res.id) {
            this.jumat.hari = 'Jumat';
            this.jumat.in = res.in;
            this.jumat.out = res.out;
            this.jumat.mulai_istirahat = res.mulai_istirahat;
            this.jumat.selesai_istirahat = res.selesai_istirahat;
            this.jumat.total_jam_kerja = res.total_jam_kerja;
          }
          break;
        case 'sabtu':
          if (this.sabtu.id_jadwalkerja === res.id) {
            this.sabtu.hari = 'Sabtu';
            this.sabtu.in = res.in;
            this.sabtu.out = res.out;
            this.sabtu.mulai_istirahat = res.mulai_istirahat;
            this.sabtu.selesai_istirahat = res.selesai_istirahat;
            this.sabtu.total_jam_kerja = res.total_jam_kerja;
          }
          break;
        case 'minggu':
          if (this.minggu.id_jadwalkerja === res.id) {
            this.minggu.hari = 'Minggu';
            this.minggu.in = res.in;
            this.minggu.out = res.out;
            this.minggu.mulai_istirahat = res.mulai_istirahat;
            this.minggu.selesai_istirahat = res.selesai_istirahat;
            this.minggu.total_jam_kerja = res.total_jam_kerja;
          }
          break;
        default:
          break;
      }
    });
  }

  filterBagianKerja() {
    this.dataBagianKerja.filter((res: any) => {
      if (this.lokasiValue === res.id_lokasi) {
        this.bagianKerjaFiltered.push(res);
      }
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
    if (this.data.name === 'editDetail') {
      this.allData.jadwal_kerja[this.data.data.indexJadwalKerja] =
        this.updateJamKerja;
      this.api.throwData(this.allData);
    } else if (this.tambahCategory) {
      let tambahData = {
        lokasi: this.lokasiValue,
        divisi: this.divisiValue,
        departemen: this.departemenValue,
        sub_departemen: this.subDepartemenValue,
        senin: this.senin,
        selasa: this.selasa,
        rabu: this.rabu,
        kamis: this.kamis,
        jumat: this.jumat,
        sabtu: this.sabtu,
        minggu: this.minggu,
        status: true,
      };
      this.api.throwData(tambahData);
    } else if (this.editCategory) {
      this.api.throwData(this.data.data);
    }
  }
}
