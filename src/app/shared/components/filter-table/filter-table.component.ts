import { booleanAttribute, Component, Input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-filter-table',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './filter-table.component.html',
  styleUrl: './filter-table.component.scss',
})
export class FilterTableComponent {
  @Input({ transform: booleanAttribute }) scrollable: boolean = false;
  @Input({}) height: string = '10vh';
}
