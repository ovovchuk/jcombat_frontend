import { Injectable } from '@angular/core';
import { CrudService } from "./crud.service";
import { HttpService } from "./http.service";
import { Session } from "../entities/session";
import { AppProperties } from "../app.properties";

@Injectable()
export class SessionService extends CrudService<Session> {

  constructor(protected httpService: HttpService) {
    super(httpService);
  }

  protected getUrl(): string {
    return `${AppProperties.API_SERVER}/sessions`;
  }
}
