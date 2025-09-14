import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MockTimeService {
  private mockDate: Date = new Date();
  constructor() {
    this.mockDate.setHours(10, 10, 30); // Set a fixed time: 10:10:30
  }

  getCurrentTime(): Date {
    return this.mockDate;
  }
}
