import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CompanyInvoicesComponent} from './company-invoices/company-invoices.component';
import {SingleInvoiceComponent} from './single-invoice/single-invoice.component';

const invoicesRoutes: Routes = [
  {
    path: 'invoices',
    component: CompanyInvoicesComponent,
    outlet: 'main',
    children: [
      {
        path: ':id',
        component: SingleInvoiceComponent
      }
    ]
  }

  // { path: 'superhero/:id', component: HeroDetailComponent, data: { animation: 'hero' } }
];

@NgModule({
            imports: [
              RouterModule.forChild(invoicesRoutes)
            ],
            exports: [
              RouterModule
            ]
          })
export class InvoicesRoutingModule {
}
