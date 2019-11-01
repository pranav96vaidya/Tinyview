import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Post } from '../redux/model';
import * as PostActions from '../redux/action';

interface AppState {
  post: Post;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  post: Observable<Post>;
  constructor(
    private store: Store<AppState>) {}

  ngOnInit() {
    this.post = this.store.select('post');
  }

}
