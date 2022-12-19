import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-setup-jadwal-kerja',
  templateUrl: './modal-setup-jadwal-kerja.component.html',
  styleUrls: ['./modal-setup-jadwal-kerja.component.css'],
})
export class ModalSetupJadwalKerjaComponent implements OnInit {
  editDetail!: boolean
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { name: string; data: any }
  ) {
    if (data.name === 'editDetail') {
      console.log(this.editDetail)
      this.editDetail = true
    }
  }

  ngOnInit(): void {}
  

  throwResult() {
    console.log('wkwk')
    // this.api.throwData(this.jadwalKerja);
  }
}
