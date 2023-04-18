import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { ApiService } from 'src/app/shared/api.service';
import { ModalPerpanjangKontrakComponent } from './modal-perpanjang-kontrak/modal-perpanjang-kontrak.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modal-karyawan',
  templateUrl: './modal-karyawan.component.html',
  styleUrls: ['./modal-karyawan.component.css'],
})
export class ModalKaryawanComponent implements OnInit {
  akses = this.api.akses.role_karyawan.edit;

  isTambah = false;
  isDelete = false;
  isEdit = false;
  isFilter = false;
  isPerpanjangKontrak = true;

  tableLokasi: string = 'ms_lokasi/';
  tablePerusahaan: string = 'ms_perusahaan/';
  tableBagianKerja: string = 'ms_bagiankerja/';

  filter: any = {
    lokasi: '',
    divisi: '',
    departemen: '',
    sub_departemen: '',
    perusahaan: '',
  };

  formFilter = [
    { id: 'lokasi', label: 'Lokasi', value: [] },
    { id: 'perusahaan', label: 'Perusahaan', value: [] },
    { id: 'divisi', label: 'Divisi', value: [] },
    { id: 'departemen', label: 'Departemen', value: [] },
    { id: 'sub_departemen', label: 'Sub Departemen', value: [''] },
  ];

  tambah: any = {
    kewarganegaraan: 'WNI',
    nik: '',
    nomor_passport: '',
    nama_lengkap: '',
    tempat_lahir: '',
    tgl_lahir: moment().format('YYYY-MM-DD'),
    tgl_pembuatan_passport: moment().format('YYYY-MM-DD'),
    tgl_berakhir_passport: moment().format('YYYY-MM-DD'),
    kebangsaan: '',
    jenis_kelamin: 'Laki-laki',
    alamat_domisili: '',
    rt_rw: '',
    kel_des: '',
    agama: 'Islam',
    status_perkawinan: 'Kawin',
    nomor_telepon: '',
    email: '',
    nomor_kitas: '',
    tgl_berakhir_kitas: moment().format('YYYY-MM-DD'),
    nomor_rptka: '',
    tgl_berakhir_rptka: moment().format('YYYY-MM-DD'),
    nomor_npwp: '',
    pendidikan_terakhir: 'TK',
    nomor_bpjs_tk: '',
    nomor_bpjs_kesehatan: '',
    nama_faskes: '',
    alamat_faskes: '',
    nomor_kk: '',
    nama_kepala_keluarga: '',
    nama_ibu_kandung: '',
    status_pajak: 'TK/0',
    nama_pasangan: '',
    nama_anak_ke1: '',
    nama_anak_ke2: '',
    nama_anak_ke3: '',
    nama_kontak_darurat: '',
    nomor_kontak_darurat: '',
    hubungan_dengan_karyawan: '',

    perusahaan: 'Indika Jasa Pahrama',
    nip: '',
    pin_finger: '',
    lokasi: 'TMS HO',
    divisi: 'IT',
    departemen: 'SAT Developer',
    sub_departemen: 'Implementasi',
    jabatan: 'Staff',
    status_karyawan: 'PKWTT',
    nama_pemberi_referensi: '',
    nama_atasan_langsung: '',
    tgl_perubahan_detasir: moment().format('YYYY-MM-DD'),
    lokasi_detasir: '',
    tgl_mulai_detasir: '',
    tgl_akhir_detasir: '',
    alasan_detasir: '',

    tgl_join: moment().format('YYYY-MM-DD'),
    nomor_pkwtt: '',
    kontrak_ke: '',
    masa_kerja: 0,
    mulai_kontrak: moment().format('YYYY-MM-DD'),
    akhir_kontrak: moment().format('YYYY-MM-DD'),
    nomor_surat_kerja: '',
    tgl_mulai_kerja: moment().format('YYYY-MM-DD'),
    tgl_akhir_kerja: moment().format('YYYY-MM-DD'),
    tgl_muncul_hak_cuti: moment().format('YYYY-MM-DD'),
    tgl_berakhir_hak_cuti: moment().format('YYYY-MM-DD'),
    tgl_efektif_terminasi: moment().format('YYYY-MM-DD'),
    alasan_terminasi: '',
    banyak_hak_cuti: 12,
    data_kontrak: [],

    tgl_perubahan_gaji: moment().format('YYYY-MM-DD'),
    gaji_pokok: '',
    uang_makan: '',
    uang_transport: '',
    note: '',
  };

