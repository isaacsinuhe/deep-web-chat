import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'deep-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public navLinks
  private active
  constructor() {
    this.navLinks = [
      {route: 'home', icon: 'home', label: 'HOME'}
      , {route: 'dashboard', icon: 'dashboard', label: 'DASHBOARD'}
      // , {route: 'settings', icon: 'settings', label: 'SETTINGS'}
    ]
  }

  ngOnInit() {
  }

}
