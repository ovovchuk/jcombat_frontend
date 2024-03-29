import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AccountService } from "./services/account.service";

@Injectable()
export class AuthGuard implements CanActivate{

  constructor(private router: Router,
              private accountService: AccountService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    let account = this.accountService.getAccount();

    if(account) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }


}
