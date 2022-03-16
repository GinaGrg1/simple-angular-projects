import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appFavorite]'
})
export class FavoriteDirective {

  constructor() { }

  // The class in this string is referring to a native DOM property available on elements.
  // This is the same as : [appFavorite]="isFavorite"
  // HostListener('click') myClick(){ } is exactly the same as (click)="myClick()"
  // This will be favorite.is-favorite
  @HostBinding('class.is-favorite') isFavorite = true;
  @HostBinding('class.is-favorite-hovering') hovering = false;
  @HostListener('mouseenter') onMouseEnter() {
    this.hovering = true;
  }
  @HostListener('mouseleave') onMouseLeave(){
    this.hovering = false;
  }

  @Input() set appFavorite(value) {
    this.isFavorite = value;
  }

}
