import { Subscription } from 'rxjs';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as ui from '../../shared/ui.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  cargando: boolean = false;
  loginForm!: FormGroup;
  uiSubscription!: Subscription;

  constructor( private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState> ) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group( {
      correo: [ '', [Validators.required, Validators.email] ],
      password: [ '', Validators.required ]
    } );

    this.uiSubscription = this.store.select('ui').subscribe( ui => this.cargando = ui.isLoading);
  }

  login() {
    if ( this.loginForm.invalid ) return;
    const { correo, password } = this.loginForm.value;

    this.store.dispatch( ui.isLoading() );

    // Swal.fire({
    //   title: "Espere por favor!",
    //   timerProgressBar: true,
    //   didOpen: () => {
    //     Swal.showLoading();
    //   }
    // });

    this.authService.login( correo, password )
    .then( msj => {
      if( msj.error ) {
        this.store.dispatch( ui.stopLoading() );
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: msj.mensaje,
          footer: '<a href="">Why do I have this issue?</a>'
        });
      }
      else {
        // Swal.close();
        this.store.dispatch( ui.stopLoading() );
        this.router.navigate( ['/'] );
      }
    });
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

}
