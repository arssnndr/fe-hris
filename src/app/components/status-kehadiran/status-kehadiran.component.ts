import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { ApiService } from 'src/app/shared/api.service';
import { environment } from 'src/environments/environment';
import { VoidComponent } from '../modals/void/void.component';
import { ModalStatusKehadiranComponent } from './modal-status-kehadiran/modal-status-kehadiran.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-status-kehadiran',
  templateUrl: './status-kehadiran.component.html',
  styleUrls: ['./status-kehadiran.component.css'],
})
export class StatusKehadiranComponent implements OnInit {
  akses = this.api.akses.role_status_kehadiran;

  dataStatusKehadiran: any[] = [];

  searchName: string = '';
  searchNip: string = '';

  paginator = {
    length: 0,
    pageIndex: 0,
    pageSize: 50,
    pageSizeOptions: [50, 100, 150, 200],
  };

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

  formatDate(date: string) {
    return moment(date).format('DD MMM YYYY');
  }

  getAllData() {
    this.api
      .getData(
        environment.tabelStatusKehadiran +
          '?nama_lengkap_like=' +
          this.searchName +
          '&nip_like=' +
          this.searchNip
      )
      .subscribe((res) => {
        this.dataStatusKehadiran = res;
        this.paginator.length = res.length;

        this.getPage();
      });
  }

  getPage() {
    this.api
      .getData(
        environment.tabelStatusKehadiran +
          '?_page=' +
          (this.paginator.pageIndex + 1) +
          '&_limit=' +
          this.paginator.pageSize +
          '&nama_lengkap_like=' +
          this.searchName +
          '&nip_like=' +
          this.searchNip
      )
      .subscribe((res) => {
        this.dataStatusKehadiran = res;
      });
  }

  search(data: any) {
    data = data.value;

    isNaN(data) ? (this.searchName = data) : (this.searchNip = data);

    this.getAllData();
  }

  onChangePage(page: any) {
    this.paginator.length = page.length;
    this.paginator.pageIndex = page.pageIndex;
    this.paginator.pageSize = page.pageSize;
    this.getPage();
  }

  tambahData() {
    this.akses.edit
      ? this.dialog
          .open(ModalStatusKehadiranComponent)
          .afterClosed()
          .subscribe((res) => {
            if (res !== undefined) {
              this.api
                .postData(environment.tabelStatusKehadiran, res)
                .subscribe(() => this.getAllData());
            }
          })
      : alert('Anda tidak memiliki Akses');
  }

  editData(data: any) {
    this.dialog
      .open(ModalStatusKehadiranComponent, { data: data })
      .afterClosed()
      .subscribe((res) => {
        if (res !== undefined) {
          this.api
            .updateData(environment.tabelStatusKehadiran, res, res.id)
            .subscribe(() => this.getAllData());
        }
      });
  }

  voidData(id: number) {
    this.akses.edit
      ? this.dialog
          .open(VoidComponent)
          .afterClosed()
          .subscribe((res) => {
            if (res === 'ya')
              this.api
                .deleteData(environment.tabelStatusKehadiran + id)
                .subscribe(() => this.getAllData());
          })
      : alert('Anda tidak memiliki Akses');
  }
}
