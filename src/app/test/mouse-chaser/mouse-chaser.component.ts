import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { timer } from 'rxjs';

class MouseClass {
  left: number;
  top: number;
  elem: HTMLElement

  constructor(left: number, top: number, elem: HTMLElement) {
    this.left = left;
    this.top = top;
    this.elem = elem
  }
}


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

  @ViewChild('mouseBlock', { static: false })
  mouseBlock: ElementRef | null = null;

  @ViewChild('squareBlock', { static: false })
  squareBlock: ElementRef | null = null;

  animationDelay = 100;

  queue: MouseClass[] = [];
  isMoving = false;
  firstMove = true;

  movingInterval = 1;

  cloneColor = '#81ffc5'

  intervalIsOn = false;

  constructor(
    protected elementRef: ElementRef,
  ) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    document.addEventListener('mousemove', (event) => {
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      if (this.mouseBlock) {
        this.mouseBlock.nativeElement.style.left = `${mouseX - (this.mouseBlock.nativeElement.offsetWidth / 2)}px`;
        this.mouseBlock.nativeElement.style.top = `${mouseY - (this.mouseBlock.nativeElement.offsetHeight / 2)}px`;
      }
    })

    document.addEventListener('mousedown', (event) => {
      this.mouseHolds = true;
      this.holdMouse();
    })
    document.addEventListener('mouseup', (event) => {
      this.mouseHolds = false;
    })
  }

  holdMouse() {
    if (!this.mouseHolds) return;


    const mouseX = this.mouseBlock?.nativeElement.offsetLeft + (this.mouseBlock?.nativeElement.offsetWidth / 2);
    const mouseY = this.mouseBlock?.nativeElement.offsetTop + (this.mouseBlock?.nativeElement.offsetHeight / 2);

    const clone = this.mouseBlock?.nativeElement.cloneNode(true) as HTMLElement;
    clone.style.backgroundColor = this.getRandomHexColor();
    clone.style.zIndex = '1000';
    this.elementRef.nativeElement.appendChild(clone);

    this.queue.push(new MouseClass(mouseX, mouseY, clone));


    if (!this.isMoving) {
      this.updatePos();
    }

    if (this.intervalIsOn) {
      setTimeout(() => {
        this.holdMouse();
      }, this.movingInterval);
    }
  }

  updatePos() {
    if (this.queue?.length === 0) {
      this.isMoving = false;
      return;
    }

    this.isMoving = true;
    let shiftedElem = this.queue?.shift(); // get the first element

    const delay = this.firstMove ? 0 : this.animationDelay;

    setTimeout(() => {
      this.firstMove = false;

      if (this.squareBlock && shiftedElem) {
        this.squareBlock.nativeElement.style.left = `${shiftedElem.left - (this.squareBlock.nativeElement.offsetWidth / 2)}px`;
        this.squareBlock.nativeElement.style.top = `${shiftedElem.top - (this.squareBlock.nativeElement.offsetHeight / 2)}px`;
      }


      setTimeout(() => {
        this.updatePos()

        if (shiftedElem) {
          shiftedElem.elem.remove()
        }

      }, this.animationDelay / 2);
    }, delay / 2);
  }


  toggleShow() {
    this.show = !this.show;
  }

  getRandomHexColor() {
    const hex = Math.floor(Math.random() * 0xffffff).toString(16);
    return `#${hex.padStart(6, '0')}`;
  }


}
