import { Component, OnInit } from '@angular/core';
import { generate } from 'rxjs';
import { Topic } from 'src/app/entities/Topic';
import { TopicsService } from 'src/app/services/topics.service';

type Position = {
  top: number;
  left: number;
};

@Component({
  selector: 'app-topic-cloud',
  templateUrl: './topic-cloud.component.html',
  styleUrls: ['./topic-cloud.component.scss']
})
export class TopicCloudComponent implements OnInit {
  topics: Array<Topic>;

  topicsReady: boolean;

  selectedTopic: Topic;

  takenTopPositions: Array<number>;
  takenLeftPositions: Array<number>;

  highestScore: number;
  lowestScore: number;

  constructor(private topicsService: TopicsService) {
    this.topics = new Array<Topic>();
    this.topicsReady = false;
    this.selectedTopic = new Topic();
    this.takenTopPositions = new Array<number>();
    this.takenLeftPositions = new Array<number>();
    this.highestScore = 0;
    this.lowestScore = 0;
  }

  ngOnInit(): void {
    this.topicsService.getTopics()
      .then(data => {
        // Pass data after transfering it to instances of class Topic
        this.topics = data.topics.map((x: Topic) => new Topic(x.label, x.volume, x.sentimentScore, x.sentiment));

        // Sort topics for further calculating (needed so the topicStyle directive can do dynamic styling)
        this.topics = this.topics.sort((a, b) => a.volume - b.volume);

        // Calculate how popular is the topic (which level)
        let counter = 0;
        let currentLevel = 1;

        let top = 0;
        let left = 0;
        const step = 90 / this.topics.length;

        // Randomize the array before setting the positions
        this.topics = this.topics.sort((a, b) => 0.5 - Math.random());

        this.topics.forEach((topic, index) => {
          if (counter === this.topics.length / 6) {
            counter = 0;
            currentLevel++;
          }
          topic.level = currentLevel;
          counter++;

          // Assign top and right, and randomize for the next topic
          topic.left = left;
          topic.top = top;

          top += step;
          left += this.generateRandom(30);
          left %= 90;

          if (index % 2 === 0) {
            left = (this.generateRandom(90));
          }
        })

        // Show it on screen (meaning fetch has returned info so the component can be rendered with assured data)
        this.topicsReady = true;
      });
  }

  /**
   * Enables the topic info to be seen by clicking on a topic in the cloud
   * @param {Topic} topic - A topic label to be clicked on in the cloud
   */
  showTopicInfo(topic: Topic) {
    this.selectedTopic = topic;
  }

  /**
   * Generates a random number up to the limit passed as the argument
   * @param {number} limit - The upper limmit for the random number
   * @returns {number} - A random number
   */
  generateRandom(limit: number) {
    return Math.floor(Math.random() * 100) % limit;
  }
}
