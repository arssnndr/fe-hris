import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/api.service';
import { ModalSetupMesinFingerComponent } from './modal-setup-mesin-finger/modal-setup-mesin-finger.component';

@Component({
  selector: 'app-setup-mesin-finger',
  templateUrl: './setup-mesin-finger.component.html',
  styleUrls: ['./setup-mesin-finger.component.css'],
})
export class SetupMesinFingerComponent implements OnInit {
  table = 'ms_setupmesinfinger/';
  dataSearch = '';
  data!: any;
  searchNip = true;

  constructor(private api: ApiService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllData();
  }

  event() {
    const dialogRef = this.dialog.open(ModalSetupMesinFingerComponent, {
      data: { name: 'event' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'simpan') {
        let catchResult = this.api.catchData();
        this.api.postData(this.table, catchResult).subscribe(() => {
          this.getAllData();
        });
      }
    });
  }

  getAllData() {
    this.api.getData(this.table).subscribe((res) => {
      this.data = res;
    });
    if (this.dataSearch.length !== 0) {
      this.searchNip
        ? this.api
            .getData(this.table + '?nip_like=' + this.dataSearch)
            .subscribe((res) => {
              if (res.length === 0) {
                this.searchNip = false;
                this.getAllData();
              } else {
                this.data = res;
              }
              this.searchNip = true;
            })
        : this.api
            .getData(this.table + '?nama_lengkap_like=' + this.dataSearch)
            .subscribe((res) => {
              if (res.length !== 0) {
                this.data = res;
              }
            });
    }
  }

  searchData(data: any) {
    this.dataSearch = data;
    this.getAllData();
  }
}
