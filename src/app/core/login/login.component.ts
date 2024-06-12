import { Component } from '@angular/core';
import { Forgot, Register } from './Register';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public register: Register = new Register();
  public forgot: Forgot = new Forgot();
  userId: string = '';
  isTogglePage = false;
  message: string = '';
  isDangerMessage: boolean = false;
  isSuccessMessage: boolean = false;
  isShowForgotPassword: boolean = false;



  constructor(private loginService: LoginService, private router: Router) { }
  ngOnInit(): void {
  }

  sendOtpEmail() {
    this.loginService.sendOtpToemail(this.forgot).subscribe((res) => {
      if (res.statusText === 'Success') {
        this.userId = res.data.userId
        // this.message = res.message;
        this.router.navigate(['verifyOTP', this.userId]);
        this.isSuccessMessage = true;
        this.isDangerMessage = false;
        setTimeout(() => {
          this.message = '';
        }, 3000)
      } else {
        this.message = res.message;
        this.isDangerMessage = true;
        this.isSuccessMessage = false;
        setTimeout(() => {
          this.message = '';
        }, 3000)
      }
    })
  }

  /**
   * function is used to change page.
   */
  forgotPassword(): void {
    this.isShowForgotPassword = !this.isShowForgotPassword
  }

  /**
   * function is used for user Register.
   */
  isUserRegister(): void {
    this.loginService.register(this.register).subscribe((response) => {
      if (response.success) {
        this.message = response.message;
        this.isSuccessMessage = true;
        this.isDangerMessage = false;
        this.isTogglePage = false;
        setTimeout(() => {
          this.message = '';
        }, 3000)
      } else {
        this.isDangerMessage = true;
        this.isSuccessMessage = false;
        this.message = response.message;
        setTimeout(() => {
          this.message = '';
        }, 3000)
      }

    })
  }

  /**
   * This function is used for Login.
   */
  isUserLogin(): void {
    this.loginService.login(this.register).subscribe((res) => {
      if (res.success) {
        console.log('naviage')
        this.router.navigate(['home']);
        this.message = res.message;
        this.isSuccessMessage = true;
        this.isDangerMessage = false;
        console.log(res)
        setTimeout(() => {
          this.message = '';
        }, 3000)
      } else {
        this.isDangerMessage = true;
        this.isSuccessMessage = false;
        this.message = res.message;
        setTimeout(() => {
          this.message = '';
        }, 3000)
      }
    })
  }

  /**
   * function is login and register.
   */
  loginAndRegister(): void {
    if (this.isTogglePage) {
      this.isUserRegister();
    } else {
      this.isUserLogin();
    }
  }

  /**
   * function is used to toggle page login to register.
   */
  toggleLoginPage(): void {
    this.isTogglePage = !this.isTogglePage
    this.register.name = '';
    this.register.email = '';
    this.register.password = '';
    this.register.confirmPassword = '';
    this.register.terms = false;
  }
}
