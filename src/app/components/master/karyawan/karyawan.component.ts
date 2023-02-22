import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ApiService } from 'src/app/shared/api.service';
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
}
