import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {CompanyInvoicesComponent} from './company-invoices/company-invoices.component';

import {InvoicesRoutingModule} from './invoices-routing.module';
import {SingleInvoiceComponent} from './single-invoice/single-invoice.component';

@NgModule({
            imports: [
              CommonModule,
              FormsModule,
              ReactiveFormsModule,
              HttpClientModule,
              NgxDatatableModule,
              InvoicesRoutingModule
            ],
            declarations: []
          })
export class InvoicesModule {
}
