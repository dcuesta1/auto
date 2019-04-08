import {BaseModel} from './BaseModel';
import {Vehicle} from './Vehicle';

export class Customer extends BaseModel {
  public id: number;
  public companyId: number;
  public firstName: string;
  public lastName: string;
  public phone: string;
  public email: string;
  public streetAddr: string;
  public city: string;
  public state: string;
  private _lastVisit: Date;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _vehicles: Vehicle[];

  public constructor(obj: any = null, toCamel: boolean = false) {
    super(obj, toCamel);
  }

  get name(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  get vehicles(): Vehicle[] {
    return this._vehicles;
  }

  set vehicles(value: Vehicle[]) {
    const vehiclesArr = [];

    for (const vehicle of value) {
      vehiclesArr.push(new Vehicle(vehicle, true));
    }

    this._vehicles = vehiclesArr;
  }

  get lastVisit(): Date {
    return this._lastVisit;
  }

  set lastVisit(value) {
    this._lastVisit = new Date(value);
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
