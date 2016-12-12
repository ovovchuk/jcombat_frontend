import { Component, OnInit } from '@angular/core';
import { SessionService } from "../../shared/services/session.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Session } from "../../shared/entities/session";
import { NotificationsService } from "angular2-notifications";
import { Question } from "../../shared/entities/question";
import { AccountService } from "../../shared/services/account.service";
import { Answer } from "../../shared/entities/answer";

@Component({
  selector: 'session-item',
  templateUrl: './session-item.component.html',
  styleUrls: ['./session-item.component.scss']
})
export class SessionItemComponent implements OnInit {
  session: Session;
  userHealth1 = 100;
  userHealth2 = 100;
  question: Question;

  constructor(private sessionService: SessionService,
              private notificationService: NotificationsService,
              private route: ActivatedRoute,
              private router: Router,
              private accountService: AccountService) { }

  ngOnInit() {
    let sessionId = this.route.snapshot.params['id'];

    this.sessionService.findOne(sessionId).subscribe(
      (session) => {
        this.session = session;

        let lastIndex = this.session.items.length - 1;
        let lastSessionItem = this.session.items[lastIndex];

        this.userHealth1 = lastSessionItem.userHealth1;
        this.userHealth2 = lastSessionItem.userHealth2;
        this.question = lastSessionItem.question;
      },
      (error) => this.notificationService.error('Error', 'Error has appeared during session load'),
      () => {}
    );
  }

  doAnswer(answer: Answer) {

  }

}
