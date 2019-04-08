import {BaseModel} from './BaseModel';

export class User extends BaseModel {
  public id: number;
  name: string;
  companyId: number;
  email: string;
  phone: string;
  type: number;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(model: any = null, toCamel: boolean = false) {
    super(model, toCamel);
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  set createdAt(value) {
    this._createdAt = new Date(value);
  }

  get updatedAt(): Date {
    return this._createdAt;
  }

  set updatedAt(value) {
    this._updatedAt = new Date(value);
  }
}
