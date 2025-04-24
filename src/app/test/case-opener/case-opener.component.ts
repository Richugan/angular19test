import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, type OnInit } from '@angular/core';

export interface Item {
  name: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  color: string;
}

@Component({
  selector: 'app-case-opener',
  imports: [CommonModule],
  templateUrl: './case-opener.component.html',
  styleUrl: './case-opener.component.css',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaseOpenerComponent implements OnInit {
  constructor(private cdr: ChangeDetectorRef) { }
  items: Item[] = [
    { name: 'Glock-18 | Candy Apple', rarity: 'common', color: 'bg-gray-500' },
    { name: 'P90 | Elite Build', rarity: 'rare', color: 'bg-blue-500' },
    { name: 'AWP | Asiimov', rarity: 'epic', color: 'bg-purple-500' },
    { name: 'AK-47 | Redline', rarity: 'epic', color: 'bg-purple-700' },
    { name: 'USP-S | Kill Confirmed', rarity: 'legendary', color: 'bg-yellow-400' },
  ];

  rollingItems: Item[] = [];
  isRolling = false;
  selectedItem: Item | null = null;
  centerIndex: number = 25; // Default center for prize in the list of rolling items

  // Open Case function that handles rolling and selecting the final prize
  openCase() {
    if (this.isRolling) return;

    this.isRolling = true;
    this.selectedItem = null;

    // Generate a list of 50 random items for rolling
    const fullRoll = Array.from({ length: 50 }, () =>
      this.items[Math.floor(Math.random() * this.items.length)]
    );

    // Choose a random item as the winning prize and put it in the center
    const winningItem = this.items[Math.floor(Math.random() * this.items.length)];
    fullRoll[this.centerIndex] = winningItem;

    // Update rollingItems array to simulate the roll
    this.rollingItems = fullRoll;

    // After 3.5 seconds, stop the rolling animation and show the selected prize
    setTimeout(() => {
      this.selectedItem = winningItem;
      this.isRolling = false;
      this.cdr.detectChanges()
    }, 3500);
  }

  ngOnInit(): void {

  }
}
