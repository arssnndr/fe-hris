import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/api.service';
import { ModalSetupJadwalKerjaComponent } from './modal-setup-jadwal-kerja/modal-setup-jadwal-kerja.component';

@Component({
  selector: 'app-setup-jadwal-kerja',
  templateUrl: './setup-jadwal-kerja.component.html',
  styleUrls: ['./setup-jadwal-kerja.component.css'],
})
export class SetupJadwalKerjaComponent implements OnInit {
  table1 = 'trx_jadwalkerja/';
  table2 = 'ms_karyawan/';
  data1!: any;
  data2!: any;
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
        this.api.postData(this.table1, this.catchResult).subscribe(() => {
          this.ngOnInit();
        });
      }
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
        this.api.updateData(this.table1, data, id).subscribe(() => {
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
        this.api.deleteData(this.table1 + id).subscribe(() => {
          this.ngOnInit();
        });
      }
    });
  }

  getAllData() {
    this.api.getData(this.table1).subscribe((res) => {
      this.data1 = res;
    });
    this.api.getData(this.table2).subscribe((res) => {
      this.data2 = res;
    });
  }

  searchData() {
    this.getAllData();
  }
}
