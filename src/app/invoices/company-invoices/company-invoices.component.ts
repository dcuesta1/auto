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
  public dateFilter = 'all time';

  // Sorting Helpers
  public sortDate = 'asc';
  public sortName = 'des';
  public sortAmount = 'asc';

  // Rendered stats
  public outstanding = 0;
  public invoicesLastThirtyDays = 0;
  public outstandingInvoices = 0;
  public totalInvoicedLastThirtyDays = 0;

  constructor(
    private _appService: AppService,
    private _invoiceService: InvoiceService,
    private _modalService: NgbModal,
    public calendar: NgbCalendar
  ) {
    this._invoiceService.companyInvoices().subscribe(invoices => {
      for (const invoice of invoices) {
        const monthAgo = Date.now() - 2592000000; // 30 days
        const parsedInvoice = invoice;//new Invoice(invoice, true)

        if (parsedInvoice.createdAt.getTime() > monthAgo) {
            this.invoicesLastThirtyDays++
            this.totalInvoicedLastThirtyDays += parsedInvoice.total;
        }

        if (parsedInvoice.status === Invoice.PENDING_PAYMENT) {
          this.outstandingInvoices++;
          this.outstanding += parsedInvoice.total - parsedInvoice.amountPaid;
        }
      }

      this.invoices = invoices;
      this.temp = [...invoices];
      this._appService.toggleLoading(false);
    });
  }

  // TODO: clean up sorting functions
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
      const yearModel = `${invoice.vehicle.year} ${invoice.vehicle.model}`;
      const now = new Date();
      let fromDate = new Date(1994, 5, 31); // hack
      let toDate = new Date(now.getFullYear() + 1, 1, 12);

      if (this.fromDate) {
        fromDate = new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day);
        toDate = this.toDate ? new Date(this.toDate.year, this.toDate.month - 1, this.toDate.day) : null ;
      }

      // Check: can we compress or make it easier to read without making big blocks;
      return (!val || invoice.customerName.toLowerCase().indexOf(val) !== -1 ||
          invoice.number.toLowerCase().indexOf(val) !== -1  ||
          yearModel.toLowerCase().indexOf(val) !== -1) &&
        ( (toDate &&
          fromDate.getTime() <= invoice.createdAt.getTime() &&
          invoice.createdAt.getTime() <= toDate.getTime() ) ||
        ( !toDate &&
          (fromDate.getFullYear() == invoice.createdAt.getFullYear() &&
          fromDate.getMonth() == invoice.createdAt.getMonth() &&
          fromDate.getDate() == invoice.createdAt.getDate())
        )) &&
        ( parsedStatusFilter == 0 || parsedStatusFilter == invoice.status);
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

    this.updateFilter(1);
    this.dateFilter = `${this.fromDate.day}/${this.fromDate.month}/${this.fromDate.year} `;
    this.dateFilter += this.toDate ? `- ${this.toDate.day}/${this.toDate.month}/${this.toDate.year}` : '';
  }

  public datepickerFilter(filter: string) {
    this.dateFilter = filter;
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const lastDayInMonth = new Date(year, month + 1, 0).getDate();
    const day = today.getDay(); // 0-6 sun-sat

    switch ( filter ) {
      case 'all time' :
        this.fromDate = null;
        this.toDate = null;
        break;
      case 'this week':
        let lastDayOfWeek = ( (6+1) - day) + today.getDate();
        let toMonth = month;
        if (lastDayOfWeek > lastDayInMonth ) {
          lastDayOfWeek = lastDayOfWeek - lastDayInMonth;
          toMonth = month + 1;
        }

        let firstDayOfWeek = today.getDate() - (day - 1);
        let fromMonth = month;
        if (firstDayOfWeek <= 0) {
          const lastDayOfPrevMonth = new Date(year, month -1, 0).getDate();
          firstDayOfWeek = lastDayOfPrevMonth + firstDayOfWeek;
          fromMonth = month - 1;
        }

        this.toDate = new NgbDate(year, toMonth, lastDayOfWeek);
        this.fromDate = new NgbDate(year, fromMonth, firstDayOfWeek);
        break;
      case 'this month':
        this.toDate = new NgbDate(year, month, lastDayInMonth);
        this.fromDate = new NgbDate(year, month, 1);
        break;
      case 'this year':
        this.toDate = new NgbDate(year, 12, 31);
        this.fromDate = new NgbDate(year, 1, 1);
        break;
      case 'last year':
        this.toDate = new NgbDate(year-1, 12, 31);
        this.fromDate = new NgbDate(year-1, 1, 1);
        break;
    }

    this.updateFilter(1);
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

  public ngOnInit() { }
}
