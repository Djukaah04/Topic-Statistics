import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TopicsService {
  constructor() {
    this.getTopics();
  }

  // Returns our topics data
  getTopics() {
    return fetch('assets/topics.json')
      .then(response => response.json())
  }
}
