import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnWindowScroll]'
})
export class OnWindowScrollDirective {

  @HostListener('window:scroll', ['$event']) onWindowScroll() {
    let element = document.querySelector('.navbar') as HTMLElement;
    if (window.pageYOffset > element.clientHeight) {
      element.classList.add('scrolled');
    } else {
      element.classList.remove('scrolled');
    }
  }

}
