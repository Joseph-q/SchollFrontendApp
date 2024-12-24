import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-card-statistics',
  standalone: true,
  imports: [],
  templateUrl: './card-statistics.component.html',
  styleUrl: './card-statistics.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class CardStatisticsComponent  {
  @Input() title: string = '';
  @Input({ required: true }) description: string = '';
  @Input() numberStadistic: number = 0;
  @Input() link: string | null = null;
  @Input() selected: boolean = false; // Nueva propiedad

  constructor(private router: Router, private route: ActivatedRoute) {}

  onClick() {
    if (this.link) {
      this.router.navigate([this.link], { relativeTo: this.route });
    }
  }
}
