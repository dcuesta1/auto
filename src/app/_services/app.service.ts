import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import {User} from '../_models/User';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public loggedIn: boolean;

  public getLocationPath() {
    return window.location.pathname.substr(1).split('/');
  }

  public getImpersotedUser(): User {
    return JSON.parse(localStorage.getItem(environment.const.impersonate));
  }

  public setImpersotedUser(user: User): void {
    localStorage.setItem(environment.const.impersonate, JSON.stringify(user));
  }

  public getCurrentUser(toObj: boolean = true): null | User {
    const currentUser = localStorage.getItem(environment.const.currentUser);
    return currentUser ? new User(JSON.parse(currentUser)) : null;
  }

  public setCurrentUser(user: User): void {
    localStorage.setItem(environment.const.currentUser, JSON.stringify(user));
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
}
