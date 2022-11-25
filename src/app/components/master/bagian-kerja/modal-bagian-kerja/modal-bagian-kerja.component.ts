import { Component, OnInit } from '@angular/core';

interface Jenis {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-modal-bagian-kerja',
  templateUrl: './modal-bagian-kerja.component.html',
  styleUrls: ['./modal-bagian-kerja.component.css'],
})
export class ModalBagianKerjaComponent implements OnInit {
  departemen = false;
  subDepartemen = false;
  deskripsi: any;

  selectedJenis: string | undefined;

  jenis: Jenis[] = [
    { value: 'divisi', viewValue: 'Divisi' },
    { value: 'departemen', viewValue: 'Departemen' },
    { value: 'sub-departemen', viewValue: 'Sub Departemen' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
