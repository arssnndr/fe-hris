import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import * as moment from 'moment';
import { ApiService } from 'src/app/shared/api.service';
import { utils, writeFileXLSX } from 'xlsx';
import { ModalKaryawanComponent } from './modal-karyawan/modal-karyawan.component';

@Component({
  selector: 'app-karyawan',
  templateUrl: './karyawan.component.html',
  styleUrls: ['./karyawan.component.css'],
})
export class KaryawanComponent implements OnInit {
  tableKaryawan: string = 'ms_karyawan/';
  dataKaryawan: any;
  biggestNip: any[] = [];

  search: string = '';
  filter: any;

  paginator = {
    length: 0,
    pageIndex: 0,
    pageSize: 50,
    pageSizeOptions: [50, 100, 150, 200],
  };

  constructor(private api: ApiService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.api.getData(this.tableKaryawan).subscribe((res) => {
      this.paginator.length = res.length;

      const setPerusahaan = [...new Set(res.map((val: any) => val.perusahaan))];

      setPerusahaan.forEach((val) => {
        const setNip = res.map((ress: any) =>
          ress.perusahaan === val ? ress.nip : '0'
        );
        this.biggestNip.push({
          perusahaan: val,
          nip: Math.max(...setNip.map(Number)),
        });
      });

      this.getDataPerPage();
    });
  }

  getDataPerPage() {
    let param;

    isNaN(Number(this.search))
      ? (param = '?nama_lengkap_like=' + this.search)
      : (param = '?nip_like=' + this.search);
    if (this.filter !== undefined) {
      if (
        this.filter.lokasi.length === 0 &&
        this.filter.divisi.length === 0 &&
        this.filter.departemen.length === 0 &&
        this.filter.sub_departemen.length === 0 &&
        this.filter.perusahaan.length === 0
      ) {
        this.filter = undefined;
        this.ngOnInit();
      } else {
        param +=
          '&lokasi_like=' +
          this.filter.lokasi +
          '&divisi_like=' +
          this.filter.divisi +
          '&departemen_like=' +
          this.filter.departemen +
          '&sub_departemen_like=' +
          this.filter.sub_departemen +
          '&perusahaan_like=' +
          this.filter.perusahaan;
      }
    }
    this.api
      .getData(
        this.tableKaryawan +
          param +
          '&_limit=' +
          this.paginator.pageSize +
          '&_page=' +
          (this.paginator.pageIndex + 1)
      )
      .subscribe((res) => {
        this.dataKaryawan = res;
        if (this.search.length !== 0 || this.filter !== undefined) {
          this.paginator.length = res.length;
        }
      });
  }

  handlePageEvent(e: PageEvent) {
    this.paginator.pageSize = e.pageSize;
    this.paginator.pageIndex = e.pageIndex;
    this.getDataPerPage();
  }

  filterData() {
    this.dialog
      .open(ModalKaryawanComponent, {
        data: { name: 'filter', data: this.filter },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res !== undefined) {
          this.filter = res;
          this.getDataPerPage();
        }
      });
  }

  tambahData() {
    this.dialog
      .open(ModalKaryawanComponent, { data: { name: 'tambah' } })
      .afterClosed()
      .subscribe((res) => {
        if (res !== undefined) {
          this.biggestNip.forEach((val) => {
            if (val.perusahaan === res.perusahaan) {
              res.nip = (val.nip + 1).toString();
            }
          });
          this.api.postData(this.tableKaryawan, res).subscribe(() => {
            this.ngOnInit();
          });
        }
      });
  }

  editData(data: any) {
    this.dialog
      .open(ModalKaryawanComponent, { data: { name: 'edit', data: data } })
      .afterClosed()
      .subscribe((res) => {
        if (res !== undefined) {
          this.api.updateData(this.tableKaryawan, res, res.id).subscribe(() => {
            this.getDataPerPage();
          });
        }
      });
  }

  deleteData(id: number) {
    this.dialog
      .open(ModalKaryawanComponent, { data: { name: 'delete' } })
      .afterClosed()
      .subscribe((res) => {
        if (res === 'ya') {
          this.api.deleteData(this.tableKaryawan + id).subscribe(() => {
            this.search.length === 0 && this.filter === undefined
              ? this.ngOnInit()
              : this.getDataPerPage();
          });
        }
      });
  }

  formatDate(date: string) {
    return moment(date).format('DD MMM YYYY');
  }

  printData() {
    let content = this.dataKaryawan.map((res: any) => ({
      NIP: res.nip,
      'Nama Karyawan': res.nama_lengkap,
      'Tanggal Lahir': this.formatDate(res.tgl_lahir),
      'Tanggal Join': this.formatDate(res.tgl_join),
      'Status Karyawan': res.status_karyawan,
      'Tanggal Efektif Terminasi': this.formatDate(res.tgl_efektif_terminasi),
      'Alasan Terminasi': res.alasan_terminasi,
    }));
    const ws = utils.json_to_sheet(content);
    const wsTemp = utils.json_to_sheet(content);
    let length = Number(ws['!ref']?.slice(4));
    let cell = 4;

    ws['!ref'] = 'A1:G' + (length + cell);
    for (let i = 1; i <= 4; i++) {
      ws['A' + i] = { t: 's', v: '' };
      ws['B' + i] = { t: 's', v: '' };
      ws['C' + i] = { t: 's', v: '' };
      ws['D' + i] = { t: 's', v: '' };
      ws['E' + i] = { t: 's', v: '' };
      ws['F' + i] = { t: 's', v: '' };
      ws['G' + i] = { t: 's', v: '' };
    }

    ws['A1'] = { t: 's', v: 'History Status' };
    ws['F1'] = { t: 's', v: 'Tanggal Cetak' };
    ws['F2'] = { t: 's', v: 'User :' };
    ws['G1'] = { t: 's', v: moment().format('DD MMM YYYY') };
    ws['G2'] = { t: 's', v: window.localStorage.getItem('key') };

    for (let i = 0; i < length; i++) {
      ws['A' + (i + cell)] = wsTemp['A' + (i + 1)];
      ws['B' + (i + cell)] = wsTemp['B' + (i + 1)];
      ws['C' + (i + cell)] = wsTemp['C' + (i + 1)];
      ws['D' + (i + cell)] = wsTemp['D' + (i + 1)];
      ws['E' + (i + cell)] = wsTemp['E' + (i + 1)];
      ws['F' + (i + cell)] = wsTemp['F' + (i + 1)];
      ws['G' + (i + cell)] = wsTemp['G' + (i + 1)];
    }

    const wb = utils.book_new();

    utils.book_append_sheet(wb, ws);
    writeFileXLSX(wb, 'Bagian Kerja.xlsx');
  }
}
