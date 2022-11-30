import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ApiService } from 'src/app/shared/api.service';
import { ModalPerusahaanComponent } from './modal-perusahaan/modal-perusahaan.component';

@Component({
  selector: 'app-perusahaan',
  templateUrl: './perusahaan.component.html',
  styleUrls: ['./perusahaan.component.css'],
})
export class PerusahaanComponent implements OnInit {
  table = 'ms_perusahaan/';
  dataSearch = '';
  pageSize = 50;
  pageIndex = 0;
  pageSizeOption = [50, 100, 150, 200];
  showFirstLastButtons = false;
  data!: any;
  length: any;
  inisial = true;
  perusahaan = false;
  catchResult: any;
  getMaxId = 0;

  constructor(private api: ApiService, public dialog: MatDialog) {}

  tambahData() {
    const dialogRef = this.dialog.open(ModalPerusahaanComponent, {
      data: { name: 'tambah', data: this.getMaxId + 1 },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      if (result === 'simpan') {
        this.catchResult = this.api.catchData();
        this.api.postData(this.table, this.catchResult).subscribe((res) => {
          this.api.getData(this.table).subscribe((res) => {
            this.getMaxId = res[res.length - 1].id;
          });
          this.length = this.length + 1;
          this.getPageData();
        });
      }
    });
  }

  editData(data: any) {
    const dialogRef = this.dialog.open(ModalPerusahaanComponent, {
      data: { name: 'edit', data: data },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'simpan') {
        this.catchResult = this.api.catchData();
        let data = this.catchResult;
        let id = this.catchResult.id;
        this.api.updateData(this.table, data, id).subscribe((res) => {
          this.getPageData();
        });
      }
    });
  }

  deleteData(id: number) {
    const dialogRef = this.dialog.open(ModalPerusahaanComponent, {
      data: { name: 'delete' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'ya') {
        this.api.deleteData(this.table + id).subscribe(() => {
          this.api.getData(this.table).subscribe((res) => {
            this.getMaxId = res[res.length - 1].id;
          });
          this.length = this.length - 1;
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

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData() {
    if (this.dataSearch.length === 0) {
      this.api.getData(this.table).subscribe((res) => {
        this.getMaxId = res[res.length - 1].id;
        this.length = res.length;
        this.pageSize = 50;
        this.pageIndex = 0;
        this.getPageData();
      });
    } else {
      if (this.inisial) {
        this.api
          .getData(this.table + '?inisial_like=' + this.dataSearch)
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
          .getData(this.table + '?nama_perusahaan_like=' + this.dataSearch)
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
            this.pageSize
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
              '&inisial_like=' +
              this.dataSearch
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
              '&nama_perusahaan_like=' +
              this.dataSearch
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
}
