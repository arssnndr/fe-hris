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
  isTambah = false;
  isDelete = false;
  isEdit = false;

  kewarganegaraan = [{ value: 'WNI' }, { value: 'WNA' }];
  jenisKelamin = [{ value: 'Laki-Laki' }, { value: 'Perempuan' }];
  agama = [
    { value: 'Islam' },
    { value: 'Protestan' },
    { value: 'Katolik' },
    { value: 'Hindu' },
    { value: 'Buddha' },
    { value: 'Khonghucu' },
    { value: 'Lain-lain' },
  ];
  statusPerkawinan = [
    { value: 'Kawin' },
    { value: 'Belum kawin' },
    { value: 'Cerai' },
  ];
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
  lokasiKerja = [
    { value: 'TMS HO' },
    { value: 'TMS 1' },
    { value: 'TMS 2' },
    { value: 'TMS 3' },
    { value: 'TMS 4' },
  ];
  divisi = [
    { value: 'IT' },
    { value: 'GA' },
    { value: 'Finance' },
    { value: 'Marketing' },
    { value: 'Sales' },
    { value: 'Purchase' },
    { value: 'HRD' },
  ];
  departemen = [
    { value: 'SAT Developer' },
    { value: 'Support' },
    { value: 'Project' },
    { value: 'Marketing' },
    { value: 'Sales' },
    { value: 'Purchase' },
    { value: 'HRD' },
  ];
  subDepartemen = [
    { value: 'SAT Developer' },
    { value: 'Support' },
    { value: 'Project' },
    { value: 'Marketing' },
    { value: 'Sales' },
    { value: 'Purchase' },
    { value: 'HRD' },
  ];
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
  statusKaryawan = [
    { value: 'PKWT' },
    { value: 'PKWTT' },
    { value: 'Magang' },
    { value: 'Informal' },
    { value: 'Harian' },
  ];

  karyawan: Karyawan = {
    nip: NaN,
    kewarganegaraan: this.kewarganegaraan[0].value,
    nik: NaN,
    nama_lengkap: '',
    tempat_lahir: '',
    tgl_lahir: '',
    jenis_kelamin: this.jenisKelamin[0].value,
    alamat_domisili: '',
    rt_rw: '',
    kel_desa: '',
    agama: this.agama[0].value,
    status_perkawinan: this.statusPerkawinan[0].value,
    nomor_npwp: NaN,
    nomor_telepon: '',
    email: '',
    pendidikan_terakhir: this.pendidikanTerakhir[0].value,
    nomor_bpjs_tk: NaN,
    nomor_bpjs_kesehatan: NaN,
    nama_faskes: '',
    alamat_faskes: '',
    nomor_kk: NaN,
    nama_kepala_keluarga: '',
    nama_ibu_kandung: '',
    status_pajak: this.statusPajak[0].value,
    nama_pasangan: '',
    nama_anak_ke1: '',
    nama_anak_ke2: '',
    nama_anak_ke3: '',
    nama_kontak_darurat: '',
    nomor_telepon_darurat: '',
    hubungan_dengan_karyawan: '',
    nomor_passport: NaN,
    tgl_pembuatan_passport: '',
    tgl_berakhir_passport: '',
    kebangsaan: '',
    nomor_kitas: NaN,
    tgl_berakhir_kitas: '',
    nomor_rptka: NaN,
    tgl_berakhir_rptka: '',
    perusahaan: this.perusahaan[0].value,
    lokasi: this.lokasiKerja[0].value,
    divisi: this.divisi[0].value,
    departemen: this.departemen[0].value,
    subdepartemen: this.subDepartemen[0].value,
    jabatan: this.jabatan[0].value,
    status_karyawan: this.statusKaryawan[0].value,
    nama_pemberi_referensi: '',
    nama_atasan_langsung: '',
    tgl_join: '',
    nomor_pkwtt: NaN,
    gaji_pokok: NaN,
    tgl_perubahan: '',
    uang_makan: NaN,
    uang_transport: NaN,
    note: '',
  };

  constructor(
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: { name: string; data: any }
  ) {}

  ngOnInit(): void {
    switch (this.data.name) {
      case 'tambah':
        this.isTambah = true;

        this.data.data.nama_lengkap === undefined
          ? (this.karyawan.nip = this.data.data.nip)
          : (this.karyawan = this.data.data);
        break;
      case 'delete':
        this.isDelete = true;
        break;
      case 'edit':
        this.isEdit = true;

        this.karyawan = this.data.data;
        break;
    }
  }

  throwResult() {
    this.karyawan.nama_lengkap === '' ||
    this.karyawan.tempat_lahir === '' ||
    this.karyawan.tgl_lahir === '' ||
    this.karyawan.perusahaan === '' ||
    this.karyawan.lokasi === ''
      ? alert('Data wajib belum terisi')
      : this.api.throwData(this.karyawan);
  }
}
