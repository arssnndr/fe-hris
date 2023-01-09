import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ApiService } from 'src/app/shared/api.service';
import { ModalMesinFingerComponent } from './modal-mesin-finger/modal-mesin-finger.component';

@Component({
  selector: 'app-mesin-finger',
  templateUrl: './mesin-finger.component.html',
  styleUrls: ['./mesin-finger.component.css'],
})
export class MesinFingerComponent implements OnInit {
  table = 'ms_mesinfinger/';
  dataSearch = '';
  pageSize = 50;
  pageIndex = 0;
  pageSizeOption = [50, 100, 150, 200];
  showFirstLastButtons = false;
  data!: any;
  length: any;
  getMaxId = 0;

  constructor(private api: ApiService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllData();
  }

  tambahData() {
    const dialogRef = this.dialog.open(ModalMesinFingerComponent, {
      data: { name: 'tambah', id: this.getMaxId + 1 },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'simpan') {
        let catchResult = this.api.catchData();
        this.api.postData(this.table, catchResult).subscribe((res) => {
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
    const dialogRef = this.dialog.open(ModalMesinFingerComponent, {
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
    const dialogRef = this.dialog.open(ModalMesinFingerComponent, {
      data: { name: 'edit', data: data },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'simpan') {
        let catchResult = this.api.catchData();
        let data = catchResult;
        let id = catchResult.id;
        this.api.updateData(this.table, data, id).subscribe((res) => {
          this.getPageData();
        });
      }
      this.getAllData();
    });
  }

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getPageData();
  }

  getAllData() {
    this.api.getData(this.table).subscribe((res) => {
      this.getMaxId = res[res.length - 1].id;
      this.length = res.length;
      this.pageSize = 50;
      this.pageIndex = 0;
      this.getPageData();
    });
  }

  getPageData() {
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
  }
}
