import { Directive, Input, ElementRef, Renderer2, OnInit } from '@angular/core';
import 'lazysizes/plugins/unveilhooks/ls.unveilhooks';
import { lazySizes } from 'lazysizes';
@Directive({
  selector: '[lazyload]',
  exportAs: 'lazyload'
})
export class LazyLoadDirective implements OnInit {
  public tempImage = '../../assets/images/placeholder-img.jpg';
  @Input('lazyload') imgSrc: string;
  public img;
  constructor(private el: ElementRef, private renderer: Renderer2) {          }

  ngOnInit() {
    this.img = `${this.imgSrc}`;
    this.initLazyLoading();
    this.setAttributes();
  }
  initLazyLoading() {
    if (lazySizes) {
      lazySizes.init();
    }
  }
  setAttributes() {
    this.renderer.addClass(this.el.nativeElement, 'lazyload');
    if (this.el.nativeElement.localName === 'img') {
      this.setImgSrc();
    } else {
      this.setElementBackgroundImage();
    }
  }
  setImgSrc() {
    this.renderer.setAttribute(this.el.nativeElement, 'data-src', this.img);
    this.renderer.setAttribute(this.el.nativeElement, 'src', this.tempImage);
  }
  setElementBackgroundImage() {
    this.renderer.setAttribute(this.el.nativeElement, 'data-bg', this.img);
    this.renderer.setStyle(this.el.nativeElement, 'background-image', `url(${this.tempImage})`);
  }
}
