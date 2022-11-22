import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'bagian-kerja', component: BagianKerjaComponent },
  { path: 'perusahaan', component: PerusahaanComponent },
  { path: 'lokasi', component: LokasiComponent },
  { path: 'user', component: UserComponent },
  { path: 'karyawan', component: KaryawanComponent },
  { path: 'jadwal-kerja', component: JadwalKerjaComponent },
  { path: 'setup-jadwal-kerja', component: SetupJadwalKerjaComponent },
  { path: 'kalender-kerja', component: KalenderKerjaComponent },
  { path: 'mesin-finger', component: MesinFingerComponent },
  { path: 'setup-mesin-finger', component: SetupMesinFingerComponent },
  { path: 'status-kehadiran', component: StatusKehadiranComponent },
  { path: 'list-kehadiran', component: ListKehadiranComponent },
  { path: 'lembur', component: LemburComponent },
  { path: 'ganti-nip', component: GantiNipComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
