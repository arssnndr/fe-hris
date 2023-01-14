import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-modal-status-kehadiran',
  templateUrl: './modal-status-kehadiran.component.html',
  styleUrls: ['./modal-status-kehadiran.component.css'],
})
export class ModalStatusKehadiranComponent implements OnInit {
  isTambah: boolean = false;

  dataForUpload = {
    nip: '',
    nama_lengkap: '',
    cuti: {},
    keterangan: '',
  };

  tableKaryawan: string = 'ms_karyawan/';
  allKaryawan: any[] = [];
  filteredKaryawan: any[] = [];

  cuti: any[] = ['Cuti Tahunan', 'Cuti Khusus', 'Izin', 'Perjalanan Dinas'];
  selectedCuti: string = this.cuti[0];
  dataCuti!: any;

  cutiTahunan = {
    status: 'Cuti Tahunan',
    no_form: '',
    tgl_muncul_hakcuti_dari: '',
    tgl_muncul_hakcuti_sampai: '',
    tgl_mulai: '',
    tgl_selesai: '',
    petugas_pengganti: {
      nip: '',
      nama_lengkap: '',
    },
    hakcuti_terambil: 0,
    hakcuti_tersedia: 0,
    ambil_cuti: 0,
    sisa_cuti: 0,
  };
  cutiKhusus = {
    status: '',
    no_form: '',
    tgl_mulai: '',
    tgl_selesai: '',
    petugas_pengganti: {
      nip: '',
      nama_lengkap: '',
    },
    hakcuti_tersedia: 0,
    ambil_cuti: 0,
  };
  izin = {
    status: '',
    izin_seharian: false,
    tgl_mulai: '',
    tgl_selesai: '',
  };
  perjalanan_dinas = {
    status: '',
    no_form: '',
    dinas_dalkot: false,
    alamat_tujuan: '',
    tgl_mulai: '',
    tgl_selesai: '',
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { name: string; data: any },
    private api: ApiService
  ) {
    api.getData(this.tableKaryawan).subscribe((res) => {
      this.allKaryawan = res;
    });

    switch (data.name) {
      case 'tambah':
        this.isTambah = true;
        break;
    }
  }

  ngOnInit(): void {}

  searchNip(to: string) {
    this.filteredKaryawan = [];
    if (to === 'pengganti') {
      this.allKaryawan.filter((res) => {
        if (res.nip.includes(this.cutiTahunan.petugas_pengganti.nip)) {
          this.filteredKaryawan.push(res);
        }
      });
    } else {
      this.allKaryawan.filter((res) => {
        if (res.nip.includes(this.dataForUpload.nip)) {
          this.filteredKaryawan.push(res);
        }
      });
    }
  }

  selectNip(data: any, to: string) {
    if (to === 'pengganti') {
      this.cutiTahunan.petugas_pengganti.nip = data.nip;
      this.cutiTahunan.petugas_pengganti.nama_lengkap = data.nama_lengkap;

      this.cutiKhusus.petugas_pengganti.nip = data.nip;
      this.cutiKhusus.petugas_pengganti.nama_lengkap = data.nama_lengkap;
    } else {
      this.dataForUpload.nip = data.nip;
      this.dataForUpload.nama_lengkap = data.nama_lengkap;
    }
  }

  throwResult() {
    switch (this.selectedCuti) {
      case this.cuti[0]:
        this.dataForUpload.cuti = this.cutiTahunan;
        break;
      case this.cuti[1]:
        console.log('khusus');
        break;
      case this.cuti[2]:
        console.log('izin');
        break;
      case this.cuti[3]:
        console.log('dinas');
        break;
    }
    this.api.throwData(this.dataForUpload);
  }
}
