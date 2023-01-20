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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog
  ) {
    console.log(data);
    this.table.push(
      {
        tgl: data.data.tgl,
        jam: data.data.masuk,
        isIn: true,
      },
      {
        tgl: data.data.tgl,
        jam: data.data.keluar,
        isIn: false,
      }
    );
  }

  ngOnInit(): void {}

  formatDate(date: string) {
    return moment(date, 'DD-MM-YYYY').format('D MMM YYYY');
  }

  absenManual() {
    const dialogRef = this.dialog.open(AbsenManualComponent, {
      data: {
        nip: this.data.dataProfil.nip,
        nama: this.data.dataProfil.nama_lengkap,
        tgl: this.data.data.tgl,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  throwResult() {}
}
