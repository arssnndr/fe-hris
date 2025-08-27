import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
// master routes are lazy-loaded from components/master/master.module
import { StatusKehadiranComponent } from './components/status-kehadiran/status-kehadiran.component';
import { ListKehadiranComponent } from './components/list-kehadiran/list-kehadiran.component';
import { LemburComponent } from './components/lembur/lembur.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'master', loadChildren: () => import('./components/master/master.module').then(m => m.MasterModule) },
  { path: 'status-kehadiran', component: StatusKehadiranComponent },
  { path: 'list-kehadiran', component: ListKehadiranComponent },
  { path: 'lembur', component: LemburComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
