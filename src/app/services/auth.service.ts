import { Usuario } from './../models/usuario.model';
import { Injectable, inject } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import type { User } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { environment } from '../environments/environments';
import { Observable, Subscription } from 'rxjs';
import { getFirestore, addDoc, collection, query, where, getDocs } from "firebase/firestore"; 
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { setUser } from '../auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly app = initializeApp(environment.firebase);
  private readonly auth = getAuth(this.app);
  // readonly authState$ = authState(this.auth);

  public readonly authState$: Observable<User | null>;

  constructor(private readonly authx: Auth,
    private store: Store<AppState>) {
    this.authState$ = authState(this.authx);
  }

  initAuthListener() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.getUser(user.uid);
        // 
        const uid = user.uid;
        const email = user.email;
        console.log(uid);
      } else {
        console.log('none');
      }
    });
  }

  
  async getUser(uid: string) {
    const db = getFirestore(this.app);
    const usersRef = collection(db, "usuario");
    const q = query(usersRef, where("uid", "==", uid));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const user = Usuario.fromFirebase( doc.data() );
      const tempUser = new Usuario(user.uid, user.nombre, user.email);
      this.store.dispatch( setUser( { user: tempUser } ));
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
