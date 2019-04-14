import {BaseModel} from './BaseModel';
import {Customer} from './Customer';
import {Fee} from './FeeModel';
import {InvoicePayment} from './InvoicePayment';
import {Item} from './Item';
import {User} from './User';
import {Vehicle} from './Vehicle';

export class Invoice extends BaseModel {
  public static PENDING_PAYMENT = 1;
  public static ESTIMATE = 2;
  public static CLOSED = 4;
  public static CANCELLED = 8;

  public id: number;
  public number: string;
  public discount: number;
  public total: number;
  public subtotal: number;
  public statusNumber: number;

  public constructor(obj: any = null, toCamel: boolean = false) {
    super(obj, toCamel);
    this.statusNumber = obj.status;
  }

  private _createdAt: Date;

  get createdAt(): Date {
    return this._createdAt;
  }

  set createdAt(value) {
    this._createdAt = new Date(value);
  }

  private _updatedAt: Date;

  get updatedAt(): Date {
    return this._updatedAt;
  }

  set updatedAt(value) {
    this._updatedAt = new Date(value);
  }

  private _employee: User;

  get employee(): User {
    return this._employee;
  }

  set employee(value: User) {
    this._employee = new User(value, true);
  }

  private _customer: Customer;

  get customer(): Customer {
    return this._customer;
  }

  set customer(value: Customer) {
    this._customer = new Customer(value, true);
  }

  private _fees: Fee[];

  get fees(): Fee[] {
    return this._fees;
  }

  set fees(fees: Fee[]) {
    const feeArr = [];

    for (const fee of fees) {
      feeArr.push(new Fee(fee, true));
    }

    this._fees = feeArr;
  }

  private _invoicePayments: InvoicePayment[];

  get invoicePayments(): InvoicePayment[] {
    return this._invoicePayments;
  }

  set invoicePayments(invoicePayments: InvoicePayment[]) {
    const invoicePaymentsArr = [];

    for (const invoicePayment of invoicePayments) {
      invoicePaymentsArr.push(new InvoicePayment(invoicePayment, true));
    }

    this._invoicePayments = invoicePaymentsArr;
  }

  private _vehicle: Vehicle;

  get vehicle(): Vehicle {
    return this._vehicle;
  }

  set vehicle(value: Vehicle) {
    this._vehicle = new Vehicle(value, true);
  }

  private _items: Item[];

  get items(): Item[] {
    return this._items;
  }

  set items(items) {
    const itemsArr = [];

    for (const item of items) {
      itemsArr.push(new Item(item, true));
    }

    this._items = itemsArr;
  }

  get name() {
    return this.customer.name;
  }

  set name(v) {
  }

  get date() {
    return this._createdAt.getDay();
  }

  set date(v) {
  }

  get status() {
    let statusText: string;

    switch (this.statusNumber) {
      case Invoice.PENDING_PAYMENT:
        statusText = 'pending payment';
        break;
      case Invoice.ESTIMATE:
        statusText = 'estimate';
        break;
      case Invoice.CLOSED:
        statusText = 'closed';
        break;
      case Invoice.CANCELLED:
        statusText = 'cancelled';
        break;
    }

    return statusText;
  }

  set status(value) {
  }
}
