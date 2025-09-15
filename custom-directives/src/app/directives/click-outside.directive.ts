import { Directive, ElementRef, Host, HostListener } from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
})
export class ClickOutsideDirective {
  constructor(private el: ElementRef) {}

  @HostListener('document:click', ['$event']) onClick(even: Event) {
    if (this.el.nativeElement.contains(even.target)) {
      console.log('Clicked inside the element!');
    } else {
      console.log('Clicked outside the element!');
    }
  }
}
