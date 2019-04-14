import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Invoice} from '../_models/Invoice';
import {User} from '../_models/User';
import {AppService} from './app.service';

@Injectable({
              providedIn: 'root'
            })
export class InvoiceService {
  private _currentUser: User;

  public constructor(private _http: HttpClient, private _appService: AppService) {
    this._currentUser = _appService.getCurrentUser();
  }

  public companyInvoices() {
    return this._http.get<Invoice[]>(`/company/${this._currentUser.companyId}/invoices`);
  }
}

