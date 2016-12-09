import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AccountService } from "../shared/services/account.service";
import { AppProperties } from "../shared/app.properties";


@Component({
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  isActive = false;
  showMenu: string = '0';

  constructor(private accountService: AccountService,
              private router: Router) {
  }

  ngOnInit() {
  }

  eventCalled() {
    this.isActive = !this.isActive;
  }

  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  setSubmenuClass(element: string) {
    if (element === this.showMenu) {
      return 'expand';
    } else {
      return 'hide';
    }
  }

  isVisible(): boolean {
    let adminAuthority = this.accountService.getAccount().authorities
      .find(authhority => authhority.authority == AppProperties.ADMIN_ROLE);

    return !!adminAuthority
  }

  hide() {
    this.isActive = !this.isActive;
  }

  logout() {
    this.accountService.logout();
    this.router.navigate(['/login']);
  }
}
