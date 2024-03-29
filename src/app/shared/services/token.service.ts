import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs";
import { UsernamePasswordCredentials } from "../username-password-credentials";
import { AppError } from "../app-error";
import { AppProperties } from "../app.properties";
import { HttpHeaders } from "../http-headers";
import { MediaType } from "../media-type";
import { Authority } from "../entities/authority";

@Injectable()
export class TokenService {
  private static AUTH_ENDPOINT = AppProperties.AUTH_ENDPOINT;
  private static AUTH_HASH = AppProperties.CLIENT_AUTH_HASH;

  private accessToken: string;
  private refreshToken: string;
  private tokenType: string;
  private expirationTime: Date;
  private scope: string;
  private jti: string;
  private _authorities: Authority[];

  private STORAGE_KEY = 'tokens';

  constructor(private http: Http) {
    if (this.isTokensExistsInStorage()) {
      let tokens = this.getTokensFromStorage();
      this.populateFields(tokens);
    }
  }

  public saveTokens(tokenResponse: string): void {
    localStorage.setItem(this.STORAGE_KEY, tokenResponse);
    this.populateFields(tokenResponse);
  }

  private populateFields(tokenResponse: string) {
    let tokenRespJson = JSON.parse(tokenResponse);
    this.accessToken = tokenRespJson['access_token'];
    this.refreshToken = tokenRespJson['refresh_token'];
    this.tokenType = tokenRespJson['token_type'];
    this.expirationTime = TokenService.getExpirationTimeFromPayload(tokenRespJson['access_token']);
    this.scope = tokenRespJson['scope'];
    this.jti = tokenRespJson['jti'];
    this._authorities = JSON.parse(atob(this.accessToken.split('.', 2)[1])).authorities.map(a => new Authority(a));
  }

  private static getExpirationTimeFromPayload(accessToken: string): Date {
    let payload = JSON.parse(atob(accessToken.split('.')[1]));

    return new Date((payload['exp'] - 30) * 1000);
  }

  public getAccessToken(credentials?: UsernamePasswordCredentials): Observable<string> {

    if (!this.accessToken && !credentials) {
      return <Observable<string>>Observable.throw(new AppError(
        'token/access_token-missing',
        'Access token is missing'
      ));
    } else if (!this.accessToken && credentials) {
      return this.getTokens(credentials)
        .map(tokenResponse => {
          this.saveTokens(tokenResponse);

          return this.accessToken;
        });
    } else if (this.isAccessTokenExpired()) {
      return this.getTokensFromRefreshToken(this.refreshToken)
        .map(tokenResponse => {
          this.saveTokens(tokenResponse);

          return this.accessToken;
        });
    } else {
      return Observable.of(this.accessToken);
    }
  }

  public getTokenType(): string {
    if (!this.tokenType) {
      return null;
    }

    return this.tokenType;
  }

  public isAccessTokenExpired(): boolean {
    let now = new Date();

    return !!(this.expirationTime
    && now.getTime() > this.expirationTime.getTime());
  }

  private getTokensFromStorage(): string {
    return localStorage.getItem(this.STORAGE_KEY);
  }

  private isTokensExistsInStorage(): boolean {
    return !!localStorage.getItem(this.STORAGE_KEY);
  }

  private getTokens(credentials: UsernamePasswordCredentials): Observable<string> {
    let grantType = `grant_type=password`;
    let clientId = 'client_id=trustedClient';
    let scope = 'scope=read write trust';
    let username = `username=${credentials.username}`;
    let password = `password=${credentials.password}`;

    let body = encodeURI(`${grantType}&${clientId}&${scope}&${username}&${password}`);

    return this.http.post(TokenService.AUTH_ENDPOINT, body, {headers: TokenService.getHeadersForTokenRequest()})
      .map(response => response.text());
  }

  private getTokensFromRefreshToken(refreshToken: string): Observable<string> {
    let grantType = 'grant_type=refresh_token';
    let refreshTokenParam = `refresh_token=${refreshToken}`;

    let body = `${grantType}&${refreshTokenParam}`;

    return this.http.post(TokenService.AUTH_ENDPOINT, body, {headers: TokenService.getHeadersForTokenRequest()})
      .map(response => response.text());
  }

  private static getHeadersForTokenRequest(): Headers {
    let headers = new Headers();
    headers.append(HttpHeaders.AUTHORIZATION, `Basic ${TokenService.AUTH_HASH}`);
    headers.append(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_FORM_URLENCODED);

    return headers;
  }

  public deleteTokensFromStorage(): void {
    localStorage.removeItem(this.STORAGE_KEY);

    this.accessToken = null;
    this.refreshToken = null;
    this.tokenType = null;
    this.expirationTime = null;
    this.scope = null;
    this.jti = null;
  }

  get authorities(): Authority[] {
    return this._authorities;
  }
}
