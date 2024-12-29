import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SearchBarComponent } from "../search-bar/search-bar.component";


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [ MatToolbarModule, MatButtonModule, MatIconModule, SearchBarComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

}
