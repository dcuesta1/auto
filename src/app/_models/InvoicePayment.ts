import {BaseModel} from './BaseModel';

export class InvoicePayment extends BaseModel {
  public id: number;
  public userId: number;
  public amount: number;
  public type: number;
  public card: number | null;

  public constructor(model, toCamel = false) {
    super(model, toCamel);
  }
}
