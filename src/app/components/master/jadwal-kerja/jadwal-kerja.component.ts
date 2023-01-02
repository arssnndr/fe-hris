import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/api.service';
import { ModalJadwalKerjaComponent } from './modal-jadwal-kerja/modal-jadwal-kerja.component';

@Component({
  selector: 'app-jadwal-kerja',
  templateUrl: './jadwal-kerja.component.html',
  styleUrls: ['./jadwal-kerja.component.css'],
})
export class JadwalKerjaComponent implements OnInit {
  table = 'trx_jadwalkerja/';
  data!: any;
  catchResult: any;
  getMaxId = 0;

  lokasi = [
    { value: 'All' },
    { value: 'TMS HO' },
    { value: 'TMS 1' },
    { value: 'TMS 2' },
    { value: 'TMS 3' },
    { value: 'TMS 4' },
  ];
  lokasiValue = this.lokasi[0].value;

  constructor(private api: ApiService, public dialog: MatDialog) {}

  tambahData() {
    const dialogRef = this.dialog.open(ModalJadwalKerjaComponent, {
      data: { name: 'tambah' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      if (result === 'simpan') {
        this.catchResult = this.api.catchData();
        this.api.postData(this.table, this.catchResult).subscribe(() => {
          this.ngOnInit();
        });
      }
    });
  }

  editData(data: any) {
    let id = data.id;
    const dialogRef = this.dialog.open(ModalJadwalKerjaComponent, {
      data: { name: 'edit', data: data },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'simpan') {
        this.catchResult = this.api.catchData();
        let data = this.catchResult;
        this.api.updateData(this.table, data, id).subscribe(() => {
          this.ngOnInit();
        });
      }
      this.ngOnInit();
    });
  }

  deleteData(id: number) {
    const dialogRef = this.dialog.open(ModalJadwalKerjaComponent, {
      data: { name: 'delete' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'ya') {
        this.api.deleteData(this.table + id).subscribe(() => {
          this.ngOnInit();
        });
      }
    });
  }

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData() {
    if (this.lokasiValue === 'All') {
      this.api.getData(this.table).subscribe((res) => {
        this.data = res;
      });
    } else {
      this.api
        .getData(this.table + '?id_lokasi_like=' + this.lokasiValue)
        .subscribe((res) => {
          this.data = res;
        });
    }
  }

  searchData() {
    this.getAllData();
  }
}
