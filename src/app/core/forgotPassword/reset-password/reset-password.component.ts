import { Component } from '@angular/core';
import { Reset } from '../../login/Register';
import { ActivatedRoute, Router } from '@angular/router';
import { query } from '@angular/animations';
import { LoginService } from '../../login/login.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  public reset: Reset = new Reset();
  userId: string = '';
  token: string = '';

  constructor(private loginService: LoginService, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      if (params) {
        this.userId = params['userId'];
      }
    })

    this.route.queryParams.subscribe(query => {
      if (query) {
        this.token = query['token'];
      }
    })
  }
  ngOnInit(): void {

  }

  /**
   * function is used to reset the password.
   */
  resetPassword() {
    this.loginService.resetPassword(this.reset, this.userId, this.token).subscribe((res) => {
      if (res.success) {
        this.router.navigate(['main/login']);
      }
    })
  }
}
