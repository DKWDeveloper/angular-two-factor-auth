import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { NetworkService } from '../network/network.service';
// import { NetworkService } from 'path-to-your/network.service';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket!: Socket;
  url = 'ws://localhost:3000/userChat-namespace';
  isSocketConnected: boolean = false;

  constructor(private networkService: NetworkService) {
    this.initSocket();
    this.networkService.getNetworkStatus().subscribe((isOnline: any) => {
      if (isOnline) {
        this.initSocket();

        this.connect();
      } else {
        this.disconnect();
      }
    });
  }

  initSocket(): void {
    this.socket = io(this.url);

    // Listen for connection events
    this.socket.on('connect', () => {
      console.log('Socket connected');
      this.isSocketConnected = true;
    });

    // Listen for disconnection events
    this.socket.on('disconnect', () => {
      console.warn('Socket disconnected');
      this.isSocketConnected = false;
    });
  }

  createInstance(userId: any): void {
    console.log(userId);
    this.disconnect(); // Disconnect the current socket instance
    this.initSocket(); // Initialize a new socket instance
    this.socket = io(this.url, { query: { userId } });
  }

  listen(eventName: any): Observable<any> {
    return new Observable((observer) => {
      // Check if the socket is defined and connected before subscribing
      if (this.socket && this.isSocketConnected) {
        this.socket.on(eventName, (data: any) => {
          observer.next(data);
        });
      } else {
        console.warn('Socket is not connected. Unable to listen for events.');
        // Optionally, you can attempt to reconnect or handle the situation here
      }
    });
  }

  emit(eventName: any, data: any): void {
    if (this.socket && this.isSocketConnected) {
      this.socket.emit(eventName, data);
    } else {
      console.warn('Socket is not connected. Unable to emit events.');
      // Optionally, you can attempt to reconnect or handle the situation here
    }
  }

  // Connect to the Socket.IO server
  connect() {
    console.log('Connection initiated');
    this.socket.connect();
  }

  // Disconnect from the Socket.IO server
  disconnect() {
    console.log('Disconnecting');
    this.socket.disconnect();
  }
}
