import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  badgevisible: boolean = true;

  badgevisibility() {
    this.badgevisible = !this.badgevisible;
  }
}
