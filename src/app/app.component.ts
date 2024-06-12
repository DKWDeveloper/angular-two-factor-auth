import { Component } from '@angular/core';
import { SocketService } from './shared/services/socket/socket.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userId!: string;
  constructor(private socketService: SocketService) {
    const userToken: any = localStorage.getItem('user');
    const user = JSON.parse(userToken)
    if (user) {
      this.userId = user.userId
    }
  }

  ngOnInit(): void {
    if (this.userId) {
      this.socketService.createInstance(this.userId);
    }
    // this.socketService.connect();
    // this.socketService.createInstance(this.userId);
  }
}
