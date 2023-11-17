import { filter, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  nombreUsuario: string = '';
  userSubs!: Subscription;

  constructor( private authService: AuthService,
    private router: Router,
    private store: Store<AppState> ) { }

  logout() {
    this.authService.logout()
    .then( () => {
      this.userSubs.unsubscribe();
      this.router.navigate(['/login']);
    })
  }

  ngOnInit(): void {
    this.userSubs = this.store.select('user')
    .pipe(
      filter( auth => auth.user != null )
    )
    .subscribe( ({user}) => this.nombreUsuario = user!.nombre )
  }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }
  
}

