import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../../auth/shared/interfaces';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent implements OnInit {

  @Input() receipt: Post

  constructor() { }

  ngOnInit() {
  }

}
