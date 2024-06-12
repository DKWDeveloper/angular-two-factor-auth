import { Component } from '@angular/core';
import { Otp } from '../../login/Register';
import { LoginService } from '../../login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css']
})
export class VerifyOTPComponent {
  public otp: Otp = new Otp();
  message: string = '';
  isDangerMessage: boolean = false;
  isSuccessMessage: boolean = false;
  userId: string = '';
  token: string = '';

  constructor(private loginService: LoginService, private router: Router) { }
  ngOnInit(): void {

  }

  verifyOTP() {
    this.loginService.verifyOTP(this.otp).subscribe((res) => {
      console.log(res.success)
      if (res.success) {
        this.userId = res.user.id;
        this.token = res.user.token;
        this.router.navigate(['resetPassword', this.userId], { queryParams: { token: this.token } })
      }
    })
  }
}
