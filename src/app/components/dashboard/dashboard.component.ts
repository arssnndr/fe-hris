import { Component, OnInit } from '@angular/core';
import * as ApexCharts from 'apexcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // start jumlah karyawan
    var options1 = {
      chart: {
        type: 'bar'
      },
      series: [{
        name: 'ALL',
        data: [30, 40, 45, 50, 49, 60, 70, 91, 125, 1000]
      }],
      xaxis: {
        categories: ["TMS", "SBIP", "TPI", "SPA", "APG", "IJP", "DAP", "PGS", "TUM", "TOTAL"]
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
        data: [30, 40, 45, 90]
      }],
      xaxis: {
        categories: ["TMS", "IJP", "DAP", "TOTAL"]
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
        data: [30, 40, 45, 140]
      }],
      xaxis: {
        categories: ["TMS", "SBIP", "TPI", "TOTAL"]
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
        data: [30, 40, 45, 230]
      }],
      xaxis: {
        categories: ["TMS", "SPA", "APG", "TOTAL"]
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
        data: [30, 40, 45, 50, 49, 60, 70, 91, 125, 1000]
      }],
      xaxis: {
        categories: ["TMS", "SBIP", "TPI", "SPA", "APG", "IJP", "DAP", "PGS", "TUM", "TOTAL"]
      }
    }
    var chart = new ApexCharts(document.querySelector("#chart5"), options5);
    chart.render();


    var options6 = {
      chart: {
        type: 'bar'
      },
      series: [{
        name: 'HO',
        data: [30, 40, 45, 90]
      }],
      xaxis: {
        categories: ["TMS", "IJP", "DAP", "TOTAL"]
      }
    }
    var chart = new ApexCharts(document.querySelector("#chart6"), options6);
    chart.render();


    var options7 = {
      chart: {
        type: 'bar'
      },
      series: [{
        name: 'TMS 1',
        data: [30, 40, 45, 140]
      }],
      xaxis: {
        categories: ["TMS", "SBIP", "TPI", "TOTAL"]
      }
    }
    var chart = new ApexCharts(document.querySelector("#chart7"), options7);
    chart.render();


    var options8 = {
      chart: {
        type: 'bar'
      },
      series: [{
        name: 'TMS 2',
        data: [30, 40, 45, 230]
      }],
      xaxis: {
        categories: ["TMS", "SPA", "APG", "TOTAL"]
      }
    }
    var chart = new ApexCharts(document.querySelector("#chart8"), options8);
    chart.render();
    // end status kehadiran

    // start table
    // end table
  }

}
