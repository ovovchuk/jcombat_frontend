import { SessionItem } from "./session-item";

export class Session {

  constructor(
    public id: string,
    public name: string,
    public dateCreated: any,
    public dateEnd: any,
    public status: string,
    public items: SessionItem[]
  ) {}
}
