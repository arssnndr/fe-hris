import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modal-status-kehadiran',
  templateUrl: './modal-status-kehadiran.component.html',
  styleUrls: ['./modal-status-kehadiran.component.css'],
})
export class ModalStatusKehadiranComponent implements OnInit {
  filteredKaryawan: any;

  dataResult: any;

  formInput = [
    {
      form: 'input',
      type: 'number',
      id: 'nip',
      label: 'NIP',
      autocomplete: true,
    },
    {
      form: 'select',
      id: 'status',
      label: 'Status',
      option: ['Cuti Tahunan', 'Cuti Khusus', 'Izin', 'Perjalanan Dinas'],
    },
    {
      labelRight: '',
      couple: {
        label: '',
        type: '',
        id: '',
      },
    },
  ];

  constructor(@Inject(MAT_DIALOG_DATA) data: any, private api: ApiService) {
    if (data !== null) {
      this.dataResult = data;
    } else {
      this.dataResult = {
        nip: '',
        nama_lengkap: '',
        status_cuti: 'Cuti Tahunan',
        no_form: '',
        tgl_muncul_hak_cuti: '',
        tgl_berakhir_hak_cuti: '',
        tgl_mulai_cuti: '',
        tgl_selesai_cuti: '',
        tgl_mulai_izin: '',
        tgl_selesai_izin: '',
        waktu_izin_mulai: '',
        waktu_izin_selesai: '',
        nama_pengganti: '',
        nip_pengganti: '',
        hak_cuti_telah_diambil: '',
        hak_cuti_diambil: '',
        hak_cuti_tersedia: 0,
        hak_cuti_tersisa: '',
        izin_sehari_penuh: false,
        dinas_luar_kota: false,
        kota_tujuan_dinas: '',
        alamat_tujuan_dinas: '',
        tgl_berangkat: '',
        tgl_pulang: '',
        jumlah_hari_izin: '',
        keterangan: '',
      };
    }
  }

  ngOnInit(): void {
    this.onStatusChange(this.dataResult.status_cuti);
  }

  getKaryawan(nip: string) {
    this.api
      .getData(environment.tabelKaryawan + '?nip_like=' + nip)
      .subscribe((res) => (this.filteredKaryawan = res));
  }

  selectKaryawan(data: any, isPengganti: boolean) {
    if (isPengganti) {
      this.dataResult.nip_pengganti = data.nip;
      this.dataResult.nama_pengganti = data.nama_lengkap;
    } else {
      this.dataResult.nip = data.nip;
      this.dataResult.nama_lengkap = data.nama_lengkap;
    }
  }

