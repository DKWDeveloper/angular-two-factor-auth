import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, catchError, tap } from 'rxjs';
import { environment } from 'src/environments/environments';
import { UserResponse } from '../../auth-response-interface/auth-response.interface';
import { ErrorhandlingService } from '../errorHandling/errorhandling.service';
import { User } from '../../authModel/User';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user = new Subject();
  // user = new BehaviorSubject<User | null | undefined>(null);
  constructor(private http: HttpClient, private errorService: ErrorhandlingService) { }

  /**
   * This function is used to register.
   * @param register 
   * @returns 
   */
  register(register: any): Observable<any> {
    return this.http.post(environment.AUTH_BASE_URL + 'registration', register).pipe(catchError(err => {
      return this.errorService.handleError(err);
    }), tap((res) => { this.authenticatedUser(res) })
    );
  }

  /**
   * This function is used to login.
   * @param login 
   * @returns 
   */
  login(login: any): Observable<any> {
    return this.http.post(environment.AUTH_BASE_URL + 'login', login).pipe(catchError(err => {
      return this.errorService.handleError(err);
    }), tap((res) => { this.authenticatedUser(res) })
    );
  }



  /**
   * This function is used to get User data.
   * @param email 
   * @param userId 
   * @param token 
   * @param expiresIn 
   */
  private authenticatedUser(res: any) {
    const exPiratonDate = new Date(new Date().getTime() + res.expires * 1000);
    const user = new User(res.email, res.userId, res.token, exPiratonDate);
    console.log(user)
    this.user.next(user);
  }
}