  formTabPribadiWni = [
    {
      id: 'kewarganegaraan',
      form: 'select',
      label: 'Kewarganegaraan',
      value: ['WNA', 'WNI'],
    },
    {
      id: 'nik',
      form: 'input',
      maxlength: 16,
      type: 'number',
      label: 'NIK',
      placeholder: 'Nomor Induk Kependudukan',
    },
    {
      id: 'nama_lengkap',
      form: 'input',
      maxlength: 30,
      type: 'text',
      label: 'Nama',
      placeholder: 'Nama Lengkap',
    },
    {
      id: 'tempat_lahir',
      maxlength: 50,
      form: 'input',
      type: 'text',
      label: 'Tempat Lahir',
    },
    { id: 'tgl_lahir', form: 'input', type: 'date', label: 'Tgl Lahir' },
    {
      id: 'jenis_kelamin',
      form: 'select',
      label: 'Jenis Kelamin',
      value: ['Laki-laki', 'Perempuan'],
    },
    {
      id: 'alamat_domisili',
      form: 'textarea',
      label: 'Alamat Domisili',
      maxlength: 200,
    },
    { id: 'rt_rw', form: 'input', type: 'text', label: 'RT/RW', maxlength: 6 },
    {
      id: 'kel_des',
      form: 'input',
      type: 'text',
      label: 'Kel/Desa',
      maxlength: 50,
    },
    {
      id: 'agama',
      label: 'Agama',
      form: 'select',
      value: [
        'Islam',
        'Protestan',
        'Katolik',
        'Hindu',
        'Buddha',
        'Konghuchu',
        'Lain-lain',
      ],
    },
    {
      id: 'status_perkawinan',
      form: 'select',
      label: 'Status Perkawinan',
      value: ['Kawin', 'Belum Kawin', 'Cerai'],
    },
    {
      id: 'nomor_npwp',
      maxlength: 16,
      form: 'input',
      type: 'number',
      label: 'Nomor NPWP',
    },
    {
      id: 'nomor_telepon',
      form: 'input',
      maxlength: 13,
      type: 'text',
      label: 'Nomor Telepon',
    },
    { id: 'email', maxlength: 50, form: 'input', type: 'text', label: 'Email' },
    {
      id: 'pendidikan_terakhir',
      form: 'select',
      label: 'Pendidikan Terakhir',
      value: [
        'TK',
        'SD',
        'SMP',
        'SMA',
        'SMK',
        'D1',
        'D2',
        'D3',
        'S1',
        'S2',
        'S3',
      ],
    },
    {
      id: 'nomor_bpjs_tk',
      form: 'input',
      maxlength: 11,
      type: 'text',
      label: 'Nomor BPJS TK',
    },
    {
      maxlength: 13,
      id: 'nomor_bpjs_kesehatan',
      form: 'input',
      type: 'text',
      label: 'Nomor BPJS Kesehatan',
    },
    {
      id: 'nama_faskes',
      form: 'input',
      type: 'text',
      maxlength: 30,
      label: 'Nama Faskes',
    },
    {
      id: 'alamat_faskes',
      maxlength: 50,
      form: 'input',
      type: 'text',
      label: 'Alamat Faskes',
    },
    {
      id: 'nomor_kk',
      form: 'input',
      type: 'text',
      maxlength: 16,
      label: 'Nomor KK',
    },
    {
      id: 'nama_kepala_keluarga',
      maxlength: 30,
      form: 'input',
      type: 'text',
      label: 'Nama Kepala Keluarga',
    },
    {
      id: 'nama_ibu_kandung',
      maxlength: 30,
      form: 'input',
      type: 'text',
      label: 'Nama Ibu Kandung',
    },
    {
      form: 'select',
      label: 'Status Pajak',
      id: 'status_pajak',
      value: [
        'TK/0',
        'TK/1',
        'TK/2',
        'TK/3',
        'K/0',
        'K/1',
        'K/2',
        'K/3',
        'K/I/0',
        'K/I/1',
        'K/I/2',
        'K/I/3',
      ],
    },
    {
      id: 'nama_pasangan',
      form: 'input',
      maxlength: 30,
      type: 'text',
      label: 'Nama Pasangan',
    },
    {
      id: 'nama_anak_ke1',
      form: 'input',
      maxlength: 30,
      type: 'text',
      label: 'Nama Anak Ke-1',
    },
    {
      id: 'nama_anak_ke2',
      maxlength: 30,
      form: 'input',
      type: 'text',
      label: 'Nama Anak Ke-2',
    },
    {
      id: 'nama_anak_ke3',
      maxlength: 30,
      form: 'input',
      type: 'text',
      label: 'Nama Anak Ke-3',
    },
    {
      id: 'nama_kontak_darurat',
      form: 'input',
      maxlength: 30,
      type: 'text',
      label: 'Nama Kontak Darurat',
    },
    {
      id: 'nomor_kontak_darurat',
      maxlength: 13,
      form: 'input',
      type: 'text',
      label: 'Nomor Kontak Darurat',
    },
    {
      id: 'hubungan_dengan_karyawan',
      form: 'input',
      type: 'text',
      maxlength: 50,
      label: 'Hubungan Dengan Karyawan',
    },
  ];

