import { BaseModel } from './BaseModel';

export class InvoicePayment extends BaseModel {
  public id: number;
  public userId: number;
  public amount: number;
  public type: number;
  public card: number | null;

  private _createdAt: Date;
  private _updatedAt: Date;

  public constructor(model, toCamel = false) {
    super(model, toCamel);
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public set createdAt(date) {
    this._createdAt = new Date(date);
  }

  public get updatedAt(): Date {
    return this._updatedAt;
  }

  public set updatedAt(date) {
    this._updatedAt = new Date(date);
  }
}
