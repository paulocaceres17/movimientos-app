import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs';

export const routerInjection = () => inject(Router);
export const authStateObs$ = () => inject(AuthService).authState$;

export const authGuard: CanActivateFn = (route, state) => {
  const router = routerInjection();
  
  return authStateObs$().pipe(
    map( ( user: any ) => {
      if ( user === null ) {
        router.navigate(['/login']);
        return false;
      }
      else{
        return true;
      }
    } )
  );
};
