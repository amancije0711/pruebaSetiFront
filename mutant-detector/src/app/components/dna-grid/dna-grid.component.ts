import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DnaAnalysis } from '../../models/dna.model';

interface GridCell { base: string; seqIdx: number; }

@Component({
  selector: 'app-dna-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dna-grid.component.html',
  styleUrls: ['./dna-grid.component.scss']
})
export class DnaGridComponent implements OnChanges {
  @Input() analysis!: DnaAnalysis;
  grid: GridCell[][] = [];

  ngOnChanges(): void {
    const map = new Map<string, number>();
    this.analysis.sequences.forEach((s, i) =>
      s.cells.forEach(c => map.set(`${c.row}-${c.col}`, i))
    );
    this.grid = this.analysis.dna.map((row, r) =>
      row.split('').map((base, c) => ({ base, seqIdx: map.get(`${r}-${c}`) ?? -1 }))
    );
  }
}
