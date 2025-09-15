import { Component } from '@angular/core';
import { HoverLighlightDirective } from './directives/hover-lighlight.directive';
import { TextTransformDirective } from './directives/text-transform.directive';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { FocusOnDirective } from './directives/focus-on.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    HoverLighlightDirective,
    TextTransformDirective,
    ClickOutsideDirective,
    FocusOnDirective,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
