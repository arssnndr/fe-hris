import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-modal-setup-jadwal-kerja-detail',
  templateUrl: './modal-setup-jadwal-kerja-detail.component.html',
  styleUrls: ['./modal-setup-jadwal-kerja-detail.component.css'],
})
export class ModalSetupJadwalKerjaDetailComponent {
  akses = this.api.akses.role_setup_jadwal_kerja.edit;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: ApiService
  ) {
    api.getData(this.tabelJadwalKerja).subscribe((res) => {
      this.dataJadwalKerja = res;
      this.formModalEditJadwalKerja.forEach((val: any) => {
        if (val.id === 'id_jadwal_kerja') {
          val.value.push(
            ...new Set(res.map((val: any) => val.id_jadwal_kerja))
          );
        }
      });
    });
  }

  ngOnInit(): void {
    this.fillValue();
  }

  formatDate(date: string) {
    return moment(date).format('DD MMM YYYY');
  }

  dateToDay(date: any) {
    return moment(date).format('DDD');
  }

  tabelJadwalKerja = 'trx_jadwalkerja/';
  dataJadwalKerja: any[] = [];

  selectedJadwalKerja: any = {};

  formModalEditJadwalKerja = [
    {
      form: 'input',
      type: 'number',
      id: 'nip',
      label: 'NIP',
      placeholder: '',
      value: this.data.editData.nip,
      disable: true,
    },
    {
      form: 'input',
      type: 'text',
      id: 'divisi',
      label: 'Divisi',
      placeholder: '',
      value: this.data.editData.divisi,
      disable: true,
    },
    {
      form: 'input',
      type: 'text',
      id: 'departemen',
      label: 'Departemen',
      placeholder: '',
      value: this.data.editData.departemen,
      disable: true,
    },
    {
      form: 'input',
      type: 'text',
      id: 'sub_departemen',
      label: 'Sub Departemen',
      placeholder: '',
      value: this.data.editData.sub_departemen,
      disable: true,
    },
    {
      form: 'select',
      type: '',
      id: 'id_jadwal_kerja',
      label: 'Jadwal',
      placeholder: '',
      value: [],
      disable: !this.akses,
    },
    {
      isCouple: true,
      form: 'input',
      type: 'time',
      id: 'masuk',
      label: 'Jam Masuk',
      placeholder: '',
      value: '',
      disable: true,
      couple: {
        form: 'input',
        type: 'time',
        id: 'keluar',
        label: 'Jam Keluar',
        placeholder: '',
        value: '',
        disable: true,
      },
    },
    {
      isCouple: true,
      form: 'input',
      type: 'time',
      id: 'start_break',
      label: 'Jam Mulai Istirahat',
      placeholder: '',
      value: '',
      disable: true,
      couple: {
        form: 'input',
        type: 'time',
        id: 'end_break',
        label: 'Jam Selesai Istirahat',
        placeholder: '',
        value: '',
        disable: true,
      },
    },
    {
      form: 'input',
      type: 'number',
      id: 'total',
      label: 'Total Jam Kerja',
      placeholder: '',
      value: '',
      disable: true,
    },
  ];

  fillValue() {
    for (let row of this.data.editData.jadwal_kerja) {
      if (row.tgl === this.data.tgl) {
        this.selectedJadwalKerja = row;
        break;
      }
    }
  }

  changeIdJadwalKerja(data: any) {
    this.dataJadwalKerja.forEach((res: any) => {
      if (res.id_jadwal_kerja === data.value) {
        const {
          id_jadwal_kerja,
          masuk,
          keluar,
          start_break,
          end_break,
          total,
        } = res;
        const { tgl, hari } = this.selectedJadwalKerja;
        this.selectedJadwalKerja = {
          tgl,
          hari,
          id_jadwal_kerja,
          masuk,
          keluar,
          start_break,
          end_break,
          total,
        };
      }
    });

    this.data.editData.jadwal_kerja.forEach((res: any, index: number) => {
      if (res.tgl === this.data.tgl) {
        this.data.editData.jadwal_kerja[index] = this.selectedJadwalKerja;
      }
    });
  }
}
