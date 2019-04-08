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
    return this._http.get<Customer[]>('/company/' + user.companyId + '/customers');
  }

  create(customer: Customer) {
    return this._http.post<Customer>('/customers', customer);
  }

  update(customer: Customer) {
    return this._http.put<Customer>('/customers/' + customer.id, customer);
  }

  destroy(id: number) {
    return this._http.delete<boolean>('/customers/' + id);
  }

  destroyMultiple(customers: Array<Customer>, username: string) {
    const customersId = [];

    for (const customer of customers) {
      customersId.push(customer.id);
    }

    return this._http.patch('/company/' + username + '/customers/delete', customersId);
  }
}
