import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DayCardComponent } from '../day-card/day-card.component';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-calendar-page',
  imports: [CommonModule, DayCardComponent],
  templateUrl: './calendar-page.component.html',
  styleUrl: './calendar-page.component.scss',
})
export class CalendarPageComponent implements OnInit {
  days: Date[] = [];
  currentMonth: number = new Date().getMonth();
  currentYear: number = new Date().getFullYear();

  constructor(private calendarService: CalendarService) {}

  loadMonth(year: number, month: number) {
    this.days = this.calendarService.getDaysInMonth(year, month);
  }

  ngOnInit() {
    this.loadMonth(this.currentYear, this.currentMonth);
  }

  nextMonth() {
    const { newYear, newMonth } = this.calendarService.nextMonth(
      this.currentYear,
      this.currentMonth
    );
    this.currentYear = newYear;
    this.currentMonth = newMonth;
    this.loadMonth(this.currentYear, this.currentMonth);
  }

  previousMonth() {
    const { newYear, newMonth } = this.calendarService.previousMonth(
      this.currentYear,
      this.currentMonth
    );
    this.currentYear = newYear;
    this.currentMonth = newMonth;
    this.loadMonth(this.currentYear, this.currentMonth);
  }

  getMonthAndYear(): string {
    const date = new Date(this.currentYear, this.currentMonth, 1);
    return date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  }
}
