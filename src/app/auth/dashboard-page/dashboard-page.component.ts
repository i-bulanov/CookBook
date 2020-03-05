import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import {ReceiptsService} from '../shared/receipts.service';
import {Post} from '../shared/interfaces';
import {Subscription} from 'rxjs';
import {AlertService} from '../shared/services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[] = []
  pSub: Subscription
  dSub: Subscription
  searchStr = ''

  constructor(private receiptsService: ReceiptsService,
              private alert: AlertService) { }

  ngOnInit() {
    this.pSub = this.receiptsService.getAll().subscribe( posts => {
      this.posts = posts
    })
  }

  ngOnDestroy() {
    if (this.pSub) {
    this.pSub.unsubscribe()
    }

    if (this.dSub) {
      this.dSub.unsubscribe()
    }
  }


  remove(id: string) {
    this.dSub = this.receiptsService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id)
      this.alert.danger('Receipt was deleted')
    })
  }
}
