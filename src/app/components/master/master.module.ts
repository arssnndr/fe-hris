import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MasterRoutingModule } from './master-routing.module';

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

// master components
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

// modals inside master
import { ModalBagianKerjaComponent } from './bagian-kerja/modal-bagian-kerja/modal-bagian-kerja.component';
import { ModalPerusahaanComponent } from './perusahaan/modal-perusahaan/modal-perusahaan.component';
import { ModalLokasiComponent } from './lokasi/modal-lokasi/modal-lokasi.component';
import { ModalUserComponent } from './user/modal-user/modal-user.component';
import { ModalKaryawanComponent } from './karyawan/modal-karyawan/modal-karyawan.component';
import { ModalPerpanjangKontrakComponent } from './karyawan/modal-karyawan/modal-perpanjang-kontrak/modal-perpanjang-kontrak.component';
import { ModalJadwalKerjaComponent } from './jadwal-kerja/modal-jadwal-kerja/modal-jadwal-kerja.component';
import { ModalKalenderKerjaComponent } from './kalender-kerja/modal-kalender-kerja/modal-kalender-kerja.component';
import { ModalMesinFingerComponent } from './mesin-finger/modal-mesin-finger/modal-mesin-finger.component';
import { ModalSetupMesinFingerComponent } from './setup-mesin-finger/modal-setup-mesin-finger/modal-setup-mesin-finger.component';
import { ModalOtoritasComponent } from './otoritas/modal-otoritas/modal-otoritas.component';

// setup-jadwal-kerja subcomponents
import { ModalSetupJadwalKerjaDetailComponent } from './setup-jadwal-kerja/modal-setup-jadwal-kerja-detail/modal-setup-jadwal-kerja-detail.component';
import { ModalSetupJadwalKerjaCategoryComponent } from './setup-jadwal-kerja/modal-setup-jadwal-kerja-category/modal-setup-jadwal-kerja-category.component';
import { ModalSetupJadwalKerjaIndividuComponent } from './setup-jadwal-kerja/modal-setup-jadwal-kerja-individu/modal-setup-jadwal-kerja-individu.component';
import { FilterProfileDetailComponent } from './setup-jadwal-kerja/filter-profile-detail/filter-profile-detail.component';

@NgModule({
  declarations: [
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
    OtoritasComponent,

    ModalBagianKerjaComponent,
    ModalPerusahaanComponent,
    ModalLokasiComponent,
    ModalUserComponent,
    ModalKaryawanComponent,
    ModalPerpanjangKontrakComponent,
    ModalJadwalKerjaComponent,
    ModalKalenderKerjaComponent,
    ModalMesinFingerComponent,
    ModalSetupMesinFingerComponent,
    ModalOtoritasComponent,

    ModalSetupJadwalKerjaDetailComponent,
    ModalSetupJadwalKerjaCategoryComponent,
    ModalSetupJadwalKerjaIndividuComponent,
    FilterProfileDetailComponent,
  ],
  imports: [
    CommonModule,
  RouterModule,
  MasterRoutingModule,
    FormsModule,
    ReactiveFormsModule,

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
  ],
  exports: [
    // Export feature components if they are used by other modules
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
  ],
})
export class MasterModule {}
