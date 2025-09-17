import { Component } from '@angular/core';

@Component({
  selector: 'app-theme-picker',
  imports: [],
  templateUrl: './theme-picker.component.html',
  styleUrl: './theme-picker.component.scss',
})
export class ThemePickerComponent {
  setTheme(theme: 'light' | 'dark' | 'gradient' | 'matcha' | 'rainbow') {
    if (theme === 'dark') {
      document.body.classList.remove(
        'light-theme',
        'gradient-theme',
        'matcha-theme',
        'rainbow-theme'
      );
      document.body.classList.add('dark-theme');
    } else if (theme === 'light') {
      document.body.classList.remove(
        'dark-theme',
        'gradient-theme',
        'matcha-theme',
        'rainbow-theme'
      );
      document.body.classList.add('light-theme');
    } else if (theme === 'gradient') {
      document.body.classList.remove(
        'dark-theme',
        'light-theme',
        'matcha-theme',
        'rainbow-theme'
      );
      document.body.classList.add('gradient-theme');
    } else if (theme === 'matcha') {
      document.body.classList.remove(
        'dark-theme',
        'light-theme',
        'gradient-theme',
        'rainbow-theme'
      );
      document.body.classList.add('matcha-theme');
    } else if (theme === 'rainbow') {
      document.body.classList.remove(
        'dark-theme',
        'light-theme',
        'gradient-theme',
        'matcha-theme'
      );
      document.body.classList.add('rainbow-theme');
    }
  }
}
