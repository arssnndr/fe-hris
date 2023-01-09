import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ModalBagianKerjaComponent } from './modal-bagian-kerja/modal-bagian-kerja.component';
import xlsx from 'json-as-xlsx';
import * as moment from 'moment';
moment.locale('id');

@Component({
  selector: 'app-bagian-kerja',
  templateUrl: './bagian-kerja.component.html',
  styleUrls: ['./bagian-kerja.component.css'],
})
export class BagianKerjaComponent implements OnInit {
  table = 'ms_bagiankerja/';
  dataSearch = '';
  pageSize = 50;
  pageIndex = 0;
  pageSizeOption = [50, 100, 150, 200];
  showFirstLastButtons = false;
  data!: any;
  length: any;
  catchResult: any;
  lokasiValue = '';

  constructor(private api: ApiService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllData();
  }

  printData() {
    let content = this.data.map((res: any) => ({
      jenis: res.jenis_bagian,
      lokasi: res.lokasi,
      uplink: res.divisi === undefined ? res.departemen : res.divisi,
      deskripsi: res.sub_departemen,
    }));

    let data = [
      {
        sheet: 'Sheet1',
        columns: [
          { label: 'Jenis', value: 'jenis' },
          { label: 'Lokasi', value: 'lokasi' },
          { label: 'Uplink', value: 'uplink' },
          { label: 'Deskripsi', value: 'deskripsi' },
        ],
        content: content,
      },
    ];

    let settings = {
      fileName: 'MySpreadsheet', // Name of the resulting spreadsheet
      extraLength: 3, // A bigger number means that columns will be wider
      writeMode: 'writeFile', // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
      writeOptions: {}, // Style options from https://docs.sheetjs.com/docs/api/write-options
      // RTL: false, // Display the columns from right-to-left (the default value is false)
    };

    let callback = function (sheet: any) {
      console.log('Download complete:', sheet);
    };

    xlsx(data, settings, callback)
  }

  tambahData() {
    const dialogRef = this.dialog.open(ModalBagianKerjaComponent, {
      data: { name: 'tambah' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'simpan') {
        this.catchResult = this.api.catchData();
        this.api.postData(this.table, this.catchResult).subscribe((res) => {
          this.length = this.length + 1;
          this.getPageData();
        });
      }
    });
  }

  editData(data: any) {
    let id = data.id;
    const dialogRef = this.dialog.open(ModalBagianKerjaComponent, {
      data: { name: 'edit', edit: data },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'simpan') {
        this.catchResult = this.api.catchData();
        this.api
          .updateData(this.table, this.catchResult, id)
          .subscribe((res) => {
            this.getPageData();
          });
      }
    });
  }

  deleteData(id: number) {
    const dialogRef = this.dialog.open(ModalBagianKerjaComponent, {
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
        .getData(this.table + '?keterangan_like=' + this.dataSearch)
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
  }
}
