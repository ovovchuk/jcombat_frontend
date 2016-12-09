import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AccountService } from "../shared/services/account.service";
import { Account } from "../shared/entities/Account";

@Component({
  selector: 'top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  account: Account;

  constructor(
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit() {
    this.account = this.accountService.getAccount()
  }

  logout(): void {
    this.accountService.logout();
    this.router.navigate(['/login']);
  }
}
