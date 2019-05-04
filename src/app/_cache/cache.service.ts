import { Injectable } from '@angular/core';
import { CacheStorageRecord } from '../_models/interfaces/CacheStorageRecord';
import { Observable, Subject, of, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class CacheService {

  // Helper property
  private _x: any;

  private cache: Map<string, CacheStorageRecord> = new Map<string, CacheStorageRecord>();
  private inFlightObservables: Map<string, Subject<any>> = new Map<string, Subject<any>>();
  readonly DEFAULT_MAX_AGE: number = 300000;

  /**
   * Gets the value from cache if the key is provided.
   * If no value exists in cache, then check if the same call exists
   * in flight, if so return the subject. If not create a new
   * Subject inFlightObservable and return the source observable.
   */
  public get<T>(key: string, fallback?: Observable<T>, maxAge?: number): Observable<T> | Subject<T> {

    if (this.hasValidCachedValue(key)) {
      console.log(`%cGetting from cache ${key}`, 'color: green');
      return of(this.cache.get(key).data);
    }

    if (!maxAge) {
      maxAge = this.DEFAULT_MAX_AGE;
    }

    if (this.inFlightObservables.has(key)) {
      return this.inFlightObservables.get(key);
    } else if (fallback && fallback instanceof Observable) {
      this.inFlightObservables.set(key, new Subject());
      console.log(`%c Calling api for ${key}`, 'color: purple');
      return fallback.pipe( tap( (res) => { this.set(key, res, maxAge); } ) );
    } else {
      return Observable.throw('Requested key is not available in Cache');
    }

  }

  /**
   * Sets the value with key in the cache
   * Notifies all observers of the new value
   */
  public set(key: string, value: any, maxAge: number = this.DEFAULT_MAX_AGE): void {
    this.cache.set(key, { data: value, expiry: Date.now() + maxAge });
    this.notifyInFlightObservers(key, value);
  }

  /**
   *  Adds a new value to an existing cached array
   *
   * @param key Cache key
   * @param value New value to add to the already cached array
   * @param toFront Add newvalue to start of array
   */
  public addTo<T>(key: string, value: any, apiCallback?: Observable<T>, toFront?: boolean): Observable<T> {

    if ( !this.has(key) ) {
      return throwError(new Error(`Requested key is not available in cache. Thus, cannot add new value.`));
    }

    this._x = value;

    if( apiCallback && apiCallback instanceof Observable) {
      apiCallback.pipe( tap( res => { this._x = res } )
      );
    }

    const updatedCachedRecordData = this.cache.get(key).data;

    if ( toFront ) {
      updatedCachedRecordData.unshift(this._x);
    } else {
      updatedCachedRecordData.push(this._x);
    }

    this.set(key, updatedCachedRecordData);
    return of(updatedCachedRecordData);
  }

  /**
   * Updates an object with property id
   *
   * @param key Cache key
   * @param item Object Item to add to an already existing cached array data.
   * @param apiCallback Api Observable that will persist changes in the server.
   */
  public updateItemFrom<T = any>(key: string, item: any, apiCallback?: Observable<T>): Observable<T> {
    if (!this.has(key)) {
      return throwError(new Error(`Requested key is not available in cache. Thus, cannot update single value from cached array.`));
    }

    this._x = item;

    if (apiCallback && apiCallback instanceof Observable) {
      apiCallback.pipe(tap(res => { this._x = res })
      );
    }

    if (!item.hasOwnPropety('id')) {
      throwError(new Error(`This method can only update an object if it has the property "id".`));
    }

    const cachedRecordData: T[] = this.cache.get(key).data;
    const index = cachedRecordData.findIndex( (value: any) => {
      return value.id == this._x.id;
    });

    if( index === -1) {
      throwError(new Error(`Item not found in cached data array of record ${key}`));
    }

    cachedRecordData[index] = this._x;

    return of(this._x);
  }

  /**
   * Removes items from an existing cached array.
   *
   * @param key Cache key
   * @param ids Array of ids to remove from cached record
   * @param apiCallback (optional) Api service observable.
   */
  public removeFrom(key: string, ids: [], apiCallback?: Observable<any>): Observable<boolean> {
    this._x = false;

    if (!this.has(key)) {
      return throwError(new Error(`Requested key is not available in cache. Thus, cannot remove items.`));
    }

    if (apiCallback && apiCallback instanceof Observable) {
      apiCallback.pipe( tap(res => { this._x = res } )
      );
    }

    const cachedRecordData = this.cache.get(key).data;

    for (const id of ids) {
      const index = cachedRecordData.findIndex(item => item.id === id);
      if (index !== -1)
        cachedRecordData.splice(index, 1);
    }

    this.set(key, cachedRecordData);

    return of(this._x);
  }

  /**
   * Checks if the a key exists in cache
   */
  public has(key: string): boolean {
    return this.cache.has(key);
  }

  /**
   * Publishes the value to all observers of the given
   * in progress observables if observers exist.
   */
  private notifyInFlightObservers(key: string, value: any): void {
    if (this.inFlightObservables.has(key)) {
      const inFlight = this.inFlightObservables.get(key);
      const observersCount = inFlight.observers.length;
      if (observersCount) {
        console.log(`%cNotifying ${inFlight.observers.length} flight subscribers for ${key}`, 'color: blue');
        inFlight.next(value);
      }
      inFlight.complete();
      this.inFlightObservables.delete(key);
    }
  }

  /**
   * Checks if the key exists and   has not expired.
   */
  private hasValidCachedValue(key: string): boolean {
    if (this.cache.has(key)) {
      if (this.cache.get(key).expiry < Date.now()) {
        this.cache.delete(key);
        return false;
      }
      return true;
    } else {
      return false;
    }
  }
}
