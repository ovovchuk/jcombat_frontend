import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AccountService } from "./services/account.service";
import { AppProperties } from "./app.properties";

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private accountService: AccountService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    let account = this.accountService.getAccount();

    return !!(account
      && account.authorities
      && account.authorities.find(authrity => authrity.authority == AppProperties.ADMIN_ROLE));
  }

}
