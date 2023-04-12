import { Component } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modal-setup-mesin-finger',
  templateUrl: './modal-setup-mesin-finger.component.html',
  styleUrls: ['./modal-setup-mesin-finger.component.css'],
})
export class ModalSetupMesinFingerComponent {
  akses = this.api.akses.role_setup_mesin_finger.edit;

  tabelLokasi: any = [];
  tabelMesin: any = [];

  filteredKaryawan: any = [];
  selectedKaryawan: any = [];

  dataSet = {
    radioTop: 'semua',
    radioLeft: 'tarikData',
    radioSubLeft: '',
    radioRight: '',
    selectLokasi: '',
    selectMesin: '',
    selectedKaryawan: this.selectedKaryawan,
  };

  constructor(private api: ApiService) {
    api
      .getData(environment.tabelLokasi)
      .subscribe((result) =>
        result.forEach((res: any) => this.tabelLokasi.push(res.inisial))
      );

    api
      .getData(environment.tabelMesinFinger)
      .subscribe((result) =>
        result.forEach((res: any) => this.tabelMesin.push(res))
      );
  }

  searchKaryawan(nip: number) {
    this.filteredKaryawan = [];

    this.api
      .getData(environment.tabelKaryawan + '?nip_like=' + nip)
      .subscribe((result) => this.filteredKaryawan.push(...result));
  }

  selectKaryawan(data: any) {
    this.selectedKaryawan.push(data);
  }

  deleteKaryawan(index: number) {
    this.selectedKaryawan.splice(index, 1);
  }
}
