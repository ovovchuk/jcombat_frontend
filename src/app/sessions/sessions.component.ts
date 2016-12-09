import { Component, OnInit } from '@angular/core';
import { AccountService } from "../shared/services/account.service";
import { WebSocketService } from "../shared/services/web-socket.service";
import { AppProperties } from "../shared/app.properties";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { FormValidationStyles } from "../shared/form-validation-styles";
import { SessionService } from "../shared/services/session.service";
import { NotificationsService } from "angular2-notifications";
import { Session } from "../shared/entities/session";

@Component({
  selector: 'wjc-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss']
})
export class SessionsComponent implements OnInit {
  isConnected: boolean = false;
  sessionId: string;
  sessions: any = [1, 2, 3];
  public activeModal: NgbModalRef;
  form: FormGroup;
  formStyles: FormValidationStyles;

  constructor(private accountService: AccountService,
              private wsService: WebSocketService,
              private modalService: NgbModal,
              private sessionService: SessionService,
              private notificationService: NotificationsService) {
  }

  ngOnInit() {
    this.isConnected = this.wsService.isConnected;

    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.required
      ])
    });

    this.formStyles = new FormValidationStyles(this.form);

    this.sessionService.findAll()
      .subscribe((sessions: any) => this.sessions = sessions._embedded.sessions);
  }

  openModal(content) {
    this.activeModal = this.modalService.open(content);
  }

  closeModal() {
    this.form.reset({name: ''});
    this.activeModal.close();
  }

  submit() {
    console.log(this.form.value);
    this.sessionService.save(this.form.value)
      .subscribe(
        (session) => this.notificationService.success('Success', 'Session has been created.'),
        (error) => this.notificationService.error('Error', 'Error appeared during session creation'),
        () => this.form.reset({name: ''})
      );

    this.activeModal.close();
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
