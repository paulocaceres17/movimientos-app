import { Injectable, inject } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import type { User } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { environment } from '../environments/environments';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { getFirestore, addDoc, collection } from "firebase/firestore"; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly app = initializeApp(environment.firebase);
  private readonly auth = getAuth(this.app);
  // readonly authState$ = authState(this.auth);

  public readonly authState$: Observable<User | null>;

  constructor(private readonly authx: Auth) {
    this.authState$ = authState(this.authx);
  }

  initAuthListener() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        const uid = user.uid;
        const email = user.email;
        console.log(uid);
      } else {
        console.log('none');
      }
    });
  }

  crearUsuario( nombre: string, correo: string, password: string ) {
    return createUserWithEmailAndPassword(this.auth, correo, password)
      .then((userCredential) => {

        const newUser = new Usuario(userCredential.user.uid, nombre, correo);

        const db = getFirestore(this.app);

        try {
          addDoc(collection(db, "usuario"), { ...newUser });
        } catch (e) {
          console.error("Error adding document: ", e);
        }

        return { error: false, mensaje: '', user: userCredential.user };
      })
      .catch((error) => {
        return { error: true, mensaje: error.message, user: null };
      });
  }

  login( correo: string, password: string ) {
    return signInWithEmailAndPassword(this.auth, correo, password)
      .then((userCredential) => {
        return { error: false, mensaje: '', user: userCredential.user };
      })
      .catch((error) => {
        return { error: true, mensaje: error.message, user: null };
      });
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return authState(this.auth);
  }
}
