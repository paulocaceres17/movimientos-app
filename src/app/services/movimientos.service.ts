import { Injectable } from '@angular/core';
import { Movimientos } from '../models/movimientos.model';
import { AuthService } from './auth.service';

import { getFirestore, doc, setDoc, addDoc, collection, query, where, getDocs } from "firebase/firestore"; 
import { initializeApp } from "firebase/app";
import { environment } from '../environments/environments';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { setItems } from '../movimientos/movimientos.actions';
import { deleteDoc, deleteField, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MovimientosService {

  private readonly app = initializeApp(environment.firebase);
  private readonly db = getFirestore(this.app);

  constructor( private authService: AuthService,
    private store: Store<AppState> ) { }

  async crearMovimiento( movimiento: Movimientos) {
    movimiento.user = this.authService.getUserLogueado?.uid;
    movimiento.uid = new Date().getTime().toString();

    try {
      addDoc(collection(this.db, "movimientos"), { ...movimiento });
      return true;
    } catch (e) {
      console.error("Error adding document: ", e);
      return false;
    }
  }

  async initMovimientosListener(uid: string) {
    const usersRef = collection(this.db, "movimientos");
    const q = query(usersRef, where("user", "==", uid));

    let items: Movimientos[] = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const movimientos = Movimientos.fromFirebase( doc.data() );
      items.push( { ...movimientos } );
    });
    this.store.dispatch( setItems( { items: items } ));
  }

  async borrarMovimiento(uid: string) {
    const movimientoRef = collection(this.db, "movimientos");
    const q = query(movimientoRef, where("uid", "==", uid));

    const querySnapshot = await getDocs(q);
    let refDoc: any;
    querySnapshot.forEach((doc) => {
      refDoc = doc.ref;
      // this.store.dispatch( setUser( { user: tempUser } ));
    });

    try {
      deleteDoc( refDoc );
      return true;
    } catch (e) {
      console.error("Error borrando el movimiento", e);
      return false;
    }
  }

}







    // const movimientosDocRef = doc(usersRef, uid);

    // console.log('movimientosDocRef', movimientosDocRef)
  
    // addDoc(collection(doc(usersRef, uid), "movimientos"), { ...movimiento });
