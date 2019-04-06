import { Routes } from '@angular/router';
import { AuthLoginComponent } from './auth/login/auth.login.component';

export const RoutesMap: Routes = [
    {
      path: '',
      component: AuthLoginComponent
    },
    {
      path: 'login',
      component: AuthLoginComponent
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
    //   path: 'customers',
    //   component: UserCustomersComponent,
    //   canActivate: [AuthGuard]
    // },
    // {
    //   path: 'invoices',
    //   component: UserInvoicesComponent,
    //   canActivate: [AuthGuard]
    // },
    // {
    //   path: 'customers',
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
