import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-modal-kalender-kerja',
  templateUrl: './modal-kalender-kerja.component.html',
  styleUrls: ['./modal-kalender-kerja.component.css'],
})
export class ModalKalenderKerjaComponent {
  akses = this.api.akses.role_kalender_kerja.edit;

  tabelBagianKerja = 'ms_bagiankerja/';

  tambahData: any = {
    tgl: '',
    hari: '',
    keterangan: '',
    lokasi: '',
    divisi: '',
    departemen: '',
    sub_departemen: '',
    potong_cuti: false,
  };

  setForm = [
    { id: 'tgl', form: 'input', type: 'date', label: 'Tanggal' },
    { id: 'keterangan', form: 'input', type: 'text', label: 'Keterangan' },
    { id: 'lokasi', form: 'select', label: 'Lokasi', value: [] },
    { id: 'divisi', form: 'select', label: 'Divisi', value: [] },
    { id: 'departemen', form: 'select', label: 'Departemen', value: [] },
    {
      id: 'sub_departemen',
      form: 'select',
      label: 'Sub Departemen',
      value: [],
    },
  ];

  constructor(@Inject(MAT_DIALOG_DATA) data: any, private api: ApiService) {
    if (data != null) this.tambahData = data;
    else this.tambahData.tgl = moment().format('yyyy-MM-DD');

    api.getData(this.tabelBagianKerja).subscribe((res) => {
      this.setForm.map((val: any) => {
        switch (val.id) {
          case 'lokasi':
            val.value.push(...new Set(res.map((ress: any) => ress.lokasi)));
            this.tambahData.lokasi = val.value[0];
            break;
          case 'divisi':
            val.value.push(...new Set(res.map((ress: any) => ress.divisi)));
            this.tambahData.divisi = val.value[0];
            break;
          case 'departemen':
            val.value.push(...new Set(res.map((ress: any) => ress.departemen)));
            this.tambahData.departemen = val.value[0];
            break;
          case 'sub_departemen':
            val.value.push(
              ...new Set(res.map((ress: any) => ress.sub_departemen))
            );
            this.tambahData.sub_departemen = val.value[0];
            break;
        }
      });
    });

    this.getHari();
  }

  getHari() {
    this.tambahData.hari = moment(this.tambahData.tgl).format('dddd');
  }
}
