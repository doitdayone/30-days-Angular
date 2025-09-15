import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTextTransform]',
})
export class TextTransformDirective {
  @Input() transformType: 'uppercase' | 'lowercase' | 'capitalize' =
    'uppercase';
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  private setTextTransform(text: string) {
    if (this.transformType === 'uppercase') {
      this.renderer.setProperty(
        this.el.nativeElement,
        'innerText',
        text.toUpperCase()
      );
    } else if (this.transformType === 'lowercase') {
      this.renderer.setProperty(
        this.el.nativeElement,
        'innerText',
        text.toLowerCase()
      );
    } else if (this.transformType === 'capitalize') {
      const capitalizedText = text.replace(/\b\w/g, (char) =>
        char.toUpperCase()
      );
      this.renderer.setProperty(
        this.el.nativeElement,
        'innerText',
        capitalizedText
      );
    }
  }

  ngOnInit() {
    const text = this.el.nativeElement.innerText;
    this.setTextTransform(text);
  }
}
