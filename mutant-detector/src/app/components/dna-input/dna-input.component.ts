import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DnaService } from '../../core/dna.service';

@Component({
  selector: 'app-dna-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dna-input.component.html',
  styleUrls: ['./dna-input.component.scss']
})
export class DnaInputComponent {
  @Output() analyze = new EventEmitter<string[]>();

  dnaInput = 'ATGCGA\nCAGTGC\nTTATGT\nAGAAGG\nCCCCTA\nTCACTG';
  error = '';

  readonly presets = [
    { label: '🧬 Mutante', dna: 'ATGCGA\nCAGTGC\nTTATGT\nAGAAGG\nCCCCTA\nTCACTG' },
    { label: '🧑 Humano',  dna: 'ATGCGA\nCAGTGC\nTTATTT\nAGACGG\nGCGTCA\nTCACTG' },
  ];

  constructor(private dnaSvc: DnaService) {}

  loadPreset(p: { dna: string }): void {
    this.dnaInput = p.dna;
    this.error = '';
  }

  onAnalyze(): void {
    const dna = this.dnaInput.trim().toUpperCase()
      .split('\n').map(s => s.trim()).filter(Boolean);
    const err = this.dnaSvc.validate(dna);
    if (err) { this.error = err; return; }
    this.error = '';
    this.analyze.emit(dna);
  }
}
