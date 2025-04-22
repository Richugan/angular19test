import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-mouse-chaser',
  imports: [],
  templateUrl: './mouse-chaser.component.html',
  styleUrl: './mouse-chaser.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MouseChaserComponent { }
