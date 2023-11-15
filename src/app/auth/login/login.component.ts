import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;
  constructor( private fb: FormBuilder,
    private authService: AuthService,
    private router: Router ) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group( {
      correo: [ '', [Validators.required, Validators.email] ],
      password: [ '', Validators.required ]
    } );
  }

  login() {
    if ( this.loginForm.invalid ) return;
    const { correo, password } = this.loginForm.value;

    Swal.fire({
      title: "Espere por favor!",
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.authService.login( correo, password )
    .then( msj => {
      if( msj.error ) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: msj.mensaje,
          footer: '<a href="">Why do I have this issue?</a>'
        });
      }
      else {
        console.log( 'Se logueo con éxito:::', msj.user );
        Swal.close();
        this.router.navigate( ['/'] );
      }
    });
  }

}
