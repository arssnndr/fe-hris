import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-filter-profile-detail',
  templateUrl: './filter-profile-detail.component.html',
  styleUrls: ['./filter-profile-detail.component.css'],
})
export class FilterProfileDetailComponent {
  constructor(
    api: ApiService,
    @Inject(MAT_DIALOG_DATA) data: any,
    private dialogRef: MatDialogRef<FilterProfileDetailComponent>
  ) {
    if (data != null) this.dataFilter = data;

    const getData = (tabel: any, index: any, key: any) => {
      api.getData(tabel).subscribe((result) => {
        this.forms[index].value.push(
          ...new Set(result.map((res: any) => res[key]).sort())
        );
        this.forms[index].value = this.forms[index].value.filter(
          (val: any) => val != ''
        );
      });
    };

    this.forms.forEach((form: any, index: number) => {
      if (form.id == 'lokasi') getData(environment.tabelLokasi, index, 'inisial');
      if (form.id == 'perusahaan')
        getData(environment.tabelPerusahaan, index, 'nama');
      if (form.id == 'divisi')
        getData(environment.tabelBagianKerja, index, 'divisi');
      if (form.id == 'departemen')
        getData(environment.tabelBagianKerja, index, 'departemen');
      if (form.id == 'sub_departemen')
        getData(environment.tabelBagianKerja, index, 'sub_departemen');

      if (this.dataFilter[form.id] == '')
        this.dataFilter[form.id] = this.forms[index].value[0];
    });
  }

  forms: any = [
    { id: 'lokasi', label: 'Lokasi', value: ['Pilih lokasi..'] },
    { id: 'perusahaan', label: 'Perusahaan', value: ['Pilih perusahaan..'] },
    { id: 'divisi', label: 'Divisi', value: ['Pilih divisi..'] },
    { id: 'departemen', label: 'Departemen', value: ['Pilih departemen..'] },
    {
      id: 'sub_departemen',
      label: 'Sub Departemen',
      value: ['Pilih sub departemen..'],
    },
  ];

  dataFilter: any = {
    lokasi: '',
    perusahaan: '',
    divisi: '',
    departemen: '',
    sub_departemen: '',
  };

  simpan() {
    this.dataFilter.lokasi = this.dataFilter.lokasi.includes('Pilih')
      ? ''
      : this.dataFilter.lokasi;
    this.dataFilter.perusahaan = this.dataFilter.perusahaan.includes('Pilih')
      ? ''
      : this.dataFilter.perusahaan;
    this.dataFilter.divisi = this.dataFilter.divisi.includes('Pilih')
      ? ''
      : this.dataFilter.divisi;
    this.dataFilter.departemen = this.dataFilter.departemen.includes('Pilih')
      ? ''
      : this.dataFilter.departemen;
    this.dataFilter.sub_departemen = this.dataFilter.sub_departemen.includes(
      'Pilih'
    )
      ? ''
      : this.dataFilter.sub_departemen;

    this.dialogRef.close(this.dataFilter);
  }
}
