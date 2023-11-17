import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { dashboardRoutes } from './dashboard.routes';
// import { authGuard } from '../services/auth.guard';

const rutasHijas: Routes = [
  { 
      path: '',
      component: DashboardComponent,
      children: dashboardRoutes,
      // canActivate: [ authGuard ]
    }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(rutasHijas)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule { }
