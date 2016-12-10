import { Component, OnInit } from '@angular/core';
import { AccountService } from "../shared/services/account.service";
import { WebSocketService } from "../shared/services/web-socket.service";
import { AppProperties } from "../shared/app.properties";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { FormValidationStyles } from "../shared/form-validation-styles";
import { SessionService } from "../shared/services/session.service";
import { NotificationsService } from "angular2-notifications";
import { Session, SessionStatuses } from "../shared/entities/session";
import { SessionWrapper } from "../shared/entities/response-wrapper";
import { Router } from "@angular/router";

@Component({
  selector: 'wjc-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss']
})
export class SessionsComponent implements OnInit {
  isConnected: boolean = false;
  sessionId: string;
  sessions: Session[] = [];
  public activeModal: NgbModalRef;
  form: FormGroup;
  formStyles: FormValidationStyles;

  constructor(private accountService: AccountService,
              private wsService: WebSocketService,
              private modalService: NgbModal,
              private sessionService: SessionService,
              private notificationService: NotificationsService,
              private router: Router) {
  }

  ngOnInit() {
    this.isConnected = this.wsService.isConnected;

    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.required
      ])
    });

    this.formStyles = new FormValidationStyles(this.form);

    this.sessionService.findAllByType(SessionStatuses.CREATED)
      .subscribe((sw: SessionWrapper) => sw.page.totalElements > 0 ? this.sessions = sw._embedded.sessionList : []);
  }

  openModal(content): void {
    this.activeModal = this.modalService.open(content);
  }

  closeModal(): void {
    this.form.reset({name: ''});
    this.activeModal.close();
  }

  submit(): void {
    console.log(this.form.value);
    this.sessionService.save(this.form.value)
      .flatMap((session) => this.sessionService.findAllByType(SessionStatuses.CREATED))
      .subscribe(
        (sw: SessionWrapper) => {
          this.notificationService.success('Success', 'Session has been created.');
          this.sessions = sw.page.totalElements > 0 ? sw._embedded.sessionList : [];
        },
        (error) => this.notificationService.error('Error', 'Error appeared during session creation'),
        () => this.form.reset({name: ''})
      );

    this.activeModal.close();
  }

  joinSession(session: Session): void {
    session.user2 = this.accountService.getAccount();

    this.sessionService.joinSession(session)
      .subscribe(
        (session) => this.router.navigate(['main/session', session.id]),
        (error) => this.notificationService.error('Error', 'Error appeared during joining session'),
        () => {}
      )
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
