import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import * as moment from 'moment';
import { ApiService } from 'src/app/shared/api.service';
import { utils, writeFileXLSX } from 'xlsx';
import { VoidComponent } from '../../modals/void/void.component';
import { ModalKaryawanComponent } from './modal-karyawan/modal-karyawan.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-karyawan',
  templateUrl: './karyawan.component.html',
  styleUrls: ['./karyawan.component.css'],
})
export class KaryawanComponent implements OnInit {
  akses = this.api.akses.role_karyawan;

  dataKaryawan: any;
  biggestNip: any[] = [];

  search: string = '';
  filter: any;

  paginator = {
    length: 0,
    pageIndex: 0,
    pageSize: 50,
    pageSizeOptions: [50, 100, 150, 200],
  };

  constructor(private api: ApiService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.api.getData(environment.tabelKaryawan).subscribe((res) => {
      this.paginator.length = res.length;

      const setPerusahaan = [...new Set(res.map((val: any) => val.perusahaan))];

      setPerusahaan.forEach((val) => {
        const setNip = res.map((ress: any) =>
          ress.perusahaan === val ? ress.nip : '0'
        );
        this.biggestNip.push({
          perusahaan: val,
          nip: Math.max(...setNip.map(Number)),
        });
      });

      this.getDataPerPage();
    });
  }

  getDataPerPage() {
    let param;

    isNaN(Number(this.search))
      ? (param = '?nama_lengkap_like=' + this.search)
      : (param = '?nip_like=' + this.search);
    if (this.filter !== undefined) {
      if (
        this.filter.lokasi.length === 0 &&
        this.filter.divisi.length === 0 &&
        this.filter.departemen.length === 0 &&
        this.filter.sub_departemen.length === 0 &&
        this.filter.perusahaan.length === 0
      ) {
        this.filter = undefined;
        this.ngOnInit();
      } else {
        param +=
          '&lokasi_like=' +
          this.filter.lokasi +
          '&divisi_like=' +
          this.filter.divisi +
          '&departemen_like=' +
          this.filter.departemen +
          '&sub_departemen_like=' +
          this.filter.sub_departemen +
          '&perusahaan_like=' +
          this.filter.perusahaan;
      }
    }
    this.api
      .getData(
        environment.tabelKaryawan +
          param +
          '&_limit=' +
          this.paginator.pageSize +
          '&_page=' +
          (this.paginator.pageIndex + 1)
      )
      .subscribe((res) => {
        this.dataKaryawan = res;
        if (this.search.length !== 0 || this.filter !== undefined) {
          this.paginator.length = res.length;
        }
      });
  }

  handlePageEvent(e: PageEvent) {
    this.paginator.pageSize = e.pageSize;
    this.paginator.pageIndex = e.pageIndex;
    this.getDataPerPage();
  }

