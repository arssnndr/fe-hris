import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { ApiService } from 'src/app/shared/api.service';
import { VoidComponent } from '../../modals/void/void.component';
import { ModalSetupJadwalKerjaCategoryComponent } from './modal-setup-jadwal-kerja-category/modal-setup-jadwal-kerja-category.component';
import { ModalSetupJadwalKerjaDetailComponent } from './modal-setup-jadwal-kerja-detail/modal-setup-jadwal-kerja-detail.component';

@Component({
  selector: 'app-setup-jadwal-kerja',
  templateUrl: './setup-jadwal-kerja.component.html',
  styleUrls: ['./setup-jadwal-kerja.component.css'],
})
export class SetupJadwalKerjaComponent implements OnInit {
  constructor(private api: ApiService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getDataJadwalKerjaDetail();
    this.getDataJadwalKerjaCategory();
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

  selectedIndex = 1;

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

  void(id: number) {
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
}
