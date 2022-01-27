import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { Topic } from '../entities/Topic';

@Directive({
  selector: '[appTopicStyle]'
})
export class TopicStyleDirective {
  green: string = '#92B947';
  red: string = '#CA413C';
  blue: string = '#215395';

  @Input() topic: Topic;
  @Input() step: number = 0;

  // Mouseenter effect
  @HostListener('mouseenter') mouseEnter() {
    if (this.topic.sentimentScore > 60) {
      this.renderer.setStyle(this.elementRef.nativeElement, 'border-bottom-color', this.green);
    } else if (this.topic.sentimentScore < 40) {
      this.renderer.setStyle(this.elementRef.nativeElement, 'border-bottom-color', this.red);
    } else {
      this.renderer.setStyle(this.elementRef.nativeElement, 'border-bottom-color', this.blue);
    }
  }

  // Mouseleave effect
  @HostListener('mouseleave') mouseLeave() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'border-bottom-color', 'transparent');
  }

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {
    this.topic = new Topic();
  }

  ngOnInit() {
    const startingFontSize: number = 7;
    const fontIncrease: number = 3;

    // Setting the color based on sentimentScore
    if (this.topic.sentimentScore > 60) {
      this.renderer.setStyle(this.elementRef.nativeElement, 'color', this.green);
    } else if (this.topic.sentimentScore < 40) {
      this.renderer.setStyle(this.elementRef.nativeElement, 'color', this.red);
    } else {
      this.renderer.setStyle(this.elementRef.nativeElement, 'color', this.blue);
    }

    // Setting the font-size based on the popularity
    this.renderer.setStyle(this.elementRef.nativeElement, 'font-size', `${startingFontSize + this.topic.level * fontIncrease}px`)

    // Setting the position based on random numbers stored in top and left properties
    this.renderer.setStyle(this.elementRef.nativeElement, 'top', `${this.topic.top}%`)
    this.renderer.setStyle(this.elementRef.nativeElement, 'left', `${this.topic.left}%`)
  }
}
