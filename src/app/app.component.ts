import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor() {}

  ngOnInit(): void {
    if (localStorage.getItem('key') !== null) {
      this.isLogin = true;
      this.email = localStorage.getItem('key');
    } else {
      this.isLogin = false;
    }
  }

  logOut() {
    localStorage.clear();
    window.location.replace('/login');
  }
}
