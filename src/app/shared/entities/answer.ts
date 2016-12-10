import { Account } from "./account";

export class Answer {

  constructor(
    public id: string,
    public answerPos: string,
    public answer: string,
    public isCorrect: boolean,
    public dateCreated: any,
    public dateModified: any,
    public createdBy: Account,
    public modifiedBy: Account
  ) {}
}
