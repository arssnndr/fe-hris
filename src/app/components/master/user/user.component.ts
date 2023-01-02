import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ApiService } from 'src/app/shared/api.service';
import { ModalUserComponent } from './modal-user/modal-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  table = 'ms_userid/';
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

  ngOnInit(): void {
    this.getAllData();
  }

  tambahData() {
    const dialogRef = this.dialog.open(ModalUserComponent, {
      data: { name: 'tambah', id: this.getMaxId + 1 },
    });

    dialogRef.afterClosed().subscribe((result) => {
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

  deleteData(id: number) {
    const dialogRef = this.dialog.open(ModalUserComponent, {
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

  editData(data: any) {
    const dialogRef = this.dialog.open(ModalUserComponent, {
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

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getPageData();
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
          .getData(this.table + '?id_like=' + this.dataSearch)
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
          .getData(this.table + '?username_like=' + this.dataSearch)
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
              '&id_like=' +
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
              '&username_like=' +
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
