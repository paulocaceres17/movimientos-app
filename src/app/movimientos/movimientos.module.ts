
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Componentes
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DetalleComponent } from './detalle/detalle.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { MovimientosComponent } from './movimientos.component';

// Pipes
import { OrdenMovimientosPipe } from './../pipes/orden-movimientos.pipe';

// Módulos
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';
import { StoreModule } from '@ngrx/store';
import { movimientosReducer } from './movimientos.reducer';


@NgModule({
  declarations: [
    DashboardComponent,
    MovimientosComponent,
    EstadisticaComponent,
    DetalleComponent,
    OrdenMovimientosPipe
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('movimientos', movimientosReducer),
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    DashboardRoutingModule
  ]
})
export class MovimientosModule { }
