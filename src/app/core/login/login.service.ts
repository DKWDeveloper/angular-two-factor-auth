import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  /**
   * function is used to register.
   * @param register 
   * @returns 
   */
  register(register: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(environment.AUTH_BASE_URL + 'registration', register, { headers });
  }

  /**
   * function is used to Login.
   * @param login 
   */
  login(login: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(environment.AUTH_BASE_URL + 'login', login);
  }

  /**
   * function is used to otp to gmail.
   * @param email 
   * @returns 
   */
  sendOtpToemail(email: any): Observable<any> {
    return this.http.post(environment.AUTH_BASE_URL + 'sendOtpEmail', email);
  }

  /**
   * function is used to verify otp.
   * @param otp 
   * @returns 
   */
  verifyOTP(otp: any): Observable<any> {
    return this.http.post(environment.AUTH_BASE_URL + 'otp', otp);
  }


  /**
   * function is used to reset password.
   * @param resetPasswordData 
   * @param userId 
   * @param token 
   * @returns 
   */
  resetPassword(resetPasswordData: any, userId: any, token: any): Observable<any> {
    return this.http.post(environment.AUTH_BASE_URL + 'forgotPassword/userId/' + userId + '/token?token=' + token, resetPasswordData);
  }
}
