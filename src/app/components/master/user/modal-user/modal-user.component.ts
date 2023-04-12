import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/api.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.css'],
})
export class ModalUserComponent implements OnInit {
  aksesEdit = this.api.akses.role_user.edit;

  hide1 = true;
  hide2 = true;

  tableKaryawan = 'ms_karyawan/';
  filteredKaryawan!: any;

  tableUserId = 'ms_userid/';

  akses = ['Lokasi', 'Perusahaan', 'All'];
  konfirmPassword = '';

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
    role_ganti_nip: {
      view: false,
      edit: false,
      download: false,
    },
    role_download_data_payroll: {
      view: false,
      edit: false,
      download: false,
    },
    role_download_report: {
      view: false,
      edit: false,
      download: false,
    },
    role_log_history: {
      view: false,
      edit: false,
      download: false,
    },
    status: true,
    role_otoritas: {
      view: false,
      edit: false,
      download: false,
    },
  };

  constructor(private api: ApiService, @Inject(MAT_DIALOG_DATA) data: any) {
    if (data != null) {
      this.dataUser = data;
      this.dataUser.password = data.password;
      this.konfirmPassword = data.password;
    } else {
      this.dataUser.akses = this.akses[0];
    }
  }

  ngOnInit(): void {}

  searchKaryawan(data: any) {
    this.api
      .getData(this.tableKaryawan + '?nip_like=' + data.value)
      .subscribe((res) => {
        res.length === 0
          ? this.api
              .getData(this.tableKaryawan + '?nama_lengkap_like=' + data.value)
              .subscribe((ress) => {
                this.filteredKaryawan = ress;
              })
          : (this.filteredKaryawan = res);
      });
  }

  selectKaryawan(data: any) {
    this.dataUser.nip = data.nip;
    this.dataUser.username = data.nama_lengkap;
    this.dataUser.email = data.email;
    this.dataUser.lokasi = data.lokasi;
    this.dataUser.perusahaan = data.perusahaan;

    this.api.getData(this.tableUserId + '?nip=' + data.nip).subscribe((res) => {
      if (res.length !== 0) {
        window.alert('NIP telah terdaftar sebagai User');
      }
    });
  }

  konfirmPwd(input: any) {
    this.konfirmPassword = input.value;
  }
}
