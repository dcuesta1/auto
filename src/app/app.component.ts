import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="wrapper">
      <app-sidebar></app-sidebar>
      <div id="main">
        <app-topbar></app-topbar>
        <main class="content">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>`
})
export class AppComponent {
  title = 'auto-app';
}
