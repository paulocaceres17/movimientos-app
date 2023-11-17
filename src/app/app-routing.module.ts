import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { authGuard } from './services/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    canMatch: [ authGuard ],
    loadChildren: () => import('./movimientos/movimientos.module').then( m => m.MovimientosModule)
  },
  // { 
  //   path: '',
  //   component: DashboardComponent,
  //   children: dashboardRoutes,
  //   canActivate: [ authGuard ]
  // },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
