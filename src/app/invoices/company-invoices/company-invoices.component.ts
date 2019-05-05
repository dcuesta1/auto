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
  public statusInput = 0;
  public searchInput = '';

  @ViewChild(DatatableComponent) table: DatatableComponent;

  public rows: Invoice[];

  constructor(
    private _appService: AppService,
    private _invoiceService: InvoiceService,
  ) {

    this._invoiceService.companyInvoices()
      .subscribe( (invoices) => {
        const invoicesArr = [];
        for (const invoice of invoices) {
          invoicesArr.push(new Invoice(invoice, true));
        }

        this.rows = invoicesArr;
        this.temp = [...invoicesArr];
        this._appService.toggleLoading(false);
      });
  }

  createInvoice(inputs: any) {
    this._invoiceService.saveInvoice( new Invoice(inputs) ).
    subscribe( invoice => {
      this.rows.unshift(invoice);
    });
  }

  updateFilter(event) {
    const val = this.searchInput.toLowerCase();
    let temp = this.temp.filter((invoice) => {

      // the type number is lost after value is changed.
      const parsedStatusFilter = parseInt(this.statusInput.toString(), 10);
      console.log(parsedStatusFilter);
      if (parsedStatusFilter == 0) {
        return (!val || invoice.name.toLowerCase().indexOf(val) !== -1);
      } else {
        return (parsedStatusFilter == invoice.statusNumber) && (invoice.name.toLowerCase().indexOf(val) !== -1);
      }
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
