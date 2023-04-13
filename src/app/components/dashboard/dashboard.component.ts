import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  jmlKaryawan = [
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

  ngAfterViewInit() {
    this.jmlKaryawan.map((data) => {
      new Chart(data.chartName + data.for, {
        type: 'bar',
        data: {
          labels: data.data.map((row) => row.name),
          datasets: [
            {
              backgroundColor: data.data.map((row) => row.color),
              data: data.data.map((row) => row.count),
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