  formTabPribadiWna = [
    {
      id: 'kewarganegaraan',
      form: 'select',
      label: 'Kewarganegaraan',
      value: ['WNA', 'WNI'],
    },
    {
      id: 'nomor_passport',
      form: 'input',
      type: 'text',
      maxlength: 7,
      label: 'Nomor Passport',
    },
    {
      id: 'nama_lengkap',
      form: 'input',
      maxlength: 30,
      type: 'text',
      label: 'Nama',
      placeholder: 'Nama Lengkap',
    },
    {
      id: 'tempat_lahir',
      form: 'input',
      maxlength: 50,
      type: 'text',
      label: 'Tempat Lahir',
    },
    { id: 'tgl_lahir', form: 'input', type: 'date', label: 'Tgl Lahir' },
    {
      id: 'tgl_pembuatan_passport',
      form: 'input',
      type: 'date',
      label: 'Tanggal Pembuatan Passport',
    },
    {
      id: 'tgl_berakhir_passport',
      form: 'input',
      type: 'date',
      label: 'Tanggal Berakhir Passport',
    },
    {
      id: 'kebangsaan',
      form: 'input',
      type: 'text',
      label: 'Kebangsaan',
      maxlength: 56,
    },
    {
      id: 'agama',
      label: 'Agama',
      form: 'select',
      value: [
        'Islam',
        'Protestan',
        'Katolik',
        'Hindu',
        'Buddha',
        'Konghuchu',
        'Lain-lain',
      ],
    },
    {
      id: 'nomor_telepon',
      form: 'input',
      maxlength: 13,
      type: 'text',
      label: 'Nomor Telepon',
    },
    { id: 'email', form: 'input', maxlength: 30, type: 'text', label: 'Email' },
    {
      id: 'nomor_kitas',
      form: 'input',
      maxlength: 20,
      type: 'text',
      label: 'Nomor Kitas',
    },
    {
      id: 'tgl_berakhir_kitas',
      form: 'input',
      type: 'date',
      label: 'Tanggal Berakhir Kitas',
    },
    {
      id: 'nomor_rptka',
      form: 'input',
      type: 'text',
      maxlength: 20,
      label: 'Nomor RPTKA',
    },
    {
      id: 'tgl_berakhir_rptka',
      form: 'input',
      type: 'date',
      label: 'Tanggal Berakhir RPTKA',
    },
    {
      id: 'nomor_npwp',
      form: 'input',
      type: 'text',
      maxlength: 16,
      label: 'Nomor NPWP',
    },
  ];

