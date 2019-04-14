import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './_guards/auth.guard';
import {AuthComponent} from './_layout/auth.component';
import {IndexComponent} from './_layout/index.component';
import {AuthLoginComponent} from './auth/login/auth.login.component';
import {RecoverPasswordComponent} from './auth/recover-password/recover-password.component';
import {CompanyCustomersComponent} from './customers/company-customers/company-customers.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CompanyInvoicesComponent} from './invoices/company-invoices/company-invoices.component';
import {SingleInvoiceComponent} from './invoices/single-invoice/single-invoice.component';
import {SelectivePreloadingStrategyService} from './selective-preloading-strategy.service';

const appRoutes: Routes = [
  {
    path: '',
    component: IndexComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'customers',
        component: CompanyCustomersComponent
      },
      {
        path: 'invoices',
        children: [
          {
            path: '',
            component: CompanyInvoicesComponent
          },
          {
            path: ':id',
            component: SingleInvoiceComponent
          }
        ]
      }
    ]
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: AuthLoginComponent
      },
      {
        path: 'forgotPassword',
        component: RecoverPasswordComponent
      }
    ]
  }
];

@NgModule({
            imports: [
              RouterModule.forRoot(
                appRoutes,
                {
                  enableTracing: false, // <-- debugging purposes only
                  preloadingStrategy: SelectivePreloadingStrategyService
                }
              )
            ],
            exports: [
              RouterModule
            ]
          })
export class AppRoutingModule {
}
