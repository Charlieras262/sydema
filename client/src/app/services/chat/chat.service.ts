import { Message } from './../../models/message';
import { Conversation } from './../../models/conversation';
import { Chat } from './../../models/chat';
import { ProjectVariable } from './../../variables/project-variables';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  API_URL = new ProjectVariable().serverLocation + 'api/chat/';
  conversations: Conversation[];
  messages: Message[];

  constructor(private http: HttpClient) { }

  getChat(id: string) {
    return this.http.get(this.API_URL + id);
  }

  postChat(chat) {
    return this.http.post(this.API_URL, chat);
  }

  getConversation(id: string) {
    return this.http.get(this.API_URL + 'conversation/' + id);
  }

  postConversation(con) {
    return this.http.post(this.API_URL + 'conversation/', con);
  }

  putConversation(id, con) {
    return this.http.put(this.API_URL + 'conversation/' + id, con);
  }

  addConversation(con) {
    return this.http.post(this.API_URL + 'conversation/add', con);
  }

  addMessage(msg) {
    return this.http.post(this.API_URL + 'conversation/msg/add', msg);
  }

  getMessage(id: string) {
    return this.http.get(this.API_URL + 'conversation/msg/' + id);
  }

  postMessage(msg) {
    return this.http.post(this.API_URL + 'conversation/msg/', msg);
  }
}
