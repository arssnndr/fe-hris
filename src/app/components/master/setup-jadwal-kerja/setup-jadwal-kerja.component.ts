import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/api.service';
import { ModalSetupJadwalKerjaComponent } from './modal-setup-jadwal-kerja/modal-setup-jadwal-kerja.component';
import * as moment from 'moment';
moment.locale('id');

@Component({
  selector: 'app-setup-jadwal-kerja',
  templateUrl: './setup-jadwal-kerja.component.html',
  styleUrls: ['./setup-jadwal-kerja.component.css'],
})
export class SetupJadwalKerjaComponent implements OnInit {
  tableDetail = 'trx_jadwalkerjadetail/';
  dataDetailAll!: any;
  dataDetailProfil = { id: '', nama_lengkap: '', nip: '', jadwal_kerja: '' };
  dataDetailJadwalKerja!: any;
  dataDetailJadwalKerjaPerMonth: any[] = [];
  yearMonth = moment().format('YYYY-MM');
  dataSearchNip: any[] = [];

  tableCategory = 'trx_jadwalkerjacategory/';
  dataCategory!: any;

  tableIndividu = 'trx_jadwalkerjaindividu/';
  dataIndividu!: any;

  constructor(private api: ApiService, public dialog: MatDialog) {
    this.api.getData(this.tableDetail).subscribe((res) => {
      this.dataDetailAll = res;
      this.dataDetailProfil = res[0];
      this.dataDetailJadwalKerja = res[0].jadwal_kerja;
      this.selectMonth();
    });
    this.api.getData(this.tableCategory).subscribe((res) => {
      this.dataCategory = res;
    });
    this.api.getData(this.tableIndividu).subscribe((res) => {
      this.dataIndividu = res;
    });
  }

  ngOnInit(): void {}

  // START DETAIL
  dateFormat(date: any) {
    return moment(date, 'DD-MM-YYYY').format('DD MMM YYYY');
  }

  selectProfil(id: any) {
    this.dataDetailAll.map((res: any) => {
      if (res.id === id) {
        this.dataDetailProfil = res;
      }
    });
    this.dataDetailJadwalKerja = this.dataDetailProfil.jadwal_kerja;
    this.selectMonth();
  }

  selectMonth() {
    this.dataDetailJadwalKerjaPerMonth = [];
    this.dataDetailJadwalKerja[
      Number(moment(this.yearMonth, 'YYYY-MM').format('MM')) - 1
    ].map((res: any) => {
      if (
        res.tgl.includes(moment(this.yearMonth, 'YYYY-MM').format('MM-YYYY'))
      ) {
        this.dataDetailJadwalKerjaPerMonth.push(res);
      }
    });
  }

  searchNip(nip: any) {
    this.dataSearchNip = [];
    this.dataDetailAll.map((res: any) => {
      if (res.nip.includes(nip.value)) {
        this.dataSearchNip.push(res);
      }
    });
  }

  selectNip(data: any) {
    this.dataDetailProfil = data;
    this.dataDetailJadwalKerja = data.jadwal_kerja;
    this.selectMonth();
  }

  editDataDetail(i: number) {
    const dialogRef = this.dialog.open(ModalSetupJadwalKerjaComponent, {
      data: {
        name: 'editDetail',
        data: {
          dataProfil: this.dataDetailProfil,
          indexBln: Number(moment(this.yearMonth, 'YYYY-MM').format('MM')) - 1,
          indexTgl: i,
        },
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'simpan') {
        let catchResult = this.api.catchData();
        this.api
          .updateData(this.tableDetail, catchResult, this.dataDetailProfil.id)
          .subscribe(() => {
            this.selectProfil(catchResult.id);
          });
      }
    });
  }
  // END DETAIL

  // tambahDataCategory() {
  //   const dialogRef = this.dialog.open(ModalSetupJadwalKerjaComponent, {
  //     data: { name: 'tambahCategory' },
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result === 'simpan') {
  //       this.catchResult = this.api.catchData();
  //       this.api
  //         .postData(this.tableCategory, this.catchResult)
  //         .subscribe(() => {
  //           this.ngOnInit();
  //         });
  //     }
  //   });
  // }

  // editDataCategory(data: any) {
  //   let id = data.id;
  //   const dialogRef = this.dialog.open(ModalSetupJadwalKerjaComponent, {
  //     data: { name: 'editCategory', data: data },
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result === 'simpan') {
  //       this.catchResult = this.api.catchData();
  //       this.api
  //         .updateData(this.tableCategory, this.catchResult, id)
  //         .subscribe(() => {
  //           this.ngOnInit();
  //         });
  //     }
  //   });
  // }

  // deleteDataCategory(id: number) {
  //   const dialogRef = this.dialog.open(ModalSetupJadwalKerjaComponent, {
  //     data: { name: 'deleteCategory' },
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result === 'ya') {
  //       this.api.deleteData(this.tableCategory + id).subscribe(() => {
  //         this.ngOnInit();
  //       });
  //     }
  //   });
  // }

  // tambahDataIndividu() {
  //   const dialogRef = this.dialog.open(ModalSetupJadwalKerjaComponent, {
  //     data: {
  //       name: 'tambahIndividu',
  //       data: {
  //         dataIndividu: this.dataIndividu,
  //         dataKaryawan: this.dataDetail,
  //       },
  //     },
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result === 'simpan') {
  //       this.catchResult = this.api.catchData();
  //       console.log(this.catchResult);
  //       this.api
  //         .postData(this.tableIndividu, this.catchResult)
  //         .subscribe(() => {
  //           this.ngOnInit();
  //         });
  //     }
  //   });
  // }

  // editDataIndividu(data: any) {
  //   let id = data.id;
  //   const dialogRef = this.dialog.open(ModalSetupJadwalKerjaComponent, {
  //     data: { name: 'editIndividu', data: data },
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result === 'simpan') {
  //       this.catchResult = this.api.catchData();
  //       this.api.updateData(this.tableIndividu, data, id).subscribe(() => {
  //         this.ngOnInit();
  //       });
  //     }
  //     this.ngOnInit();
  //   });
  // }

  // deleteDataIndividu(id: number) {
  //   const dialogRef = this.dialog.open(ModalSetupJadwalKerjaComponent, {
  //     data: { name: 'deleteIndividu' },
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result === 'ya') {
  //       this.api.deleteData(this.tableIndividu + id).subscribe(() => {
  //         this.ngOnInit();
  //       });
  //     }
  //   });
  // }
}
