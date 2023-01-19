import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { ApiService } from 'src/app/shared/api.service';
import { ModalListKehadiranComponent } from './modal-list-kehadiran/modal-list-kehadiran.component';

@Component({
  selector: 'app-list-kehadiran',
  templateUrl: './list-kehadiran.component.html',
  styleUrls: ['./list-kehadiran.component.css'],
})
export class ListKehadiranComponent implements OnInit {
  tableDetail = 'trx_listkehadiran/';
  dataDetailAll: any[] = [{ jadwal_kerja: '' }];
  dataDetailProfil = { id: '', nama_lengkap: '', nip: '', jadwal_kerja: '' };
  dataDetailJadwalKerja!: any;
  dataDetailJadwalKerjaPerMonth: any[] = [];
  yearMonth = moment().format('YYYY-MM');
  dataSearchNip: any[] = [];

  constructor(private api: ApiService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.api.getData(this.tableDetail).subscribe((res) => {
      this.dataDetailAll = res;
      this.dataDetailProfil = res[0];
      this.dataDetailJadwalKerja = res[0].jadwal_kerja;
      this.selectMonth();
    });
  }

  dateFormat(date: any) {
    return moment(date, 'DD-MM-YYYY').format('DD MMM YYYY');
  }

  sliceTime(time: any) {
    return time.slice(0, 2)
  }

  selectProfil(id: any) {
    this.dataDetailAll.map((res: any) => {
      if (res.id === id) {
        this.dataDetailProfil = res;
      }
    });
    this.dataDetailJadwalKerja = this.dataDetailProfil.jadwal_kerja;
    this.selectMonth();
  }

  selectMonth() {
    this.dataDetailJadwalKerjaPerMonth = [];
    this.dataDetailJadwalKerja[
      Number(moment(this.yearMonth, 'YYYY-MM').format('MM')) - 1
    ].map((res: any) => {
      if (
        res.tgl.includes(moment(this.yearMonth, 'YYYY-MM').format('MM-YYYY'))
      ) {
        this.dataDetailJadwalKerjaPerMonth.push(res);
      }
    });
  }

  searchNip(nip: any) {
    this.dataSearchNip = [];
    this.dataDetailAll.map((res: any) => {
      if (res.nip.includes(nip.value)) {
        this.dataSearchNip.push(res);
      }
    });
  }

  selectNip(data: any) {
    this.dataDetailProfil = data;
    this.dataDetailJadwalKerja = data.jadwal_kerja;
    this.selectMonth();
  }

  editKehadiran(i: number) {
    const dialogRef = this.dialog.open(ModalListKehadiranComponent, {
      data: {
        name: 'editKehadiran',
        data: {
          dataProfil: this.dataDetailProfil,
          indexBln: Number(moment(this.yearMonth, 'YYYY-MM').format('MM')) - 1,
          indexTgl: i,
        },
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'simpan') {
        let catchResult = this.api.catchData();
        this.api
          .updateData(this.tableDetail, catchResult, this.dataDetailProfil.id)
          .subscribe(() => {
            this.selectProfil(catchResult.id);
          });
      }
    });
  }
}
