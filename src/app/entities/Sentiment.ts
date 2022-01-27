export class Sentiment {
  positive: number;
  negative: number;
  neutral: number;

  constructor(pos: number = -1, neg: number = -1, neu: number = -1) {
    this.positive = pos;
    this.negative = neg;
    this.neutral = neu;
  }
}