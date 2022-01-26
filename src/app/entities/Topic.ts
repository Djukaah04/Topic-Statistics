export class Topic {
  label: string = '';
  sentimentScore: number = 0;
  volume: number = -1;
  level: number = -1;

  constructor(lab: string, vol: number, sent: number) {
    this.label = lab;
    this.volume = vol;
    this.sentimentScore = sent;
  }
}