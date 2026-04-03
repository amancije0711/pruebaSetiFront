import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DnaAnalysis } from '../../models/dna.model';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-result-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './result-display.component.html',
  styleUrls: ['./result-display.component.scss'],
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px) scale(0.95)' }),
        animate('400ms cubic-bezier(0.34, 1.56, 0.64, 1)',
          style({ opacity: 1, transform: 'translateY(0) scale(1)' }))
      ])
    ])
  ]
})
export class ResultDisplayComponent {
  @Input() analysis!: DnaAnalysis;
}