  formTabPekerjaanOrganisasi: any = [
    { id: 'perusahaan', form: 'select', label: 'Perusahaan', value: [''] },
    {
      id: 'nip',
      form: 'input',
      type: 'text',
      label: 'NIP',
      maxlength: 6,
      placeholder: '000000',
      disable: true,
    },
    {
      id: 'pin_finger',
      form: 'input',
      type: 'text',
      maxlength: 6,
      label: 'Pin Finger',
      placeholder: '000000',
      disable: true,
    },
    { id: 'lokasi', form: 'select', label: 'Lokasi Kerja', value: [''] },
    { id: 'divisi', form: 'select', label: 'Divisi', value: [''] },
    { id: 'departemen', form: 'select', label: 'Departemen', value: [''] },
    {
      id: 'sub_departemen',
      form: 'select',
      label: 'Sub Departemen',
      value: [''],
    },
    {
      id: 'jabatan',
      form: 'select',
      label: 'Jabatan',
      value: [
        'Staff',
        'Foreman',
        'Supervisor',
        'Specialis',
        'Manager',
        'Senior Manager',
        'General Manager',
        'Director',
      ],
    },
    {
      id: 'status_karyawan',
      form: 'select',
      label: 'Status Karyawan',
      value: ['PKWT', 'PKWTT', 'Magang', 'Informal', 'Harian'],
    },
    {
      id: 'nama_pemberi_referensi',
      form: 'input',
      type: 'text',
      maxlength: 30,
      label: 'Nama Pemberi Referensi',
      disable: false,
    },
    {
      id: 'nama_atasan_langsung',
      form: 'input',
      type: 'text',
      maxlength: 30,
      label: 'Nama Atasan Langsung',
      disable: false,
    },
  ];

  formTabPeriodeKontrakPkwtt = [
    { id: 'tgl_join', form: 'input', type: 'date', label: 'Tanggal Join' },
    {
      id: 'nomor_pkwtt',
      maxlength: 50,
      form: 'input',
      type: 'text',
      label: 'Nomor PKWTT',
    },
  ];

  formTabPeriodeKontrakPkwttEdit: any = [
    {
      id: 'tgl_join',
      form: 'input',
      type: 'date',
      label: 'Tanggal Join',
      disable: true,
    },
    {
      id: 'nomor_pkwtt',
      form: 'input',
      maxlength: 50,
      type: 'text',
      label: 'Nomor PKWTT',
      disable: true,
    },
    {
      id: 'masa_kerja',
      form: 'input',
      type: 'text',
      label: 'Masa Kerja',
      disable: true,
    },
    {
      id: 'tgl_muncul_hak_cuti',
      form: 'input',
      type: 'date',
      label: 'Tanggal Muncul Hak Cuti',
      disable: true,
    },
    {
      id: 'tgl_berakhir_hak_cuti',
      form: 'input',
      type: 'date',
      label: 'Tanggal Berakhir Hak Cuti',
      disable: true,
    },
    {
      id: 'banyak_hak_cuti',
      form: 'input',
      type: 'text',
      label: 'Banyak Hak Cuti',
      disable: true,
    },
  ];

  formTabPeriodeKontrakPkwt = [
    { id: 'tgl_join', form: 'input', type: 'date', label: 'Tanggal Join' },
    {
      id: 'nomor_pkwt',
      form: 'input',
      maxlength: 50,
      type: 'text',
      label: 'Nomor PKWT',
      placeholder: 'Nomor Kontrak',
    },
    {
      id: 'kontrak_ke',
      form: 'input',
      type: 'text',
      label: 'Kontrak Ke-',
      disable: true,
    },
    {
      id: 'mulai_kontrak',
      form: 'input',
      type: 'date',
      label: 'Mulai Kontrak',
    },
    {
      id: 'akhir_kontrak',
      form: 'input',
      type: 'date',
      label: 'Akhir Kontrak',
    },
  ];

  formTabPeriodeKontrakPkwtEdit: any = [
    { id: 'tgl_join', form: 'input', type: 'date', label: 'Tanggal Join' },
    {
      id: 'nomor_pkwt',
      form: 'input',
      type: 'text',
      maxlength: 50,
      label: 'Nomor PKWT',
      placeholder: 'Nomor Kontrak',
    },
    {
      id: 'kontrak_ke',
      form: 'input',
      type: 'text',
      label: 'Kontrak Ke-',
      disable: true,
    },
    {
      id: 'mulai_kontrak',
      form: 'input',
      type: 'date',
      label: 'Mulai Kontrak',
    },
    {
      id: 'akhir_kontrak',
      form: 'input',
      type: 'date',
      label: 'Akhir Kontrak',
    },
    {
      id: 'tgl_muncul_hak_cuti',
      form: 'input',
      type: 'date',
      label: 'Tanggal Muncul Hak Cuti',
    },
    {
      id: 'tgl_berakhir_hak_cuti',
      form: 'input',
      type: 'date',
      label: 'Tanggal Berakhir Hak Cuti',
    },
    { id: 'masa_kerja', form: 'input', type: 'text', label: 'Masa Kerja' },
    {
      id: 'banyak_hak_cuti',
      form: 'input',
      type: 'text',
      label: 'Banyak Hak Cuti',
    },
  ];

