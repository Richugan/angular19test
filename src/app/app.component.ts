import { Component } from '@angular/core';
import { MouseChaserComponent } from "./test/mouse-chaser/mouse-chaser.component";
import { AimTrainerComponent } from "./test/aim-trainer/aim-trainer.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    MouseChaserComponent
    
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-dev-project';
}
