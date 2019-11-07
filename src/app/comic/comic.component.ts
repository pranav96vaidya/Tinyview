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
  errorMsg: string;
  isPaid: boolean;
  fetchDone: boolean;
  deviceDetails: { isAndroid: boolean; isIos: boolean; };
  error: boolean;

  constructor(
    private readonly comicService: ComicService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private store: Store<AppState>,
    private location: Location) {
    }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.deviceDetails = this.getOperatingSystem();
    // console.log(this.deviceDetails.isAndroid);
    // console.log(this.deviceDetails.isIos);
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
            this.isPaid = true;
          } else {
            const imgPath = window.location.pathname;
            const index = imgPath.lastIndexOf('/');
            const comicSlug = imgPath && imgPath.substring(0, index);
            this.comicImage = `${COMIC_IMG_API}${comicSlug}/${resp.comics.image}`;
            this.chapterList = resp && resp.comics && resp.comics.panels;
            this.isPaid = false;
          }
          this.fetchDone = true;
          this.error = false;
          this.text = resp.comics.title;
          this.store.dispatch(new PostActions.EditText(this.text));
          window.scrollTo(0, 0);
        }, err => {
          this.fetchDone = true;
          this.error = true;
          this.errorMsg = 'No data found!';
        });
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  getOperatingSystem() {
    const userAgent = navigator.userAgent || navigator.vendor;
    const device = {
      isAndroid: false,
      isIos: false
    };
    if (/android/i.test(userAgent)) {
      device.isAndroid = true;
    }
    if (/iPad|iPhone|iPod/.test(userAgent)) {
      device.isIos = true;
    }
    return device;
  }
}
