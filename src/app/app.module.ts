// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Routes
import { RouterModule } from '@angular/router';
import { RoutesMap } from './Routes';

import { AppComponent } from './app.component';
import { AuthLoginComponent } from './auth/login/auth.login.component';
import { TopbarComponent } from './_layout/topbar/topbar.component';
import { SidebarComponent } from './_layout/sidebar/sidebar.component';
import { OutsideClickDirective } from './_directives/outsideClick.directive';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    AuthLoginComponent,
    TopbarComponent,
    SidebarComponent,
    OutsideClickDirective
  ],
  imports: [
    BrowserModule,
    NgbDropdownModule,
    RouterModule.forRoot(RoutesMap)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
