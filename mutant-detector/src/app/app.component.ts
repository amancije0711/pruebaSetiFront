import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DnaInputComponent } from './components/dna-input/dna-input.component';
import { DnaGridComponent } from './components/dna-grid/dna-grid.component';
import { ResultDisplayComponent } from './components/result-display/result-display.component';
import { DnaService } from './core/dna.service';
import { DnaAnalysis } from './models/dna.model';

interface Particle { x: number; y: number; dur: number; delay: number; base: string; }

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DnaInputComponent, DnaGridComponent, ResultDisplayComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  analysis: DnaAnalysis | null = null;
  hintBases = 'ATCGATCGATCG'.split('');

  particles: Particle[] = Array.from({ length: 30 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    dur: 8 + Math.random() * 12,
    delay: -Math.random() * 20,
    base: ['A', 'T', 'C', 'G'][Math.floor(Math.random() * 4)]
  }));

  constructor(private dnaSvc: DnaService) {}

  onAnalyze(dna: string[]): void {
    this.analysis = this.dnaSvc.analyze(dna);
  }
}
