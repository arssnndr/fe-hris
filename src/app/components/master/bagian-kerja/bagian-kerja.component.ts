import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalBagianKerjaComponent } from './modal-bagian-kerja/modal-bagian-kerja.component';
import { utils, writeFileXLSX } from 'xlsx';
import * as moment from 'moment';
import { VoidComponent } from '../../modals/void/void.component';
import { Router } from '@angular/router';
moment.locale('id');

@Component({
  selector: 'app-bagian-kerja',
  templateUrl: './bagian-kerja.component.html',
  styleUrls: ['./bagian-kerja.component.css'],
})
export class BagianKerjaComponent implements OnInit {
  akses = this.api.akses.role_bagian_kerja;

  table = 'ms_bagiankerja/';
  data!: any;

  dataSearch = '';

  pageSize = 50;
  pageIndex = 0;
  pageSizeOption = [50, 100, 150, 200];
  showFirstLastButtons = false;
  length: any;

  catchResult: any;
  lokasiValue = '';

  constructor(
    private api: ApiService,
    private dialog: MatDialog,
    router: Router
  ) {
    console.log(this.akses.view);
    if (!this.akses.view) router.navigate(['/dashboard']);
  }

  ngOnInit(): void {
    this.getAllData();
  }

  tambahData() {
    if (this.akses.edit) {
      this.dialog
        .open(ModalBagianKerjaComponent)
        .afterClosed()
        .subscribe((result) => {
          if (result !== undefined) {
            this.api.postData(this.table, result).subscribe(() => {
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
      .open(ModalBagianKerjaComponent, { data: data })
      .afterClosed()
      .subscribe((result) => {
        if (result !== undefined)
          this.api.updateData(this.table, result, result.id).subscribe(() => {
            this.getPageData();
          });
      });
  }

  deleteData(id: number) {
    if (this.akses.edit) {
      this.dialog
        .open(VoidComponent)
        .afterClosed()
        .subscribe((result) => {
          if (result === 'ya') {
            this.api.deleteData(this.table + id).subscribe(() => {
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

  uplink(jenisBagian: string, rowDivisi: string, rowDepartemen: string) {
    let tempData;
    if (jenisBagian === 'Departemen') {
      tempData = rowDivisi;
    } else if (jenisBagian === 'Sub Departemen') {
      tempData = rowDepartemen;
    }
    return tempData;
  }

  getAllData() {
    if (this.dataSearch.length === 0) {
      this.api.getData(this.table).subscribe((res) => {
        this.length = res.length;
        this.pageSize = 50;
        this.pageIndex = 0;
        this.getPageData();
      });
    } else {
      this.api
        .getData(this.table + '?sub_departemen_like=' + this.dataSearch)
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
            '&sub_departemen_like=' +
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

  printData() {
    if (this.akses.download) {
      let content = this.data.map((res: any) => ({
        Jenis: res.jenis_bagian,
        Lokasi: res.lokasi,
        Uplink: res.divisi === undefined ? res.departemen : res.divisi,
        Deskripsi: res.sub_departemen,
      }));
      const ws = utils.json_to_sheet(content);
      const wsTemp = utils.json_to_sheet(content);
      let length = Number(ws['!ref']?.slice(4));
      let cell = 4;

      ws['!ref'] = 'A1:D' + (length + cell);
      for (let i = 1; i <= 4; i++) {
        ws['A' + i] = { t: 's', v: '' };
        ws['B' + i] = { t: 's', v: '' };
        ws['C' + i] = { t: 's', v: '' };
        ws['D' + i] = { t: 's', v: '' };
      }

      ws['A1'] = { t: 's', v: 'Bagian Kerja' };
      ws['C1'] = { t: 's', v: 'Tanggal Cetak' };
      ws['C2'] = { t: 's', v: 'User :' };
      ws['D1'] = { t: 's', v: moment().format('DD MMM YYYY') };
      ws['D2'] = { t: 's', v: window.localStorage.getItem('key') };

      for (let i = 0; i < length; i++) {
        ws['A' + (i + cell)] = wsTemp['A' + (i + 1)];
        ws['B' + (i + cell)] = wsTemp['B' + (i + 1)];
        ws['C' + (i + cell)] = wsTemp['C' + (i + 1)];
        ws['D' + (i + cell)] = wsTemp['D' + (i + 1)];
      }

      const wb = utils.book_new();

      utils.book_append_sheet(wb, ws);
      writeFileXLSX(wb, 'Bagian Kerja.xlsx');
    } else {
      window.alert('Anda tidak memiliki Akses');
    }
  }
}
