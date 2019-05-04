import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InvoicesCacheService } from '../_cache/invoices-cache.service';
import { Invoice } from '../_models/Invoice';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})

export class InvoiceService {
  private _companyId: number;
  public invoices$: Observable<Invoice[]>;

  public constructor(
    private _http: HttpClient,
    private _appService: AppService,
    private _invoiceCache: InvoicesCacheService
  ) {
    this._appService.getCurrentUser().subscribe(user => { this._companyId = user.companyId });
  }

  /**
   * Retrieves all the invoices belonging to the company linked to the current user.
   *
   * @returns {Observable<Invoice[]>}
   * @memberof InvoiceService
   */
  public companyInvoices(): Observable<Invoice[]> {
    const apiFallback = this._http.get<Invoice[]>(`/company/${this._companyId}/invoices`);
    return this._invoiceCache.getSetInvoices(apiFallback);
  }

  public saveInvoice(invoice: Invoice) {
    const apiCallback = this._http.post<Invoice>(`/company/${this._companyId}/invoices`, invoice);
    return this._invoiceCache.addInvoice(invoice, apiCallback);
  }

  public updateInvoice(invoice: Invoice) {
    const apiCallback = this._http.post<Invoice>(`/company/${this._companyId}/invoices`, invoice);
    return this._invoiceCache.patchInvoice(invoice, apiCallback);
  }
}
