import { ValidateService } from './../../services/validate/validate.service';
import { AuthService } from './../../services/auth/auth.service';
import { Message } from './../../models/message';
import { Conversation } from './../../models/conversation';
import { ChatService } from './../../services/chat/chat.service';
import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { ProjectVariable } from 'src/app/variables/project-variables';

declare var jQuery: any;
declare var $: any;
let search;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {

  private chat;
  private input;
  userInfo;
  target;
  userTarget;
  numCon = -1;
  creatingConv = true;
  users;
  loading = false;
  private socket = io(new ProjectVariable().serverLocation);
  username: string;
  selected: boolean;
  search_conv: string;
  found = true;
  size: number;
  writing: boolean;
  time;
  from = true;
  recived = false;
  qMsg:number = 0;

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private validateService: ValidateService
  ) {
    this.userInfo = JSON.parse(localStorage.getItem('user'));
    this.selected = false;
  }

  ngOnInit() {
    this.socket.emit('chatJoin', this.userInfo.id);
    this.getConversations();
    this.isThereConversations();
    this.isUserTyping();
    this.setMessageNotification();
  }

  sendMessage() {
    const date = new Date();
    const months = new Array(
      'January',
      'February',
      'March',
      'April',
      'May',
      'Jun',
      'July',
      'August',
      'September',
      'October',
      'November',
      'Dicember');
    const dateOBJ = {
      time: '',
      month: months[date.getMonth()],
      day: date.getDate()
    };
    if (date.getMinutes() < 10) {
      dateOBJ.time = date.getHours().toFixed() + ':0' + date.getMinutes();
    } else {
      dateOBJ.time = date.getHours().toFixed() + ':' + date.getMinutes();
    }
    const dateStr = dateOBJ.time + ' | ' + dateOBJ.month + ' ' + dateOBJ.day;
    this.chat.append(this.genereteSentMsgComponent(this.input.val(), dateStr));
    this.chatService.conversations[this.numCon].last_msg = this.input.val();
    this.chatService.conversations[this.numCon].lasDate = dateStr;

    this.chatService.postMessage({ data: this.input.val(), from: this.userInfo.id, to: this.target, date: dateStr })
      .subscribe(res2 => {
        if (res2) {
          const r = JSON.parse(JSON.stringify(res2));
          this.chatService.messages.push(
            {
              _id: r.msg._id, data: this.input.val(),
              from: this.userInfo.id,
              to: this.target,
              date: dateStr
            });
          this.chatService.conversations[this.numCon].msg = this.chatService.messages;
          this.chatService.putConversation(this.chatService.conversations[this.numCon]._id, this.chatService.conversations[this.numCon])
            .subscribe(res1 => {
              this.scroll();
            });
        }
      });
    this.socket.emit('sendMessage', this.input.val(), this.target, dateStr, this.userInfo.id);
    this.input.val('');
    this.writing = false;
  }

  typing(){
    this.socket.emit('userIsTyping', this.target, true);
    this.time = setTimeout(() => {
      this.socket.emit('userIsTyping', this.target, false);
    }, 250);
  }

  isUserTyping(){
    this.socket.on('userIsTyping', (to, status) => {
      this.writing = status;
      if(to === this.userInfo.id){
        this.from = false;
      }
    });
  }

  searchUser(name) {
    this.loading = true;
    this.found = true;
    this.authService.getUserByUsername(name)
      .subscribe(res => {
        const user = JSON.parse(JSON.stringify(res));
        if (user.users.length !== 0) {
          for (let i = 0; i < user.users.length; i++) {
            if (user.users[i].username !== this.userInfo.username && user.users[i].username !== 'Admin User') {
              this.users = user.users;
              this.loading = false;
            } else {
              this.users = [];
              this.found = false;
              this.loading = false;
            }
          }
        } else {
          this.users = [];
          this.found = false;
          this.loading = false;
        }
      });
    if (name.length === 0) {
      this.users = [];
      this.loading = false;
      this.found = false;
    }
  }
  
  getMessage() {
    this.getMessages();
    this.socket.on('sendMessage', (data, target, date, sender) => {
      this.target = sender;
      this.chat.append(this.generateRecivedMsgComponent(data, date));
      this.scroll();
      if(!this.selected){
        this.recived = true;
      }
    });
  }

  setMessageNotification() {
    this.socket.on('sendMessage', (data, target, date, sender) => {
      if(!this.selected){
        this.qMsg++
        var audio = new Audio('src/public/audio/Mallet.ogg');
        audio.play();
        this.recived = true;
        this.chatService.getConversation(this.userInfo.id + '~' + this.target)
          .subscribe(res => {
            let conv = JSON.parse(JSON.stringify(res)) as Conversation;
            conv.q_msg = this.qMsg;
            this.chatService.putConversation(conv._id, conv)
              .subscribe(res1 => {
              });
          });
      }
    });
  }

  addConversation(){
    if(this.creatingConv === true){
      this.creatingConv = false;
    }else{
      this.creatingConv = true;
    }
  }

  getConversations() {
    this.chatService.getChat(this.userInfo.id)
      .subscribe(res => {
        const chat = JSON.parse(JSON.stringify(res));
        this.chatService.conversations = chat.chat.conversation as Conversation[];
        if (this.numCon !== -1) {
          this.chatService.messages = chat.chat.conversation[this.numCon].msg as Message[];
          this.chat = $('#chat');
          this.input = $('#msg');
          this.getMessage();
        }
      });
  }

  getMessages() {
    if (this.chatService) {
      for (let i = 0; i < this.chatService.messages.length; i++) {
        if (this.chatService.messages[i].from === this.userInfo.id) {
          this.chat.append(this.genereteSentMsgComponent(this.chatService.messages[i].data, this.chatService.messages[i].date));
        } else {
          this.target = this.chatService.messages[i].from;
          if(this.defineUsername(this.chatService.conversations[this.numCon])){
            this.userTarget = this.chatService.conversations[this.numCon].user_from;
          }else{
            this.userTarget = this.chatService.conversations[this.numCon].user_to;
          }
          this.chat.append(this.generateRecivedMsgComponent(this.chatService.messages[i].data, this.chatService.messages[i].date));
        }
        this.scroll();
      }
    }
  }

  selectConversation(con: Conversation) {
    if (this.numCon !== this.chatService.conversations.indexOf(con)) {
      this.numCon = this.chatService.conversations.indexOf(con);
      if (this.userInfo.id === this.chatService.conversations[this.numCon].code.split('~')[1]) {
        this.target = this.chatService.conversations[this.numCon].code.split('~')[0];
      } else {
        this.target = this.chatService.conversations[this.numCon].code.split('~')[1];
      }
      if(this.chat) this.chat.empty();
      this.selected = true;
      this.size = 40;
      this.recived = false;
      this.getConversations();
    }
    this.numCon = this.chatService.conversations.indexOf(con);
  }

  scroll() {
    this.chat.scrollTop(this.chat.prop('scrollHeight'));
  }

  isThereConversations() {
    let res = true;
    if (this.chatService.conversations) {
      if (this.chatService.conversations.length === 0) {
        this.creatingConv = false;
        res = false;
      }
    } else {
      this.creatingConv = false;
      res = false;
    }
    return res;
  }

  createConversation(user) {
    this.target = user._id;
    const conv = {
      code: this.userInfo.id + '~' + this.target,
      user_from: this.userInfo.username,
      user_to: user.username,
      q_msg: this.qMsg
    };
    this.chatService.postConversation(conv)
      .subscribe(res => {
        const r = JSON.parse(JSON.stringify(res));
        this.chatService.addConversation({ id: this.userInfo.id, conID: r.conv._id })
          .subscribe(res => {
            this.chatService.addConversation({ id: this.target, conID: r.conv._id })
              .subscribe(res => {
                this.creatingConv = false;
                this.username = user.username;
                this.getConversations();
              });
          });
      });
  }

  defineUsername(conversation: Conversation) {
    if (conversation.user_from === this.userInfo.username) {
      return true;
    } else {
      return false;
    }
  }

  private genereteSentMsgComponent(msg, dateStr) {
    return '<div class="outgoing_msg"><div class="sent_msg"><p>' + msg + '</p><span class="time_date">' + dateStr + '</span></div></div>';
  }

  private generateRecivedMsgComponent(msg, dateStr) {
    return '<div class="incoming_msg">' +
              '<div class="received_msg">' +
                '<div class="received_withd_msg">' +
                  '<p>' + msg + '</p>' +
                  '<span class="time_date"> ' + dateStr + '</span>' +
                '</div>' +
              '</div>' +
            '</div>';
  }
}
