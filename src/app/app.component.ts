import { Component } from '@angular/core';
import { MouseChaserComponent } from "./test/mouse-chaser/mouse-chaser.component";
import { AimTrainerComponent } from "./test/aim-trainer/aim-trainer.component";
import { CommonModule } from '@angular/common';
import { CaseOpenerComponent } from "./test/case-opener/case-opener.component";

@Component({
  selector: 'app-root',
  imports: [
    // MouseChaserComponent,
    // AimTrainerComponent,
    CaseOpenerComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-dev-project';
}
