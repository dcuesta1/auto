import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  template: `
    <div class="wrapper">
      <app-sidebar></app-sidebar>
      <div id="main">
        <app-topbar></app-topbar>
        <main class="content">
          <div class="container-fluid">
            <router-outlet></router-outlet>
          </div>
        </main>
      </div>
    </div>
  `
})
export class IndexComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
