import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// angular material
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';

// component
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BagianKerjaComponent } from './components/master/bagian-kerja/bagian-kerja.component';
import { PerusahaanComponent } from './components/master/perusahaan/perusahaan.component';
import { LokasiComponent } from './components/master/lokasi/lokasi.component';
import { UserComponent } from './components/master/user/user.component';
import { KaryawanComponent } from './components/master/karyawan/karyawan.component';
import { JadwalKerjaComponent } from './components/master/jadwal-kerja/jadwal-kerja.component';
import { SetupJadwalKerjaComponent } from './components/master/setup-jadwal-kerja/setup-jadwal-kerja.component';
import { KalenderKerjaComponent } from './components/master/kalender-kerja/kalender-kerja.component';
import { MesinFingerComponent } from './components/master/mesin-finger/mesin-finger.component';
import { SetupMesinFingerComponent } from './components/master/setup-mesin-finger/setup-mesin-finger.component';
import { StatusKehadiranComponent } from './components/status-kehadiran/status-kehadiran.component';
import { ListKehadiranComponent } from './components/list-kehadiran/list-kehadiran.component';
import { LemburComponent } from './components/lembur/lembur.component';
import { GantiNipComponent } from './components/ganti-nip/ganti-nip.component';

// form
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        DashboardComponent,
        BagianKerjaComponent,
        PerusahaanComponent,
        LokasiComponent,
        UserComponent,
        KaryawanComponent,
        JadwalKerjaComponent,
        SetupJadwalKerjaComponent,
        KalenderKerjaComponent,
        MesinFingerComponent,
        SetupMesinFingerComponent,
        StatusKehadiranComponent,
        ListKehadiranComponent,
        LemburComponent,
        GantiNipComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,

        // angular material
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule,
        MatButtonModule,
        MatMenuModule,
        MatPaginatorModule,
        MatCardModule,
        
        // form
        FormsModule,
        ReactiveFormsModule
    ]
})
export class AppModule { }
