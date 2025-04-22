import { Component } from '@angular/core';
import { MouseChaserComponent } from "./test/mouse-chaser/mouse-chaser.component";

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
