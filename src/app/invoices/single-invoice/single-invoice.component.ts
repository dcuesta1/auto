import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AppService} from '../../_services/app.service';

@Component({
             selector: 'app-single-invoice',
             templateUrl: './single-invoice.component.html',
             styleUrls: ['./single-invoice.component.css']
           })
export class SingleInvoiceComponent implements OnInit {

  public invoiceKey: string;

  constructor(private _appService: AppService, private _route: ActivatedRoute) {
    _appService.toggleLoading(false);
  }

  ngOnInit() {
    this._route.paramMap.subscribe(params => {
      this.invoiceKey = params.get('id');
    });
  }

}
