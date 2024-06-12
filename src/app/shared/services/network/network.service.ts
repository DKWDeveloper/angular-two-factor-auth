import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  private online$: Subject<boolean> = new Subject<boolean>();
  constructor() {
    // Listen to online and offline events
    window.addEventListener('online', () => this.setNetworkStatus(true));
    window.addEventListener('offline', () => this.setNetworkStatus(false));

    // Set initial network status
    this.setNetworkStatus(window.navigator.onLine);
  }

  private setNetworkStatus(isOnline: boolean): void {
    this.online$.next(isOnline);
  }

  getNetworkStatus(): Observable<boolean> {
    return this.online$.asObservable();
  }
}
