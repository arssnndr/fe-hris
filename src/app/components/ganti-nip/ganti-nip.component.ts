import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/api.service';
import { ModalGantiNipComponent } from './modal-ganti-nip/modal-ganti-nip.component';

@Component({
  selector: 'app-ganti-nip',
  templateUrl: './ganti-nip.component.html',
  styleUrls: ['./ganti-nip.component.css'],
})
export class GantiNipComponent implements OnInit {
  tableKaryawan = 'ms_karyawan/';
  filteredKaryawan!: any[];

  selectedKaryawan: any[] = [{ nip: '', perusahaan: '' }];
  count = 0;

  tablePerusahaan = 'ms_perusahaan/';
  perusahaan: any[] = [];
  selectedPerusahaan: any[] = [{}];

  nipLama: any[] = [''];
  nipBaru: any[] = [];

  checkTable: boolean[] = [];

  isKeluar: boolean = false;

  constructor(public dialog: MatDialog, private api: ApiService) {}

  ngOnInit(): void {
    this.api.getData(this.tablePerusahaan).subscribe((res) => {
      this.perusahaan = [];
      res.map((val: any) => {
        this.perusahaan.push(val.inisial + ' - ' + val.nama);
      });
    });
  }

  searchKaryawan(data: any) {
    this.api
      .getData(this.tableKaryawan + '?nip_like=' + data.value)
      .subscribe((res) => {
        res.length === 0
          ? this.api
              .getData(this.tableKaryawan + '?nama_lengkap_like=' + data.value)
              .subscribe((ress) => {
                this.filteredKaryawan = ress;
              })
          : (this.filteredKaryawan = res);
      });
  }

  selectKaryawan(data: any, index: number) {
    let perusahaan = '';
    this.perusahaan.map((res: any) => {
      if (res.includes(data.perusahaan)) {
        perusahaan = res;
      }
    });
    if (index < this.count) {
      this.nipLama[index] = data.nip;
      this.selectedKaryawan[index] = data;
      this.selectedPerusahaan[index] = perusahaan;
    } else {
      this.nipLama[this.count] = data.nip;
      this.nipLama.push('');
      this.selectedKaryawan[this.count] = data;
      this.selectedPerusahaan[this.count] = perusahaan;
      this.selectedKaryawan.push({ nip: '' });
      this.count += 1;
    }
  }

  selectPerusahaan(data: any, index: number) {
    data = data.value;
    this.selectedKaryawan[index].perusahaan = data.slice(0, 3);
  }

  konfirm() {
    const dialogRef = this.dialog.open(ModalGantiNipComponent);

    dialogRef.afterClosed().subscribe((res) => {
      if (res === 'ya') {
        this.nipBaru = [];
        for (let i = 0; i < this.selectedKaryawan.length - 1; i++) {
          let nip: any[] = [];
          this.api
            .getData(
              this.tableKaryawan +
                '?perusahaan=' +
                this.selectedKaryawan[i].perusahaan
            )
            .subscribe((ress) => {
              ress.map((val: any) => {
                nip.push(val.nip);
              });
              let newNip = Math.max(...nip) + 1;
              this.selectedKaryawan[i].nip = newNip;
              this.nipBaru.push(newNip.toString());
              this.api
                .updateData(
                  this.tableKaryawan,
                  this.selectedKaryawan[i],
                  this.selectedKaryawan[i].id
                )
                .subscribe(() => {
                  this.checkTable.push(true);
                });
            });
        }
      }
      this.isKeluar = true;
    });
  }
}
