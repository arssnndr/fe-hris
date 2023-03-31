import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import jsPDF, { CellConfig } from 'jspdf';
import * as moment from 'moment';
import { ApiService } from 'src/app/shared/api.service';
import { environment } from 'src/environments/environment';
import { VoidComponent } from '../modals/void/void.component';

@Component({
  selector: 'app-log-history',
  templateUrl: './log-history.component.html',
  styleUrls: ['./log-history.component.css'],
})
export class LogHistoryComponent {
  dataLogHistory: any[] = [];

  constructor(
    api: ApiService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<LogHistoryComponent>
  ) {
    api.getData(environment.tabelLogHistory).subscribe((res) => {
      this.dataLogHistory = res;
    });
  }

  formatTgl(date: string) {
    return moment(date).format('DD MMM YYYY HH:mm:ss');
  }

  download() {
    this.generatePdf();
    this.dialogRef.close();
  }

  formatDate(date: string) {
    return moment(date).format('DD MMM YYYY');
  }

  generatePdf() {
    const doc = new jsPDF({ orientation: 'portrait' });

    doc.setFontSize(12);

    doc.text('Log History', 15, 15);
    doc.text('Tanggal dicetak : ' + moment().format('DD MMM YYYY'), 135, 15);
    doc.text('User : ' + window.localStorage.getItem('key'), 135, 22.5);

    const header = [
      'User ID',
      'Tanggal',
      'Menu',
      'Log ID',
      'Table Name',
      'Action',
    ];

    const headerConfig: CellConfig[] = header.map((res) => ({
      id: res,
      prompt: res,
      name: res,
      padding: 0,
      width: 40,
      align: 'center',
    }));

    const body = this.dataLogHistory.map((res) => ({
      [header[0]]: res.user_id,
      [header[1]]: this.formatDate(res.tgl),
      [header[2]]: res.menu,
      [header[3]]: res.log_id,
      [header[4]]: res.table,
      [header[5]]: res.action,
    }));

    doc.table(15, 30, body, headerConfig, {
      autoSize: false,
      fontSize: 10,
    });

    doc.save('Log History.pdf');
  }

  delete() {
    this.dialog
      .open(VoidComponent, { data: 'Yakin akan menghapus data Log?' })
      .afterClosed()
      .subscribe((res) => {
        if (res === 'ya') {
          console.log('dihapus semua');
        }
      });
  }
}
