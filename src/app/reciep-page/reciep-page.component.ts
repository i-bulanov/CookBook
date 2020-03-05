import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {ReceiptsService} from '../auth/shared/receipts.service';
import {Observable} from 'rxjs';
import {Post} from '../auth/shared/interfaces';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-reciep-page',
  templateUrl: './reciep-page.component.html',
  styleUrls: ['./reciep-page.component.scss']
})
export class ReciepPageComponent implements OnInit {

  receipt$: Observable<Post>

  constructor(private route: ActivatedRoute,
              private receiptService: ReceiptsService) { }

  ngOnInit() {
    this.receipt$ = this.route.params
      .pipe(switchMap((params: Params) => {
        return this.receiptService.getById(params.id)
      }))
  }

}
