import {BaseModel} from './BaseModel';

export class Item extends BaseModel {
  public id: number;
  public name: string;
  public price: number;
  public reference: string;
  public description: string;
  public provider: string;
  public isLabor: number;

  public constructor(obj: any = null, toCamel: boolean = false) {
    super(obj, toCamel);
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
