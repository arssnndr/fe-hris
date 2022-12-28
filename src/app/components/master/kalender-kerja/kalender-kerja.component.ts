import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/api.service';
import { ModalKalenderKerjaComponent } from './modal-kalender-kerja/modal-kalender-kerja.component';

@Component({
  selector: 'app-kalender-kerja',
  templateUrl: './kalender-kerja.component.html',
  styleUrls: ['./kalender-kerja.component.css'],
})
export class KalenderKerjaComponent implements OnInit {
  tableKalenderKerja = 'ms_kalenderkerja/';
  dataKalenderKerja!: any;

  tahun = [
    { value: '2020' },
    { value: '2021' },
    { value: '2022' },
    { value: '2023' },
  ];
  tahunValue = this.tahun[0].value;

  lokasi = [
    { value: 'TMS HO' },
    { value: 'TMS 1' },
    { value: 'TMS 2' },
    { value: 'TMS 3' },
    { value: 'TMS 4' },
  ];
  lokasiValue = this.lokasi[0].value;

  constructor(private api: ApiService, public dialog: MatDialog) {}

  tambahData() {
    const dialogRef = this.dialog.open(ModalKalenderKerjaComponent, {
      data: { name: 'tambah' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
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
      data: { name: 'edit', data: data },
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
  }

  searchData() {
    this.getAllData();
  }
}
