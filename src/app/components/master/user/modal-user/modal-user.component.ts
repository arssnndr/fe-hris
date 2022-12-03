import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/api.service';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Karyawan } from 'src/app/interfaces/karyawan';

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.css'],
})
export class ModalUserComponent implements OnInit {
  myControl = new FormControl<string | Karyawan>('');
  options: Karyawan[] = [];
  filteredOptions: Observable<Karyawan[]> | undefined;

  isTambah = true;
  isDelete = false;
  hide1 = true;
  hide2 = true;

  userValue = 0;
  namaValue = '';
  emailValue = '';
  aksesValue = '';

  constructor(
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: { name: string; id: number }
  ) {}

  ngOnInit(): void {
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
    } else if (this.data.name === 'delete') {
      this.isTambah = false;
      this.isDelete = true;
    }
  }

  displayFn(karyawan: Karyawan) {
    console.log(karyawan);
    this.userValue = karyawan.id;
    this.namaValue = karyawan.nama_lengkap;
    this.emailValue = karyawan.email;
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
    // this.user = {
    //   id: this.idValue,
    //   keterangan: this.keteranganValue,
    //   inisial_lokasi: this.inisialValue,
    //   alamat_lokasi: this.alamatValue,
    // };
    // this.api.throwData(this.user);
  }
}
