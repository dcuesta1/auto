import {Component, HostBinding, OnInit} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {AppService} from '../_services/app.service';

@Component({
  selector: 'app-index',
  template: `
    <div class="wrapper">
      <app-sidebar></app-sidebar>
      <div id="main">
        <app-topbar></app-topbar>
        <div class="content-wrapper">
          <div *ngIf="isLoading" id="loading">
            <div class="spinner">
              <div class="dot1"></div>
              <div class="dot2"></div>
            </div>
            <div class="text-loading">Loading..</div>
          </div>
          <main class="content">
            <div class="container-fluid">
              <router-outlet></router-outlet>
            </div>
          </main>
        </div>
      </div>
    </div>
  `
})
export class IndexComponent implements OnInit {
  @HostBinding() isLoading = true;

  constructor(
    private _appService: AppService,
    private _router: Router
  ) {
    _router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        _appService.toggleLoading(true);
      }
    });

    _appService.loader.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }

  ngOnInit() {}
}
