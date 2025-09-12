import { Component } from '@angular/core';
import { FaqComponent } from './faq/faq.component';

@Component({
  selector: 'app-root',
  imports: [FaqComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
