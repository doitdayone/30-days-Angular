import { Component } from '@angular/core';
import { GuessTheNumberComponent } from './guess-the-number/guess-the-number.component';

@Component({
  selector: 'app-root',
  imports: [GuessTheNumberComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
