import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { Topic } from '../entities/Topic';

@Directive({
  selector: '[appTopicStyle]'
})
export class TopicStyleDirective {
  @Input() topic: Topic = {
    label: '',
    sentimentScore: 0,
    volume: -1,
    level: -1
  };
  @Input() step: number = 0;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    const green: string = '#92B947';
    const red: string = '#CA413C';
    const grey: string = '#656565';

    const startingFontSize: number = 8;
    const fontIncrease: number = 4;

    // console.log(this.topic)
    if (this.topic.sentimentScore > 60) {
      this.renderer.setStyle(this.elementRef.nativeElement, 'color', green);
    } else if (this.topic.sentimentScore < 40) {
      this.renderer.setStyle(this.elementRef.nativeElement, 'color', red);
    } else {
      this.renderer.setStyle(this.elementRef.nativeElement, 'color', grey);
    }

    this.renderer.setStyle(this.elementRef.nativeElement, 'font-size', `${startingFontSize + this.topic.level * fontIncrease}px`)
  }

}
