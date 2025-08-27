import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// angular material
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// component
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MasterModule } from './components/master/master.module';
import { StatusKehadiranComponent } from './components/status-kehadiran/status-kehadiran.component';
import { ListKehadiranComponent } from './components/list-kehadiran/list-kehadiran.component';
import { LemburComponent } from './components/lembur/lembur.component';
import { GantiNipComponent } from './components/ganti-nip/ganti-nip.component';
// master modals are declared inside MasterModule
import { ModalStatusKehadiranComponent } from './components/status-kehadiran/modal-status-kehadiran/modal-status-kehadiran.component';
import { ModalListKehadiranComponent } from './components/list-kehadiran/modal-list-kehadiran/modal-list-kehadiran.component';
import { AbsenManualComponent } from './components/list-kehadiran/modal-list-kehadiran/absen-manual/absen-manual.component';
import { ModalLemburComponent } from './components/lembur/modal-lembur/modal-lembur.component';
import { ModalGantiNipComponent } from './components/ganti-nip/modal-ganti-nip/modal-ganti-nip.component';
import { DownloadDataPayrollComponent } from './components/download-data-payroll/download-data-payroll.component';
import { DownloadReportComponent } from './components/download-report/download-report.component';
import { LogHistoryComponent } from './components/log-history/log-history.component';
import { VoidComponent } from './components/modals/void/void.component';
import { ModalFilterDialogComponent } from './components/list-kehadiran/modal-filter-dialog/modal-filter-dialog.component';
import { LogoutConfirmComponent } from './components/modals/logout-confirm/logout-confirm.component';
import { GantiPasswordComponent } from './components/modals/ganti-password/ganti-password.component';
// setup-jadwal-kerja subcomponents are declared inside MasterModule

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
  // master feature moved to MasterModule
    StatusKehadiranComponent,
    ListKehadiranComponent,
    LemburComponent,
    GantiNipComponent,
  // master modals moved to MasterModule
    ModalStatusKehadiranComponent,
    ModalListKehadiranComponent,
    AbsenManualComponent,
    ModalLemburComponent,
    ModalGantiNipComponent,
    DownloadDataPayrollComponent,
    DownloadReportComponent,
    LogHistoryComponent,
  // setup-jadwal-kerja subcomponents moved to MasterModule
    VoidComponent,
    ModalFilterDialogComponent,
    LogoutConfirmComponent,
    GantiPasswordComponent,
  // FilterProfileDetailComponent moved to MasterModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    // angular material
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatMenuModule,
    MatPaginatorModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatGridListModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatSnackBarModule,
  MasterModule,
  ],
})
export class AppModule {}
