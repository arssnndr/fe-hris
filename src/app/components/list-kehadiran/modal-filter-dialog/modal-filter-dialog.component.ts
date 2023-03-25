import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modal-filter-dialog',
  templateUrl: './modal-filter-dialog.component.html',
  styleUrls: ['./modal-filter-dialog.component.css'],
})
export class ModalFilterDialogComponent {
  result: any;

  form: any[] = [
    { label: 'Lokasi', id: 'lokasi', options: ['All'] },
    {
      label: 'Perusahaan',
      id: 'perusahaan',
      options: ['All'],
    },
    { label: 'Divisi', id: 'divisi', options: ['All'] },
    { label: 'Departemen', id: 'departemen', options: ['All'] },
    { label: 'Sub Departemen', id: 'sub_departemen', options: ['All'] },
  ];

  constructor(@Inject(MAT_DIALOG_DATA) data: any, api: ApiService) {
    this.result = data;

    api.getData(environment.tabelLokasi).subscribe((res) => {
      this.form[0].options.push(...res.map((val: any) => val.inisial));
    });

    api.getData(environment.tabelPerusahaan).subscribe((res) => {
      this.form[1].options.push(...res.map((val: any) => val.nama));
    });

    api.getData(environment.tabelBagianKerja).subscribe((res) => {
      this.form[2].options.push(...new Set(res.map((val: any) => val.divisi)));
      this.form[3].options.push(
        ...new Set(res.map((val: any) => val.departemen))
      );
      this.form[4].options.push(
        ...new Set(res.map((val: any) => val.sub_departemen))
      );
    });
  }
}
