import { Component, OnInit } from '@angular/core';
import {AppService} from '../../_services/app.service';
import {User} from '../../_models/User';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public currentUser: User;

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.currentUser = this.appService.getCurrentUser();
  }
}
