import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Movimientos } from 'src/app/models/movimientos.model';
import { AppStateMovimientos } from '../movimientos.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css']
})
export class EstadisticaComponent {

  ingresos: number = 0;
  egresos: number = 0;
  totalIngresos: number = 0;
  totalEgresos: number = 0;
  constructor( private store: Store<AppStateMovimientos>) { }

  ngOnInit(): void {
    this.store.select('movimientos')
    .subscribe( ( { items } ) => this.generarEstadistica( items ))
  }

  generarEstadistica( items: Movimientos[] ) {
    items.forEach(element => {
      if(element.tipo === 'ingreso') {
        this.totalIngresos += element.monto;
        this.ingresos++;
      } else {
        this.totalEgresos += element.monto;
        this.egresos++;
      }
    });
  }
}
