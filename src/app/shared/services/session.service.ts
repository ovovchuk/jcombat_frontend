import { Injectable } from '@angular/core';
import { CrudService } from "./crud.service";
import { HttpService } from "./http.service";
import { Session } from "../entities/session";
import { AppProperties } from "../app.properties";
import { SessionWrapper } from "../entities/response-wrapper";
import { MediaType } from "../media-type";
import { Observable } from "rxjs";

@Injectable()
export class SessionService extends CrudService<SessionWrapper,Session> {

  constructor(protected httpService: HttpService) {
    super(httpService);
  }

  protected getUrl(): string {
    return `${AppProperties.API_SERVER}/sessions`;
  }

  public joinSession(session: Session): Observable<Session> {
    let url = `${this.getUrl()}/${session.id}/join`;

    return this.httpService.put(url, session, MediaType.APPLICATION_JSON)
      .map((response) => response.json());
  }

  public findAllByType(status: string): Observable<SessionWrapper> {
    let url = `${this.getUrl()}/status/${status.toLowerCase()}`;

    return this.httpService.get(url)
      .map((response) => response.json());
  }
}
