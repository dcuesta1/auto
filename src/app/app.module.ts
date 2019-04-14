// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';

// Routes
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {AppRoutingModule} from './app-routing.module';

import {AuthInterceptorProvider} from './_etc/AuthInterceptor';
import { AppComponent } from './app.component';

import { AuthLoginComponent } from './auth/login/auth.login.component';
import { TopbarComponent } from './_layout/topbar/topbar.component';
import { SidebarComponent } from './_layout/sidebar/sidebar.component';
import { OutsideClickDirective } from './_directives/outsideClick.directive';
import { DashboardComponent } from './dashboard/dashboard.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuthComponent } from './_layout/auth.component';
import { IndexComponent } from './_layout/index.component';
import { RecoverPasswordComponent } from './auth/recover-password/recover-password.component';
import { CompanyCustomersComponent } from './customers/company-customers/company-customers.component';
import {CompanyInvoicesComponent} from './invoices/company-invoices/company-invoices.component';
import {SingleInvoiceComponent} from './invoices/single-invoice/single-invoice.component';

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
    CompanyCustomersComponent,
    CompanyInvoicesComponent,
    SingleInvoiceComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    NgbDropdownModule,
    AppRoutingModule
    // InvoicesModule
  ],
  providers: [AuthInterceptorProvider],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {
}
