// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';

// Routes
import { RouterModule } from '@angular/router';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import { RoutesMap } from './Routes';

import { AppComponent } from './app.component';
import { AuthLoginComponent } from './auth/login/auth.login.component';
import { TopbarComponent } from './_layout/topbar/topbar.component';
import { SidebarComponent } from './_layout/sidebar/sidebar.component';
import { OutsideClickDirective } from './_directives/outsideClick.directive';
import { DashboardComponent } from './dashboard/dashboard.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuthInterceptorProvider} from './_etc/AuthInterceptor';
import { AuthComponent } from './_layout/auth.component';
import { IndexComponent } from './_layout/index.component';
import { RecoverPasswordComponent } from './auth/recover-password/recover-password.component';
import { AllCustomersComponent } from './customers/all-customers/all-customers.component';
import { CompanyCustomersComponent } from './customers/company-customers/company-customers.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthLoginComponent,
    TopbarComponent,
    SidebarComponent,
    OutsideClickDirective,
    DashboardComponent,
    AuthComponent,
    IndexComponent,
    RecoverPasswordComponent,
    AllCustomersComponent,
    CompanyCustomersComponent,
  ],
  imports: [
    BrowserModule,
    NgbDropdownModule,
    RouterModule.forRoot(RoutesMap),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxDatatableModule
  ],
  providers: [AuthInterceptorProvider],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
