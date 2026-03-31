import { Component, CUSTOM_ELEMENTS_SCHEMA, signal, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

export interface Category {
  id: string;
  label: string;
  emoji: string;
  gradient: string;
  glow: string;
  tag: string;
  items: string[];
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class App {
  readonly categories: Category[] = [
    {
      id: 'fruits',
      label: 'Fruits',
      emoji: '🍉',
      gradient: 'linear-gradient(135deg, #f9484a 0%, #fbd85d 100%)',
      glow: '#f9484a',
      tag: 'Sweet & Juicy',
      items: [
        'Apple',
        'Orange',
        'Lemon',
        'Grapes',
        'Strawberry',
        'Watermelon',
        'Mango',
        'Pineapple',
      ],
    },
    {
      id: 'vegetables',
      label: 'Vegetables',
      emoji: '🥦',
      gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
      glow: '#11998e',
      tag: 'Fresh & Green',
      items: ['Broccoli', 'Carrot', 'Eggplant', 'Corn', 'Cucumber', 'Onion', 'Tomato', 'Lettuce'],
    },
    {
      id: 'planets',
      label: 'Planets',
      emoji: '🪐',
      gradient: 'linear-gradient(135deg, #4776e6 0%, #8e54e9 100%)',
      glow: '#8e54e9',
      tag: 'Out of This World',
      items: ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'],
    },
    {
      id: 'sports',
      label: 'Sports',
      emoji: '⚽',
      gradient: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
      glow: '#f7971e',
      tag: 'Play Hard',
      items: [
        'Football',
        'Basketball',
        'Tennis',
        'Cricket',
        'Swimming',
        'Cycling',
        'Boxing',
        'Volleyball',
      ],
    },
    {
      id: 'animals',
      label: 'Animals',
      emoji: '🐯',
      gradient: 'linear-gradient(135deg, #ee9ca7 0%, #ffdde1 100%)',
      glow: '#ee9ca7',
      tag: 'Wild Kingdom',
      items: ['Lion', 'Tiger', 'Elephant', 'Giraffe', 'Dolphin', 'Eagle', 'Panda', 'Fox'],
    },
  ];

  readonly selected = signal<Category>(this.categories[0]);

  readonly itemsJson = computed(() => JSON.stringify(this.selected().items));

  readonly pickerTitle = computed(() => `${this.selected().label} Lucky Draw`);

  select(cat: Category): void {
    this.selected.set(cat);
  }

  isActive(cat: Category): boolean {
    return this.selected().id === cat.id;
  }
}
