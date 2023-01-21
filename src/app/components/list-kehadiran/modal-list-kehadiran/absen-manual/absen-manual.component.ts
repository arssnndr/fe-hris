import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-absen-manual',
  templateUrl: './absen-manual.component.html',
  styleUrls: ['./absen-manual.component.css'],
})
export class AbsenManualComponent implements OnInit {
  status: boolean = false;
  jam!: string;

  constructor(
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA)
    public data: { nip: string; nama: string; tgl: string }
  ) {}

  ngOnInit(): void {}

  formatDate(date: string) {
    return moment(date, 'DD-MM-YYYY').format('D MMM YYYY');
  }
}
