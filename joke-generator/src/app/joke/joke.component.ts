import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { JokeService } from '../services/joke.service';

@Component({
  selector: 'app-joke',
  imports: [CommonModule],
  templateUrl: './joke.component.html',
  styleUrl: './joke.component.scss',
})
export class JokeComponent {
  jokeSetup: string = '';
  jokePunchline: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private jokeService: JokeService) {}

  fetchJoke() {
    this.isLoading = true;
    this.errorMessage = '';
    this.jokeService.getRandomJoke().subscribe({
      next: (joke) => {
        this.jokeSetup = joke.setup;
        this.jokePunchline = joke.punchline;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to fetch joke. Please try again.';
        this.jokeSetup = '';
        this.jokePunchline = '';
        this.isLoading = false;
      },
    });
  }
}
