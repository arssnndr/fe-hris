import { Component, Inject, INJECTOR } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-modal-perpanjang-kontrak',
  templateUrl: './modal-perpanjang-kontrak.component.html',
  styleUrls: ['./modal-perpanjang-kontrak.component.css'],
})
export class ModalPerpanjangKontrakComponent {
  setData: any = {
    nomor_pkwt: '',
    nomor_pkwtt: '',
    nomor_surat_kerja: '',
    kontrak_ke: '',
    mulai_kontrak: moment().format('YYYY-MM-DD'),
    akhir_kontrak: moment().format('YYYY-MM-DD'),
    tgl_muncul_hak_cuti: moment().format('YYYY-MM-DD'),
    tgl_berakhir_hak_cuti: moment().format('YYYY-MM-DD'),
    tgl_mulai_kerja: moment().format('YYYY-MM-DD'),
    tgl_akhir_kerja: moment().format('YYYY-MM-DD'),
    banyak_hak_cuti: 12,
  };

  formPkwt = [
    { id: 'nomor_pkwt', type: 'text', label: 'Nomor PKWT' },
    { id: 'kontrak_ke', type: 'text', label: 'Kontrak Ke' },
    { id: 'mulai_kontrak', type: 'date', label: 'Mulai Kontrak' },
    { id: 'akhir_kontrak', type: 'date', label: 'Akhir Kontrak' },
    {
      id: 'tgl_muncul_hak_cuti',
      type: 'date',
      label: 'Tanggal Muncul Hak Cuti',
    },
    {
      id: 'tgl_berakhir_hak_cuti',
      type: 'date',
      label: 'Tanggal Berakhir Hak Cuti',
    },
    { id: 'banyak_hak_cuti', type: 'number', label: 'Banyak Hak Cuti' },
  ];

  formPkwtt = [
    { id: 'nomor_pkwtt', type: 'text', label: 'Nomor PKWTT' },
    { id: 'kontrak_ke', type: 'text', label: 'Kontrak Ke' },
    { id: 'mulai_kontrak', type: 'date', label: 'Mulai Kontrak' },
    { id: 'akhir_kontrak', type: 'date', label: 'Akhir Kontrak' },
    {
      id: 'tgl_muncul_hak_cuti',
      type: 'date',
      label: 'Tanggal Muncul Hak Cuti',
    },
    {
      id: 'tgl_berakhir_hak_cuti',
      type: 'date',
      label: 'Tanggal Berakhir Hak Cuti',
    },
    { id: 'banyak_hak_cuti', type: 'number', label: 'Banyak Hak Cuti' },
  ];

  formMagang = [
    { id: 'nomor_surat_kerja', type: 'text', label: 'Nomor Surat Kerja' },
    { id: 'tgl_mulai_kerja', type: 'date', label: 'Tanggal Mulai Kerja' },
    { id: 'tgl_akhir_kerja', type: 'date', label: 'Tanggal Akhir Kerja' },
  ];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { name: string; data: any }
  ) {
    this.setData.kontrak_ke = data.data.kontrak_ke;
  }
}
