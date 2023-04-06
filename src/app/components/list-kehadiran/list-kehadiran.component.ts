import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import * as moment from 'moment';
import { ApiService } from 'src/app/shared/api.service';
import { environment } from 'src/environments/environment';
import { utils, writeFileXLSX } from 'xlsx';
import { ModalStatusKehadiranComponent } from '../status-kehadiran/modal-status-kehadiran/modal-status-kehadiran.component';
import { ModalFilterDialogComponent } from './modal-filter-dialog/modal-filter-dialog.component';
import { ModalListKehadiranComponent } from './modal-list-kehadiran/modal-list-kehadiran.component';

@Component({
  selector: 'app-list-kehadiran',
  templateUrl: './list-kehadiran.component.html',
  styleUrls: ['./list-kehadiran.component.css'],
})
export class ListKehadiranComponent implements OnInit {
  akses = this.api.akses.role_list_kehadiran;

  dataListKehadiran: any;
  selectedDataListKehadiran: any;
  jadwalKerjaPerMonth: any;

  filteredDataListKehadiran: any;

  selectedMonth = moment().format('YYYY-MM');

  filterProfile = {
    lokasi: 'All',
    perusahaan: 'All',
    divisi: 'All',
    departemen: 'All',
    sub_departemen: 'All',
  };

  constructor(private api: ApiService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getDataListKehadiran();
  }

  formatDate(date: string) {
    return moment(date).format('DD MMM YYYY');
  }

  splitTime(time: any) {
    return time.split(':')[0];
  }

  getDataListKehadiran() {
    const lokasi =
      this.filterProfile.lokasi === 'All' ? '' : this.filterProfile.lokasi;

    const perusahaan =
      this.filterProfile.perusahaan === 'All'
        ? ''
        : this.filterProfile.perusahaan;

    const divisi =
      this.filterProfile.divisi === 'All' ? '' : this.filterProfile.divisi;

    const departemen =
      this.filterProfile.departemen === 'All'
        ? ''
        : this.filterProfile.departemen;

    const sub_departemen =
      this.filterProfile.sub_departemen === 'All'
        ? ''
        : this.filterProfile.sub_departemen;

    this.api
      .getData(
        environment.tabelListKehadiran +
          '?lokasi_like=' +
          lokasi +
          '&perusahaan_like=' +
          perusahaan +
          '&divisi_like=' +
          divisi +
          '&departemen_like=' +
          departemen +
          '&sub_departemen_like=' +
          sub_departemen
      )
      .subscribe((res) => {
        this.dataListKehadiran = res;
        this.selectedDataListKehadiran = res[0];
        this.getJadwalKerjaPerMonth(this.selectedMonth);
      });
  }

  getJadwalKerjaPerMonth(month: any) {
    this.jadwalKerjaPerMonth =
      this.selectedDataListKehadiran?.jadwal_kerja.filter((res: any) =>
        res.tgl.includes(month)
      );
  }

  filterDataListKehadiran(nip: any) {
    nip = nip.value;
    this.api
      .getData(environment.tabelListKehadiran + '?nip_like=' + nip)
      .subscribe((res) => (this.filteredDataListKehadiran = res));
  }

  selectDataListKehadiran(event: any) {
    this.selectedDataListKehadiran = event;
    this.getJadwalKerjaPerMonth(this.selectedMonth);
  }

