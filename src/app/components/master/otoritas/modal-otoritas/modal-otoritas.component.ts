import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/interfaces/user';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-modal-otoritas',
  templateUrl: './modal-otoritas.component.html',
  styleUrls: ['./modal-otoritas.component.css'],
})
export class ModalOtoritasComponent {
  isDelete = false;
  isEdit = false;
  hide1 = true;
  hide2 = true;

  tableUserId = 'ms_userid/';

  akses = ['Lokasi', 'Perusahaan', 'All'];

  dataUser: User = {
    nip: '',
    username: '',
    email: '',
    lokasi: '',
    perusahaan: '',
    akses: '',
    password: '',
    role_bagian_kerja: {
      view: false,
      edit: false,
      download: false,
    },
    role_perusahaan: {
      view: false,
      edit: false,
      download: false,
    },
    role_lokasi: {
      view: false,
      edit: false,
      download: false,
    },
    role_user: {
      view: false,
      edit: false,
      download: false,
    },
    role_karyawan: {
      view: false,
      edit: false,
      download: false,
    },
    role_jadwal_kerja: {
      view: false,
      edit: false,
      download: false,
    },
    role_setup_jadwal_kerja: {
      view: false,
      edit: false,
      download: false,
    },
    role_kalender_kerja: {
      view: false,
      edit: false,
      download: false,
    },
    role_status_kehadiran: {
      view: false,
      edit: false,
      download: false,
    },
    role_list_kehadiran: {
      view: false,
      edit: false,
      download: false,
    },
    role_lembur: {
      view: false,
      edit: false,
      download: false,
    },
    role_download: {
      view: false,
      edit: false,
      download: false,
    },
    role_mesin_finger: {
      view: false,
      edit: false,
      download: false,
    },
    role_setup_mesin_finger: {
      view: false,
      edit: false,
      download: false,
    },
    role_ganti_nip: {
      view: false,
      edit: false,
      download: false,
    },
    status: true,
  };

  constructor(
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: { name: string; data: any }
  ) {}

  ngOnInit(): void {
    this.dataUser.akses = this.akses[0];
    switch (this.data.name) {
      case 'delete':
        this.isDelete = true;
        break;
      case 'edit':
        this.isEdit = true;

        this.dataUser = this.data.data;
        break;
    }
  }

  throwResult() {
    this.api.throwData(this.dataUser);
  }
}
