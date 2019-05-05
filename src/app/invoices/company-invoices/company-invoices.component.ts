import {Component, OnInit} from '@angular/core';
import {Invoice} from '../../_models/Invoice';
import {AppService} from '../../_services/app.service';
import {InvoiceService} from '../../_services/invoice.service';
import { NgbDate, NgbCalendar, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SingleInvoiceComponent } from '../single-invoice/single-invoice.component';

@Component({
  selector: 'app-company-invoices',
  templateUrl: './company-invoices.component.html',
  styleUrls: ['./company-invoices.component.css']
})

export class CompanyInvoicesComponent implements OnInit {
  public isLoading: boolean;
  public invoices = [];
  public selected: Invoice;

  // Pagination & Filter input
  public temp = [];
  public page = 1;
  public limitInput = 10;
  public statusInput = 0;
  public searchInput = '';

  public hoveredDate: NgbDate;
  public fromDate: NgbDate;
  public toDate: NgbDate;

  // Sorting Helpers
  public sortDate = 'asc';
  public sortName = 'des';
  public sortAmount = 'asc';

  // Rendered
  public outstanding = 0;
  public recentlyPaid = 0;

  constructor(
    private _appService: AppService,
    private _invoiceService: InvoiceService,
    private _modalService: NgbModal,
    public calendar: NgbCalendar
  ) {
    // this.fromDate = calendar.getToday();
    ///this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  public ngOnInit() {
    this._invoiceService.companyInvoices().subscribe(invoices => {
      for (const invoice of invoices) {
        const monthAgo = Date.now() - 2592000000;
        const parsedInvoice = invoice;//new Invoice(invoice, true)

        if (parsedInvoice.lastPaymentDate.getTime() > monthAgo) {
          for (const payment of parsedInvoice.invoicePayments) {
            if (payment.createdAt.getTime() > monthAgo) {
              this.recentlyPaid += payment.amount;
            }
          }
        }

        if (parsedInvoice.status === Invoice.PENDING_PAYMENT) {
          this.outstanding += parsedInvoice.total - parsedInvoice.amountPaid;
        }
      }

      this.invoices = invoices;
      this.temp = [...invoices];
      this._appService.toggleLoading(false);
    });
  }

  public amountSortToggle() {
    if ( this.sortAmount == 'des') {
      this.invoices.sort((a, b) => {
        if (a.total < b.total) {
          return 1;
        }

        if (a.total > b.total) {
          return -1;
        }

        return 0;
      });
      this.sortAmount = 'asc';
    } else {
      this.sortAmount = 'des';
      this.invoices.sort((a, b) => {
        if (a.total > b.total) {
          return 1;
        }

        if (a.total < b.total) {
          return -1;
        }

        return 0;
      });
    }
  }

  public dateSortToggle() {
    if (this.sortDate == 'des') {
      this.invoices.sort((a, b) => {
        if (a.createdAt.getTime() < b.createdAt.getTime()) {
          return 1;
        }

        if (a.createdAt.getTime() > b.createdAt.getTime()) {
          return -1;
        }

        return 0;
      });
      this.sortDate = 'asc';
    } else {
      this.sortDate = 'des';
      this.invoices.sort((a, b) => {
        if (a.createdAt.getTime() > b.createdAt.getTime()) {
          return 1;
        }

        if (a.createdAt.getTime() < b.createdAt.getTime()) {
          return -1;
        }

        return 0;
      });
    }
  }

  public nameSortToggle() {
    if ( this.sortName == 'des') {
      this.sortName = 'asc';
      this.invoices.sort((a, b) => a.customerName.localeCompare(b.customerName));
    } else {
      this.sortName = 'des';
      this.invoices.sort( (a, b) => {
        if (a.customerName < b.customerName) {
          return 1;
        }

        if (a.customerName > b.customerName) {
          return -1;
        }

        return 0;
      });
    }
  }

  public updateFilter(event) {
    const val = this.searchInput.toLowerCase();
    let temp = this.temp.filter((invoice) => {
      const parsedStatusFilter = parseInt(this.statusInput.toString(), 10);

      if (parsedStatusFilter == 0) {
        return (!val || invoice.customerName.toLowerCase().indexOf(val) !== -1);
      } else {
        return (parsedStatusFilter == invoice.status) && (!val || invoice.customerName.toLowerCase().indexOf(val) !== -1);
      }
    });

    this.invoices = temp;
    this.page = 1;
  }

  // Click action methods
  public openCreateInvoiceForm() {

  }

  public openInvoice(selected) {
    const modalRef = this._modalService.open(SingleInvoiceComponent);
    modalRef.componentInstance.invoice = this.invoices[selected];
  }

  public createInvoice(inputs: any) {
    this._invoiceService.saveInvoice(new Invoice(inputs)).
      subscribe(invoice => {
        this.invoices.unshift(invoice);
      });
  }

  // Date picker calendar functions
  public onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }

    console.log(this.toDate);
    console.log(this.fromDate);
  }

  public isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  public isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  public isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

  // Template helper function
  parseInt(x, y) {
    return parseInt(x, y);
  }

}
