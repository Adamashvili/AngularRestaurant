import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
    selector: '[navOpacity]',
    standalone: false
})
export class DirectDirective {
  constructor() {}

  @HostBinding('style.backgroundColor') public scrollnav =
    'rgb(25, 11, 2, 0.6)';

  @HostListener('window:scroll', ['$event']) scrolling($event: any) {
    if (window.scrollY >= 290) {
      this.scrollnav = 'rgb(25, 11, 2, 1)';
    } else {
      this.scrollnav = 'rgb(25, 11, 2, 0.6)';
    }
  }
}
