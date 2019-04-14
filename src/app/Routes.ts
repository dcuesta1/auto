import { Routes } from '@angular/router';
import { AuthLoginComponent } from './auth/login/auth.login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthGuard} from './_guards/auth.guard';
import {IndexComponent} from './_layout/index.component';
import {AuthComponent} from './_layout/auth.component';
import {RecoverPasswordComponent} from './auth/recover-password/recover-password.component';
import {CompanyCustomersComponent} from './customers/company-customers/company-customers.component';
import {CompanyInvoicesComponent} from './invoices/company-invoices/company-invoices.component';
import {SingleInvoiceComponent} from './invoices/single-invoice/single-invoice.component';

export const RoutesMap: Routes = [
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
  // {
  //   path: 'register',
  //   component: AuthRegisterComponent
  // }
  // ,
  // {
  //   path: 'dashboard',
  //   component: DashboardComponent,
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'sales/reports/summary',
  //   component: SalesReportsSummaryComponent,
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'sales/transactions',
  //   component: TransactionsComponent,
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'Customers',
  //   component: UserCustomersComponent,
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'invoices',
  //   component: UserInvoicesComponent,
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'Customers',
  //   component: CustomersComponent,
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'settings',
  //   loadChildren: 'app/settings/settings.module#SettingsModule',
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'mod/dashboard',
  //   component: AdminDashboardComponent,
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'mod/invoices',
  //   component: AdminInvoicesComponent,
  //   canActivate: [SuperUserGuard]
  // },
  // {
  //   path: 'mod/users',
  //   component: AdminUsersComponent,
  //   canActivate: [SuperUserGuard]
  // },
  // {
  //   path: 'mod/settings',
  //   component: AdminSettingsComponent,
  //   canActivate: [AuthGuard]
  // }
];
