import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { BagianKerjaComponent } from './components/master/bagian-kerja/bagian-kerja.component';
import { PerusahaanComponent } from './components/master/perusahaan/perusahaan.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'bagian-kerja', component: BagianKerjaComponent },
  { path: 'perusahaan', component: PerusahaanComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
