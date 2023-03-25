import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { ApiService } from 'src/app/shared/api.service';
import { VoidComponent } from '../../modals/void/void.component';
import { ModalSetupJadwalKerjaCategoryComponent } from './modal-setup-jadwal-kerja-category/modal-setup-jadwal-kerja-category.component';
import { ModalSetupJadwalKerjaDetailComponent } from './modal-setup-jadwal-kerja-detail/modal-setup-jadwal-kerja-detail.component';
import { ModalSetupJadwalKerjaIndividuComponent } from './modal-setup-jadwal-kerja-individu/modal-setup-jadwal-kerja-individu.component';

@Component({
  selector: 'app-setup-jadwal-kerja',
  templateUrl: './setup-jadwal-kerja.component.html',
  styleUrls: ['./setup-jadwal-kerja.component.css'],
})
export class SetupJadwalKerjaComponent implements OnInit {
  constructor(private api: ApiService, public dialog: MatDialog) {}

  selectedIndex = 0;

  ngOnInit(): void {
    this.getDataJadwalKerjaDetail();
    this.getDataJadwalKerjaCategory();

    this.getDataJadwalKerjaIndividu();
  }

  formatDate(date: string) {
    return moment(date).format('DD MMM YYYY');
  }

  formatYearMonth(date: string) {
    return moment(date).format('YYYY-MM');
  }

  // DETAIL
  tabelJadwalKerjaDetail = 'trx_jadwalkerjadetail/';
  dataJadwalKerjaDetail: any;
  dataJadwalKerjaPerMonth: any;
  dataFiltered: any;
  dataSelected: any;

  periode = moment().format('YYYY-MM');
  indexProfile = 0;

  getDataJadwalKerjaDetail() {
    this.api.getData(this.tabelJadwalKerjaDetail).subscribe((res) => {
      this.dataJadwalKerjaDetail = res;
      this.dataSelected = res[0];
      this.getDataJadwalKerjaPerMonth(this.indexProfile, this.periode);
    });
  }

  getDataJadwalKerjaPerMonth(index: number, periode: string) {
    this.indexProfile = index;
    this.dataSelected = this.dataJadwalKerjaDetail[index];
    this.dataJadwalKerjaPerMonth = [];
    this.dataJadwalKerjaDetail[index].jadwal_kerja.forEach((res: any) => {
      if (periode === this.formatYearMonth(res.tgl)) {
        this.dataJadwalKerjaPerMonth.push(res);
      }
    });
  }

  filterNip(nip: any) {
    this.api
      .getData(this.tabelJadwalKerjaDetail + '?nip_like=' + nip.value)
      .subscribe((res) => (this.dataFiltered = res));
  }

  selectNip(data: any) {
    this.dataSelected = data;
  }

  selectJadwalKerja(tgl: string) {
    this.dialog
      .open(ModalSetupJadwalKerjaDetailComponent, {
        data: {
          event: 'editJadwalKerjaDetail',
          editData: this.dataSelected,
          tgl: tgl,
        },
      })
      .afterClosed()
      .subscribe((res: any) => {
        this.api
          .updateData(this.tabelJadwalKerjaDetail, res, res.id)
          .subscribe(() => {
            this.ngOnInit();
          });
      });
  }

  // CATEGORY
  isButton = false;
  tabelJadwalKerjaCategory = 'trx_jadwalkerjacategory/';
  dataJadwalKerjaCategory: any;

  getDataJadwalKerjaCategory() {
    this.api
      .getData(this.tabelJadwalKerjaCategory)
      .subscribe((res) => (this.dataJadwalKerjaCategory = res));
  }

  tambahJadwalKerjaCategory() {
    this.dialog
      .open(ModalSetupJadwalKerjaCategoryComponent)
      .afterClosed()
      .subscribe((res) => {
        if (res !== undefined) {
          this.api
            .postData(this.tabelJadwalKerjaCategory, res)
            .subscribe(() => this.getDataJadwalKerjaCategory);
        }
      });
  }

  editJadwalKerjaCategory(data: any) {
    this.dialog
      .open(ModalSetupJadwalKerjaCategoryComponent, { data: data })
      .afterClosed()
      .subscribe((res) => {
        if (res !== undefined) {
          this.api
            .updateData(this.tabelJadwalKerjaCategory, res, data.id)
            .subscribe(() => this.getDataJadwalKerjaCategory());
        }
      });
  }

  voidCategory(id: number) {
    this.dialog
      .open(VoidComponent)
      .afterClosed()
      .subscribe((res) => {
        if (res === 'ya') {
          this.api
            .deleteData(this.tabelJadwalKerjaCategory + id)
            .subscribe(() => this.getDataJadwalKerjaCategory());
        }
      });
  }

  // INDIVIDU
  tabelJadwalKerjaIndividu = 'trx_jadwalkerjaindividu/';
  dataJadwalKerjaIndividu: any;

  getDataJadwalKerjaIndividu() {
    this.api
      .getData(this.tabelJadwalKerjaIndividu)
      .subscribe((res) => (this.dataJadwalKerjaIndividu = res));
  }

