import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-download-report',
  templateUrl: './download-report.component.html',
  styleUrls: ['./download-report.component.css'],
})
export class DownloadReportComponent {
  tableLokasi: string = 'ms_lokasi/';
  tablePerusahaan: string = 'ms_perusahaan/';
  tableBagianKerja: string = 'ms_bagiankerja/';

  dataLokasi: any[] = [];
  dataPerusahaan: any[] = [];
  dataBagianKerja: any[] = [];

  status: string[] = [
    'Cuti Tahunan',
    'Cuti Khusus',
    'Dinas Dalam Kota',
    'Dinas Luar Kota',
    'Izin Sehari Penuh',
    'Izin Setengah Hari',
    'Lembur',
    'Sisa Cuti Tahunan',
  ];

  data: any = {
    lokasi: '',
    perusahaan: '',
    divisi: '',
    departemen: '',
    subDepartemen: '',
    startDate: moment().format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
    status: this.status[0],
  };

  constructor(
    api: ApiService,
    private dialogRef: MatDialogRef<DownloadReportComponent>
  ) {
    api.getData(this.tableLokasi).subscribe((res) => {
      this.dataLokasi = res;
      this.data.lokasi = res[0].inisial;
    });
    api.getData(this.tablePerusahaan).subscribe((res) => {
      this.dataPerusahaan = res;
      this.data.perusahaan = res[0].nama;
    });
    api
      .getData(this.tableBagianKerja + '?jenis_bagian=Divisi')
      .subscribe((res) => {
        this.dataBagianKerja = res;
        this.data.divisi = res[0].divisi;
        this.data.departemen = res[0].departemen;
        this.data.subDepartemen = res[0].sub_departemen;
      });
  }

  download() {
    let duration = moment
      .duration(moment(this.data.endDate).diff(moment(this.data.startDate)))
      .asDays();
    if (duration >= 31) {
      window.alert('Rentan Waktu Melebihi 31 Hari!.');
    } else {
      console.log(this.data);
      this.dialogRef.close();
    }
  }
}
