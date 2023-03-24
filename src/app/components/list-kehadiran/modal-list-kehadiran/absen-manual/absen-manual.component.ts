import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-absen-manual',
  templateUrl: './absen-manual.component.html',
  styleUrls: ['./absen-manual.component.css'],
})
export class AbsenManualComponent implements OnInit {
  date = new Date();
  dataAbsenManual: any = {
    jam: `${
      this.date.getHours().toString().length === 1
        ? 0 + this.date.getHours()
        : this.date.getHours()
    }:${
      this.date.getMinutes().toString().length === 1
        ? 0 + this.date.getMinutes()
        : this.date.getMinutes()
    }`,
    isMasuk: false,
  };

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {}

  ngOnInit(): void {}

  formatDate(date: string) {
    return moment(date, 'DD-MM-YYYY').format('D MMM YYYY');
  }
}
