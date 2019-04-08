import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Customer} from '../../_models/Customer';
import {AppService} from '../../_services/app.service';
import {CustomerService} from '../../_services/customer.service';

@Component({
  selector: 'app-company-customers',
  templateUrl: './company-customers.component.html',
  styleUrls: ['./company-customers.component.css']
 })
export class CompanyCustomersComponent implements OnInit {

  columns = [
    { prop: 'firstName' },
    { name: 'Email' },
    { name: 'Phone' },
    { name: 'Last visit'}
  ];

  public isLoading: boolean;
  public limit = 10;
  public temp = [];
  public selected = [];

  @ViewChild(DatatableComponent) table: DatatableComponent;

  public rows: Customer[];
  private _cache: Customer[];

  constructor(private _customerService: CustomerService, private _appService: AppService) {

    // this._appService.loader.subscribe(isLoading => {
    //   this.isLoading = isLoading;
    // });

    _customerService.companyCustomers()
      .subscribe(
        (customers) => {

          const customerArr = [];
          for (const customer of customers) {
            customerArr.push(new Customer(customer, true));
          }

          this.rows = customerArr;
          this.temp = [...customerArr];
          this._appService.toggleLoading(false);
        }
      );
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.temp.filter((d) => {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  ngOnInit(): void {}
}
