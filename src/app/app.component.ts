import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="row" style="height:100vh">
        <router-outlet></router-outlet>
    </div>`
})
export class AppComponent {
  title = 'auto-app';
}
