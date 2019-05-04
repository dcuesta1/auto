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
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _appService: AppService,
    private _router: Router
  ) {
    _appService.getCurrentUser().subscribe( user => {
      if (user) {
        this._router.navigate(['/']);
      }
    });
  }

  ngOnInit() {
    this.form = this._fb.group({
      email: ['', [Validators.required, EmailValidator]],
      password: ['', Validators.required]
    });
  }

  get f() { return this.form.controls; }

  onSubmit(): void {
    if (this.form.valid) {
      const input = this.form.value;
      this._authService.authenticate(input.email, input.password)
        .subscribe(
          (user) => {
            const currentUser = new User(user, true);
            this._appService.setCurrentUser(currentUser).subscribe( () => {
              this._router.navigate(['/']);
            });
          },
          (err) => {
            this.error = true;
          }
        );
    }
  }
}
