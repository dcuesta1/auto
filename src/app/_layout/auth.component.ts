import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  template: `
    <div class="wrapper auth">
      <div id="main">
        <main class="content">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `
})
export class AuthComponent implements OnInit { ngOnInit() {} }
