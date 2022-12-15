import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import * as ApexCharts from 'apexcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  all = [
    { name: 'TMS', count: 100 },
    { name: 'SBIP', count: 110 },
    { name: 'TPI', count: 60 },
    { name: 'SPA', count: 120 },
    { name: 'APG', count: 80 },
    { name: 'IJP', count: 260 },
    { name: 'DAP', count: 120 },
    { name: 'PGS', count: 100 },
    { name: 'TUM', count: 50 },
    { name: 'TOTAL', count: 1000 }
  ]

  ho = [
    { name: 'TMS', count: 10 },
    { name: 'IJP', count: 60 },
    { name: 'DAP', count: 20 },
    { name: 'TOTAL', count: 90 },
  ]

  tms1 = [
    { name: 'TMS', count: 30 },
    { name: 'SBIP', count: 50 },
    { name: 'TPI', count: 60 },
    { name: 'TOTAL', count: 140 },
  ]

  tms2 = [
    { name: 'TMS', count: 30 },
    { name: 'SPA', count: 120 },
    { name: 'APG', count: 80 },
    { name: 'TOTAL', count: 230 },
  ]

  ngOnInit(): void {
    // start jumlah karyawan
    var options1 = {
      chart: {
        type: 'bar'
      },
      series: [{
        name: 'ALL',
        color: '#d85d5d',
        data: this.all.map(row => row.count)
      }],
      xaxis: {
        categories: this.all.map(row => row.name)
      }
    }
    var chart = new ApexCharts(document.querySelector("#chart1"), options1);
    chart.render();


    var options2 = {
      chart: {
        type: 'bar'
      },
      series: [{
        name: 'HO',
        color: '#d85d5d',
        data: this.ho.map(row => row.count)
      }],
      xaxis: {
        categories: this.ho.map(row => row.name)
      }
    }
    var chart = new ApexCharts(document.querySelector("#chart2"), options2);
    chart.render();


    var options3 = {
      chart: {
        type: 'bar'
      },
      series: [{
        name: 'TMS 1',
        color: '#d85d5d',
        data: this.tms1.map(row => row.count)
      }],
      xaxis: {
        categories: this.tms1.map(row => row.name)
      }
    }
    var chart = new ApexCharts(document.querySelector("#chart3"), options3);
    chart.render();


    var options4 = {
      chart: {
        type: 'bar'
      },
      series: [{
        name: 'TMS 2',
        color: '#d85d5d',
        data: this.tms2.map(row => row.count)
      }],
      xaxis: {
        categories: this.tms2.map(row => row.name)
      }
    }
    var chart = new ApexCharts(document.querySelector("#chart4"), options4);
    chart.render();
    // end jumlah karyawan

    // start status kehadiran
    var options5 = {
      chart: {
        type: 'bar'
      },
      series: [{
        name: 'ALL',
        color: '#d85d5d',
        data: [87, 31, 37, 69]
      }],
      xaxis: {
        categories: ["Terlambat", "Mangkir", "Izin", "Cuti"]
      }
    }
    var chart = new ApexCharts(document.querySelector("#chart5"), options5);
    chart.render();


    var options6 = {
      chart: {
        type: 'bar'
      },
      series: [{
        name: 'ALL',
        color: '#d85d5d',
        data: [87, 31, 37, 69]
      }],
      xaxis: {
        categories: ["Terlambat", "Mangkir", "Izin", "Cuti"]
      }
    }
    var chart = new ApexCharts(document.querySelector("#chart6"), options6);
    chart.render();


    var options7 = {
      chart: {
        type: 'bar'
      },
      series: [{
        name: 'ALL',
        color: '#d85d5d',
        data: [87, 31, 37, 69]
      }],
      xaxis: {
        categories: ["Terlambat", "Mangkir", "Izin", "Cuti"]
      }
    }
    var chart = new ApexCharts(document.querySelector("#chart7"), options7);
    chart.render();


    var options8 = {
      chart: {
        type: 'bar'
      },
      series: [{
        name: 'ALL',
        color: '#d85d5d',
        data: [87, 31, 37, 69]
      }],
      xaxis: {
        categories: ["Terlambat", "Mangkir", "Izin", "Cuti"]
      }
    }
    var chart = new ApexCharts(document.querySelector("#chart8"), options8);
    chart.render();
    // end status kehadiran

    // start table
    // end table
  }

}
