import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import * as moment from 'moment';
import { ApiService } from 'src/app/shared/api.service';
import { ModalStatusKehadiranComponent } from '../status-kehadiran/modal-status-kehadiran/modal-status-kehadiran.component';
import { ModalLemburComponent } from './modal-lembur/modal-lembur.component';

@Component({
  selector: 'app-lembur',
  templateUrl: './lembur.component.html',
  styleUrls: ['./lembur.component.css'],
})
export class LemburComponent implements OnInit {
  table = 'ms_lembur/';
  dataSearch = '';
  tgl = '';
  pageSize = 50;
  pageIndex = 0;
  pageSizeOption = [50, 100, 150, 200];
  showFirstLastButtons = false;
  data!: any;
  length: any;
  inisial = true;
  perusahaan = false;

  constructor(private api: ApiService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllData();
  }

  sliceDate(date: string) {
    return date.slice(0, 2);
  }

  tambahData() {
    const dialogRef = this.dialog.open(ModalLemburComponent, {
      data: { name: 'tambah' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'simpan') {
        let catchResult = this.api.catchData();
        this.api.postData(this.table, catchResult).subscribe(() => {
          this.length = this.length + 1;
          this.getPageData();
        });
      }
    });
  }

  deleteData(id: number) {
    const dialogRef = this.dialog.open(ModalLemburComponent, {
      data: { name: 'delete' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'ya') {
        this.api.deleteData(this.table + id).subscribe(() => {
          this.length = this.length - 1;
          this.getPageData();
        });
      }
    });
  }

  editData(data: any) {
    console.log(data);
    const dialogRef = this.dialog.open(ModalLemburComponent, {
      data: { name: 'edit', data: data },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'simpan') {
        let catchResult = this.api.catchData();
        this.api
          .updateData(this.table, catchResult, catchResult.id)
          .subscribe(() => {
            this.getPageData();
          });
      }
    });
  }

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getPageData();
  }

  getAllData() {
    if (this.dataSearch.length === 0) {
      if (this.tgl.length === 0) {
        this.api.getData(this.table).subscribe((res) => {
          this.length = res.length;
          this.pageSize = 50;
          this.pageIndex = 0;
          this.getPageData();
        });
      } else {
        this.api
          .getData(this.table + '?tgl_like=' + this.tgl)
          .subscribe((res) => {
            this.length = res.length;
            this.pageSize = 50;
            this.pageIndex = 0;
            this.getPageData();
          });
      }
    } else {
      if (this.inisial) {
        this.api
          .getData(
            this.table +
              '?nip_like=' +
              this.dataSearch +
              '&tgl_like=' +
              this.tgl
          )
          .subscribe((res) => {
            this.length = res.length;
            this.pageSize = 50;
            this.pageIndex = 0;
            if (res.length === 0) {
              this.inisial = false;
              this.perusahaan = true;
              this.getAllData();
            } else {
              this.getPageData();
            }
          });
      } else if (this.perusahaan) {
        this.api
          .getData(
            this.table +
              '?nama_lengkap_like=' +
              this.dataSearch +
              '&tgl_like=' +
              this.tgl
          )
          .subscribe((res) => {
            this.length = res.length;
            this.pageSize = 50;
            this.pageIndex = 0;
            if (res.length === 0) {
              this.perusahaan = false;
              this.inisial = true;
              this.getAllData();
            } else {
              this.getPageData();
            }
          });
      }
    }
  }

  getPageData() {
    if (this.dataSearch.length === 0) {
      this.api
        .getData(
          this.table +
            '?_page=' +
            (this.pageIndex + 1) +
            '&_limit=' +
            this.pageSize +
            '&tgl_like=' +
            this.tgl
        )
        .subscribe((res) => {
          this.data = res;
        });
    } else {
      if (this.inisial) {
        this.api
          .getData(
            this.table +
              '?_page=' +
              (this.pageIndex + 1) +
              '&_limit=' +
              this.pageSize +
              '&nip_like=' +
              this.dataSearch +
              '&tgl_like=' +
              this.tgl
          )
          .subscribe((res) => {
            this.data = res;
          });
      } else if (this.perusahaan) {
        this.api
          .getData(
            this.table +
              '?_page=' +
              (this.pageIndex + 1) +
              '&_limit=' +
              this.pageSize +
              '&nama_lengkap_like=' +
              this.dataSearch +
              '&tgl_like=' +
              this.tgl
          )
          .subscribe((res) => {
            this.data = res;
          });
      }
    }
  }

  searchData(data: any) {
    this.dataSearch = data;
    this.pageIndex = 0;
    this.getAllData();
    this.getPageData();
  }

  filterTgl(date: any) {
    this.tgl = date.value;
    this.pageIndex = 0;
    this.getAllData();
    this.getPageData();
  }
}
