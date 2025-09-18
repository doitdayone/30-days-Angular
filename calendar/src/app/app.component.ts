import { Component } from '@angular/core';
import { CalendarPageComponent } from './components/calendar-page/calendar-page.component';

@Component({
  selector: 'app-root',
  imports: [CalendarPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
