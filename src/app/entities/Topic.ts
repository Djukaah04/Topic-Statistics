import { Sentiment } from "./Sentiment";

export class Topic {
  label: string;
  sentimentScore: number;
  sentiment: Sentiment;
  volume: number;
  level: number;
  top: number;
  left: number;

  constructor(
    lab: string = '',
    vol: number = -1,
    score: number = -1,
    sent: Sentiment = new Sentiment(),
    top: number = -1,
    left: number = -1) {
    this.label = lab;
    this.volume = vol;
    this.sentimentScore = score;
    this.sentiment = sent;
    this.level = -1;
    this.top = top;
    this.left = left;
  }
}