  tambahJadwalKerjaIndividu() {
    this.dialog
      .open(ModalSetupJadwalKerjaIndividuComponent)
      .afterClosed()
      .subscribe((res) => {
        if (res !== undefined) {
          this.api
            .postData(this.tabelJadwalKerjaIndividu, res)
            .subscribe(() => this.getDataJadwalKerjaIndividu());
        }
      });
  }

  editJadwalKerjaIndividu(data: any) {
    this.dialog
      .open(ModalSetupJadwalKerjaIndividuComponent, { data: data })
      .afterClosed()
      .subscribe((res) => {
        if (res !== undefined) {
          this.api
            .updateData(this.tabelJadwalKerjaIndividu, res, data.id)
            .subscribe(() => this.getDataJadwalKerjaIndividu());
        }
      });
  }

  voidIndividu(id: number) {
    this.dialog
      .open(VoidComponent)
      .afterClosed()
      .subscribe((res) => {
        if (res === 'ya') {
          this.api
            .deleteData(this.tabelJadwalKerjaIndividu + id)
            .subscribe(() => this.getDataJadwalKerjaIndividu());
        }
      });
  }

  // printData(name: string) {
  //   let header: any[] = [];
  //   let content;
  //   let column;

  //   switch (name) {
  //     case 'History Status':
  //       header = [
  //         ['A1', name],
  //         ['F1', 'Tanggal Cetak'],
  //         ['F2', 'User :'],
  //         ['G1', moment().format('DD MMM YYYY')],
  //         ['G2', window.localStorage.getItem('key')],
  //       ];
  //       content = this.dataJadwalKerjaCategory.map((res: any) => ({
  //         NIP: res.nip,
  //         'Nama Karyawan': res.nama_lengkap,
  //         'Tanggal Lahir': this.formatDate(res.tgl_lahir),
  //         'Tanggal Join': this.formatDate(res.tgl_join),
  //         'Status Karyawan': res.status_karyawan,
  //         'Tanggal Efektif Terminasi': this.formatDate(
  //           res.tgl_efektif_terminasi
  //         ),
  //         'Alasan Terminasi': res.alasan_terminasi,
  //       }));
  //       break;

  //     case 'History Penugasan':
  //       header = [
  //         ['A1', name],
  //         ['L1', 'Tanggal Cetak'],
  //         ['L2', 'User :'],
  //         ['M1', moment().format('DD MMM YYYY')],
  //         ['M2', window.localStorage.getItem('key')],
  //       ];
  //       content = this.dataKaryawan.map((res: any) => ({
  //         NIP: res.nip,
  //         'Nama Karyawan': res.nama_lengkap,
  //         'Tanggal Lahir': this.formatDate(res.tgl_lahir),
  //         'Tanggal Perubahan': this.formatDate(res.tgl_perubahan_detasir),
  //         'Lokasi Kerja': res.lokasi,
  //         Divisi: res.divisi,
  //         Departemen: res.departemen,
  //         'Sub Departemen': res.sub_departemen,
  //         Jabatan: res.jabatan,
  //         'Tanggal Mulai Detasir': this.formatDate(res.tgl_akhir_detasir),
  //         'Tanggal Akhir Detasir': this.formatDate(res.tgl_akhir_detasir),
  //         'Lokasi Detasir': res.lokasi_detasir,
  //         'Alasan Detasir': res.alasan_detasir,
  //       }));
  //       break;
  //   }

  //   column =
  //     Object.keys(content[0]).length > 25
  //       ? 'A' + String.fromCharCode((Object.keys(content[0]).length % 26) + 64)
  //       : String.fromCharCode(Object.keys(content[0]).length + 64);

  //   const ws = utils.json_to_sheet(content);
  //   const wsTemp = utils.json_to_sheet(content);

  //   let length = Number(ws['!ref']?.split(column, 2)[1]);
  //   let gap = 4;

  //   ws['!ref'] = 'A1:' + column + (length + gap);
  //   for (let i = 1; i <= 4; i++) {
  //     Object.keys(content[0]).forEach((_, index) => {
  //       index > 25
  //         ? (ws['A' + String.fromCharCode(65 + index - 26) + i] = {
  //             t: 's',
  //             v: '',
  //           })
  //         : (ws[String.fromCharCode(65 + index) + i] = { t: 's', v: '' });
  //     });
  //   }

  //   header.forEach((res) => (ws[res[0]] = { t: 's', v: res[1] }));

  //   for (let i = 0; i < length; i++) {
  //     Object.keys(content[0]).forEach((_, index) => {
  //       index > 25
  //         ? (ws['A' + String.fromCharCode(65 + index - 26) + (i + gap)] =
  //             wsTemp['A' + String.fromCharCode(65 + index - 26) + (i + 1)])
  //         : (ws[String.fromCharCode(65 + index) + (i + gap)] =
  //             wsTemp[String.fromCharCode(65 + index) + (i + 1)]);
  //     });
  //   }

  //   const wb = utils.book_new();

  //   utils.book_append_sheet(wb, ws);
  //   writeFileXLSX(wb, name + '.xlsx');
  // }
}
