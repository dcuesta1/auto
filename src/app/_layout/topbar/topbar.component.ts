import { Component, OnInit } from '@angular/core';
import {AppService} from '../../_services/app.service';
import {User} from '../../_models/User';
import {AuthService} from '../../_services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  public currentUser: User;

  constructor(
    private appService: AppService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.currentUser = new User(this.appService.getCurrentUser());
  }

  signOut() {
    this.authService.destroy()
      .subscribe(
        (data) => {
          this.appService.deleteAuthToken();
          this.appService.removeCurrentUser();
          this.router.navigate(['/login']);
        }
      );
  }
}
