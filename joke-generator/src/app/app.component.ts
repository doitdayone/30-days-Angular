import { Component } from '@angular/core';
import { JokeComponent } from './joke/joke.component';

@Component({
  selector: 'app-root',
  imports: [JokeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
