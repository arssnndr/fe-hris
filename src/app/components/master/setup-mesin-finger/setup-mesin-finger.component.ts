import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/api.service';
import { ModalSetupMesinFingerComponent } from './modal-setup-mesin-finger/modal-setup-mesin-finger.component';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setup-mesin-finger',
  templateUrl: './setup-mesin-finger.component.html',
  styleUrls: ['./setup-mesin-finger.component.css'],
})
export class SetupMesinFingerComponent implements OnInit {
  akses = this.api.akses.role_setup_mesin_finger;

  data: any;

  constructor(
    private api: ApiService,
    private dialog: MatDialog,
    router: Router
  ) {
    if (!this.akses.view) router.navigate(['Dashboard']);
  }

  ngOnInit(event: any = '') {
    const param = isNaN(event)
      ? '?nama_lengkap_like=' + event
      : '?nip_like=' + event;

    this.api
      .getData(environment.tabelSetupMesinFinger + param)
      .subscribe((result) => (this.data = result));
  }

  openDialogEvent() {
    if (this.akses.edit) {
      this.dialog
        .open(ModalSetupMesinFingerComponent)
        .afterClosed()
        .subscribe((result) => {
          if (result != undefined) {
            console.log(result);
          }
        });
    } else {
      alert('Anda tidak memiliki Akses');
    }
  }
}
