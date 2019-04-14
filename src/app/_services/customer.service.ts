import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppService} from './app.service';
import {Customer} from '../_models/Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private _http: HttpClient, private _appService: AppService) { }

  public companyCustomers() {
    // TODO: impersonate route

    const user = this._appService.getCurrentUser();
    return this._http.get<Customer[]>('/company/' + user.companyId + '/Customers');
  }

  create(customer: Customer) {
    return this._http.post<Customer>('/Customers', customer);
  }

  update(customer: Customer) {
    return this._http.put<Customer>('/Customers/' + customer.id, customer);
  }

  destroy(id: number) {
    return this._http.delete<boolean>('/Customers/' + id);
  }

  destroyMultiple(customers: Array<Customer>, username: string) {
    const customersId = [];

    for (const customer of customers) {
      customersId.push(customer.id);
    }

    return this._http.patch('/company/' + username + '/Customers/delete', customersId);
  }
}
