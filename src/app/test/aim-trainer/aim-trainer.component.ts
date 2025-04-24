import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-aim-trainer',
  imports: [
    CommonModule
  ],
  templateUrl: './aim-trainer.component.html',
  styleUrls: ['./aim-trainer.component.css']
})
export class AimTrainerComponent implements OnInit, OnDestroy {
  roundTime = 5;

  score = 0;
  timeLeft = this.roundTime;
  gameStarted = false;
  targetX = 0;
  targetY = 0;
  private timerId: any;

  ngOnInit(): void {
    this.setRandomPosition();
  }

  ngOnDestroy(): void {
    clearInterval(this.timerId);
  }

  startGame(): void {
    this.score = 0;
    this.timeLeft = this.roundTime;

    this.gameStarted = true;
    this.setRandomPosition();
    this.timerId = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft <= 0) {
        this.gameStarted = false;
        clearInterval(this.timerId);
      }
    }, 1000);
  }

  onTargetClick(): void {
    if (!this.gameStarted) return;
    this.score++;
    this.setRandomPosition();
  }

  private setRandomPosition(): void {
    const size = 50;
    this.targetX = Math.floor(Math.random() * (window.innerWidth - size));
    this.targetY = Math.floor(Math.random() * (window.innerHeight - size));
  }
}
