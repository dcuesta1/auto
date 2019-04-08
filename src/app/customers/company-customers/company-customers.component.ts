import {Component, OnInit, ViewChild} from '@angular/core';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Customer} from '../../_models/Customer';
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

  limit = 10;
  temp = [];
  selected = [];

  @ViewChild(DatatableComponent) table: DatatableComponent;

  public rows: Customer[];
  private _cache: Customer[];

  constructor(private _customerService: CustomerService) {
    _customerService.companyCustomers()
      .subscribe(
        (customers) => {

          const customerArr = [];
          for (const customer of customers) {
            customerArr.push(new Customer(customer, true));
          }

          this.rows = customerArr;
          this.temp = [...customerArr];
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
