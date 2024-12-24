import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-qr-section',
  standalone: true,
  imports: [
    MatIconModule,
    MatTableModule,
    DatePipe
  ],
  templateUrl: './qr-section.component.html',
  styleUrl: './qr-section.component.scss'
})
export class QrSectionComponent {
  public displayedColumns = ['createdAt', 'updatedAt', 'version', "actions"];
  public dataSource: Credencial[] = [
    { createdAt: new Date(), updatedAt: new Date(), version: 1 }
  ];
}

interface Credencial {
  createdAt:Date,
  updatedAt:Date,
  version:number,
}
