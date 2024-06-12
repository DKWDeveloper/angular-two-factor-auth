import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, exhaustMap, take } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { environment } from 'src/environments/environments';

function _window(): any {
  // return the global native browser window object
  return window;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  headers: any;
  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  /**
   * Function is used to create Testmony.
   * @param userData 
   * @returns 
   */
  createUserTestmony(userData: any, token: any): Observable<any> {
    console.log(token)
    this.headers = new HttpHeaders({
      // 'Content-Type': 'application/json',
      // 'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + token,
    });
    return this.http.post(environment.AUTH_BASE_URL + 'createUserData', userData, { headers: this.headers });
  }

  /**
   * Function is used to get all testmony.
   */
  getAllUserTestmony(): Observable<any> {
    const user: any = localStorage.getItem('user');
    const userLocal = JSON.parse(user)
    this.headers = new HttpHeaders({
      Authorization: 'Bearer ' + userLocal.token,
    });
    return this.http.get(environment.AUTH_BASE_URL + 'getUserData', { headers: this.headers })
  }

  /**
   * Function is used to update testmony.
   * @param id 
   * @param user 
   * @returns 
   */
  updateUserTestMony(user: any, id: string, token: any): Observable<any> {
    const userToken: any = localStorage.getItem('user');
    const userLocal = JSON.parse(userToken)
    this.headers = new HttpHeaders({
      Authorization: 'Bearer ' + userLocal.token,
    });
    return this.http.put(environment.AUTH_BASE_URL + 'updateUserById/' + id, user, { headers: this.headers })
  }

  /**
   * Function is used to delete the testmony.
   * @param id 
   * @returns 
   */
  deleteUserTestmony(userIdObj: any) {
    const userToken: any = localStorage.getItem('user');
    const userLocal = JSON.parse(userToken)
    this.headers = new HttpHeaders({
      Authorization: 'Bearer ' + userLocal.token,
    });
    return this.http.put(environment.AUTH_BASE_URL + 'deleteById', userIdObj, { headers: this.headers });
  }

  /**
   * Function is used to get user List.
   */
  getUserList() {
    const userToken: any = localStorage.getItem('user');
    const userLocal = JSON.parse(userToken)
    this.headers = new HttpHeaders({
      Authorization: 'Bearer ' + userLocal.token,
    });
    return this.http.get(environment.AUTH_BASE_URL + 'getUserRegisterList', { headers: this.headers })
  }


  /**
   * Send and Get sender message.
   * @returns 
   */
  sendandgetSenderMsg(data: any) {
    const userToken: any = localStorage.getItem('user');
    const userLocal = JSON.parse(userToken)
    this.headers = new HttpHeaders({
      Authorization: 'Bearer ' + userLocal.token,
    });
    return this.http.post(environment.AUTH_BASE_URL + 'saveUserChat', data, { headers: this.headers })
  }


  /**
   * Function is used to post chat.
   * @param data 
   * @returns 
   */
  userDeleteOwnChat(data: any) {
    const userToken: any = localStorage.getItem('user');
    const userLocal = JSON.parse(userToken)
    this.headers = new HttpHeaders({
      Authorization: 'Bearer ' + userLocal.token,
    });
    return this.http.post(environment.AUTH_BASE_URL + 'deleteChatUserSide', data, { headers: this.headers })
  }

  /**
   * Function is used to get user own chat.
   * @returns 
   */
  getUserOwnChat() {
    const userToken: any = localStorage.getItem('user');
    const userLocal = JSON.parse(userToken)
    this.headers = new HttpHeaders({
      Authorization: 'Bearer ' + userLocal.token,
    });
    return this.http.get(environment.AUTH_BASE_URL + 'getDeleteUserSideList', { headers: this.headers })
  }

  getRecieveChat() {
    const userToken: any = localStorage.getItem('user');
    const userLocal = JSON.parse(userToken)
    this.headers = new HttpHeaders({
      Authorization: 'Bearer ' + userLocal.token,
    });
    return this.http.get(environment.AUTH_BASE_URL + 'getDeleteRecieveChat', { headers: this.headers })
  }

  deleteEveryOneChat(id: string) {
    const userToken: any = localStorage.getItem('user');
    const userLocal = JSON.parse(userToken)
    this.headers = new HttpHeaders({
      Authorization: 'Bearer ' + userLocal.token,
    });
    return this.http.delete(environment.AUTH_BASE_URL + 'getDeleteEveryOneChat/' + id, { headers: this.headers })
  }

  getChatList() {
    const userToken: any = localStorage.getItem('user');
    const userLocal = JSON.parse(userToken)
    this.headers = new HttpHeaders({
      Authorization: 'Bearer ' + userLocal.token,
    });
    return this.http.get(environment.AUTH_BASE_URL + 'getChatList', { headers: this.headers })
  }


}
