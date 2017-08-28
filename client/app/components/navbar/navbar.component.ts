import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { SessionService } from '../../services/session.service'

@Component({
  selector: 'deep-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private session: SessionService) {
  }

  logout () {
    this.session.logOut()
  }
  
  ngOnInit() {
  }

}
