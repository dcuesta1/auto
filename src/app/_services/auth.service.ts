import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {User} from '../_models/User';
import {AppService} from './app.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private device: string;

  constructor(
    private _http: HttpClient,
    private _appService: AppService
  ) {}

  setDevice(): void {
    this.device = this._appService.getDeviceId();

    if (!this.device) {
      this.device =  (Math.random() + + new Date()).toString(36).replace('.', '');
      this._appService.setDeviceId(this.device);
    }
  }

  authenticate(email: string, password: string) {
    this.setDevice();
    const device = this.device;

    return this._http.post<User>('/authenticate', { email , password, device});
  }

  register(user: User) {
    this.setDevice();
    const device = this.device;

    return this._http.post<User>('/register', {user, device});
  }

  destroy() {
    const token = this._appService.getAuthToken();
    return this._http.post('/signout', {token});
  }
}
