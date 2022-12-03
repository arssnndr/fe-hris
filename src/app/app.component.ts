import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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

  isMD() {
    this.showSubmenu ? this.masterDisplay = 'block' : this.masterDisplay = 'none';
  }

  isDD() {
    this.showSubSubMenu ? this.downloadDisplay = 'block' : this.downloadDisplay = 'none';
  }
  // end navbar

  constructor() { }

  ngOnInit(): void {
  }
}
