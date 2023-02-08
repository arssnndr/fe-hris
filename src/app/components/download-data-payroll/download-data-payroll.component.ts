import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-download-data-payroll',
  templateUrl: './download-data-payroll.component.html',
  styleUrls: ['./download-data-payroll.component.css'],
})
export class DownloadDataPayrollComponent {
  tablePerusahaan: string = 'ms_perusahaan/';
  dataPerusahaan: any[] = [];

  tableLokasi: string = 'ms_lokasi/';
  dataLokasi: any[] = [];

  isClose: boolean = false;

  data: any = {
    startDate: '',
    endDate: '',
    perusahaan: '',
    lokasi: '',
  };

  constructor(
    api: ApiService,
    public dialogRef: MatDialogRef<DownloadDataPayrollComponent>
  ) {
    api.getData(this.tablePerusahaan).subscribe((res) => {
      this.dataPerusahaan = res;
      this.data.perusahaan = res[0].inisial;
    });
    api.getData(this.tableLokasi).subscribe((res) => {
      this.dataLokasi = res;
      this.data.lokasi = res[0].inisial;
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
