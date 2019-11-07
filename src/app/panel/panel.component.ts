import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ComicService } from '../services/comic.service';
import { Store } from '@ngrx/store';
import { Post } from '../redux/model';
import * as PostActions from '../redux/action';

interface AppState {
  post: Post;
}

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  comicList: {};
  text: string;
  errorMsg: string;

  constructor(
    private readonly comicService: ComicService,
    private readonly router: Router,
    private store: Store<AppState>) {}

  ngOnInit() {
    window.scrollTo(0, 0);
    this.store.dispatch({type: 'panelPage'});
    this.comicService.getComicList()
      .subscribe(resp => {
        this.text = resp.comics.title;
        this.store.dispatch(new PostActions.EditText(this.text));
        this.comicList = resp.comics.panels;
      }, err => {
        this.errorMsg = 'No Data Found!';
      });
  }

}
