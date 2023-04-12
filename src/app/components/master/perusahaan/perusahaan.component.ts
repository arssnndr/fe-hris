import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ApiService } from 'src/app/shared/api.service';
import { VoidComponent } from '../../modals/void/void.component';
import { ModalPerusahaanComponent } from './modal-perusahaan/modal-perusahaan.component';
import { Route, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-perusahaan',
  templateUrl: './perusahaan.component.html',
  styleUrls: ['./perusahaan.component.css'],
})
export class PerusahaanComponent implements OnInit {
  akses = this.api.akses.role_perusahaan;

  dataSearch = '';
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
    public dialog: MatDialog,
    router: Router
  ) {
    if (!this.akses.view) router.navigate(['/dashboard']);
  }

  tambahData() {
    if (this.akses.edit) {
      this.dialog
        .open(ModalPerusahaanComponent, {
          data: { name: 'tambah' },
        })
        .afterClosed()
        .subscribe((result) => {
          if (result != undefined) {
            this.api
              .postData(environment.tabelPerusahaan, result)
              .subscribe(() => {
                this.length = this.length + 1;
                this.getPageData();
              });
          }
        });
    } else {
      window.alert('Anda tidak memiliki Akses');
    }
  }

  editData(data: any) {
    const dialogRef = this.dialog.open(ModalPerusahaanComponent, {
      data: { name: 'edit', data: data },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        this.api
          .updateData(environment.tabelPerusahaan, result, result.id)
          .subscribe(() => {
            this.getPageData();
          });
      }
    });
  }

  deleteData(id: number) {
    if (this.akses.edit) {
      this.dialog
        .open(VoidComponent)
        .afterClosed()
        .subscribe((result) => {
          if (result === 'ya') {
            this.api
              .deleteData(environment.tabelPerusahaan + id)
              .subscribe(() => {
                this.length = this.length - 1;
                this.getPageData();
              });
          }
        });
    } else {
      window.alert('Anda tidak memiliki Akses');
    }
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
      this.api.getData(environment.tabelPerusahaan).subscribe((res) => {
        this.length = res.length;
        this.pageSize = 50;
        this.pageIndex = 0;
        this.getPageData();
      });
    } else {
      if (this.inisial) {
        this.api
          .getData(
            environment.tabelPerusahaan + '?inisial_like=' + this.dataSearch
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
            environment.tabelPerusahaan + '?nama_like=' + this.dataSearch
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
          environment.tabelPerusahaan +
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
            environment.tabelPerusahaan +
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
            environment.tabelPerusahaan +
              '?_page=' +
              (this.pageIndex + 1) +
              '&_limit=' +
              this.pageSize +
              '&nama_like=' +
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
