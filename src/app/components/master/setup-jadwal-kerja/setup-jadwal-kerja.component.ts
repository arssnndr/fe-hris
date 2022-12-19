import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/api.service';
import { ModalSetupJadwalKerjaComponent } from './modal-setup-jadwal-kerja/modal-setup-jadwal-kerja.component';
import * as moment from 'moment';

@Component({
  selector: 'app-setup-jadwal-kerja',
  templateUrl: './setup-jadwal-kerja.component.html',
  styleUrls: ['./setup-jadwal-kerja.component.css'],
})
export class SetupJadwalKerjaComponent implements OnInit {
  tableDetail1 = 'trx_jadwalkerja/';
  dataDetail1!: any;
  tableDetail2 = 'ms_karyawan/';
  dataDetail2!: any;
  dataCategory!: any;
  dataUpload!: any;
  dataIndividu!: any;
  catchResult: any;
  getMaxId = 0;
  dateObj = new Date();
  month!: any;
  year!: any;
  yearMonth!: any;

  constructor(private api: ApiService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllData();
    this.month = this.dateObj.getMonth();
    this.year = this.dateObj.getFullYear();
    this.month.toString().length === 1
      ? (this.yearMonth = this.year + '-0' + this.month)
      : (this.yearMonth = this.year + '-' + this.month);
  }

  tambahData() {
    const dialogRef = this.dialog.open(ModalSetupJadwalKerjaComponent, {
      data: { name: 'tambah' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      if (result === 'simpan') {
        this.catchResult = this.api.catchData();
        this.api.postData(this.tableDetail1, this.catchResult).subscribe(() => {
          this.ngOnInit();
        });
      }
    });
  }
  
  editDataDetail(data: any) {
    let id = data.id;
    const dialogRef = this.dialog.open(ModalSetupJadwalKerjaComponent, {
      data: { name: 'editDetail', data: data },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'simpan') {
        this.catchResult = this.api.catchData();
        let data = this.catchResult;
        this.api.updateData(this.tableDetail1, data, id).subscribe(() => {
          this.ngOnInit();
        });
      }
      this.ngOnInit();
    });
  }

  editData(data: any) {
    let id = data.id;
    const dialogRef = this.dialog.open(ModalSetupJadwalKerjaComponent, {
      data: { name: 'edit', data: data },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'simpan') {
        this.catchResult = this.api.catchData();
        let data = this.catchResult;
        this.api.updateData(this.tableDetail1, data, id).subscribe(() => {
          this.ngOnInit();
        });
      }
      this.ngOnInit();
    });
  }

  deleteData(id: number) {
    const dialogRef = this.dialog.open(ModalSetupJadwalKerjaComponent, {
      data: { name: 'delete' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'ya') {
        this.api.deleteData(this.tableDetail1 + id).subscribe(() => {
          this.ngOnInit();
        });
      }
    });
  }

  getAllData() {
    this.api.getData(this.tableDetail1).subscribe((res) => {
      this.dataDetail1 = res;
      console.log(moment(res[0].tanggal).format('D MMM YYYY'))
    });
    this.api.getData(this.tableDetail2).subscribe((res) => {
      this.dataDetail2 = res;
    });
    this.api.getData(this.tableDetail2).subscribe((res) => {
      this.dataIndividu = res;
    });
    this.api.getData(this.tableDetail2).subscribe((res) => {
      this.dataCategory = res;
    });
    this.api.getData(this.tableDetail2).subscribe((res) => {
      this.dataUpload = res;
    });
  }

  dateFormat(date: any){
    return moment(date).format('D MMM YYYY')
  }

  searchData() {
    this.getAllData();
  }
}
