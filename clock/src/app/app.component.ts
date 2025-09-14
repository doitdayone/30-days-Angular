import { Component } from '@angular/core';
import { ClockComponent } from './clock/clock.component';

@Component({
  selector: 'app-root',
  imports: [ClockComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
