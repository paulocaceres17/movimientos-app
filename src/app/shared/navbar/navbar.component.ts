import { Subscription, filter } from 'rxjs';
import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  nombreUsuario: string = '';
  userSubs!: Subscription;

  constructor( private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.userSubs = this.store.select('user')
    .pipe(
      filter( auth => auth.user != null )
    )
    .subscribe( ({user}) => this.nombreUsuario = user!.nombre )
  }
}
