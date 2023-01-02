import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/api.service';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Karyawan } from 'src/app/interfaces/karyawan';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.css'],
})
export class ModalUserComponent implements OnInit {
  myControl = new FormControl<string | Karyawan>('');
  options: Karyawan[] = [];
  filteredOptions: Observable<Karyawan[]> | undefined;

  isTambah = false;
  isDelete = false;
  isEdit = false;
  hide1 = true;
  hide2 = true;

  tableKaryawan = 'ms_karyawan/';
  tableUserId = 'ms_userid/';

  akses = [{ value: 'Lokasi' }, { value: 'Perusahaan' }, { value: 'All' }];
  konfirmPassword = '';

  dataUser: User = {
    nip: 0,
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
    this.dataUser.akses = this.akses[0].value;
    this.api.getData(this.tableKaryawan).subscribe((res) => {
      this.options = res;
    });
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const cek = Number(value);
        if (isNaN(cek)) {
          const name = typeof value === 'string' ? value : value?.nama_lengkap;
          return name ? this._filterName(name as string) : this.options.slice();
        } else {
          return value ? this._filterId(cek) : this.options.slice();
        }
      })
    );
    switch (this.data.name) {
      case 'tambah':
        this.isTambah = true;
        break;
      case 'delete':
        this.isDelete = true;
        break;
      case 'edit':
        this.isEdit = true;

        this.dataUser = this.data.data;
        this.konfirmPassword = this.data.data.password;
        break;
    }
  }

  pwd(input: any) {
    this.dataUser.password = input.value;
  }

  konfirmPwd(input: any) {
    this.konfirmPassword = input.value;
  }

  displayFn(karyawan: Karyawan) {
    this.dataUser.nip = karyawan.nip;
    this.dataUser.username = karyawan.nama_lengkap;
    this.dataUser.email = karyawan.email;
    this.dataUser.lokasi = karyawan.lokasi;
    this.dataUser.perusahaan = karyawan.perusahaan;
    this.api
      .getData(this.tableUserId + '?nip_like=' + this.dataUser.nip)
      .subscribe((res) => {
        if (res[0] !== undefined) {
          if (res[0].nip === this.dataUser.nip) {
            return window.alert('NIP telah terdaftar sebagai User');
          }
        }
      });
  }

  private _filterName(data: string): Karyawan[] {
    const filterValue = data.toLowerCase();

    return this.options.filter((option) =>
      option.nama_lengkap.toLowerCase().includes(filterValue)
    );
  }

  private _filterId(id: number): Karyawan[] {
    return this.options.filter((option) => option.nip === id);
  }

  throwResult() {
    this.api.throwData(this.dataUser);
  }
}
