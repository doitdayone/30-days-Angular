import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CLOCK_CONSTANTS as cc } from './constants';
import { TimeService } from '../services/time.service';
//import { MockTimeService as TimeService } from '../services/mock-time.service';

@Component({
  selector: 'app-clock',
  imports: [CommonModule],
  templateUrl: './clock.component.html',
  styleUrl: './clock.component.scss',
})
export class ClockComponent implements OnInit {
  // Rotation angles
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  clockNumbers = this.generateClockNumbers();

  generateClockNumbers() {
    const numbers = [];
    const centerOffset = cc.CENTER_OFFSET;
    const radius = cc.RADIUS;

    for (let n = 1; n <= cc.HOURS_ON_CLOCK; n++) {
      const angle = (n - 3) * cc.DEGREES_PER_HOUR * cc.DEG_TO_RAD;
      const top = centerOffset + radius * Math.sin(angle);
      const left = centerOffset + radius * Math.cos(angle);
      numbers.push({
        number: n,
        position: { top: `${top}%`, left: `${left}%` },
        angle: n * cc.DEGREES_PER_HOUR,
      });
    }
    return numbers;
  }

  constructor(private timeService: TimeService) {}

  ngOnInit() {
    this.updateClock();
    setInterval(() => this.updateClock(), 1000);
  }

  updateClock() {
    const now = this.timeService.getCurrentTime();
    this.hours =
      (now.getHours() % 12) * cc.DEGREES_PER_HOUR +
      now.getMinutes() * cc.MINUTE_ADJUSTMENT +
      cc.OFFSET_ROTATION;
    this.minutes =
      now.getMinutes() * cc.DEGREES_PER_MINUTE_SECOND +
      now.getSeconds() * cc.SECOND_ADJUSTMENT +
      cc.OFFSET_ROTATION;
    this.seconds =
      now.getSeconds() * cc.DEGREES_PER_MINUTE_SECOND + cc.OFFSET_ROTATION;
  }

  toRoman(num: number): string {
    const romans: [string, number][] = [
      ['X', 10],
      ['IX', 9],
      ['VIII', 8],
      ['VII', 7],
      ['VI', 6],
      ['V', 5],
      ['IV', 4],
      ['III', 3],
      ['II', 2],
      ['I', 1],
    ];
    let result = '';
    for (let [roman, value] of romans) {
      while (num >= value) {
        result += roman;
        num -= value;
      }
    }
    return result;
  }
}
