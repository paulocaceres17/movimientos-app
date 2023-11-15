import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Auth, User, authState  } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registroForm!: FormGroup;
  private auth: Auth = inject(Auth);
  authState$ = authState(this.auth);
  // authStateSubscription: Subscription;

  constructor( private fb: FormBuilder,
    private authService: AuthService,
    private router: Router ) {
    // this.authStateSubscription = this.authState$.subscribe((aUser: User | null) => {
    //   //handle auth state changes here. Note, that user will be null if there is no currently logged in user.
    //   console.log(aUser);
    // })
  }

  ngOnInit(): void {
    this.registroForm = this.fb.group( {
      nombre: [ '', Validators.required ],
      correo: [ '', [Validators.required, Validators.email] ],
      password: [ '', Validators.required ]
    } );
  }

  crearUsuario() {
    if ( this.registroForm.invalid ) return;
    const { nombre, correo, password } = this.registroForm.value;

    Swal.fire({
      title: "Espere por favor!",
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    // this.authService.crearUsuario( nombre, correo, password );
    this.authService.crearUsuario( nombre, correo, password )
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
        console.log( 'Usuario registrado con éxito:::', msj.user );
        Swal.close();
        this.router.navigate( ['/'] );
      }
    });
    // this.authService.crearUsuario( nombre, correo, password )
    // .then( credenciales => {
    //   console.log( credenciales )
    // })
    // .catch( err => console.error( 'xxx', err));
  }

  // ngOnDestroy() {
  //   this.authStateSubscription.unsubscribe();
  // }
}
