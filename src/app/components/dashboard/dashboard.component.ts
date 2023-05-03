import { getMultipleValuesInSingleSelectionError } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { Chart } from 'chart.js/auto';
import * as moment from 'moment';
import { ApiService } from 'src/app/shared/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  dataCharts: any = [
    {
      for: 'jumlahKaryawan',
      chartName: 'All',
      data: [
        { name: 'TMS', count: 100, color: '#d85d5d90' },
        { name: 'SBIP', count: 110, color: '#d85d5d90' },
        { name: 'TPI', count: 60, color: '#d85d5d90' },
        { name: 'SPA', count: 120, color: '#d85d5d90' },
        { name: 'APG', count: 80, color: '#d85d5d90' },
        { name: 'IJP', count: 260, color: '#d85d5d90' },
        { name: 'DAP', count: 120, color: '#d85d5d90' },
        { name: 'PGS', count: 100, color: '#d85d5d90' },
        { name: 'TUM', count: 50, color: '#d85d5d90' },
      ],
    },
    {
      for: 'jumlahKaryawan',
      chartName: 'HO',
      data: [
        { name: 'TMS', count: 10, color: '#d85d5d90' },
        { name: 'IJP', count: 60, color: '#d85d5d90' },
        { name: 'DAP', count: 20, color: '#d85d5d90' },
        { name: 'TOTAL', count: 90, color: '#d85d5d' },
      ],
    },
    {
      for: 'jumlahKaryawan',
      chartName: 'TMS 1',
      data: [
        { name: 'TMS', count: 30, color: '#d85d5d90' },
        { name: 'SBIP', count: 50, color: '#d85d5d90' },
        { name: 'TPI', count: 60, color: '#d85d5d90' },
        { name: 'TOTAL', count: 140, color: '#d85d5d' },
      ],
    },
    {
      for: 'jumlahKaryawan',
      chartName: 'TMS 2',
      data: [
        { name: 'TMS', count: 30, color: '#d85d5d90' },
        { name: 'SPA', count: 120, color: '#d85d5d90' },
        { name: 'APG', count: 80, color: '#d85d5d90' },
        { name: 'TOTAL', count: 230, color: '#d85d5d' },
      ],
    },
    {
      for: 'jumlahKaryawan',
      chartName: 'TMS 3',
      data: [
        { name: 'TMS', count: 40, color: '#d85d5d90' },
        { name: 'SPA', count: 100, color: '#d85d5d90' },
        { name: 'APG', count: 90, color: '#d85d5d90' },
        { name: 'TOTAL', count: 230, color: '#d85d5d' },
      ],
    },
    {
      for: 'jumlahKaryawan',
      chartName: 'TMS 4',
      data: [
        { name: 'TMS', count: 40, color: '#d85d5d90' },
        { name: 'SPA', count: 100, color: '#d85d5d90' },
        { name: 'APG', count: 90, color: '#d85d5d90' },
        { name: 'TOTAL', count: 230, color: '#d85d5d' },
      ],
    },
    {
      for: 'statusKehadiran',
      chartName: 'All',
      data: [
        {
          name: 'Terlambat',
          count: Math.floor(Math.random() * (+100 + 1 - +1)) + +1,
          color: '#d85d5d',
        },
        {
          name: 'Mangkir',
          count: Math.floor(Math.random() * (+100 + 1 - +1)) + +1,
          color: '#d85d5d',
        },
        {
          name: 'Izin',
          count: Math.floor(Math.random() * (+100 + 1 - +1)) + +1,
          color: '#d85d5d',
        },
        {
          name: 'Cuti',
          count: Math.floor(Math.random() * (+100 + 1 - +1)) + +1,
          color: '#d85d5d',
        },
      ],
    },
    {
      for: 'statusKehadiran',
      chartName: 'HO',
      data: [
        {
          name: 'Terlambat',
          count: Math.floor(Math.random() * (+100 + 1 - +1)) + +1,
          color: '#d85d5d',
        },
        {
          name: 'Mangkir',
          count: Math.floor(Math.random() * (+100 + 1 - +1)) + +1,
          color: '#d85d5d',
        },
        {
          name: 'Izin',
          count: Math.floor(Math.random() * (+100 + 1 - +1)) + +1,
          color: '#d85d5d',
        },
        {
          name: 'Cuti',
          count: Math.floor(Math.random() * (+100 + 1 - +1)) + +1,
          color: '#d85d5d',
        },
      ],
    },
    {
      for: 'statusKehadiran',
      chartName: 'TMS 1',
      data: [
        {
          name: 'Terlambat',
          count: Math.floor(Math.random() * (+100 + 1 - +1)) + +1,
          color: '#d85d5d',
        },
        {
          name: 'Mangkir',
          count: Math.floor(Math.random() * (+100 + 1 - +1)) + +1,
          color: '#d85d5d',
        },
        {
          name: 'Izin',
          count: Math.floor(Math.random() * (+100 + 1 - +1)) + +1,
          color: '#d85d5d',
        },
        {
          name: 'Cuti',
          count: Math.floor(Math.random() * (+100 + 1 - +1)) + +1,
          color: '#d85d5d',
        },
      ],
    },
    {
      for: 'statusKehadiran',
      chartName: 'TMS 2',
      data: [
        {
          name: 'Terlambat',
          count: Math.floor(Math.random() * (+100 + 1 - +1)) + +1,
          color: '#d85d5d',
        },
        {
          name: 'Mangkir',
          count: Math.floor(Math.random() * (+100 + 1 - +1)) + +1,
          color: '#d85d5d',
        },
        {
          name: 'Izin',
          count: Math.floor(Math.random() * (+100 + 1 - +1)) + +1,
          color: '#d85d5d',
        },
        {
          name: 'Cuti',
          count: Math.floor(Math.random() * (+100 + 1 - +1)) + +1,
          color: '#d85d5d',
        },
      ],
    },
    {
      for: 'statusKehadiran',
      chartName: 'TMS 3',
      data: [
        {
          name: 'Terlambat',
          count: Math.floor(Math.random() * (+100 + 1 - +1)) + +1,
          color: '#d85d5d',
        },
        {
          name: 'Mangkir',
          count: Math.floor(Math.random() * (+100 + 1 - +1)) + +1,
          color: '#d85d5d',
        },
        {
          name: 'Izin',
          count: Math.floor(Math.random() * (+100 + 1 - +1)) + +1,
          color: '#d85d5d',
        },
        {
          name: 'Cuti',
          count: Math.floor(Math.random() * (+100 + 1 - +1)) + +1,
          color: '#d85d5d',
        },
      ],
    },
  ];

  dataLokasi: any = [''];
  dataPerusahaan: any = [''];

  dataJumlahKaryawanAllPerusahaan: any = {};

  jumlahKaryawanLembur: any = [];
  akumulasiJamLembur: any = [];
  rataRataJamLembur: any = [];

  tanggal = moment();
  jumlahHari = this.tanggal.daysInMonth();

  formatDate(date: any, format: string = 'YYYY-MM-DD') {
    return moment(date).format(format);
  }

  constructor(private api: ApiService) {
    api.getData(environment.tabelLokasi).subscribe((result) => {
      this.dataLokasi.push(...new Set(result.map((res: any) => res.inisial)));

      for (const lokasi of this.dataLokasi) {
        this.getDataLembur(lokasi, this.tanggal.format('YYYY-MM'));
      }
    });

    api.getData(environment.tabelPerusahaan).subscribe((result) => {
      this.dataPerusahaan.push(...new Set(result.map((res: any) => res.nama)));
    });
  }

  getDataLembur(param: any, tanggal: any) {
    this.api
      .getData(
        environment.tabelLembur +
          '?lokasi_like=' +
          param +
          '&tgl_like=' +
          tanggal
      )
      .subscribe((result) => {
        let count: any = [];
        result.forEach((res: any) => count.push(res.nip));
        count = [...new Set(count)];

        let jmlKrywn = count.length;
        let akmlsJam = result
          .map((res: any) => res.total_lembur_bulanini)
          .reduce((acc: any, cur: any) => acc + cur, 0);
        let rtJam = akmlsJam / this.jumlahHari / jmlKrywn;

        this.jumlahKaryawanLembur.push(jmlKrywn);
        this.akumulasiJamLembur.push(akmlsJam);
        this.rataRataJamLembur.push(
          isNaN(Number(rtJam.toFixed(2))) ? 0 : rtJam.toFixed(2)
        );
      });
  }

  ngAfterViewInit() {
    this.dataCharts.forEach((data: any) => {
      new Chart(data.chartName + data.for, {
        type: 'bar',
        data: {
          labels: data.data.map((row: any) => row.name),
          datasets: [
            {
              backgroundColor: data.data.map((row: any) => row.color),
              data: data.data.map((row: any) => row.count),
            },
          ],
        },
        options: {
          aspectRatio: 2,
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
    });
  }
}