  formTabPeriodeKontrakMagang = [
    {
      id: 'nomor_surat_kerja',
      form: 'input',
      type: 'text',
      maxlength: 30,
      label: 'Nomor Surat Kerja',
    },
    {
      id: 'tgl_mulai_kerja',
      form: 'input',
      type: 'date',
      label: 'Tanggal Mulai Kerja',
    },
    {
      id: 'tgl_akhir_kerja',
      form: 'input',
      type: 'date',
      label: 'Tanggal Akhir Kerja',
    },
  ];

  formTabGajiKaryawan = [
    {
      id: 'gaji_pokok',
      form: 'input',
      type: 'text',
      maxlength: 15,
      label: 'Gaji Pokok',
    },
    {
      id: 'uang_makan',
      form: 'input',
      type: 'text',
      maxlength: 15,
      label: 'Uang Makan',
    },
    {
      id: 'uang_transport',
      form: 'input',
      type: 'text',
      maxlength: 15,
      label: 'Uang Transport',
    },
    { id: 'note', form: 'textarea', label: 'Note', maxlength: 150 },
    {
      id: 'tgl_perubahan_gaji',
      form: 'input',
      type: 'date',
      label: 'Tanggal Perubahan',
    },
  ];

  constructor(
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) private data: { name: string; data: any },
    private dialog: MatDialog
  ) {
    switch (data.name) {
      case 'tambah':
        this.isTambah = true;

        this.tambah.kontrak_ke = this.tambah.data_kontrak.length + 1;
        this.generateNip();
        break;
      case 'edit':
        this.isEdit = true;

        this.tambah = data.data;
        this.tambah.kontrak_ke = this.tambah.data_kontrak.length + 1;
        if (this.tambah.lokasi_detasir == '')
          this.tambah.lokasi_detasir = 'Tidak ada';
        else this.detasir();

        this.formTabPekerjaanOrganisasi.splice(2, 0, {
          id: 'tgl_perubahan_detasir',
          form: 'input',
          type: 'date',
          label: 'Tanggal Perubahan Detasir',
          disable: false,
        });
        this.formTabPekerjaanOrganisasi.splice(12, 0, {
          id: 'lokasi_detasir',
          form: 'select',
          label: 'Lokasi Detasir',
          value: [],
        });
        break;
      case 'filter':
        this.isFilter = true;

        if (data.data !== undefined) {
          this.filter = data.data;
        }
        break;
    }

    api.getData(this.tableLokasi).subscribe((res) => {
      const listLokasi = res.map((val: any) => val.inisial);
      this.formFilter.forEach((val) => {
        if (val.id === 'lokasi') {
          val.value = listLokasi;
        }
      });

      this.formTabPekerjaanOrganisasi.forEach((val: any) => {
        if (val.id === 'lokasi') {
          val.value = listLokasi;
        }
        if (val.id === 'lokasi_detasir') {
          val.value = listLokasi;
          val.value?.push('Tidak ada');
        }
      });
    });

    api.getData(this.tablePerusahaan).subscribe((res) => {
      const listPerusahaan = res.map((val: any) => val.nama);
      this.formFilter.forEach((val) => {
        if (val.id === 'perusahaan') {
          val.value = listPerusahaan;
        }
      });
      this.formTabPekerjaanOrganisasi.forEach((val: any) => {
        if (val.id === 'perusahaan') {
          val.value = listPerusahaan;
        }
      });
    });

    api.getData(this.tableBagianKerja).subscribe((res) => {
      const listDivisi = res.map((val: any) => val.divisi);
      const listDepartemen = res.map((val: any) => val.departemen);
      let listSubDepartemen: any[] = [];
      listSubDepartemen.push(
        ...new Set(res.map((val: any) => val.sub_departemen))
      );
      this.formFilter.forEach((val) => {
        switch (val.id) {
          case 'divisi':
            val.value = listDivisi;
            break;
          case 'departemen':
            val.value = listDepartemen;
            break;
          case 'sub_departemen':
            val.value = listSubDepartemen;
            break;
        }
      });
      this.formTabPekerjaanOrganisasi.forEach((val: any) => {
        switch (val.id) {
          case 'divisi':
            val.value = listDivisi;
            break;
          case 'departemen':
            val.value = listDepartemen;
            break;
          case 'sub_departemen':
            val.value = listSubDepartemen;
            break;
        }
      });
    });
  }

  ngOnInit(): void {}

  formatDate(date: string) {
    return moment(date, 'YYYY-MM-DD').format('DD MMM YYYY');
  }

  perpanjangKontrak() {
    this.dialog
      .open(ModalPerpanjangKontrakComponent, {
        data: {
          name: this.tambah.status_karyawan,
          data: {
            nomor_pkwt: this.tambah.nomor_pkwt,
            kontrak_ke: this.tambah.kontrak_ke + 1,
          },
        },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res !== undefined) {
          this.tambah.data_kontrak.push({
            nomor_pkwt: this.tambah.nomor_pkwt,
            mulai_kontrak: this.tambah.mulai_kontrak,
            akhir_kontrak: this.tambah.akhir_kontrak,
            tgl_muncul_hak_cuti: this.tambah.tgl_muncul_hak_cuti,
            tgl_berakhir_hak_cuti: this.tambah.tgl_berakhir_hak_cuti,
          });

          this.tambah.nomor_pkwt = res.nomor_pkwt;
          this.tambah.kontrak_ke = res.kontrak_ke;
          this.tambah.mulai_kontrak = res.mulai_kontrak;
          this.tambah.akhir_kontrak = res.akhir_kontrak;
          this.tambah.tgl_muncul_hak_cuti = res.tgl_muncul_hak_cuti;
          this.tambah.tgl_berakhir_hak_cuti = res.tgl_berakhir_hak_cuti;
          this.tambah.banyak_hak_cuti = res.banyak_hak_cuti;

          switch (this.tambah.status_karyawan) {
            case 'PKWT':
              this.tambah.data_kontrak.push({
                nomor_pkwt: this.tambah.nomor_pkwt,
                mulai_kontrak: this.tambah.mulai_kontrak,
                akhir_kontrak: this.tambah.akhir_kontrak,
                tgl_muncul_hak_cuti: this.tambah.tgl_muncul_hak_cuti,
                tgl_berakhir_hak_cuti: this.tambah.tgl_berakhir_hak_cuti,
              });
              this.tambah.nomor_pkwt = res.nomor_pkwt;
              this.tambah.kontrak_ke = res.kontrak_ke;
              this.tambah.mulai_kontrak = res.mulai_kontrak;
              this.tambah.akhir_kontrak = res.akhir_kontrak;
              this.tambah.tgl_muncul_hak_cuti = res.tgl_muncul_hak_cuti;
              this.tambah.tgl_berakhir_hak_cuti = res.tgl_berakhir_hak_cuti;
              this.tambah.banyak_hak_cuti = res.banyak_hak_cuti;
              break;
            case 'PKWTT':
              this.tambah.data_kontrak.push({
                nomor_pkwtt: this.tambah.nomor_pkwtt,
                mulai_kontrak: this.tambah.mulai_kontrak,
                akhir_kontrak: this.tambah.akhir_kontrak,
                tgl_muncul_hak_cuti: this.tambah.tgl_muncul_hak_cuti,
                tgl_berakhir_hak_cuti: this.tambah.tgl_berakhir_hak_cuti,
              });
              this.tambah.nomor_pkwtt = res.nomor_pkwtt;
              this.tambah.kontrak_ke = res.kontrak_ke;
              this.tambah.mulai_kontrak = res.mulai_kontrak;
              this.tambah.akhir_kontrak = res.akhir_kontrak;
              this.tambah.tgl_muncul_hak_cuti = res.tgl_muncul_hak_cuti;
              this.tambah.tgl_berakhir_hak_cuti = res.tgl_berakhir_hak_cuti;
              this.tambah.banyak_hak_cuti = res.banyak_hak_cuti;
              break;
            case 'Magang':
              this.tambah.nomor_surat_kerja = res.nomor_surat_kerja;
              this.tambah.tgl_mulai_kerja = res.tgl_mulai_kerja;
              this.tambah.tgl_akhir_kerja = res.tgl_akhir_kerja;
              break;
            case 'Harian':
              this.tambah.nomor_surat_kerja = res.nomor_surat_kerja;
              this.tambah.tgl_mulai_kerja = res.tgl_mulai_kerja;
              this.tambah.tgl_akhir_kerja = res.tgl_akhir_kerja;
              break;
            case 'Informal':
              this.tambah.nomor_surat_kerja = res.nomor_surat_kerja;
              this.tambah.tgl_mulai_kerja = res.tgl_mulai_kerja;
              this.tambah.tgl_akhir_kerja = res.tgl_akhir_kerja;
              break;
          }
        }
      });
  }

  terminasi() {
    this.isPerpanjangKontrak = false;
    switch (this.tambah.status_karyawan) {
      case 'PKWT':
        this.formTabPeriodeKontrakPkwtEdit.splice(
          7,
          0,
          {
            id: 'tgl_efektif_terminasi',
            form: 'input',
            type: 'date',
            label: 'Tanggal Efektif Terminasi',
          },
          {
            id: 'alasan_terminasi',
            form: 'input',
            maxlength: 150,
            type: 'text',
            label: 'Alasan Terminasi',
          }
        );
        break;
      case 'PKWTT':
        this.formTabPeriodeKontrakPkwttEdit.splice(
          5,
          0,
          {
            id: 'tgl_efektif_terminasi',
            form: 'input',
            type: 'date',
            label: 'Tanggal Efektif Terminasi',
            disable: false,
          },
          {
            id: 'alasan_terminasi',
            form: 'input',
            maxlength: 150,
            type: 'text',
            label: 'Alasan Terminasi',
          }
        );
        break;
      case 'Magang':
        this.formTabPeriodeKontrakMagang.splice(
          3,
          0,
          {
            id: 'tgl_efektif_terminasi',
            form: 'input',
            type: 'date',
            label: 'Tanggal Efektif Terminasi',
          },
          {
            id: 'alasan_terminasi',
            form: 'input',
            type: 'text',
            maxlength: 150,
            label: 'Alasan Terminasi',
          }
        );
        break;
      case 'Harian':
        this.formTabPeriodeKontrakMagang.splice(
          3,
          0,
          {
            id: 'tgl_efektif_terminasi',
            form: 'input',
            type: 'date',
            label: 'Tanggal Efektif Terminasi',
          },
          {
            id: 'alasan_terminasi',
            form: 'input',
            maxlength: 150,
            type: 'text',
            label: 'Alasan Terminasi',
          }
        );
        break;
      case 'Informal':
        this.formTabPeriodeKontrakMagang.splice(
          3,
          0,
          {
            id: 'tgl_efektif_terminasi',
            form: 'input',
            type: 'date',
            label: 'Tanggal Efektif Terminasi',
          },
          {
            id: 'alasan_terminasi',
            form: 'input',
            maxlength: 150,
            type: 'text',
            label: 'Alasan Terminasi',
          }
        );
        break;
    }
  }

  generateNip() {
    this.api
      .getData(
        environment.tabelKaryawan + '?perusahaan_like=' + this.tambah.perusahaan
      )
      .subscribe((result) => {
        this.tambah.nip = (
          Math.max(...result.map((res: any) => parseInt(res.nip))) + 1
        ).toString();
      });
  }

  detasir() {
    if (this.isEdit) {
      this.formTabPekerjaanOrganisasi.splice(13, 3);
      if (this.tambah.lokasi_detasir !== 'Tidak ada') {
        this.formTabPekerjaanOrganisasi.splice(
          13,
          0,
          {
            id: 'tgl_mulai_detasir',
            form: 'input',
            type: 'date',
            label: 'Tanggal Mulai Detasir',
            disable: false,
          },
          {
            id: 'tgl_akhir_detasir',
            form: 'input',
            type: 'date',
            label: 'Tanggal Akhir Detasir',
            disable: false,
          },
          {
            id: 'alasan_detasir',
            form: 'textarea',
            type: '',
            label: 'Alasan Detasir',
            disable: false,
            maxlength: 150,
          }
        );
      }
    }
  }
}
