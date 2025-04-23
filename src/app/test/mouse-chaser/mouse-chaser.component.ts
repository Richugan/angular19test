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
  mouseHolds = false;
  
  mouseBlock: HTMLElement | null = null;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    document.addEventListener('mousemove', (event) => {
      const mouseX = event.clientX;
      const mouseY = event.clientY;
      this.mouseBlock = document.querySelector('#mouse-block') as HTMLElement;

      if (this.mouseBlock) {
        this.mouseBlock.style.left = `${mouseX - (this.mouseBlock.offsetWidth / 2)}px`;
        this.mouseBlock.style.top = `${mouseY - (this.mouseBlock.offsetHeight / 2)}px`;
      }
    })

    // document.addEventListener('click', (event) => {
    //   const mouseX = event.clientX;
    //   const mouseY = event.clientY;
    //   const element = document.querySelector('#square-block') as HTMLElement;

    //   if (element) {
    //     element.style.left = `${mouseX - (element.offsetWidth / 2)}px`;
    //     element.style.top = `${mouseY - (element.offsetHeight / 2)}px`;
    //   }
    // })

    document.addEventListener('mousedown', (event) => {
      this.mouseHolds = true;
      this.holdMouse(event);
    })
    document.addEventListener('mouseup', (event) => {
      this.mouseHolds = false;
    })
  }

  holdMouse(event: MouseEvent) {
    if(!this.mouseHolds) return;
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const element = document.querySelector('#square-block') as HTMLElement;

    // if (element) {
    //   element.style.left = `${mouseX - (element.offsetWidth / 2)}px`;
    //   element.style.top = `${mouseY - (element.offsetHeight / 2)}px`;
    // }

    if (element && this.mouseBlock) {
      element.style.left = `${this.mouseBlock.offsetLeft}px`;
      element.style.top = `${this.mouseBlock.offsetTop}px`;
    }
    

    // console.log(this.mouseBlock?.offsetTop, this.mouseBlock?.offsetLeft);
    setTimeout(() => this.holdMouse(event), 1);

  }

  toggleShow() {
    this.show = !this.show;
  }

  
}
