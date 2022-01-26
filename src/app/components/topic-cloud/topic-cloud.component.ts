import { Component, OnInit } from '@angular/core';
import { Topic } from 'src/app/entities/Topic';
import { TopicsService } from 'src/app/services/topics.service';

@Component({
  selector: 'app-topic-cloud',
  templateUrl: './topic-cloud.component.html',
  styleUrls: ['./topic-cloud.component.scss']
})
export class TopicCloudComponent implements OnInit {
  // topics: { label: string, sentimentScore: number, volume: number }[] = [];
  topics: Array<Topic> = new Array<Topic>();
  topicsReady: boolean = false;
  highestScore: number = 0;
  lowestScore: number = 0;

  constructor(private topicsService: TopicsService) { }

  ngOnInit(): void {
    // this.topicsService.getTopics();
    this.topicsService.getTopics()
      .then(data => {
        // Pass data after transfering it to instances of class Topic
        this.topics = data.topics.map((x: { label: string, sentimentScore: number, volume: number; }) => new Topic(x.label, x.volume, x.sentimentScore));

        // Sort topics for further calculating (needed so the topicStyle directive can do dynamic styling)
        this.topics = this.topics.sort((a, b) => a.volume - b.volume);

        // Calculate how popular is the topic (which level)
        let counter = 0;
        let currentLevel = 1;
        this.topics.forEach((topic, index) => {
          if (counter === this.topics.length / 6) {
            counter = 0;
            currentLevel++;
          }
          topic.level = currentLevel;
          counter++;
        })

        // Show it on screen (meaning fetch has returned info so the component can be rendered with assured data)
        this.topicsReady = true;


        // const topAndBottomLimits = this.findMostAndLeastPopular();

        // const highest = topAndBottomLimits.highest;
        // const lowest = topAndBottomLimits.lowest;
        // // this.level = (highest - lowest) / 6;

      });
  }

  findMostAndLeastPopular() {
    let arrayOfScores: number[] = [];
    this.topics.forEach((topic, index) => {
      arrayOfScores.push(topic.volume);
    })
    const result = {
      highest: Math.max(...arrayOfScores),
      lowest: Math.min(...arrayOfScores)
    }
    return result
  }

  showTopicInfo() {
    console.log('caca')
  }


}
