import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { VoidComponent } from '../../modals/void/void.component';
import { AbsenManualComponent } from './absen-manual/absen-manual.component';

@Component({
  selector: 'app-modal-list-kehadiran',
  templateUrl: './modal-list-kehadiran.component.html',
  styleUrls: ['./modal-list-kehadiran.component.css'],
})
export class ModalListKehadiranComponent implements OnInit {
  dataListKehadiran: any;
  selectedJadwalKerja: any;

  tabelStatus: any;

  statusKehadiran: any[] = ['Off', 'Mangkir', 'Hadir'];

  constructor(@Inject(MAT_DIALOG_DATA) data: any, private dialog: MatDialog) {
    this.dataListKehadiran = data.data;
    data.data.jadwal_kerja.filter((res: any) => {
      if (res.tgl.includes(data.date)) this.selectedJadwalKerja = res;
    });
  }

  formatDate(date: string) {
    return moment(date).format('DD MMM YYYY');
  }

  ngOnInit(): void {
    this.tabelStatus = [
      {
        tgl: this.selectedJadwalKerja.tgl,
        jam: this.selectedJadwalKerja.masuk,
        isMasuk: true,
      },
      {
        tgl: this.selectedJadwalKerja.tgl,
        jam: this.selectedJadwalKerja.keluar,
        isMasuk: false,
      },
    ];
  }

  btnVoid(index: number) {
    this.dialog
      .open(VoidComponent)
      .afterClosed()
      .subscribe((res: any) => {
        if (res === 'ya') this.tabelStatus.splice(index, 1);
      });
  }

  absenManual() {
    this.dialog
      .open(AbsenManualComponent, {
        data: {
          nip: this.dataListKehadiran.nip,
          nama: this.dataListKehadiran.nama_lengkap,
          tgl: this.selectedJadwalKerja.tgl,
        },
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res !== undefined)
          this.tabelStatus.push({
            tgl: this.selectedJadwalKerja.tgl,
            jam: res.jam,
            isMasuk: res.isMasuk,
          });
      });
  }

  simpan() {
    this.tabelStatus.forEach((res: any) => {
      res.isMasuk
        ? (this.selectedJadwalKerja.masuk = res.jam)
        : (this.selectedJadwalKerja.keluar = res.jam);
    });

    this.dataListKehadiran.jadwal_kerja.forEach((res: any, index: number) => {
      if (res.tgl === this.selectedJadwalKerja.tgl)
        this.dataListKehadiran.jadwal_kerja[index] = this.selectedJadwalKerja;
    });
  }
}
