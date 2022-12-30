import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/api.service';
import { ModalKalenderKerjaComponent } from './modal-kalender-kerja/modal-kalender-kerja.component';
import * as moment from 'moment';
moment.locale('id');

@Component({
  selector: 'app-kalender-kerja',
  templateUrl: './kalender-kerja.component.html',
  styleUrls: ['./kalender-kerja.component.css'],
})
export class KalenderKerjaComponent implements OnInit {
  tableKalenderKerja = 'ms_kalenderkerja/';
  dataKalenderKerja!: any;
  filteredDataKalenderKerja: any[] = [];

  tableBagianKerja = 'ms_bagiankerja/';
  dataBagianKerja!: any;

  tahun = ['2022', '2023'];

  lokasi = ['TMS HO', 'TMS 1', 'TMS 2', 'TMS 3', 'TMS 4'];

  tahunValue!: string;
  lokasiValue!: string;

  constructor(private api: ApiService, public dialog: MatDialog) {}

  tambahData() {
    const dialogRef = this.dialog.open(ModalKalenderKerjaComponent, {
      data: { name: 'tambah', data: this.dataBagianKerja },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'simpan') {
        let catchResult = this.api.catchData();
        this.api
          .postData(this.tableKalenderKerja, catchResult)
          .subscribe(() => {
            this.getAllData();
          });
      }
    });
  }

  editData(data: any) {
    let id = data.id;
    const dialogRef = this.dialog.open(ModalKalenderKerjaComponent, {
      data: {
        name: 'edit',
        data: { dataEdit: data, dataBagianKerja: this.dataBagianKerja },
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'simpan') {
        let catchResult = this.api.catchData();
        this.api
          .updateData(this.tableKalenderKerja, catchResult, id)
          .subscribe(() => {
            this.getAllData();
          });
      }
    });
  }

  deleteData(id: number) {
    const dialogRef = this.dialog.open(ModalKalenderKerjaComponent, {
      data: { name: 'delete' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'ya') {
        this.api.deleteData(this.tableKalenderKerja + id).subscribe(() => {
          this.getAllData();
        });
      }
    });
  }

  ngOnInit(): void {
    this.tahunValue = '2022';
    this.lokasiValue = 'TMS HO';
    this.getAllData();
  }

  getAllData() {
    this.api.getData(this.tableKalenderKerja).subscribe((res) => {
      this.dataKalenderKerja = res;
      this.filterDataKalenderKerja();
    });
    this.api.getData(this.tableBagianKerja).subscribe((res) => {
      this.dataBagianKerja = res;
    });
  }

  changeFilter(from: string, value: any) {
    from === 'tahun'
      ? (this.tahunValue = value.value)
      : (this.lokasiValue = value.value);
    this.filterDataKalenderKerja();
  }

  async filterTahun(tahun: string) {
    let result: any[] = [];
    this.dataKalenderKerja.map((res: any) => {
      res.tgl.includes(tahun) ? result.push(res) : undefined;
    });
    return result;
  }

  async filterDataKalenderKerja() {
    await this.filterTahun(this.tahunValue).then((res) => {
      this.filteredDataKalenderKerja = [];
      res.map((ress) => {
        ress.lokasi.includes(this.lokasiValue)
          ? this.filteredDataKalenderKerja.push(ress)
          : undefined;
      });
    });
  }

  dateFormat(date: any) {
    return moment(date, 'YYYY-MM-DD').format('DD MMM YYYY');
  }
}
