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

  printData(name: string) {
    let header: any[] = [];
    let content;
    let column;

    switch (name) {
      case 'History Status':
        header = [
          ['A1', 'History Status'],
          ['F1', 'Tanggal Cetak'],
          ['F2', 'User :'],
          ['G1', moment().format('DD MMM YYYY')],
          ['G2', window.localStorage.getItem('key')],
        ];
        content = this.dataKaryawan.map((res: any) => ({
          NIP: res.nip,
          'Nama Karyawan': res.nama_lengkap,
          'Tanggal Lahir': this.formatDate(res.tgl_lahir),
          'Tanggal Join': this.formatDate(res.tgl_join),
          'Status Karyawan': res.status_karyawan,
          'Tanggal Efektif Terminasi': this.formatDate(
            res.tgl_efektif_terminasi
          ),
          'Alasan Terminasi': res.alasan_terminasi,
        }));
        break;

      case 'History Penugasan':
        header = [
          ['A1', 'History Penugasan'],
          ['L1', 'Tanggal Cetak'],
          ['L2', 'User :'],
          ['M1', moment().format('DD MMM YYYY')],
          ['M2', window.localStorage.getItem('key')],
        ];
        content = this.dataKaryawan.map((res: any) => ({
          NIP: res.nip,
          'Nama Karyawan': res.nama_lengkap,
          'Tanggal Lahir': res.tgl_lahir,
          'Tanggal Perubahan': res.tgl_perubahan_detasir,
          'Lokasi Kerja': res.lokasi,
          Divisi: res.divisi,
          Departemen: res.departemen,
          'Sub Departemen': res.sub_departemen,
          Jabatan: res.jabatan,
          'Tanggal Mulai Detasir': res.tgl_mulai_detasir,
          'Tanggal Akhir Detasir': res.tgl_akhir_detasir,
          'Lokasi Detasir': res.lokasi_detasir,
          'Alasan Detasir': res.alasan_detasir,
        }));
        break;
    }

    column = String.fromCharCode(Object.keys(content[0]).length + 64);

    const ws = utils.json_to_sheet(content);
    const wsTemp = utils.json_to_sheet(content);

    let length = Number(ws['!ref']?.split(column, 2)[1]);
    let gap = 4;

    ws['!ref'] = 'A1:' + column + (length + gap);
    for (let i = 1; i <= 4; i++) {
      Object.keys(content[0]).forEach((_, index) => {
        ws[String.fromCharCode(65 + index) + i] = { t: 's', v: '' };
      });
    }

    header.forEach((res) => (ws[res[0]] = { t: 's', v: res[1] }));

    for (let i = 0; i < length; i++) {
      Object.keys(content[0]).forEach((_, index) => {
        ws[String.fromCharCode(65 + index) + (i + gap)] =
          wsTemp[String.fromCharCode(65 + index) + (i + 1)];
      });
    }

    const wb = utils.book_new();

    utils.book_append_sheet(wb, ws);
    writeFileXLSX(wb, name + '.xlsx');
  }
}
