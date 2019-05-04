import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppService} from './app.service';
import {Customer} from '../_models/Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private _companyId: number;

  constructor(private _http: HttpClient, private _appService: AppService) {
    _appService.getCurrentUser().subscribe( user => { this._companyId =  user.companyId });
  }

  public companyCustomers() {
    // TODO: impersonate route

    const user = this._appService.getCurrentUser();
    return this._http.get<Customer[]>('/company/' + this._companyId + '/customers');
  }

  public create(customer: Customer) {
    // Persist Customer with server.
    return this._http.post<Customer>('/customers', customer);

    // Add Customer to local cache.
  }

  public update(customer: Customer) {
    return this._http.put<Customer>('/customers/' + customer.id, customer);
  }

  public destroy(id: number) {
    return this._http.delete<boolean>('/customers/' + id);
  }

  public destroyMultiple(customers: Array<Customer>, username: string) {
    const customersId = [];

    for (const customer of customers) {
      customersId.push(customer.id);
    }

    return this._http.patch('/company/' + username + '/customers/delete', customersId);
  }
}