  filterData() {
    this.dialog
      .open(ModalKaryawanComponent, {
        data: { name: 'filter', data: this.filter },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res !== undefined) {
          this.filter = res;
          this.getDataPerPage();
        }
      });
  }

  tambahData() {
    if (this.akses.edit) {
      this.dialog
        .open(ModalKaryawanComponent, { data: { name: 'tambah' } })
        .afterClosed()
        .subscribe((res) => {
          if (res !== undefined) {
            res.perusahaan = res.perusahaan
              .split(' ')
              .map((word: any) => word.charAt(0))
              .join('');
            this.biggestNip.forEach((val) => {
              if (val.perusahaan === res.perusahaan) {
                res.nip = (val.nip + 1).toString();
              }
            });
            this.api.postData(environment.tabelKaryawan, res).subscribe(() => {
              this.ngOnInit();
            });
          }
        });
    } else {
      window.alert('Anda tidak memiliki Akses');
    }
  }

  editData(data: any) {
    this.dialog
      .open(ModalKaryawanComponent, { data: { name: 'edit', data: data } })
      .afterClosed()
      .subscribe((res) => {
        if (res !== undefined) {
          this.api
            .updateData(environment.tabelKaryawan, res, res.id)
            .subscribe(() => {
              this.getDataPerPage();
            });
        } else {
          this.getDataPerPage();
        }
      });
  }

  deleteData(id: number) {
    if (this.akses.edit) {
      this.dialog
        .open(VoidComponent)
        .afterClosed()
        .subscribe((res) => {
          if (res === 'ya') {
            this.api
              .deleteData(environment.tabelKaryawan + id)
              .subscribe(() => {
                this.search.length === 0 && this.filter === undefined
                  ? this.ngOnInit()
                  : this.getDataPerPage();
              });
          }
        });
    } else {
      window.alert('Anda tidak memiliki Akses');
    }
  }

  formatDate(date: string) {
    return moment(date).format('DD MMM YYYY');
  }

  printData(name: string) {
    if (this.akses.download) {
      let header: any[] = [];
      let content;
      let column;

      switch (name) {
        case 'History Status':
          header = [
            ['A1', name],
            ['F1', 'Tanggal Cetak'],
            ['F2', 'User :'],
            ['G1', moment().format('DD MMM YYYY')],
            ['G2', window.localStorage.getItem('key')],
          ];
          content = this.dataKaryawan.map((res: any) => ({
            NIP: res.nip,
            'Nama Karyawan': res.nama_lengkap,
            'Tanggal Lahir': this.formatDate(res.tgl_lahir),
            'Tanggal Join': this.formatDate(res.tgl_join),
            'Status Karyawan': res.status_karyawan,
            'Tanggal Efektif Terminasi': this.formatDate(
              res.tgl_efektif_terminasi
            ),
            'Alasan Terminasi': res.alasan_terminasi,
          }));
          break;

        case 'History Penugasan':
          header = [
            ['A1', name],
            ['L1', 'Tanggal Cetak'],
            ['L2', 'User :'],
            ['M1', moment().format('DD MMM YYYY')],
            ['M2', window.localStorage.getItem('key')],
          ];
          content = this.dataKaryawan.map((res: any) => ({
            NIP: res.nip,
            'Nama Karyawan': res.nama_lengkap,
            'Tanggal Lahir': this.formatDate(res.tgl_lahir),
            'Tanggal Perubahan': this.formatDate(res.tgl_perubahan_detasir),
            'Lokasi Kerja': res.lokasi,
            Divisi: res.divisi,
            Departemen: res.departemen,
            'Sub Departemen': res.sub_departemen,
            Jabatan: res.jabatan,
            'Tanggal Mulai Detasir': this.formatDate(res.tgl_akhir_detasir),
            'Tanggal Akhir Detasir': this.formatDate(res.tgl_akhir_detasir),
            'Lokasi Detasir': res.lokasi_detasir,
            'Alasan Detasir': res.alasan_detasir,
          }));
          break;

        case 'History Gaji Karyawan':
          header = [
            ['A1', name],
            ['G1', 'Tanggal Cetak'],
            ['G2', 'User :'],
            ['H1', moment().format('DD MMM YYYY')],
            ['H2', window.localStorage.getItem('key')],
          ];
          content = this.dataKaryawan.map((res: any) => ({
            NIP: res.nip,
            'Nama Karyawan': res.nama_lengkap,
            'Tanggal Lahir': this.formatDate(res.tgl_lahir),
            'Tanggal Perubahan': this.formatDate(res.tgl_perubahan_detasir),
            'Gaji Pokok': res.gaji_pokok.toLocaleString('id-ID', {
              style: 'currency',
              currency: 'IDR',
            }),
            'Uang Makan': res.uang_makan.toLocaleString('id-ID', {
              style: 'currency',
              currency: 'IDR',
            }),
            'Uang Transport': res.uang_transport.toLocaleString('id-ID', {
              style: 'currency',
              currency: 'IDR',
            }),
            Note: res.note,
          }));
          break;

        case 'Karyawan Pribadi':
          header = [
            ['A1', name],
            ['AJ1', 'Tanggal Cetak'],
            ['AJ2', 'User :'],
            ['AK1', moment().format('DD MMM YYYY')],
            ['AK2', window.localStorage.getItem('key')],
          ];
          content = this.dataKaryawan.map((res: any) => ({
            NIP: res.nip,
            'Nama Karyawan': res.nama_lengkap,
            Kewarganegaraan: res.kewarganegaraan,
            'Tempat Lahir': res.tempat_lahir,
            'Tanggal Lahir': this.formatDate(res.tgl_lahir),
            'Jenis Kelamin': res.jenis_kelamin,
            NIK: res.nik,
            'Nomor NPWP': res.nomor_npwp,
            'Nomor Kartu BPJS TK': res.nomor_bpjs_tk,
            'Nomor Kartu BPJS Kesehatan': res.nomor_bpjs_kesehatan,
            'Nomor Passport': res.nomor_passport,
            'Passport Expired': res.tgl_berakhir_passport,
            'Nomor KITAS': res.nomor_kitas,
            'KITAS Expired': res.tgl_berakhir_kitas,
            'Nomor RPTKA': res.nomor_rptka,
            'RPTKA Expired': res.tgl_berakhir_rptka,
            Kebangsaan: res.kebangsaan,
            'Alamat Domisili': res.alamat_domisili,
            'RT/RW': res.rt_rw,
            'Kel/Des': res.kel_des,
            Agama: res.agama,
            Pendidikan: res.pendidikan_terakhir,
            'Status Perkawinan': res.status_perkawinan,
            'No Telpon': res.nomor_telepon,
            'Nomor Kartu Keluarga': res.nomor_kk,
            'Status Pajak': res.status_pajak,
            'Nama Pasangan': res.nama_pasangan,
            'Nama Anak 1': res.nama_anak_ke1,
            'Nama Anak 2': res.nama_anak_ke2,
            'Nama Anak 3': res.nama_anak_ke3,
            'Nama Ibu Kandung': res.nama_ibu_kandung,
            Email: res.email,
            'Nama Kontak Darurat': res.nama_kontak_darurat,
            'No Telpon Kontak Darurat': res.nomor_kontak_darurat,
            'Hubungan Dengan Karyawan': res.hubungan_dengan_karyawan,
            'Nama Faskes': res.nama_faskes,
            'Alamat Faskes': res.alamat_faskes,
          }));
          break;

        case 'Pekerjaan & Organisasi':
          header = [
            ['A1', name],
            ['K1', 'Tanggal Cetak'],
            ['K2', 'User :'],
            ['L1', moment().format('DD MMM YYYY')],
            ['L2', window.localStorage.getItem('key')],
          ];
          content = this.dataKaryawan.map((res: any) => ({
            NIP: res.nip,
            'Nama Karyawan': res.nama_lengkap,
            Perusahaan: res.perusahaan,
            'Lokasi Kerja': res.lokasi,
            Divisi: res.divisi,
            Departemen: res.departemen,
            'Sub Departemen': res.sub_departemen,
            Jabatan: res.jabatan,
            'Status Karyawan': res.status_karyawan,
            'Nama Pemberi Referensi': res.nama_pemberi_referensi,
            'Nama Atasan Langsung': res.nama_atasan_langsung,
            'Lokasi Detasir': res.lokasi_detasir,
          }));
          break;

        case 'Periode Kontrak':
          header = [
            ['A1', name],
            ['K1', 'Tanggal Cetak'],
            ['K2', 'User :'],
            ['L1', moment().format('DD MMM YYYY')],
            ['L2', window.localStorage.getItem('key')],
          ];
          content = this.dataKaryawan.map((res: any) => ({
            NIP: res.nip,
            'Nama Karyawan': res.nama_lengkap,
            'Status Karyawan': res.status_karyawan,
            'Tanggal Join': this.formatDate(res.tgl_join),
            'Nomor PKWT': res.nomor_pkwt,
            'Nomor PKWTT': res.nomor_pkwtt,
            'Kontrak Ke': res.kontrak_ke,
            'Mulai Kontrak': res.mulai_kontrak,
            'Akhir Kontrak': res.akhir_kontrak,
            'Masa Kerja': res.masa_kerja,
            'Tanggal Muncul Hak cuti': this.formatDate(res.tgl_muncul_hak_cuti),
            'Tanggal Berakhir Hak Cuti': this.formatDate(
              res.tgl_berakhir_hak_cuti
            ),
          }));
          break;

        case 'Gaji Karyawan':
          header = [
            ['A1', name],
            ['E1', 'Tanggal Cetak'],
            ['E2', 'User :'],
            ['F1', moment().format('DD MMM YYYY')],
            ['F2', window.localStorage.getItem('key')],
          ];
          content = this.dataKaryawan.map((res: any) => ({
            NIP: res.nip,
            'Nama Karyawan': res.nama_lengkap,
            'Gaji Pokok': res.gaji_pokok.toLocaleString('id-ID', {
              style: 'currency',
              currency: 'IDR',
            }),
            'Uang Makan': res.uang_makan.toLocaleString('id-ID', {
              style: 'currency',
              currency: 'IDR',
            }),
            'Uang Transport': res.uang_transport.toLocaleString('id-ID', {
              style: 'currency',
              currency: 'IDR',
            }),
            Note: res.note,
          }));
          break;
      }

      column =
        Object.keys(content[0]).length > 25
          ? 'A' +
            String.fromCharCode((Object.keys(content[0]).length % 26) + 64)
          : String.fromCharCode(Object.keys(content[0]).length + 64);

      const ws = utils.json_to_sheet(content);
      const wsTemp = utils.json_to_sheet(content);

      let length = Number(ws['!ref']?.split(column, 2)[1]);
      let gap = 4;

      ws['!ref'] = 'A1:' + column + (length + gap);
      for (let i = 1; i <= 4; i++) {
        Object.keys(content[0]).forEach((_, index) => {
          index > 25
            ? (ws['A' + String.fromCharCode(65 + index - 26) + i] = {
                t: 's',
                v: '',
              })
            : (ws[String.fromCharCode(65 + index) + i] = { t: 's', v: '' });
        });
      }

      header.forEach((res) => (ws[res[0]] = { t: 's', v: res[1] }));

      for (let i = 0; i < length; i++) {
        Object.keys(content[0]).forEach((_, index) => {
          index > 25
            ? (ws['A' + String.fromCharCode(65 + index - 26) + (i + gap)] =
                wsTemp['A' + String.fromCharCode(65 + index - 26) + (i + 1)])
            : (ws[String.fromCharCode(65 + index) + (i + gap)] =
                wsTemp[String.fromCharCode(65 + index) + (i + 1)]);
        });
      }

      const wb = utils.book_new();

      utils.book_append_sheet(wb, ws);
      writeFileXLSX(wb, name + '.xlsx');
    } else {
      window.alert('Anda tidak memiliki Akses');
    }
  }
}
