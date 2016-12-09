import { Component, OnInit } from '@angular/core';
import { AccountService } from "../shared/services/account.service";
import { WebSocketService } from "../shared/services/web-socket.service";
import { AppProperties } from "../shared/app.properties";


@Component({
  selector: 'wjc-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  isConnected: boolean = false;
  sessionId: string;

  constructor(private accountService: AccountService,
              private wsService: WebSocketService) {
  }

  ngOnInit() {
    this.isConnected = this.wsService.isConnected;
  }

  connect() {
    let subscribeDest = `/sessions/${this.sessionId}`;
    this.wsService.connect(AppProperties.WS_ENDPOINT, subscribeDest);
  }

  send() {
    let payload = {
      'username': this.accountService.getAccount().username,
      'sessionId': this.sessionId
    };

    this.wsService.send("wjc/combat", payload);
  }

  disconnect() {
    this.wsService.disconnect();
  }

  isCanSend(): boolean {
    return !!(this.isConnected && this.sessionId && this.sessionId.length > 0);
  }

  isCanConnect(): boolean {
    return !!(!this.isConnected && this.sessionId && this.sessionId.length > 0);
  }
}
