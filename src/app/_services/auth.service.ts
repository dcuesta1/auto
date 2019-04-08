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
    private router: Router,
    private http: HttpClient,
    private appService: AppService
  ) {}

  setDevice(): void {
    this.device = this.appService.getDeviceId();

    if (!this.device) {
      this.device =  (Math.random() + + new Date()).toString(36).replace('.', '');
      this.appService.setDeviceId(this.device);
    }
  }

  authenticate(email: string, password: string) {
    this.setDevice();
    const device = this.device;

    return this.http.post<User>('/authenticate', { email , password, device});
  }

  register(user: User) {
    this.setDevice();
    const device = this.device;

    return this.http.post<User>('/register', {user, device});
  }

  destroy() {
    const token = this.appService.getAuthToken();
    return this.http.post('/signout', {token});
  }
}
