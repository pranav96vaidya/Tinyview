import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComicService } from '../services/comic.service';
import { Store } from '@ngrx/store';
import { Post } from '../redux/model';
import * as PostActions from '../redux/action';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
const COMIC_IMG_API = `${environment.IMG_END_POINT}`;

interface AppState {
  post: Post;
}

@Component({
  selector: 'app-comic',
  templateUrl: './comic.component.html',
  styleUrls: ['./comic.component.scss']
})
export class ComicComponent implements OnInit, OnDestroy {
  chapterList: any;
  actionUrl: string;
  text: string;
  userSubscription: Subscription;
  comicImage: any;

  constructor(
    private readonly comicService: ComicService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private store: Store<AppState>,
    private location: Location) {
    }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.userSubscription = this.route.url.subscribe(url => {
      const currentPath = window.location.pathname;
      this.comicService.getComicChapters(currentPath)
        .subscribe(resp => {
          const inAppProducts = resp && resp.comics && resp.comics.inAppProducts;
          if (inAppProducts) {
            const imgPath = window.location.pathname;
            const index = imgPath.lastIndexOf('/');
            const comicSlug = imgPath && imgPath.substring(0, index);
            this.comicImage = `${COMIC_IMG_API}${comicSlug}/${resp.comics.image}`;
            this.chapterList = null;
          } else {
            this.chapterList = resp && resp.comics && resp.comics.panels;
            this.comicImage = null;
          }
          this.text = resp.comics.title;
          this.store.dispatch(new PostActions.EditText(this.text));
          window.scrollTo(0, 0);
        });
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
