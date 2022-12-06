import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Karyawan } from 'src/app/interfaces/karyawan';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-modal-karyawan',
  templateUrl: './modal-karyawan.component.html',
  styleUrls: ['./modal-karyawan.component.css'],
})
export class ModalKaryawanComponent implements OnInit {
  isTambah = true;
  isDelete = false;

  kewarganegaraanValue = '';
  kewarganegaraan = [{ value: 'WNI' }, { value: 'WNA' }];
  jenisKelaminValue = '';
  jenisKelamin = [{ value: 'Laki-Laki' }, { value: 'Perempuan' }];
  agamaValue = '';
  agama = [
    { value: 'Islam' },
    { value: 'Protestan' },
    { value: 'Katolik' },
    { value: 'Hindu' },
    { value: 'Buddha' },
    { value: 'Khonghucu' },
    { value: 'Lain-lain' },
  ];
  statusPerkawinanValue = '';
  statusPerkawinan = [
    { value: 'Kawin' },
    { value: 'Belum kawin' },
    { value: 'Cerai' },
  ];
  pendidikanTerakhirValue = '';
  pendidikanTerakhir = [
    { value: 'TK' },
    { value: 'SD' },
    { value: 'SMP' },
    { value: 'SMA' },
    { value: 'SMK' },
    { value: 'Diploma 1' },
    { value: 'Diploma 2' },
    { value: 'Diploma 3' },
    { value: 'S1' },
    { value: 'S2' },
    { value: 'S3' },
  ];
  statusPajakValue = '';
  statusPajak = [
    { value: 'TK/0' },
    { value: 'TK/1' },
    { value: 'TK/2' },
    { value: 'TK/3' },
    { value: 'K/0' },
    { value: 'K/1' },
    { value: 'K/2' },
    { value: 'K/3' },
    { value: 'K/I/0' },
    { value: 'K/I/1' },
    { value: 'K/I/2' },
    { value: 'K/I/3' },
  ];

  perusahaan = [
    { value: 'Indika Jasa Parama' },
    { value: 'Royalindo Investa Wijaya' },
    { value: 'The Master Steel Manufactory' },
    { value: 'Donata Agung Perkasa' },
    { value: 'Lain-lain' },
  ];
  perusahaanValue = this.perusahaan[0].value;
  lokasiKerja = [
    { value: 'TMS HO' },
    { value: 'TMS 1' },
    { value: 'TMS 2' },
    { value: 'TMS 3' },
    { value: 'TMS 4' },
  ];
  lokasiKerjaValue = this.lokasiKerja[0].value;
  divisi = [
    { value: 'IT' },
    { value: 'GA' },
    { value: 'Finance' },
    { value: 'Marketing' },
    { value: 'Sales' },
    { value: 'Purchase' },
    { value: 'HRD' },
  ];
  divisiValue = this.divisi[0].value;
  departemen = [
    { value: 'SAT Developer' },
    { value: 'Support' },
    { value: 'Project' },
    { value: 'Marketing' },
    { value: 'Sales' },
    { value: 'Purchase' },
    { value: 'HRD' },
  ];
  departemenValue = this.departemen[0].value;
  subDepartemen = [
    { value: 'SAT Developer' },
    { value: 'Support' },
    { value: 'Project' },
    { value: 'Marketing' },
    { value: 'Sales' },
    { value: 'Purchase' },
    { value: 'HRD' },
  ];
  subDepartemenValue = this.subDepartemen[0].value;
  jabatan = [
    { value: 'Staff/Crew' },
    { value: 'Foreman' },
    { value: 'Supervisor' },
    { value: 'Specialis' },
    { value: 'Manager' },
    { value: 'Senior Manager' },
    { value: 'General Manager' },
    { value: 'Director' },
  ];
  jabatanValue = this.jabatan[0].value;
  statusKaryawan = [
    { value: 'PKWT' },
    { value: 'PKWTT' },
    { value: 'Magang' },
    { value: 'Informal' },
    { value: 'Harian' },
  ];
  statusKaryawanValue = this.statusKaryawan[0].value;

  karyawan: Karyawan = {
    id: 0,
    nama_lengkap: '',
    email: '',
    id_departemen: 0,
    jabatan: '',
    id_perusahaan: 0,
    id_lokasi: 0,
  };

  constructor(
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: { name: string; id: number }
  ) {}

  ngOnInit(): void {
    if (this.data.name === 'tambah') {
      this.isTambah = true;
      this.isDelete = false;

      this.kewarganegaraanValue = this.kewarganegaraan[0].value;
      this.jenisKelaminValue = this.jenisKelamin[0].value;
      this.agamaValue = this.agama[0].value;
      this.statusPerkawinanValue = this.statusPerkawinan[0].value;
      this.pendidikanTerakhirValue = this.pendidikanTerakhir[4].value;
      this.statusPajakValue = this.statusPajak[0].value;
    } else if (this.data.name === 'delete') {
      this.isTambah = false;
      this.isDelete = true;
    }
  }

  throwResult() {
    // this.karyawan = {
    //   id: this.idValue,
    //   keterangan: this.keteranganValue,
    //   inisial_lokasi: this.inisialValue,
    //   alamat_lokasi: this.alamatValue,
    // };
    // this.api.throwData(this.karyawan);
  }
}
