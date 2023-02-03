import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GantiNipComponent } from './components/ganti-nip/ganti-nip.component';
import { ApiService } from './shared/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'HR-System';

  // start navbar
  isExpanded = false;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  masterDisplay = 'block';
  downloadDisplay = 'block';

  isLogin = false;
  email!: any;

  isMD() {
    this.showSubmenu
      ? (this.masterDisplay = 'block')
      : (this.masterDisplay = 'none');
  }

  isDD() {
    this.showSubSubMenu
      ? (this.downloadDisplay = 'block')
      : (this.downloadDisplay = 'none');
  }
  // end navbar

  constructor(private dialog: MatDialog, private api: ApiService) {}

  ngOnInit(): void {
    if (localStorage.getItem('key') !== null) {
      this.isLogin = true;
      this.email = localStorage.getItem('key');
    } else {
      this.isLogin = false;
    }
  }

  gantiNip() {
    this.dialog.open(GantiNipComponent);
  }

  logOut() {
    localStorage.clear();
    window.location.replace('/login');
  }
}
