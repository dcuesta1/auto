import {Component, OnInit} from '@angular/core';
import * as Pusher from 'pusher-js';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit { ngOnInit() {
  const pusher = new Pusher('5dcd40f6ff274f899e99', {
    cluster: 'us2'
  });

  const channel = pusher.subscribe('autoshop-app');

  channel.bind('my-event', function (data) {
    console.log('An event was triggered with message: ' + data.message);
  });
} }
