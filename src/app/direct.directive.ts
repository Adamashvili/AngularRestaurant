import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
    selector: '[navBtn]',
    standalone: false
})
export class DirectDirective {
  constructor() {}

  @HostBinding('style.transform') public scrollnav =
    'rgb(25, 11, 2, 0.6)';

  @HostListener('window:scroll', ) scrolling() {
    if (window.scrollY >= 300) {
      this.scrollnav = 'translate(80px, -150px) rotate(90deg)';
    } else {
      this.scrollnav = 'rotate(90deg) translate(40px, -45px)';
    }
  }
}
