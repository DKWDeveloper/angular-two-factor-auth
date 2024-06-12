import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { ErrorhandlingService } from '../services/errorHandling/errorhandling.service';
import { Router } from '@angular/router';
import { Login } from '../authModel/Login';
import { Register } from '../authModel/Register';
import { SocketService } from 'src/app/shared/services/socket/socket.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  @ViewChild('main') main!: ElementRef;
  @ViewChild('toggleBtns') toggleBtns!: ElementRef[];
  public login: Login = new Login();
  public register: Register = new Register();
  error!: string;
  loginError!: string;
  registerSuccessfullyMsg: boolean = false;
  errMessage: any = this.errorService.errorMessage;
  isInputFocused: boolean = false;
  currentImage: string = 'img-1';
  currentBullet: number = 1;
  textTransform: string = 'translateY(0)';
  userId!: string;

  constructor(
    private authService: AuthenticationService,
    private errorService: ErrorhandlingService,
    private router: Router,
    private socketService: SocketService
  ) {

  }

  ngOnInit(): void {
  }


  // let loginObservable: Observable<any>

  /**
   * Function is used to Register.
   */
  registerOrSignUp() {
    this.authService.register(this.register).subscribe({
      next: (res) => {
        if (res.success) {
          this.toggleSignUpMode()
          this.registerSuccessfullyMsg = true;
          setTimeout(() => {
            this.registerSuccessfullyMsg = false;
          }, 3000)
        } else {
          this.error = this.errMessage[res.errorMessage]
          setTimeout(() => {
            this.error = '';
          }, 3000)
        }
      },
      error: (err) => { this.error = this.errMessage[err]; }
    })
  }

  /**
   * Function is used to login.
   */
  userlogin() {
    this.authService.login(this.login).subscribe({
      next: (res) => {
        if (res.success) {
          localStorage.setItem('user', JSON.stringify(res))
          this.router.navigate(['home']);
          const userToken: any = localStorage.getItem('user');
          const user = JSON.parse(userToken)
          if (user) {
            this.userId = user.userId
          }
          if (this.userId) {
            console.log(this.userId)
           // Assuming you have a 'connect' method in SocketService
           this.socketService.createInstance(this.userId);
           this.socketService.connect();
          }
        } else {
          console.log(res)
          if (res.errorMessage) {
            this.loginError = this.errMessage[res.errorMessage];
          } else {
            this.loginError = res.message;
          }
          console.log(this.loginError);
          setTimeout(() => {
            this.loginError = '';
          }, 3000)
        }

      },
      error: (err) => { console.log(err) }
    })
  }




  /**
   * Functon is used to slider.
   * @param index
   */
  moveSlider(index: any): void {
    this.currentImage = `img-${index}`;
    this.currentBullet = index;
    this.textTransform = `translateY(${-2.2 * (index - 1)}rem)`;
  }

  /**
   * Function is used to toggle page.
   */
  toggleSignUpMode(): void {
    this.main.nativeElement.classList.toggle("sign-up-mode");
  }

  /**
   * This is used for focus on input field Type 1.
   */
  handleInputFocus(): void {
    this.isInputFocused = true;
  }

  /**
   * Function to handle input blur.
   * @param value 
   */
  handleInputBlur(value: string): void {
    if (value.trim() === '') {
      this.isInputFocused = false;
    }
  }

  /**
   * This function is used to add class in input field.
   * @param inputField
   */
  handleInputFieldFocus(inputField: HTMLInputElement): void {
    inputField.classList.add("active");
  }
  onInputBlur(inputField: HTMLInputElement): void {
    if (inputField.value === '') {
      inputField.classList.remove("active");
    }
  }
}
