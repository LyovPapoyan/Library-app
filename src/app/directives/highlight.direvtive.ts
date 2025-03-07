import { Directive, ElementRef, Input, Renderer2, OnChanges } from '@angular/core';

@Directive({
  selector: '[TextHighlight]',
  standalone: true,
})
export class HighlightDirective implements OnChanges {
  @Input() TextHighlight = ''; 
  @Input() search = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(): void {
    this.highlightText();
  }

  private highlightText(): void {
    const text = this.TextHighlight;
    const search = this.search.trim();

    if (!search) {
      this.renderer.setProperty(this.el.nativeElement, 'innerHTML', text);
      return;
    }

    const regex = new RegExp(`(${search})`, 'gi');
    const highlightedText = text.replace(regex, `<span style="background-color: yellow;">$1</span>`);

    this.renderer.setProperty(this.el.nativeElement, 'innerHTML', highlightedText);
  }
}
