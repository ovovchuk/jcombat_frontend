import { SessionItem } from "./session-item";
import { Account } from "./account";

export class Session {

  constructor(
    public id: string,
    public name: string,
    public user1: Account,
    public user2: Account,
    public dateCreated: any,
    public dateEnd: any,
    public status: string,
    public items: SessionItem[],
    public _links: any
  ) {}
}

export class SessionStatuses {
  static CREATED = 'CREATED';
  static STARTED = 'STARTED';
  static CLOSED = 'CLOSED';
}
