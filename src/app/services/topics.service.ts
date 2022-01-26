import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TopicsService {
  // topics: [] = [];

  constructor() {
    this.getTopics();
  }

  getTopics() {
    return fetch('assets/topics.json')
      .then(response => response.json())
  }
}
