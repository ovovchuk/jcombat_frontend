import { Question } from "./question";
import { Answer } from "./answer";
import { Account } from "./account";

export class SessionItem {

  constructor(
    public id: string,
    public userHealth1: number,
    public userHealth2: number,
    public question: Question,
    public answer: Answer,
    public answeredBy: Account,
    public dateCreated: any
  ) {}
}
