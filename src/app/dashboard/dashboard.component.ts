import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription, filter } from 'rxjs';
import { MovimientosService } from '../services/movimientos.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  userSubs!: Subscription;

  constructor( private store: Store<AppState>,
    private movimientosService: MovimientosService) {
  }

  ngOnInit(): void {
    this.userSubs = this.store.select('user')
    .pipe(
      filter( auth => auth.user != null )
    )
    .subscribe( user => this.movimientosService.initMovimientosListener(user.user?.uid!) )
  }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }
}
