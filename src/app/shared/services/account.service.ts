import { Injectable } from '@angular/core';
import { UsernamePasswordCredentials } from "../username-password-credentials";
import { Observable } from "rxjs";
import { AppProperties } from "../app.properties";
import { AppError } from "../app-error";
import { TokenService } from "./token.service";
import { HttpService } from "./http.service";
import { Account } from "../entities/Account";

@Injectable()
export class AccountService {
  private account: Account;
  private STORAGE_KEY = 'account';

  constructor(private tokenService: TokenService,
              private httpService: HttpService) {
  }

  private createAccount(username: string): Observable<Account> {
    return new Observable<Account>(observer => {
      let accountCreationError = new AppError(
        'auth/creation-failure',
        'Error appeared during account creation please try again later');

      let url = `${AppProperties.API_SERVER}/me`;

      this.httpService.get(url).subscribe(
        response => {
          if (response.ok) {
            let account = this.createAccountFromJson(response.json());
            observer.next(account);
            observer.complete();
          } else {
            observer.error(accountCreationError);
          }
        },
        error => observer.error(accountCreationError)
      );
    });
  }

  public login(credentials: UsernamePasswordCredentials): Observable<void> {
    return new Observable<void>(observer => {

      this.tokenService.deleteTokensFromStorage();

      let badCredError = new AppError(
        'auth/account-not-found',
        'Wrong credentials'
      );

      if (AccountService.verifyCredentials(credentials)) {
        this.tokenService.getAccessToken(credentials).subscribe(
          accessToken => this.createAccount(credentials.username).subscribe(
            account => {
              this.account = account;
              observer.complete();
            },
            error => observer.error(error)
          ),
          error => observer.error(badCredError)
        );
      } else {
        observer.error(badCredError);
      }
    });
  }

  public logout(): void {
    this.deleteAccountFromLocalStorage();
    this.tokenService.deleteTokensFromStorage();
  }

  private static verifyCredentials(credentials: UsernamePasswordCredentials): boolean {
    let regExp: RegExp = /^[\w!@#$%\^&*()\-\\.|\/?><;':"+=~`{}\[\],]+$/i;

    return regExp.test(credentials.username) && regExp.test(credentials.password);
  }

  private createAccountFromJson(user: any): Account {
    let account: Account = new Account(
      user.username,
      user.firstName,
      user.lastName,
      user.dateCreated,
      user.dateModified,
      this.tokenService.authorities
    );
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(account));
    return account;
  }

  public getAccount(): Account {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY));
  }

  private deleteAccountFromLocalStorage(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.account = null;
  }
}
