import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, flatMap } from 'rxjs/operators';
import { Invoice } from '../_models/Invoice';
import { CacheService } from '../_cache/cache.service';

@Injectable({
  providedIn: 'root'
})
export class InvoicesCacheService {
  /**
   * Constant containing the `key` from which under the invoices will be stored in localstorage.
   *
   * @static
   * @memberof InvoicesCacheService
   */
  public static STORAGE_KEY = 'store_invoices';
  private _invoices$: Observable<Invoice[]> = new Observable();

  constructor(private _cacheService: CacheService) { }

  /**
   * Function used to retrieve cached invoices. If no invoices are cached, it retrieves the invoices
   * from the observable of a Http request and then caches it.
   *
   * @param {Observable<Invoice[]>} fallback
   * @returns {Observable<Invoice[]>}
   * @memberof InvoicesCacheService
   */
  public getSetInvoices(apiFallback: Observable<Invoice[]>): Observable<Invoice[]> {
    return this._invoices$ = this._cacheService.get(InvoicesCacheService.STORAGE_KEY, apiFallback);
  }

  /**
   * Function used to add an invoice to the cache.
   *
   * @param {(Invoice[] | Invoice)} data
   * @memberof InvoicesCacheService
   */
  public addInvoice(invoice: Invoice, apiCallback: Observable<Invoice>) {
    this._cacheService.addTo(InvoicesCacheService.STORAGE_KEY, invoice, apiCallback, true);
  }

  /**
   *  Function used to update or modify an invoice from the cache.
   *
   * @param {(Invoice[] | Invoice)} invoice
   * @param apiCallback: Observable<Invoice>
   * @memberof InvoicesCacheService
   */
  public patchInvoice(invoice: Invoice, apiCallback: Observable<Invoice>) {
    return this._cacheService.updateItemFrom(InvoicesCacheService.STORAGE_KEY, invoice, apiCallback);
  }

  /**
   * Function used to remove one or more invoices from the cache.
   *
   * @param {Invoice[]} invoices
   * @memberof InvoicesCacheService
   */
  public deleteInvoices(invoices: Invoice[], apiCallback: Observable<boolean>) {

  }
}
