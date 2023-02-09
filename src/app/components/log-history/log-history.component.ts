import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { ApiService } from 'src/app/shared/api.service';
import { ModalLogHistoryComponent } from './modal-log-history/modal-log-history.component';

@Component({
  selector: 'app-log-history',
  templateUrl: './log-history.component.html',
  styleUrls: ['./log-history.component.css'],
})
export class LogHistoryComponent {
  tableLogHistory: string = 'log_history/';
  dataLogHistory: any[] = [];

  constructor(
    api: ApiService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<LogHistoryComponent>
  ) {
    api.getData(this.tableLogHistory).subscribe((res) => {
      this.dataLogHistory = res;
    });
  }

  formatTgl(date: string) {
    return moment(date).format('DD MMM YYYY HH:mm:ss');
  }

  download() {
    this.dialogRef.close();
  }

  delete() {
    this.dialog
      .open(ModalLogHistoryComponent)
      .afterClosed()
      .subscribe((res) => {
        if (res === 'ya') {
          console.log('dihapus semua');
        }
      });
  }
}
