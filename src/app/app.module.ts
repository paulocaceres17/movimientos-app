import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MovimientosComponent } from './movimientos/movimientos.component';
import { EstadisticaComponent } from './movimientos/estadistica/estadistica.component';
import { DetalleComponent } from './movimientos/detalle/detalle.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from './environments/environments';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    MovimientosComponent,
    EstadisticaComponent,
    DetalleComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    // provideFirebaseApp(() => initializeApp({"projectId":"movimientos-app","appId":"1:125324157991:web:e43c51e3533e9aea56da02","storageBucket":"movimientos-app.appspot.com","apiKey":"AIzaSyCbfzHtisw8mc-X--xRSG5i2hcjdbfxLmo","authDomain":"movimientos-app.firebaseapp.com","messagingSenderId":"125324157991"})),
    provideFirebaseApp(() => initializeApp( environment.firebase )),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
