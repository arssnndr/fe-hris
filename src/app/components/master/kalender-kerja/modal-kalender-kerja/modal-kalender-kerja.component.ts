import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-modal-kalender-kerja',
  templateUrl: './modal-kalender-kerja.component.html',
  styleUrls: ['./modal-kalender-kerja.component.css'],
})
export class ModalKalenderKerjaComponent implements OnInit {
  isDelete = false;
  isTambah = false;
  isEdit = false;

  constructor() {}

  ngOnInit(): void {}

  onChange(data: any) {}

  throwResult() {}
}
