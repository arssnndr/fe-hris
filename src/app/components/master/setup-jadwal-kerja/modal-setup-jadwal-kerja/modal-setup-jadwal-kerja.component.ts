import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
moment.locale('id')

@Component({
  selector: 'app-modal-setup-jadwal-kerja',
  templateUrl: './modal-setup-jadwal-kerja.component.html',
  styleUrls: ['./modal-setup-jadwal-kerja.component.css'],
})
export class ModalSetupJadwalKerjaComponent implements OnInit {
  editDetail = false
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { name: string; data: any }
  ) {
    if (data.name === 'editDetail') {
      this.editDetail = true
    }
  }

  ngOnInit(): void {}
  
  dateFormat(date: any){
    return moment(date, "DD-MM-YYYY").format('DD MMM YYYY')
  }

  throwResult() {
    console.log('wkwk')
    // this.api.throwData(this.jadwalKerja);
  }
}
