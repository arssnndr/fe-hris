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
    if (this.nipLama.includes(data.nip)) {
      window.alert('Karyawan telah dipilih!');
    } else {
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
  }

  selectPerusahaan(data: any, index: number) {
    data = data.value;
    this.selectedKaryawan[index].perusahaan = data.slice(0, 3);
  }

  konfirm() {
    const dialogRef = this.dialog.open(ModalGantiNipComponent);

    dialogRef.afterClosed().subscribe(async (res) => {
      if (res === 'ya') {
        let maxNip: any[] = [];
        for (let i = 0; i < this.selectedKaryawan.length - 1; i++) {
          let nip: any[] = [];
          await this.api
            .getData(
              this.tableKaryawan +
                '?perusahaan=' +
                this.selectedKaryawan[i].perusahaan
            )
            .toPromise()
            .then((ress) => {
              ress.map((val: any) => {
                nip.push(val.nip);
              });
              maxNip.push(Math.max(...nip) + 1);
            });
        }

        maxNip = this.getUniqueArray(maxNip);

        for (let i = 0; i < this.selectedKaryawan.length - 1; i++) {
          this.selectedKaryawan[i].nip = maxNip[i];
          this.api
            .updateData(
              this.tableKaryawan,
              this.selectedKaryawan[i],
              this.selectedKaryawan[i].id
            )
            .subscribe(() => {
              this.nipBaru.push(this.selectedKaryawan[i].nip);
              this.checkTable.push(true);
            });
        }
      }
      this.isKeluar = true;
    });
  }

  getUniqueArray(arr: any[]) {
    let uniqueArray: any[] = [];
    arr.reduce((_acc, currentValue) => {
      if (!uniqueArray.includes(currentValue)) {
        uniqueArray.push(currentValue);
      } else {
        let newValue = currentValue + 1;
        while (uniqueArray.includes(newValue)) {
          newValue++;
        }
        uniqueArray.push(newValue);
      }
    }, []);
    return uniqueArray;
  }
}
