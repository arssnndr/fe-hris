import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BagianKerjaComponent } from './bagian-kerja/bagian-kerja.component';
import { PerusahaanComponent } from './perusahaan/perusahaan.component';
import { LokasiComponent } from './lokasi/lokasi.component';
import { UserComponent } from './user/user.component';
import { KaryawanComponent } from './karyawan/karyawan.component';
import { JadwalKerjaComponent } from './jadwal-kerja/jadwal-kerja.component';
import { SetupJadwalKerjaComponent } from './setup-jadwal-kerja/setup-jadwal-kerja.component';
import { KalenderKerjaComponent } from './kalender-kerja/kalender-kerja.component';
import { MesinFingerComponent } from './mesin-finger/mesin-finger.component';
import { SetupMesinFingerComponent } from './setup-mesin-finger/setup-mesin-finger.component';
import { OtoritasComponent } from './otoritas/otoritas.component';

const routes: Routes = [
  { path: '', redirectTo: 'bagian-kerja', pathMatch: 'full' },
  { path: 'bagian-kerja', component: BagianKerjaComponent },
  { path: 'perusahaan', component: PerusahaanComponent },
  { path: 'lokasi', component: LokasiComponent },
  { path: 'user', component: UserComponent },
  { path: 'otoritas', component: OtoritasComponent },
  { path: 'karyawan', component: KaryawanComponent },
  { path: 'jadwal-kerja', component: JadwalKerjaComponent },
  { path: 'setup-jadwal-kerja', component: SetupJadwalKerjaComponent },
  { path: 'kalender-kerja', component: KalenderKerjaComponent },
  { path: 'mesin-finger', component: MesinFingerComponent },
  { path: 'setup-mesin-finger', component: SetupMesinFingerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule {}
