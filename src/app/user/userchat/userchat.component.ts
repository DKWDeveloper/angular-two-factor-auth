import { Component, ElementRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { NetworkService } from 'src/app/shared/services/network/network.service';
import { SocketService } from 'src/app/shared/services/socket/socket.service';
import { UserService } from 'src/app/shared/services/userService/user.service';

@Component({
  selector: 'app-userchat',
  templateUrl: './userchat.component.html',
  styleUrls: ['./userchat.component.css']
})
export class UserchatComponent {
  @ViewChild('messageContainer') messageContainer!: ElementRef;
  userList: any = [];
  loginUserName!: string;
  isformShow: boolean = false;
  statusSubscription!: Subscription;
  user: any;
  recevierId!: any;
  message!: string;
  senderMsg!: string;
  chatMessages: any = [];
  deleteMessage: any = [];
  messageId: any;

  constructor(
    private userService: UserService,
    private socketService: SocketService,
    private networkService: NetworkService
  ) {
    const userToken: any = localStorage.getItem('user');
    this.user = JSON.parse(userToken);
    if (this.user) {
      this.loginUserName = this.user.name;
    }
  }

  ngOnInit(): void {
    console.log(this.user.userId)
    this.getUserList();

    // this.socketService.listen('connection').subscribe((data) => {
    //   console.log('connection is establish')
    // })
    if (this.user.userId) {
      this.socketService.listen('getOnlineStatus').subscribe((data) => {
        console.log('get statsus', data)
        this.updateUserStatus(data.userId, data.user.isOnline);
      });
    }

    this.socketService.listen('loadNewChat').subscribe((res) => {
      console.log('brodcast', res)
      if (this.user.userId === res.receiverId || this.recevierId === res.senderId) {
        this.chatMessages.push(res);
        console.log('chat list', this.chatMessages)
        this.scrollChatToBottom();
      }
    })

    // Listen for updated chat list
    this.socketService.listen('deleteChatId').subscribe((data) => {
      if (this.user.userId === data.receiverId && this.recevierId === data.senderId) {
        this.chatMessages = this.chatMessages.filter((message: any) => message._id !== data._id)
      }
      // this.chatMessages = data.chats; // Update chat messages
      console.log('chatList', data);
    });



    this.socketService.listen('editMessage').subscribe((data) => {
      const index = this.chatMessages.findIndex((message: any) => message._id === data.messageId)
      this.chatMessages[index].message = data.chat;
      console.log('update index', index)
    })
  }

  /**
   * Function is used to scroll.
   */
  scrollChatToBottom(): void {
    if (this.messageContainer && this.messageContainer.nativeElement) {
      setTimeout(() => {
        this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
      })
    }
  }


  onEnterKeyPress(event: any) {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }

  sendMessage() {
    if (this.message) {
      const dataObj = {
        senderId: this.user.userId,
        receiverId: this.recevierId,
        message: this.message
      }

      this.userService.sendandgetSenderMsg(dataObj).subscribe((res: any) => {
        if (res.success) {
          console.log(res)
          this.chatMessages.push(res.data);
          this.scrollChatToBottom();
          console.log(this.chatMessages)
          this.senderMsg = res.data.message;
          this.socketService.emit('newChat', res.data)
        }
      })
      this.message = ''
    }
  }

  updateMessage() {
    const obj = {
      messageId: this.messageId,
      chat: this.message
    }
    this.socketService.emit('editChat', obj)
    const index = this.chatMessages.findIndex((message: any) => message._id === this.messageId)
    this.chatMessages[index].message = this.message;
    console.log('update index', index)
    this.messageId = null;
    this.message = '';
  }

  editMessage(message: any) {
    console.log('message')
    if (message) {
      this.message = message.message;
      this.messageId = message._id;
    }
  }


  getChatList() {
    this.socketService.listen('loadOldChat').subscribe((res) => {
      if (res.success) {
        this.chatMessages = res.chats;
        console.log('chat list', this.chatMessages)
        this.scrollChatToBottom();

      }
    }, err => console.log(err))
  }

  /**
   * Function is used to get user id.
   * @param user 
   */
  onSelectedUserId(user: any) {
    if (user) {
      this.recevierId = user._id;
      this.isformShow = true;
      if (this.recevierId) {
        const SendReciverObj = { senderId: this.user.userId, recevierId: this.recevierId }
        this.socketService.emit('getChat', SendReciverObj);
      }
      //all chat list
      this.getChatList();

      //Filter list
      this.userService.getUserOwnChat().subscribe((res: any) => {
        if (res.success) {
          this.deleteMessage = res.userOwnchatList;
          let idsTOIgnore = this.deleteMessage.length ? this.deleteMessage.map((ele: any) => ele._id) : [];
          this.chatMessages = this.chatMessages.filter((obj: any) => {
            if (obj.senderId == this.user.userId) {
              return !idsTOIgnore.includes(obj._id)
            } else {
              return true;
            }
          });
        }
      })


      this.userService.getRecieveChat().subscribe((res: any) => {
        if (res.success) {
          this.deleteMessage = res.getRecieveChat;
          console.log('recieve chat', this.deleteMessage)
          let idsTOIgnore = this.deleteMessage.length ? this.deleteMessage.map((ele: any) => ele._id) : [];
          this.chatMessages = this.chatMessages.filter((obj: any) => {
            if (obj.senderId == this.user.userId) {
              return true
            } else {
              return !idsTOIgnore.includes(obj._id)
            }
          });
          console.log('after flter', this.chatMessages)
        }
      })



    }
  }

  deleteMessageforMe(message: any, index: any) {
    this.chatMessages.splice(index, 1);
    this.userService.userDeleteOwnChat(message).subscribe((_) => {

    })
  }

  deleteEveryOneChat(message: any, index: any) {
    this.chatMessages.splice(index, 1);
    this.userService.deleteEveryOneChat(message._id).subscribe((res: any) => {
      if (res.status === "success") {
        this.socketService.emit('deleteChat', message); // Emit an event to delete chat
      }
    });
  }

  // getAllChatList() {
  //   this.userService.getChatList().subscribe((res: any) => {
  //     if (res.status === "success") {
  //       this.chatMessages = res.chats;
  //     }
  //   })
  // }

  /**
   * Function Change Status of user.
   * @param userId 
   * @param isOnline 
   */
  updateUserStatus(userId: string, isOnline: string): void {
    const user = this.userList.find((user: any) => user._id === userId);
    if (user) {
      user.isOnline = isOnline;
    }
  }


  /**
   * Get User list.
   */
  getUserList() {
    this.userService.getUserList().subscribe((res: any) => {
      if (res.status === "success") {
        this.userList = res.userList;
      }
    })
  }



  /**
   * show chat form.
   */
  showChatForm() {
    this.isformShow = true;
  }

  //update user status online.


  ngOnDestroy() {
    // this.statusSubscription.unsubscribe();
  }
}
