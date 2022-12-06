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

  akses = [{ value: 'Lokasi' }, { value: 'Perusahaan' }, { value: 'All' }];
  konfirmPassword = '';

  dataUser: User = {
    id: 0,
    username: '',
    email: '',
    id_lokasi: '',
    id_perusahaan: '',
    akses: '',
    password: '',
    bagian_kerja: {
      view: false,
      edit: false,
      download: false,
    },
    perusahaan: {
      view: false,
      edit: false,
      download: false,
    },
    lokasi: {
      view: false,
      edit: false,
      download: false,
    },
    user: {
      view: false,
      edit: false,
      download: false,
    },
    karyawan: {
      view: false,
      edit: false,
      download: false,
    },
    jadwal_kerja: {
      view: false,
      edit: false,
      download: false,
    },
    setup_jadwal_kerja: {
      view: false,
      edit: false,
      download: false,
    },
    kalender_kerja: {
      view: false,
      edit: false,
      download: false,
    },
    status_kehadiran: {
      view: false,
      edit: false,
      download: false,
    },
    list_kehadiran: {
      view: false,
      edit: false,
      download: false,
    },
    lembur: {
      view: false,
      edit: false,
      download: false,
    },
    download: {
      view: false,
      edit: false,
      download: false,
    },
    mesin_finger: {
      view: false,
      edit: false,
      download: false,
    },
    setup_mesin_finger: {
      view: false,
      edit: false,
      download: false,
    },
    ganti_nip: {
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
    this.api.getData('ms_karyawan/').subscribe((res) => {
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
    if (this.data.name === 'tambah') {
      this.isTambah = true;
      this.isDelete = false;
      this.isEdit = false;
    } else if (this.data.name === 'delete') {
      this.isTambah = false;
      this.isDelete = true;
      this.isEdit = false;
    } else if (this.data.name === 'edit') {
      this.isTambah = false;
      this.isDelete = false;
      this.isEdit = true;
      this.dataUser = this.data.data;
      this.konfirmPassword = this.data.data.password;
    }
  }

  pwd(input: any) {
    this.dataUser.password = input.value;
  }

  konfirmPwd(input: any) {
    this.konfirmPassword = input.value;
  }

  displayFn(karyawan: Karyawan) {
    this.dataUser.id = karyawan.id;
    this.dataUser.username = karyawan.nama_lengkap;
    this.dataUser.email = karyawan.email;
    this.dataUser.id_lokasi = karyawan.id_lokasi;
    this.dataUser.id_perusahaan = karyawan.id_perusahaan;
    this.api
      .getData('ms_userid?id_like=' + this.dataUser.id)
      .subscribe((res) => {
        if (res[0] !== undefined) {
          if (res[0].id === this.dataUser.id) {
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
    return this.options.filter((option) => option.id === id);
  }

  throwResult() {
    this.api.throwData(this.dataUser);
  }
}
