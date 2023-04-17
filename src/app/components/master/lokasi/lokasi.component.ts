import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ApiService } from 'src/app/shared/api.service';
import { ModalLokasiComponent } from './modal-lokasi/modal-lokasi.component';
import { Router } from '@angular/router';
import { VoidComponent } from '../../modals/void/void.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-lokasi',
  templateUrl: './lokasi.component.html',
  styleUrls: ['./lokasi.component.css'],
})
export class LokasiComponent implements OnInit {
  akses = this.api.akses.role_lokasi;

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
    private dialog: MatDialog,
    router: Router
  ) {
    if (!this.akses.view) router.navigate(['dashboard']);
  }

  sliceString(string: string, length: number) {
    return string.slice(0, length);
  }

  tambahData() {
    if (this.akses.edit) {
      const dialogRef = this.dialog.open(ModalLokasiComponent, {
        data: { name: 'tambah' },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result != undefined) {
          this.api.postData(environment.tabelLokasi, result).subscribe(() => {
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
    this.dialog
      .open(ModalLokasiComponent, {
        data: { name: 'edit', data: data },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result != undefined) {
          console.log(result);
          this.api
            .updateData(environment.tabelLokasi, result, data.id)
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
            this.api.deleteData(environment.tabelLokasi + id).subscribe(() => {
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
      this.api.getData(environment.tabelLokasi).subscribe((res) => {
        this.length = res.length;
        this.pageSize = 50;
        this.pageIndex = 0;
        this.getPageData();
      });
    } else {
      if (this.inisial) {
        this.api
          .getData(environment.tabelLokasi + '?inisial_like=' + this.dataSearch)
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
          .getData(environment.tabelLokasi + '?nama_like=' + this.dataSearch)
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
          environment.tabelLokasi +
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
            environment.tabelLokasi +
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
            environment.tabelLokasi +
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