  onStatusChange(event: string) {
    const formIzinSehariPenuh = {
      form: 'input',
      type: 'checkbox',
      id: 'izin_sehari_penuh',
      labelRight: 'Izin Sehari Penuh',
    };
    const formDinasLuarKota = {
      form: 'input',
      type: 'checkbox',
      id: 'dinas_luar_kota',
      labelRight: 'Dinas Luar Kota',
    };
    const formKotaTujuanDinas = {
      form: 'input',
      type: 'text',
      id: 'kota_tujuan_dinas',
      label: 'Kota Tujuan Dinas',
    };
    const formAlamatTujuanDinas = {
      form: 'input',
      type: 'text',
      id: 'alamat_tujuan_dinas',
      label: 'Alamat Tujuan Dinas',
    };
    const formTglBerangkat = {
      form: 'input',
      type: 'datetime-local',
      id: 'tgl_berangkat',
      label: 'Tanggal Berangkat',
    };
    const formTglPulang = {
      form: 'input',
      type: 'datetime-local',
      id: 'tgl_pulang',
      label: 'Tanggal Pulang',
    };
    const formNoForm = {
      form: 'input',
      type: 'text',
      id: 'no_form',
      label: 'No Form',
    };
    const formTglMunculHakCuti = {
      form: 'input',
      type: 'date',
      id: 'tgl_muncul_hak_cuti',
      label: 'Tanggal Muncul Hak Cuti',
      couple: {
        type: 'date',
        id: 'tgl_berakhir_hak_cuti',
        label: 's.d',
      },
    };
    const formTglMulaiCuti = {
      form: 'input',
      type: 'date',
      id: 'tgl_mulai_cuti',
      label: 'Tanggal Cuti',
      couple: {
        type: 'date',
        id: 'tgl_selesai_cuti',
        label: 's.d',
      },
    };
    const formTglIzin = {
      form: 'input',
      type: 'date',
      id: 'tgl_mulai_izin',
      label: 'Tanggal Izin',
    };
    const formTglIzinCouple = {
      form: 'input',
      type: 'date',
      id: 'tgl_mulai_izin',
      label: 'Tanggal Izin',
      couple: {
        type: 'date',
        id: 'tgl_selesai_izin',
        label: 's.d',
      },
    };
    const formWaktuIzin = {
      form: 'input',
      type: 'time',
      id: 'waktu_izin_mulai',
      label: 'Waktu Izin',
      couple: {
        type: 'time',
        id: 'waktu_izin_selesai',
        label: 's.d',
      },
    };
    const formKeterangan = {
      form: 'input',
      type: 'text',
      id: 'keterangan',
      label: 'Keterangan',
    };
    const formNipPengganti = {
      form: 'input',
      type: 'number',
      id: 'nip_pengganti',
      label: 'Petugas Pengganti',
      autocomplete: true,
    };
    const formHakCutiTelahDiambil = {
      form: 'input',
      type: 'number',
      id: 'hak_cuti_telah_diambil',
      label: 'Hak Cuti Telah Diambil',
      couple: {
        type: 'number',
        id: 'hak_cuti_diambil',
        label: 'Cuti Yang Diambil',
      },
    };
    const formHakCutiTersedia = {
      form: 'input',
      type: 'number',
      id: 'hak_cuti_tersedia',
      label: 'Hak Cuti Tersedia',
      couple: {
        type: 'number',
        id: 'hak_cuti_tersisa',
        label: 'Sisa Hak Cuti',
      },
    };
    const formJumlahIzin = {
      form: 'input',
      type: 'number',
      id: 'jumlah_hari_izin',
      label: 'Jumlah Hari Izin',
    };

    let neededForm: any[] = [];

    this.formInput.splice(2);

    switch (event) {
      case 'Cuti Tahunan':
        neededForm = [
          formNoForm,
          formTglMunculHakCuti,
          formTglMulaiCuti,
          formKeterangan,
          formNipPengganti,
          formHakCutiTelahDiambil,
          formHakCutiTersedia,
        ];
        break;
      case 'Cuti Khusus':
        neededForm = [
          formNoForm,
          formKeterangan,
          formTglMulaiCuti,
          formNipPengganti,
          formHakCutiTersedia,
        ];
        break;
      case 'Izin':
        this.dataResult.izin_sehari_penuh
          ? (neededForm = [
              formIzinSehariPenuh,
              formNoForm,
              formTglIzinCouple,
              formJumlahIzin,
              formKeterangan,
            ])
          : (neededForm = [
              formIzinSehariPenuh,
              formNoForm,
              formTglIzin,
              formWaktuIzin,
              formKeterangan,
            ]);
        break;
      case 'Perjalanan Dinas':
        this.dataResult.dinas_luar_kota
          ? (neededForm = [
              formDinasLuarKota,
              formNoForm,
              formKotaTujuanDinas,
              formAlamatTujuanDinas,
              formTglBerangkat,
              formTglPulang,
              formKeterangan,
            ])
          : (neededForm = [
              formDinasLuarKota,
              formNoForm,
              formAlamatTujuanDinas,
              formTglBerangkat,
              formTglPulang,
              formKeterangan,
            ]);
        break;
    }

    this.formInput.push(...neededForm);
  }

  onChecked(event: string) {
    switch (event) {
      case 'dinas_luar_kota':
        this.dataResult.dinas_luar_kota
          ? (this.dataResult.dinas_luar_kota = false)
          : (this.dataResult.dinas_luar_kota = true);
        break;
      case 'izin_sehari_penuh':
        this.dataResult.izin_sehari_penuh
          ? (this.dataResult.izin_sehari_penuh = false)
          : (this.dataResult.izin_sehari_penuh = true);
        break;
    }

    this.onStatusChange(this.dataResult.status_cuti);
  }
}
