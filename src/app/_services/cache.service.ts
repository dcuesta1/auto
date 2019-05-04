import { Injectable } from '@angular/core';
import { LocalStorage } from '../_etc/LocalStorage';
import { Invoice } from '../_models/Invoice';
import { User } from '../_models/User';
import { Customer } from '../_models/Customer';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CacheService {

  public static CURRENTUSER_LOCAL_KEY = 'user';
  public static AUTH_LOCAL_KEY = 'auth';
  public static IMPERSONATION_LOCAL_KEY = 'im';
  public static CUSTOMERS_LOCAL_KEY = 'store_customers';

  private _currentUser: User;
  private _invoices: Invoice[];
  private _customers: Customer[];

  public constructor(private _localStorage: LocalStorage) {}

  public getCustomers(): Observable<Customer[]> {
    return this._localStorage.getItem(CacheService.CUSTOMERS_LOCAL_KEY)
      .pipe(map(record => record ? record.data : null));
  }

  public setCustomers(customers: Customer[]) {
    return this._localStorage.setItem(CacheService.CUSTOMERS_LOCAL_KEY, customers);
  }

}
