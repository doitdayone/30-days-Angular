import { Component } from '@angular/core';
import { ThemePickerComponent } from './components/theme-picker/theme-picker.component';
import { EmojiSearchComponent } from './components/emoji-search/emoji-search.component';

@Component({
  selector: 'app-root',
  imports: [ThemePickerComponent, EmojiSearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
