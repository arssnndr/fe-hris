import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ApiService } from 'src/app/shared/api.service';
import { ModalMesinFingerComponent } from './modal-mesin-finger/modal-mesin-finger.component';
import { environment } from 'src/environments/environment';
import { VoidComponent } from '../../modals/void/void.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mesin-finger',
  templateUrl: './mesin-finger.component.html',
  styleUrls: ['./mesin-finger.component.css'],
})
export class MesinFingerComponent implements OnInit {
  akses = this.api.akses.role_mesin_finger;

  dataSearch = '';
  pageSize = 50;
  pageIndex = 0;
  pageSizeOption = [50, 100, 150, 200];
  showFirstLastButtons = false;
  data!: any;
  length: any;

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

  isAlert() {
    alert('Anda tidak memiliki Akses');
  }

  tambahData() {
    if (this.akses.edit)
      this.dialog
        .open(ModalMesinFingerComponent)
        .afterClosed()
        .subscribe((result) => {
          if (result != undefined) {
            this.api
              .postData(environment.tabelMesinFinger, result)
              .subscribe(() => {
                this.length = this.length + 1;
                this.getPageData();
              });
          }
        });
    else this.isAlert();
  }

  deleteData(id: number) {
    if (this.akses.edit)
      this.dialog
        .open(VoidComponent)
        .afterClosed()
        .subscribe((result) => {
          if (result === 'ya') {
            this.api
              .deleteData(environment.tabelMesinFinger + id)
              .subscribe(() => {
                this.length = this.length - 1;
                this.getPageData();
              });
          }
        });
    else this.isAlert();
  }

  editData(data: any) {
    this.dialog
      .open(ModalMesinFingerComponent, {
        data: data,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result != undefined) {
          this.api
            .updateData(environment.tabelMesinFinger, result, result.id)
            .subscribe(() => {
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
    this.api.getData(environment.tabelMesinFinger).subscribe((res) => {
      this.length = res.length;
      this.pageSize = 50;
      this.pageIndex = 0;
      this.getPageData();
    });
  }

  getPageData() {
    this.api
      .getData(
        environment.tabelMesinFinger +
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
