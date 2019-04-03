// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Routes
import { RouterModule } from '@angular/router'
import { RoutesMap } from './Routes'

import { AppComponent } from './app.component';
import { AuthLoginComponent } from './auth/login/auth.login.component';



@NgModule({
  declarations: [
    AppComponent,
    AuthLoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(RoutesMap)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
