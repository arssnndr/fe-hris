import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-void',
  templateUrl: './void.component.html',
  styleUrls: ['./void.component.css'],
})
export class VoidComponent {
  constructor(@Inject(MAT_DIALOG_DATA) data: any) {
    data == null
      ? (this.message = 'Yakin data akan divoid?')
      : (this.message = data);
  }

  message!: string;
}
