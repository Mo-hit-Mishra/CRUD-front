// src/app/header/header.component.ts

import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service'; // Import your AuthService

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private authService: AuthService) {}

  logout() {
    // Call your authentication service's logout method
    this.authService.logout();
  }
}
