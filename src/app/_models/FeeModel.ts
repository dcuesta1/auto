import {BaseModel} from './BaseModel';

export class Fee extends BaseModel {
  public id: number;
  public companyId: number;
  public name: string;
  public amount: number;
  public isFlatAmount: boolean;
  public isTax: boolean;

  public constructor(model, toCamel = false) {
    super(model, toCamel);
  }

  private _createdAt: Date;

  get createdAt(): Date {
    return this._createdAt;
  }

  set createdAt(value: Date) {
    this._createdAt = new Date(value);
  }

  private _updatedAt: Date;

  get updatedAt(): Date {
    return this._updatedAt;
  }

  set updatedAt(value: Date) {
    this._updatedAt = new Date(value);
  }
}
