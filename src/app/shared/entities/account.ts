import { Authority } from "./authority";

export class Account {
  constructor(
    public id: string,
    public username: string,
    public firstName: string,
    public lastName: string,
    public dateCreated: Date,
    public dateModified: Date,
    public authorities: Authority[],
    public enabled: boolean
  ) {}
}
