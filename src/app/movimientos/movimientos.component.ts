import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Movimientos } from '../models/movimientos.model';
import { MovimientosService } from '../services/movimientos.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import * as ui from '../shared/ui.actions';
import { setItem } from './movimientos.actions';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.css']
})
export class MovimientosComponent {

  movimientoForm!: FormGroup;
  cargando: boolean = false;
  tipo: string = 'ingreso';
  uiSubscription!: Subscription;

  constructor( private fb: FormBuilder,
    private movimientosService: MovimientosService,
    private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.movimientoForm = this.fb.group( {
      descripcion: ['', Validators.required],
      monto: [0, Validators.required]
    } );
    this.uiSubscription = this.store.select('ui').subscribe( ui => this.cargando = ui.isLoading);
  }

  guardar() {
    if( this.movimientoForm.invalid) return;
    
    this.store.dispatch( ui.isLoading() );

    const { descripcion, monto } = this.movimientoForm.value;
    const movimiento = new Movimientos(descripcion, monto, this.tipo);

    this.movimientosService.crearMovimiento(movimiento)
    .then( (res) => {
      if (res) {
        this.store.dispatch( setItem( { items: { ...movimiento } }))
        setTimeout(() => {
          this.store.dispatch( ui.stopLoading() );
        }, 2000);
        // Swal.fire('Registro creado', descripcion, 'success');
        this.movimientoForm.reset();
      }
      else {
        Swal.fire('Registro no creado', 'Ocurrió un error al registrar el movimiento', 'error');
      }
    });
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

}
