import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-day-card',
  imports: [CommonModule],
  templateUrl: './day-card.component.html',
  styleUrl: './day-card.component.scss',
})
export class DayCardComponent {
  @Input() day!: Date;

  constructor(private calendarService: CalendarService) {}

  getToday(): boolean {
    return this.calendarService.isToday(this.day);
  }

  getPast(): boolean {
    return this.calendarService.isPast(this.day);
  }
}
