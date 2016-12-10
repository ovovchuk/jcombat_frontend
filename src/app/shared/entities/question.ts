import { Answer } from "./answer";
import { Account } from "./account";

export class Question {
  constructor(
    public id: string,
    public question: string,
    public answers: Answer,
    public dateCreated: any,
    public createdBy: Account,
    public modifiedBy: Account,
    public isActive: boolean,
    public _links: any
  ) {}
}
