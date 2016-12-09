import { Injectable } from "@angular/core";

let SockJS = require('sockjs-client');
let Stomp = require('stompjs');

@Injectable()
export class WebSocketService {
  private socket: any;
  private stompClient: any;

  isConnected: boolean;

  constructor() { }

  connect(wsUrl: string, subscribeDestination: string): void {
    this.socket = new SockJS(wsUrl);
    this.stompClient = Stomp.over(<WebSocket>this.socket);
    this.stompClient.connect("guest", "guest",
      (frame) => {
        this.isConnected = true;
        console.log('Connected: ' + frame);
        this.stompClient.subscribe(subscribeDestination, (answer) => {
          console.log(answer);
        });
      },
      (error) => {
        this.isConnected = false;
      }
    );

    this.socket.onclose((e: CloseEvent) => {
      this.isConnected = false;
      console.log('Socket closed');
    });
  }

  disconnect(): void {
    this.stompClient.disconnect(() => {
      this.isConnected = false;
      console.log("Stomp client disconnected")
    });
    this.socket.close();
  }

  send(destionation: string, payload: any): void {
    this.stompClient.send(destionation, {}, JSON.stringify(payload));
  }
}
