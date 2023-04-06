import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ApiService } from 'src/app/shared/api.service';
import { ModalLemburComponent } from './modal-lembur/modal-lembur.component';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { VoidComponent } from '../modals/void/void.component';

@Component({
  selector: 'app-lembur',
  templateUrl: './lembur.component.html',
  styleUrls: ['./lembur.component.css'],
})
export class LemburComponent implements OnInit {
  akses = this.api.akses.role_lembur;

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

  constructor(
    private api: ApiService,
    private dialog: MatDialog,
    router: Router
  ) {
    if (!this.akses.view) router.navigate(['dashboard']);
  }

  ngOnInit(): void {
    this.getAllData();
  }

  sliceDate(date: string) {
    return date.slice(0, 2);
  }

  tambahData() {
    this.akses.edit
      ? this.dialog
          .open(ModalLemburComponent)
          .afterClosed()
          .subscribe((result) => {
            if (result != undefined) {
              this.api
                .postData(environment.tabelLembur, result)
                .subscribe(() => {
                  this.length = this.length + 1;
                  this.getPageData();
                });
            }
          })
      : alert('Anda tidak memiliki Akses');
  }

  deleteData(id: number) {
    this.akses.edit
      ? this.dialog
          .open(VoidComponent)
          .afterClosed()
          .subscribe((result) => {
            if (result === 'ya') {
              this.api
                .deleteData(environment.tabelLembur + id)
                .subscribe(() => {
                  this.length = this.length - 1;
                  this.getPageData();
                });
            }
          })
      : alert('Anda tidak memiliki Akses');
  }

  editData(data: any) {
    this.dialog
      .open(ModalLemburComponent, {
        data: data,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result != undefined) {
          this.api
            .updateData(environment.tabelLembur, result, result.id)
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
        this.api.getData(environment.tabelLembur).subscribe((res) => {
          this.length = res.length;
          this.pageSize = 50;
          this.pageIndex = 0;
          this.getPageData();
        });
      } else {
        this.api
          .getData(environment.tabelLembur + '?tgl_like=' + this.tgl)
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
            environment.tabelLembur +
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
            environment.tabelLembur +
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
          environment.tabelLembur +
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
            environment.tabelLembur +
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
            environment.tabelLembur +
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
