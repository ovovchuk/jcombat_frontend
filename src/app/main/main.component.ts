import { Component, OnInit } from '@angular/core';
import { AccountService } from "../shared/services/account.service";

let SockJS = require('sockjs-client');
let Stomp = require('stompjs');

@Component({
  selector: 'wjc-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  isConnected: boolean = false;
  stompClient: any;
  socket: any;
  sessionId: string;

  constructor(private accountService: AccountService) {
  }

  ngOnInit() {
  }

  connect() {
    this.socket = new SockJS('http://localhost:8080/api/jcombat');
    this.stompClient = Stomp.over(<WebSocket>this.socket);
    this.stompClient.connect("guest", "guest",
      (frame) => {
        this.isConnected = true;
        console.log('Connected: ' + frame);
        this.stompClient.subscribe(`/session/${this.sessionId}`, (greeting) => {
          console.log(greeting);
        });
      },
      (error) => {
        this.isConnected = false;
      }
    );

    this.socket.onclose((e: CloseEvent) => {
      this.isConnected = false;
      console.log('Socket closed');
    })
  }

  send() {
    let payload = {
      'username': this.accountService.getAccount().username,
      'sessionId': this.sessionId
    };

    this.stompClient.send("/wjc/combat", {}, JSON.stringify(payload));
  }

  disconnect() {
    this.stompClient.disconnect(() => {
      this.isConnected = false;
      console.log("Stomp client disconnected")
    });
    this.socket.close();
  }

  isCanSend(): boolean {
    return !!(this.isConnected && this.sessionId && this.sessionId.length > 0);
  }

  isCanConnect(): boolean {
    return !!(!this.isConnected && this.sessionId && this.sessionId.length > 0);
  }
}
