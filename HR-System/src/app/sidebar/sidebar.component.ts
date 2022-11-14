import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
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
