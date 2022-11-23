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

  constructor(private api: ApiService, private router: Router) {}

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
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

  searchData(keterangan: any) {
    if (keterangan != '') {
      this.api
        .getData(this.table + '?keterangan=' + keterangan)
        .subscribe((res) => {
          this.data = res;
          this.pageSize = res.length;
          this.length = res.length;
          this.pageIndex = 0;
        });
    } else {
      this.getAllData();
      this.getPageData();
    }
  }
}
