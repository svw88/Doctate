import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  constructor(public router: Router) {

  }
  navigate(url: string) {
    this.router.navigate([url]);
  }
}
