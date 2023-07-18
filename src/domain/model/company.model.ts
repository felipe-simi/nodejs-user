import { v4 as uuid } from "uuid";

export class CompanyEntity {
  private _id: string;
  private _domainUrl: string;

  constructor(domainUrl: string, id?: string) {
    if (id) {
      this._id = id;
    } else {
      this._id = uuid();
    }
    this._domainUrl = domainUrl;
  }

  getId(): string {
    return this._id;
  }

  setDomainUrl(domainUrl: string): void {
    this._domainUrl = domainUrl;
  }

  getDomainUrl(): string {
    return this._domainUrl;
  }
}
