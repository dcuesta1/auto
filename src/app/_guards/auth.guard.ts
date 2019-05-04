import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AppService} from '../_services/app.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private _user;

  constructor(
    private _appService: AppService,
    private _router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this._appService.getCurrentUser().subscribe( user => { this._user = user } );

    if (this._user) {
      return true;
    }

    this._router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
