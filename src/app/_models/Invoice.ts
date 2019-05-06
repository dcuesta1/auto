import {BaseModel} from './BaseModel';
import {Customer} from './Customer';
import {Fee} from './FeeModel';
import {InvoicePayment} from './InvoicePayment';
import {Item} from './Item';
import {User} from './User';
import {Vehicle} from './Vehicle';

export class Invoice extends BaseModel {
  public static readonly PENDING_PAYMENT = 1;
  public static readonly ESTIMATE = 2;
  public static readonly CLOSED = 4;
  public static readonly CANCELLED = 8;

  public id: number;
  public number: string;
  public discount: number;
  public total: number;
  public subtotal: number;
  public status: number;
  public customerName: string;
  public customerEmail: string;
  public amountPaid: number;

  private _fees: Fee[];
  private _employee: User;
  private _customer: Customer;
  private _invoicePayments: InvoicePayment[];
  private _vehicle: Vehicle;
  private _items: Item[];

  private _lastPaymentDate: Date;
  private _dueDate: Date;
  private _updatedAt: Date;
  private _createdAt: Date;


  public constructor(obj: any = null, toCamel: boolean = false) {
    super(obj, toCamel);
  }


  get createdAt(): Date {
    return this._createdAt;
  }

  set createdAt(value) {
    this._createdAt = new Date(value);
  }


  get updatedAt(): Date {
    return this._updatedAt;
  }

  set updatedAt(value) {
    this._updatedAt = new Date(value);
  }

  get dueDate(): Date {
    return this._dueDate;
  }

  set dueDate(value) {
    this._dueDate = new Date(value);
  }

  get lastPaymentDate(): Date {
    return this._lastPaymentDate;
  }

  set lastPaymentDate(value) {
    this._lastPaymentDate = new Date(value);
  }


  get employee(): User {
    return this._employee;
  }

  set employee(value: User) {
    this._employee = new User(value, true);
  }

  get customer(): Customer {
    return this._customer;
  }

  set customer(value: Customer) {
    this._customer = new Customer(value, true);
  }

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

  get vehicle(): Vehicle {
    return this._vehicle;
  }

  set vehicle(value: Vehicle) {
    this._vehicle = new Vehicle(value, true);
  }

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

  get date() {
    return this._createdAt.getDay();
  }

  set date(v) {
  }

  get statusName() {
    let statusText: string;

    switch (this.status) {
      case Invoice.PENDING_PAYMENT:
        statusText = 'outstanding';
        if (this.dueDate.getTime() < Date.now()) {
          statusText = 'overdue';
        }
        break;
      case Invoice.ESTIMATE:
        statusText = 'estimate';
        break;
      case Invoice.CLOSED:
        statusText = 'paid';
        break;
      case Invoice.CANCELLED:
        statusText = 'canceled';
        break;
    }

    return statusText;
  }
}
