import { Component, OnInit } from '@angular/core';

interface Option {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-modal-bagian-kerja',
  templateUrl: './modal-bagian-kerja.component.html',
  styleUrls: ['./modal-bagian-kerja.component.css'],
})
export class ModalBagianKerjaComponent implements OnInit {
  isDepartemen = false;
  isSubDepartemen = false;
  deskripsi: any;

  selectedJenis = '';

  jenis: Option[] = [
    { value: 'divisi', viewValue: 'Divisi' },
    { value: 'departemen', viewValue: 'Departemen' },
    { value: 'sub-departemen', viewValue: 'Sub Departemen' },
  ];

  lokasi: Option[] = [
    { value: 'tmsho', viewValue: 'The Master Steel HO' },
    { value: 'tms1', viewValue: 'The Master Steel 1' },
    { value: 'tms2', viewValue: 'The Master Steel 2' },
    { value: 'tms3', viewValue: 'The Master Steel 3' },
  ];

  divisi: Option[] = [
    { value: 'it', viewValue: 'IT' },
    { value: 'ga', viewValue: 'GA' },
    { value: 'finance', viewValue: 'Finance' },
  ];

  departemen: Option[] = [
    { value: 'sat', viewValue: 'SAT' },
    { value: 'it-support', viewValue: 'IT Support' },
    { value: 'jaringan', viewValue: 'Jaringan' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
