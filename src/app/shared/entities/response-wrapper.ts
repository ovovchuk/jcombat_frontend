import { Session } from "./session";
import { Account } from "./account";
import { Question } from "./question";

export class ResponseWrapper {
  _embedded: any;
  _links: any;
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  };
}

export class SessionWrapper {
  _embedded: { sessionList: Session[] };
  _links: any;
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  };
}

export class QuestionWrapper {
  _embedded: { questionList: Question[] };
  _links: any;
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  };
}

export class AccountWrapper {
  _embedded: { accountList: Account[] };
  _links: any;
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  };
}

