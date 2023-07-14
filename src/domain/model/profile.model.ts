import { v4 as uuid } from "uuid";

export class ProfileEntity {
  private _id: string;
  private _email: string;

  constructor(email: string, id?: string) {
    if (id) {
      this._id = id;
    } else {
      this._id = uuid();
    }
    this._email = email;
  }

  get id(): string {
    return this._id;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }
}
