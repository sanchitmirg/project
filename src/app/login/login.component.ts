import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { TdLoadingService } from '@covalent/core';
import { AuthService } from '../services/auth.service';
import { User } from '../shared/models/user';

@Component({
  selector: 'qs-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  username: string;
  password: string;

  user: User = new User();

  constructor(private _router: Router,
              private _loadingService: TdLoadingService,
              private auth: AuthService) {}

  login() {
    this.auth.login(this.user)
  }
}
