import { environment } from '../../environments/environment';
import {EventEmitter, Injectable, Output} from '@angular/core';
import {User} from '../_models/User';
import { Observable } from 'rxjs';
import { LocalStorage } from '../_etc/LocalStorage';


@Injectable({
  providedIn: 'root'
})
export class AppService {
  private static readonly AUTH_EXPIRY = 604800000; // 7 days

  public static readonly CURRENTUSER_LOCAL_KEY = 'user';
  public static readonly IMPERSONATE_LOCAL_KEY = 'im';

  public loggedIn: boolean;
  private _isLoading = true;

  @Output() loader: EventEmitter<boolean> = new EventEmitter();

  public constructor(private _localStorage: LocalStorage) {}

  public getLocationPath() {
    return window.location.pathname.substr(1).split('/');
  }

  public getImpersotedUser(): User {
    return JSON.parse(localStorage.getItem(environment.const.impersonate));
  }

  public setImpersotedUser(user: User): void {
    localStorage.setItem(environment.const.impersonate, JSON.stringify(user));
  }

  public getCurrentUser(): Observable<User> {
    return this._localStorage.getItem(AppService.CURRENTUSER_LOCAL_KEY);
  }

  public setCurrentUser(user: User) {
    return this._localStorage.setItem(AppService.CURRENTUSER_LOCAL_KEY, user, AppService.AUTH_EXPIRY);
  }

  public removeCurrentUser(): void {
    localStorage.removeItem(environment.const.currentUser);
  }

  public getDeviceId(): string | null {
    return localStorage.getItem(environment.const.deviceId);
  }

  public setDeviceId(deviceId: string): void {
    localStorage.setItem(environment.const.deviceId, deviceId);
  }

  public getAuthToken(): string | null {
    return localStorage.getItem(environment.const.authToken);
  }

  public setAuthToken(authToken: string): void {
    localStorage.setItem(environment.const.authToken, authToken);
  }

  public deleteAuthToken(): void {
    localStorage.removeItem(environment.const.authToken);
  }

  public clear(): void {
    localStorage.clear();
  }

  get isloading() {
    return this._isLoading;
  }

  toggleLoading(val: boolean) {
    this._isLoading = val;
    this.loader.emit(this._isLoading);
  }
}
