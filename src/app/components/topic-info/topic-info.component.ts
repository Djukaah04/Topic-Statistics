import { Component, Input, OnInit } from '@angular/core';
import { Topic } from 'src/app/entities/Topic';

@Component({
  selector: 'app-topic-info',
  templateUrl: './topic-info.component.html',
  styleUrls: ['./topic-info.component.scss']
})
export class TopicInfoComponent implements OnInit {
  @Input() topic: Topic = new Topic();

  constructor() { }

  ngOnInit(): void {
  }
}
