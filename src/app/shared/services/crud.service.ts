import { HttpService } from "./http.service";
import { Observable } from "rxjs";
import { MediaType } from "../media-type";

export abstract class CrudService<W,T> {

  constructor(protected httpService: HttpService) {
  }

  protected abstract getUrl(): string;

  public findAll(): Observable<W> {
    return this.httpService.get(this.getUrl()).map(response => response.json());
  }

  public findOne(id: number | string): Observable<T> {
    let url = `${this.getUrl()}/${id}`;

    return this.httpService.get(url)
      .map(response => response.json())
  }

  public save(entity: T): Observable<T> {
    return this.httpService.post(this.getUrl(), entity, MediaType.APPLICATION_JSON)
      .map(response => response.json());
  }

  public delete(id: number | string): Observable<void> {
    let url = `${this.getUrl()}/${id}`;

    return this.httpService.delete(url)
      .flatMap(response => Observable.empty())
  }

  public update(id: number | string, entity: T): Observable<T> {
    let url = `${this.getUrl()}/${id}`;
    return this.httpService.put(url, entity, MediaType.APPLICATION_JSON)
      .map(response => response.json());
  }
}
