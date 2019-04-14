import {Component, OnInit, ViewChild} from '@angular/core';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Invoice} from '../../_models/Invoice';
import {AppService} from '../../_services/app.service';
import {InvoiceService} from '../../_services/invoice.service';

@Component({
             selector: 'app-company-invoices',
             templateUrl: './company-invoices.component.html',
             styleUrls: ['./company-invoices.component.css']
           })
export class CompanyInvoicesComponent implements OnInit {
  public isLoading: boolean;
  public limit = 10;
  public temp = [];
  public selected = [];
  public invoice: Invoice;

  @ViewChild(DatatableComponent) table: DatatableComponent;

  public rows: Invoice[];

  constructor(
    private _appService: AppService,
    private _invoiceService: InvoiceService
  ) {
    _invoiceService.companyInvoices().subscribe(
      (invoices: Invoice[]) => {
        const invoicesArr = [];
        for (const invoice of invoices) {
          invoicesArr.push(new Invoice(invoice, true));
        }

        console.log(invoicesArr);
        this.rows = invoicesArr;
        this.temp = [...invoicesArr];
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

  onSelect({selected}) {
    console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  ngOnInit() {
  }

}
