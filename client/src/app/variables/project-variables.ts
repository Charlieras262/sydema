import { OnInit } from '@angular/core';
import * as io from 'socket.io-client';

export class ProjectVariable implements OnInit {

  serverLocation: string;
  static socket = io(new ProjectVariable().serverLocation);
  /*http://localhost:8080/*/
  constructor(){
    this.serverLocation = "http://localhost:8080/"
  }
  
  ngOnInit(){

  }
 }
