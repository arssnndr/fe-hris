import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/api.service';
import { AbsenManualComponent } from './absen-manual/absen-manual.component';

@Component({
  selector: 'app-modal-list-kehadiran',
  templateUrl: './modal-list-kehadiran.component.html',
  styleUrls: ['./modal-list-kehadiran.component.css'],
})
export class ModalListKehadiranComponent implements OnInit {
  cek = false;

  constructor(private api: ApiService, public dialog: MatDialog) {}

  ngOnInit(): void {}

  absenManual() {
    const dialogRef = this.dialog.open(AbsenManualComponent, {
      data: {
        name: 'editKehadiran',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'simpan') {
        let catchResult = this.api.catchData();
        console.log(catchResult);
      }
    });
  }

  throwResult() {}
}
