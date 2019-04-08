import {BaseModel} from './BaseModel';

export class Vehicle extends BaseModel {
  public id: number;
  public make: string;
  public model: string;
  public year: number;
  public vin: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  public constructor(obj: any = null, toCamel: boolean = false) {
    super(obj, toCamel);
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  set createdAt(value: Date) {
    this._createdAt = new Date(value);
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  set updatedAt(value: Date) {
    this._updatedAt = new Date(value);
  }
}
