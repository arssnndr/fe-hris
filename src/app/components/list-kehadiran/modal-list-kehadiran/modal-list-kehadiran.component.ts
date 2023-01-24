import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { ApiService } from 'src/app/shared/api.service';
import { AbsenManualComponent } from './absen-manual/absen-manual.component';

@Component({
  selector: 'app-modal-list-kehadiran',
  templateUrl: './modal-list-kehadiran.component.html',
  styleUrls: ['./modal-list-kehadiran.component.css'],
})
export class ModalListKehadiranComponent implements OnInit {
  table: any[] = [];
  isIn: boolean = false;

  status: any[] = [
    'HT',
    'PA',
    'DDK',
    'DLK',
    'Cuti',
    'CK',
    'CB',
    'Mangkir',
    'ISP',
    'ISH',
    'Hadir',
    'Off',
  ];
  statusKehadiran = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private api: ApiService
  ) {
    switch (data.name) {
      case 'editKehadiran':
        this.table.push(
          {
            tgl: data.data.jadwal_kerja[data.index.indexBln][
              data.index.indexTgl
            ].tgl,
            jam: data.data.jadwal_kerja[data.index.indexBln][
              data.index.indexTgl
            ].masuk,
            isIn: true,
          },
          {
            tgl: data.data.jadwal_kerja[data.index.indexBln][
              data.index.indexTgl
            ].tgl,
            jam: data.data.jadwal_kerja[data.index.indexBln][
              data.index.indexTgl
            ].keluar,
            isIn: false,
          }
        );
        break;
      case 'cutiTahunan':
        console.log(data);
    }
  }

  ngOnInit(): void {
    this.funcStatusKehadiran();
  }

  funcStatusKehadiran() {
    switch (
      this.data.data.jadwal_kerja[this.data.index.indexBln][
        this.data.index.indexTgl
      ].status_kehadiran.cuti.status
    ) {
      case 'Cuti Tahunan':
        this.statusKehadiran = 'Cuti';
        break;
      case 'Cuti Khusus':
        this.statusKehadiran = 'CK';
        break;
      case 'Izin':
        this.statusKehadiran = this.data.data.jadwal_kerja[
          this.data.index.indexBln
        ][this.data.index.indexTgl].status_kehadiran.cuti.izin_seharian
          ? 'ISP'
          : 'ISH';
        break;
      case 'Perjalanan Dinas':
        this.statusKehadiran = this.data.data.jadwal_kerja[
          this.data.index.indexBln
        ][this.data.index.indexTgl].status_kehadiran.cuti.dinas_dalkot
          ? 'DDK'
          : 'DLK';
        break;
      case 'Mangkir':
        this.statusKehadiran = 'Mangkir';
        break;
      default:
        this.statusKehadiran = 'Hadir';
        break;
    }
  }

  formatDate(date: string) {
    return moment(date, 'DD-MM-YYYY').format('D MMM YYYY');
  }

  deleteData(index: number) {
    this.table.splice(index, index - 1);
  }

  absenManual() {
    const dialogRef = this.dialog.open(AbsenManualComponent, {
      data: {
        nip: this.data.data.nip,
        nama: this.data.data.nama_lengkap,
        tgl: this.data.data.jadwal_kerja[this.data.index.indexBln][
          this.data.index.indexTgl
        ].tgl,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        result.status
          ? (this.data.data.jadwal_kerja[this.data.index.indexBln][
              this.data.index.indexTgl
            ].masuk = result.jam)
          : (this.data.data.jadwal_kerja[this.data.index.indexBln][
              this.data.index.indexTgl
            ].keluar = result.jam);
        this.table.push({
          tgl: this.data.data.jadwal_kerja[this.data.index.indexBln][
            this.data.index.indexTgl
          ].tgl,
          jam: result.jam,
          isIn: result.status,
        });
      }
    });
  }

  throwResult() {
    this.api.throwData(this.data.data);
  }
}
