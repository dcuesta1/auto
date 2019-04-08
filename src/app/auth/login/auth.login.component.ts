import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../_services/auth.service';
import {EmailValidator} from '../../_validators';
import {User} from '../../_models/User';
import {AppService} from '../../_services/app.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './auth.login.component.html',
  styleUrls: ['./auth.login.component.scss']
})
export class AuthLoginComponent implements OnInit {
  form: FormGroup;
  public error = false;
  public loginPage = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private appService: AppService,
    private router: Router
  ) {
    const user = appService.getCurrentUser();
    if (user) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, EmailValidator]],
      password: ['', Validators.required]
    });
  }

  get f() { return this.form.controls; }

  onSubmit(): void {
    if (this.form.valid) {
      const input = this.form.value;
      this.authService.authenticate(input.email, input.password)
        .subscribe(
          (user: User) => {
            const currentUser = new User(user, true);
            console.log(currentUser);
            this.appService.setCurrentUser(currentUser);
            this.router.navigate(['/']);
          },
          error => {
            this.error = true;
          }
        );
    }
  }
}
