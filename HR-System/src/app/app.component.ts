import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HR-System';
  events: string[] = [];
  opened: boolean | undefined;
  panelOpenState: boolean | undefined;
  public isExpanded = false;

  public toggleMenu() {
    this.isExpanded = !this.isExpanded;
  }

  constructor() { }

  ngOnInit(): void {
    this.opened = true;
    this.panelOpenState = false
  }
}
