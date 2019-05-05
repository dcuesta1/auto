import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../_services/app.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Invoice } from '../../_models/Invoice';


@Component({
  selector: 'app-single-invoice',
  templateUrl: './single-invoice.component.html',
  styleUrls: ['./single-invoice.component.css']
})
export class SingleInvoiceComponent implements OnInit {

  @Input() invoice: Invoice;

  constructor(
    private _appService: AppService,
    private _route: ActivatedRoute,
    public activeModal: NgbActiveModal
    ) {}

  ngOnInit() {}

}
