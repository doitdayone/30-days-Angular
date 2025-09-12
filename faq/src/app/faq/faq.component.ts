import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { faqAnimations } from './faq.animations';

@Component({
  selector: 'app-faq',
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
  animations: [faqAnimations.slideToggle],
})
export class FaqComponent {
  openedIndex: number | null = null;

  faqs = [
    {
      question: 'What are Devil Fruits?',
      answer:
        'Devil Fruits are mystical fruits found in the One Piece world. Eating one grants the consumer a special power, but they lose the ability to swim.',
    },

    {
      question: "What are Luffy's powers?",
      answer:
        'Monkey D. Luffy gained the ability to stretch his body like rubber after eating the Gomu Gomu no Mi (later revealed to be the Hito Hito no Mi, Model: Nika). He uses this power in combat with unique techniques like Gear Second, Gear Third, and Gear Fifth.',
    },

    {
      question: 'What is the One Piece?',
      answer:
        'The One Piece is the legendary treasure left behind by the Pirate King, Gol D. Roger. It is said to be located at the end of the Grand Line on the island of Laugh Tale, and whoever finds it is said to become the next Pirate King.',
    },
  ];

  toggleFAQ(index: number): void {
    this.openedIndex = this.openedIndex === index ? null : index;
  }
}
