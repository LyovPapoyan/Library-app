import { Component } from '@angular/core';
import { LibrariesListComponent } from "./libraries-list/libraries-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LibrariesListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'libraries-app';
}
