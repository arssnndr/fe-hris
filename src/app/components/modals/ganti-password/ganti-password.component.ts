import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-ganti-password',
  templateUrl: './ganti-password.component.html',
  styleUrls: ['./ganti-password.component.css'],
})
export class GantiPasswordComponent {
  dataUser = this.api.akses;
  constructor(
    private api: ApiService,
    private dialogRef: MatDialogRef<GantiPasswordComponent>
  ) {}

  form = {
    pwdLama: '',
    pwdBaru: '',
    konfirm: '',
  };

  konfirm() {
    if (this.dataUser.password != this.form.pwdLama)
      alert('Password Lama Salah');
    else if (this.form.pwdBaru.length < 8) alert('Password Minimal 8 Karakter');
    else if (this.form.konfirm != this.form.pwdBaru)
      alert('Konfirmasi Password Baru tidak sesuai');
    else {
      this.dataUser.password = this.form.pwdBaru;

      this.dialogRef.close(this.dataUser);
    }
  }
}
