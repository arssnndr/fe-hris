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
  filteredKalenderKerja: any[] = [];

  tableBagianKerja = 'ms_bagiankerja/';
  dataBagianKerja!: any;

  tahun = ['2022', '2023'];
  tahunValue = this.tahun[0];

  lokasi = ['TMS HO', 'TMS 1', 'TMS 2', 'TMS 3', 'TMS 4'];
  lokasiValue = this.lokasi[0];

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
            this.ngOnInit();
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
            this.ngOnInit();
          });
      }
      this.ngOnInit();
    });
  }

  deleteData(id: number) {
    const dialogRef = this.dialog.open(ModalKalenderKerjaComponent, {
      data: { name: 'delete' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'ya') {
        this.api.deleteData(this.tableKalenderKerja + id).subscribe(() => {
          this.ngOnInit();
        });
      }
    });
  }

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData() {
    this.api.getData(this.tableKalenderKerja).subscribe((res) => {
      this.dataKalenderKerja = res;
    });
    this.api.getData(this.tableBagianKerja).subscribe((res) => {
      this.dataBagianKerja = res;
    });
  }

  filterDataKalenderKerja(type: any, data: any) {
    type === 'tahun' ? (type = true) : (type = false);
    this.dataKalenderKerja.filter((res: any) => {
      if (type) {
        res.tgl.includes(data.value)
          ? this.filteredKalenderKerja.push(res)
          : undefined;
      } else {
        res.lokasi.includes(data.value)
          ? this.filteredKalenderKerja.push(res)
          : undefined;
      }
    });
    console.log(this.filteredKalenderKerja);
  }

  dateFormat(date: any) {
    return moment(date, 'YYYY-MM-DD').format('DD MMM YYYY');
  }
}
