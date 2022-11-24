import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-bagian-kerja',
  templateUrl: './bagian-kerja.component.html',
  styleUrls: ['./bagian-kerja.component.css'],
})
export class BagianKerjaComponent implements OnInit {
  table = 'ms_bagiankerja';
  length = 200;
  pageSize = 50;
  pageIndex = 0;
  pageSizeOption = [50, 100, 150, 200];
  showFirstLastButtons = false;
  data!: any;
  dataSearch = '';

  constructor(private api: ApiService, private router: Router) {}

  handlePageEvent(event: PageEvent) {
    console.log(event)
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getPageData();
  }

  ngOnInit(): void {
    this.getPageData();
  }

  getAllData() {
    this.api.getData(this.table).subscribe((res) => {
      this.length = res.length;
      this.pageSize = 50;
      this.pageIndex = 0;
    });
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
            '&keterangan_like=' +
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
    /*if (keterangan.length !== 0) {
      this.api
        .getData(this.table + '?keterangan_like=' + keterangan)
        .subscribe((res) => {
          this.data = res;
          this.length = res.length;
          this.pageIndex = 0;
          if (res.length < 50) {
            this.pageSize = res.length;
          } else if (res.length < 100) {
            this.pageSize = 50;
            this.pageSizeOption = [50];
          } else if (res.length < 150) {
            this.pageSize = 50;
            this.pageSizeOption = [50, 100];
          } else if (res.length < 200) {
            this.pageSize = 50;
            this.pageSizeOption = [50, 100, 150];
          } else {
            this.pageSize = 50;
            this.pageSizeOption = [50, 100, 150, 200];
          }
        });
    } else {
      this.getAllData();
    }*/
  }
}
