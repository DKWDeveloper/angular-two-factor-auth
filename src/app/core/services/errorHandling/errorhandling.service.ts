import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorhandlingService {

  constructor() { }

  errorMessage = {
    EMAIL_EXISTS: "Email Already hai ",
    ALL_FIELD_REQUIRED: "Sabhi Field dale",
    UNKNOWN: "Check Your Connection"
  }

  errMsgLogin = {

  }

  /**
   * This function is used to handle error.
   * @param err 
   * @returns 
   */
  handleError(err: HttpErrorResponse) {
    if (!err.error || err.error) {
      return throwError('UNKNOWN')
    } else {
      return throwError(err.error.errorMessage)
    }
  }
}