  filterDialog() {
    const element = document.getElementById('filter');
    const rect = element!.getBoundingClientRect();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.position = {
      top: `${rect.bottom}px`,
      right: `${rect.right - rect.left}px`,
    };
    dialogConfig.width = 'max-content';
    dialogConfig.height = 'max-content';
    dialogConfig.data = this.filterProfile;

    this.dialog
      .open(ModalFilterDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe((res) => {
        if (res !== undefined) {
          this.filterProfile = res;
          this.getDataListKehadiran();
        }
      });
  }

  editJadwalkerja(event: any) {
    this.akses.edit
      ? this.dialog
          .open(ModalListKehadiranComponent, {
            data: { data: this.selectedDataListKehadiran, date: event.tgl },
          })
          .afterClosed()
          .subscribe((res) => {
            if (res !== undefined) {
              this.api
                .updateData(environment.tabelListKehadiran, res, res.id)
                .subscribe(() => this.getDataListKehadiran());
            }
          })
      : alert('Anda tidak memiliki Akses');
  }

  cuti(event: string, data: any) {
    data.nip = this.selectedDataListKehadiran.nip;
    data.nama_lengkap = this.selectedDataListKehadiran.nama_lengkap;

    if (data.status_cuti === 'Hadir' || data.status_cuti === 'Mangkir') {
      data.status_cuti = event;

      this.api
        .getData(environment.tabelStatusKehadiran + '?nip_like=' + data.nip)
        .subscribe((res) => {
          const {
            hak_cuti_diambil,
            hak_cuti_telah_diambil,
            hak_cuti_tersedia,
            hak_cuti_tersisa,
            tgl_berakhir_hak_cuti,
            tgl_muncul_hak_cuti,
          } = res[0];

          data.hak_cuti_diambil = hak_cuti_diambil;
          data.hak_cuti_telah_diambil = hak_cuti_telah_diambil;
          data.hak_cuti_tersedia = hak_cuti_tersedia;
          data.hak_cuti_tersisa = hak_cuti_tersisa;
          data.tgl_berakhir_hak_cuti = tgl_berakhir_hak_cuti;
          data.tgl_muncul_hak_cuti = tgl_muncul_hak_cuti;
        });
    }

    this.akses.edit
      ? this.dialog
          .open(ModalStatusKehadiranComponent, {
            data: data,
          })
          .afterClosed()
          .subscribe((res) => {
            if (res !== undefined) {
              delete res['nip'];
              delete res['nama_lengkap'];

              this.selectedDataListKehadiran.jadwal_kerja.forEach(
                (val: any, index: number) => {
                  if (val.tgl === res.tgl)
                    this.selectedDataListKehadiran.jadwal_kerja[index] = res;
                }
              );

              this.api
                .updateData(
                  environment.tabelListKehadiran,
                  this.selectedDataListKehadiran,
                  this.selectedDataListKehadiran.id
                )
                .subscribe(() => this.getDataListKehadiran());
            } else {
              this.getDataListKehadiran();
            }
          })
      : alert('Anda tidak memiliki Akses');
  }

  dateFormat(date: string) {
    return moment(date).format('DD MMM YYYY');
  }

  printData(name: string) {
    let header: any[] = [];
    let content;
    let column;
    header = [
      ['A1', 'NIP'],
      ['A2', 'Nama Karyawan'],
      ['A3', 'Jabatan'],
      ['A4', 'Lokasi Kerja'],
      ['A5', 'Divisi'],
      ['A6', 'Departemen'],
      ['A7', 'Sub Departemen'],
      ['A8', 'Periode'],
      ['B1', ': ' + this.selectedDataListKehadiran.nip],
      ['B2', ': ' + this.selectedDataListKehadiran.nama_lengkap],
      ['B3', ': ' + this.selectedDataListKehadiran.jabatan],
      ['B4', ': ' + this.selectedDataListKehadiran.lokasi],
      ['B5', ': ' + this.selectedDataListKehadiran.divisi],
      ['B6', ': ' + this.selectedDataListKehadiran.departemen],
      ['B7', ': ' + this.selectedDataListKehadiran.sub_departemen],
      ['B8', ': ' + moment(this.selectedMonth, 'YYYY-MM').format('MMM YYYY')],
      ['J1', 'Tanggal Cetak'],
      ['J2', 'User'],
      ['K1', ': ' + moment().format('DD MMM YYYY')],
      ['K2', ': ' + window.localStorage.getItem('key')],
    ];
    content = this.jadwalKerjaPerMonth.map((res: any) => ({
      Tanggal: this.dateFormat(res.tgl),
      Hari: res.hari,
      'ID Jadwal Kerja': res.id_jadwal_kerja,
      'Jadwal Kerja': res.masuk + ' - ' + res.keluar,
      'Jadwal Istirahat': res.start_break + ' - ' + res.end_break,
      'Jam masuk': res.masuk,
      'Jam Keluar': res.keluar,
      Status: res.status_cuti,
      'JK (Jam Kerja)': res.total,
      'TI (Tanpa Istirahat)': '',
      'OT (Over Time)': '',
    }));

    column =
      Object.keys(content[0]).length > 25
        ? 'A' + String.fromCharCode((Object.keys(content[0]).length % 26) + 64)
        : String.fromCharCode(Object.keys(content[0]).length + 64);

    const ws = utils.json_to_sheet(content);
    const wsTemp = utils.json_to_sheet(content);

    let length = Number(ws['!ref']?.split(column, 2)[1]);
    let gap = 10;

    ws['!ref'] = 'A1:' + column + (length + gap);
    for (let i = 1; i <= gap; i++) {
      Object.keys(content[0]).forEach((_, index) => {
        index > 25
          ? (ws['A' + String.fromCharCode(65 + index - 26) + i] = {
              t: 's',
              v: '',
            })
          : (ws[String.fromCharCode(65 + index) + i] = { t: 's', v: '' });
      });
    }

    header.forEach((res) => (ws[res[0]] = { t: 's', v: res[1] }));

    for (let i = 0; i < length; i++) {
      Object.keys(content[0]).forEach((_, index) => {
        index > 25
          ? (ws['A' + String.fromCharCode(65 + index - 26) + (i + gap)] =
              wsTemp['A' + String.fromCharCode(65 + index - 26) + (i + 1)])
          : (ws[String.fromCharCode(65 + index) + (i + gap)] =
              wsTemp[String.fromCharCode(65 + index) + (i + 1)]);
      });
    }

    const wb = utils.book_new();

    utils.book_append_sheet(wb, ws);

    this.akses.download
      ? writeFileXLSX(wb, name + '.xlsx')
      : alert('Anda tidak memiliki Akses');
  }
}
