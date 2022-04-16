import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  toggleMenu = false;
  currentUrl: any
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {

  }
  get userName() {
    return localStorage.getItem('username');
  }
  activePath() {
    return window.location.href.replace(window.location.origin + '/', '');
  }

  toggleBar() {
    this.toggleMenu = !this.toggleMenu;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }

}
