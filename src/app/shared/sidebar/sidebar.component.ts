import { AuthService } from 'src/app/services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor( private authService: AuthService,
    private router: Router ) { }

  logout() {
    this.authService.logout()
    .then( () => {
      this.router.navigate(['/login']);
    })
  }
}
