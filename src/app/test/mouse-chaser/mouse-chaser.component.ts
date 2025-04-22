import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-mouse-chaser',
  imports: [MatButtonModule, CommonModule],
  templateUrl: './mouse-chaser.component.html',
  styleUrl: './mouse-chaser.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MouseChaserComponent {
  show = false;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    document.addEventListener('mousemove', (event) => {
      const mouseX = event.clientX;
      const mouseY = event.clientY;
      const element = document.querySelector('#huy-block') as HTMLElement;

      if (element) {
        element.style.left = `${mouseX - (element.offsetWidth / 2)}px`;
        element.style.top = `${mouseY - (element.offsetHeight / 2)}px`;
      }
    })
  }

  toggleShow() {
    this.show = !this.show;
  }
}
