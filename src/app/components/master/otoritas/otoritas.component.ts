import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ApiService } from 'src/app/shared/api.service';
import { ModalOtoritasComponent } from './modal-otoritas/modal-otoritas.component';
import { VoidComponent } from '../../modals/void/void.component';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-otoritas',
  templateUrl: './otoritas.component.html',
  styleUrls: ['./otoritas.component.css'],
})
export class OtoritasComponent {
  akses = this.api.akses.role_otoritas;

  dataSearch = '';
  pageSize = 50;
  pageIndex = 0;
  pageSizeOption = [50, 100, 150, 200];
  showFirstLastButtons = false;
  data!: any;
  length: any;
  nip = true;
  username = false;

  constructor(
    private api: ApiService,
    private dialog: MatDialog,
    router: Router
  ) {
    if (!this.akses.view) router.navigate(['Dashboard']);
  }

  ngOnInit(): void {
    this.getAllData();
  }

  deleteData(id: number) {
    if (this.akses.edit) {
      this.dialog
        .open(VoidComponent)
        .afterClosed()
        .subscribe((result) => {
          if (result === 'ya') {
            this.api.deleteData(environment.tabelUser + id).subscribe(() => {
              this.length = this.length - 1;
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
      .open(ModalOtoritasComponent, {
        data: data,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result != undefined) {
          this.api
            .updateData(environment.tabelUser, result, result.id)
            .subscribe((res) => {
              localStorage.setItem('user', JSON.stringify(res));
              this.getPageData();
              window.location.reload();
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
      this.api.getData(environment.tabelUser).subscribe((res) => {
        this.length = res.length;
        this.pageSize = 50;
        this.pageIndex = 0;
        this.getPageData();
      });
    } else {
      if (this.nip) {
        this.api
          .getData(environment.tabelUser + '?nip_like=' + this.dataSearch)
          .subscribe((res) => {
            this.length = res.length;
            this.pageSize = 50;
            this.pageIndex = 0;
            if (res.length === 0) {
              this.nip = false;
              this.username = true;
              this.getAllData();
            } else {
              this.getPageData();
            }
          });
      } else if (this.username) {
        this.api
          .getData(environment.tabelUser + '?username_like=' + this.dataSearch)
          .subscribe((res) => {
            this.length = res.length;
            this.pageSize = 50;
            this.pageIndex = 0;
            if (res.length === 0) {
              this.username = false;
              this.nip = true;
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
          environment.tabelUser +
            '?_page=' +
            (this.pageIndex + 1) +
            '&_limit=' +
            this.pageSize
        )
        .subscribe((res) => {
          this.data = res;
        });
    } else {
      if (this.nip) {
        this.api
          .getData(
            environment.tabelUser +
              '?_page=' +
              (this.pageIndex + 1) +
              '&_limit=' +
              this.pageSize +
              '&nip_like=' +
              this.dataSearch
          )
          .subscribe((res) => {
            this.data = res;
          });
      } else if (this.username) {
        this.api
          .getData(
            environment.tabelUser +
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
