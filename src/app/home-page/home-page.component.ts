import { Component, OnInit } from '@angular/core';
import {ReceiptsService} from '../auth/shared/receipts.service';
import {Observable} from 'rxjs';
import {Post} from '../auth/shared/interfaces';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  receipts$: Observable<Post[]>

  constructor(private receiptsService: ReceiptsService) { }

  ngOnInit() {
    this.receipts$ = this.receiptsService.getAll()
  }

}
