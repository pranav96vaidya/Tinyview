import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
const COMIC_IMG_API = `${environment.IMG_END_POINT}`;

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  @Input() comicData;
  imgUrl: string;
  navigateRoute: string;
  comicName: string;
  params: any;
  image: string;
  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.navigateRoute = this.getNavigateUrl();
    const currentPath = window.location.pathname;
    const index = currentPath.lastIndexOf('/');
    const comicSlug = currentPath && currentPath.substring(0, index);
    this.imgUrl = `${COMIC_IMG_API}${comicSlug}/${this.comicData.image}`;
  }

  public getNavigateUrl(): string {
    if (this.comicData && this.comicData.action) {
      const currentPath = window.location.pathname;
      const index = currentPath.lastIndexOf('/');
      const comicSlug = currentPath && currentPath.substring(0, index);
      const action = this.comicData.action;
      const len = action && action.lastIndexOf('.');
      const res = action && action.substring(0, len);
      return `${comicSlug}/${res}`;
    }
  }

  public navigateToRoute() {
    this.router.navigate([this.navigateRoute]);
  }

}
