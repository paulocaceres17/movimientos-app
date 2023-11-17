import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Movimientos } from 'src/app/models/movimientos.model';
import { MovimientosService } from 'src/app/services/movimientos.service';
import Swal from 'sweetalert2';
import { delItem } from '../movimientos.actions';
import { AppStateMovimientos } from '../movimientos.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent {

  movimientos: Movimientos[] = [];
  movimientosSubs!: Subscription;

  constructor( private store: Store<AppStateMovimientos>,
    private movimientosService: MovimientosService ) {
  }

  ngOnInit(): void {
    this.movimientosSubs = this.store.select('movimientos').subscribe( ({items}) => this.movimientos = items);
  }

  ngOnDestroy(): void {
    this.movimientosSubs.unsubscribe();
  }

  borrar(uid: string){
    this.movimientosService.borrarMovimiento(uid)
    .then( (res) => {
      if (res) {
        this.store.dispatch( delItem( { uid: uid } ) );
        Swal.fire('Borrado', 'Item borrado', 'success')
      }
      else {
        Swal.fire('Borrado', 'Error al borrar', 'error')
      }
    });
  }
}
