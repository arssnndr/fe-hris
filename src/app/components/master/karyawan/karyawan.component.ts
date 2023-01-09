import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ApiService } from 'src/app/shared/api.service';
import { ModalKaryawanComponent } from './modal-karyawan/modal-karyawan.component';

@Component({
  selector: 'app-karyawan',
  templateUrl: './karyawan.component.html',
  styleUrls: ['./karyawan.component.css'],
})
export class KaryawanComponent implements OnInit {
  table = 'ms_karyawan/';
  dataSearch = '';
  pageSize = 50;
  pageIndex = 0;
  pageSizeOption = [50, 100, 150, 200];
  showFirstLastButtons = false;
  data: any;
  length: any;
  catchResult: any;
  tmpData: any;

  constructor(private api: ApiService, public dialog: MatDialog) {}

  tambahData(data: any) {
    const dialogRef = this.dialog.open(ModalKaryawanComponent, {
      data: { name: 'tambah', data: data },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      if (result === 'simpan') {
        this.catchResult = this.api.catchData();
        if (
          this.catchResult.nama_lengkap === '' ||
          this.catchResult.tempat_lahir === '' ||
          this.catchResult.tgl_lahir === '' ||
          this.catchResult.id_perusahaan === '' ||
          this.catchResult.id_lokasi === ''
        ) {
          this.tambahData(this.catchResult);
        } else {
          this.api.postData(this.table, this.catchResult).subscribe((res) => {
            this.length = this.length + 1;
            this.getPageData();
          });
        }
      }
    });
  }

  editData(data: any) {
    const dialogRef = this.dialog.open(ModalKaryawanComponent, {
      data: { name: 'edit', data: data },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'update') {
        let catchResult = this.api.catchData();
        if (
          this.catchResult.nama_lengkap === '' ||
          this.catchResult.tempat_lahir === '' ||
          this.catchResult.tgl_lahir === '' ||
          this.catchResult.perusahaan === '' ||
          this.catchResult.lokasi === ''
        ) {
          this.editData(this.catchResult);
        } else {
          this.api
            .updateData(this.table, catchResult, catchResult.id)
            .subscribe((res) => {
              this.getPageData();
            });
        }
      }
    });
  }

  deleteData(id: number) {
    const dialogRef = this.dialog.open(ModalKaryawanComponent, {
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
        this.length = res.length;
        this.tmpData = { id: parseInt(res[res.length - 1].id) + 1 };
        this.pageSize = 50;
        this.pageIndex = 0;
        this.getPageData();
      });
    } else {
      this.api
        .getData(this.table + '?nama_lengkap_like=' + this.dataSearch)
        .subscribe((res) => {
          this.length = res.length;
          this.pageSize = 50;
          this.pageIndex = 0;
          this.getPageData();
        });
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
      this.api
        .getData(
          this.table +
            '?_page=' +
            (this.pageIndex + 1) +
            '&_limit=' +
            this.pageSize +
            '&nama_lengkap_like=' +
            this.dataSearch
        )
        .subscribe((res) => {
          this.data = res;
        });
    }
  }

  searchData(data: any) {
    this.dataSearch = data;
    this.pageIndex = 0;
    this.getAllData();
    this.getPageData();
  }
}
