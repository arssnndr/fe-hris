import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { DownloadDataPayrollComponent } from './components/download-data-payroll/download-data-payroll.component';
import { DownloadReportComponent } from './components/download-report/download-report.component';
import { GantiNipComponent } from './components/ganti-nip/ganti-nip.component';
import { LogHistoryComponent } from './components/log-history/log-history.component';
import { environment } from 'src/environments/environment';
import { ApiService } from './shared/api.service';
import { LogoutConfirmComponent } from './components/modals/logout-confirm/logout-confirm.component';
import { GantiPasswordComponent } from './components/modals/ganti-password/ganti-password.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  akses = this.api.akses;

  title = 'HR-System';

  // start navbar
  isExpanded = false;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  masterDisplay = 'block';
  downloadDisplay = 'block';

  previous!: string;
  bagianKerja: boolean = false;
  perusahaan: boolean = false;
  lokasi: boolean = false;
  user: boolean = false;
  otoritas: boolean = false;
  karyawan: boolean = false;
  jadwalKerja: boolean = false;
  setupJadwalKerja: boolean = false;
  kalenderKerja: boolean = false;
  mesinFinger: boolean = false;
  setupMesinFinger: boolean = false;
  statusKehadiran: boolean = false;
  listKehadiran: boolean = false;
  lembur: boolean = false;
  gantiNip: boolean = false;
  downloadDataPayroll: boolean = false;
  downloadReport: boolean = false;
  logHistory: boolean = false;

  isLogin = false;
  email!: any;

  isMD() {
    this.showSubmenu
      ? (this.masterDisplay = 'block')
      : (this.masterDisplay = 'none');
  }

  isDD() {
    this.showSubSubMenu
      ? (this.downloadDisplay = 'block')
      : (this.downloadDisplay = 'none');
  }
  // end navbar

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private api: ApiService
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.previous = event.url
          .replace(/-([a-z])/g, (match: string[]) => match[1].toUpperCase())
          .replace(/\//g, '');
        this.setActive(this.previous);
      });
  }

  ngOnInit(): void {
    if (this.akses != null) {
      this.isLogin = true;
      this.email = this.akses.email;

      this.api
        .getData(environment.tabelUser + '?email=' + this.email)
        .subscribe((res) => {
          if (res.length == 0) {
            this.isLogin = false;
            localStorage.removeItem('user');
            this.router.navigate(['login']);
          } else {
            localStorage.setItem('user', JSON.stringify(res[0]));
          }
        });
    } else {
      this.isLogin = false;
      this.router.navigate(['login']);
    }
  }

  funcGantiNip() {
    this.dialog
      .open(GantiNipComponent)
      .afterClosed()
      .subscribe(() => {
        this.setActive(this.previous);
      });
  }

  funcDownloadDataPayroll() {
    this.dialog
      .open(DownloadDataPayrollComponent)
      .afterClosed()
      .subscribe(() => {
        this.setActive(this.previous);
      });
  }

  funcDownloadReport() {
    this.dialog
      .open(DownloadReportComponent)
      .afterClosed()
      .subscribe(() => {
        this.setActive(this.previous);
      });
  }

  funcLogHistory() {
    this.dialog
      .open(LogHistoryComponent)
      .afterClosed()
      .subscribe(() => {
        this.setActive(this.previous);
      });
  }

  gantiPassword() {
    this.dialog
      .open(GantiPasswordComponent)
      .afterClosed()
      .subscribe((result) => {
        if (result != undefined) {
          this.api
            .updateData(environment.tabelUser, result, result.id)
            .subscribe(() => alert('Password berhasil diubah'));
        }
      });
  }

  logOut() {
    this.dialog
      .open(LogoutConfirmComponent)
      .afterClosed()
      .subscribe((result) => {
        if (result == 'logout') {
          localStorage.clear();
          window.location.replace('/login');
        }
      });
  }

  setActive(item: string) {
    this.bagianKerja = false;
    this.perusahaan = false;
    this.lokasi = false;
    this.user = false;
    this.otoritas = false;
    this.karyawan = false;
    this.jadwalKerja = false;
    this.setupJadwalKerja = false;
    this.kalenderKerja = false;
    this.mesinFinger = false;
    this.setupMesinFinger = false;
    this.statusKehadiran = false;
    this.listKehadiran = false;
    this.lembur = false;
    this.gantiNip = false;
    this.downloadDataPayroll = false;
    this.downloadReport = false;
    this.logHistory = false;
    switch (item) {
      case 'bagianKerja':
        this.bagianKerja = true;
        this.isExpanded = true;
        this.showSubmenu = true;
        break;
      case 'perusahaan':
        this.perusahaan = true;
        this.isExpanded = true;
        this.showSubmenu = true;
        break;
      case 'lokasi':
        this.lokasi = true;
        this.isExpanded = true;
        this.showSubmenu = true;
        break;
      case 'user':
        this.user = true;
        this.isExpanded = true;
        this.showSubmenu = true;
        break;
      case 'otoritas':
        this.otoritas = true;
        this.isExpanded = true;
        this.showSubmenu = true;
        break;
      case 'karyawan':
        this.karyawan = true;
        this.isExpanded = true;
        this.showSubmenu = true;
        break;
      case 'jadwalKerja':
        this.jadwalKerja = true;
        this.isExpanded = true;
        this.showSubmenu = true;
        break;
      case 'setupJadwalKerja':
        this.setupJadwalKerja = true;
        this.isExpanded = true;
        this.showSubmenu = true;
        break;
      case 'kalenderKerja':
        this.kalenderKerja = true;
        this.isExpanded = true;
        this.showSubmenu = true;
        break;
      case 'mesinFinger':
        this.mesinFinger = true;
        this.isExpanded = true;
        this.showSubmenu = true;
        break;
      case 'setupMesinFinger':
        this.setupMesinFinger = true;
        this.isExpanded = true;
        this.showSubmenu = true;
        break;
      case 'statusKehadiran':
        this.statusKehadiran = true;
        break;
      case 'listKehadiran':
        this.listKehadiran = true;
        break;
      case 'lembur':
        this.lembur = true;
        break;
      case 'gantiNip':
        this.gantiNip = true;
        break;
      case 'downloadDataPayroll':
        this.downloadDataPayroll = true;
        break;
      case 'downloadReport':
        this.downloadReport = true;
        break;
      case 'logHistory':
        this.logHistory = true;
        break;
      default:
        if (!this.isLogin) this.router.navigate(['login']);
        else this.router.navigate(['dashboard']);
        break;
    }
  }
}
