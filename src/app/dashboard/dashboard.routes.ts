import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstadisticaComponent } from '../movimientos/estadistica/estadistica.component';
import { MovimientosComponent } from '../movimientos/movimientos.component';
import { DetalleComponent } from '../movimientos/detalle/detalle.component';

export const dashboardRoutes: Routes = [
    { path: '', component: EstadisticaComponent },
    { path: 'movimientos', component: MovimientosComponent },
    { path: 'detalle', component: DetalleComponent }
];
