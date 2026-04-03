import { Injectable } from '@angular/core';
import { DnaAnalysis, SequenceMatch, CellPos } from '../models/dna.model';

const SEQUENCE_LENGTH = 4;
const VALID_BASES = /^[ATCG]+$/;

@Injectable({ providedIn: 'root' })
export class DnaService {

  analyze(dna: string[]): DnaAnalysis {
    const sequences = this.findSequences(dna);
    return {
      dna,
      isMutant: sequences.length > 1,
      sequences
    };
  }

  isMutant(dna: string[]): boolean {
    return this.findSequences(dna).length > 1;
  }

  validate(dna: string[]): string | null {
    if (!dna.length) return 'Ingresa al menos una fila de ADN';
    const n = dna.length;
    for (let i = 0; i < n; i++) {
      if (dna[i].length !== n) return `Fila ${i + 1}: debe tener ${n} caracteres (NxN)`;
      if (!VALID_BASES.test(dna[i])) return `Fila ${i + 1}: solo se permiten bases A, T, C, G`;
    }
    return null;
  }

  private findSequences(dna: string[]): SequenceMatch[] {
    const n = dna.length;
    const sequences: SequenceMatch[] = [];

    const directions: Array<{ dr: number; dc: number; dir: SequenceMatch['direction'] }> = [
      { dr: 0, dc: 1, dir: 'horizontal' },
      { dr: 1, dc: 0, dir: 'vertical' },
      { dr: 1, dc: 1, dir: 'diagonal' },
      { dr: 1, dc: -1, dir: 'anti-diagonal' }
    ];

    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        for (const { dr, dc, dir } of directions) {
          const cells = this.checkSequence(dna, r, c, dr, dc, n);
          if (cells) sequences.push({ cells, direction: dir });
          if (sequences.length > 1) return sequences;
        }
      }
    }
    return sequences;
  }

  private checkSequence(dna: string[], r: number, c: number, dr: number, dc: number, n: number): CellPos[] | null {
    const endR = r + dr * (SEQUENCE_LENGTH - 1);
    const endC = c + dc * (SEQUENCE_LENGTH - 1);
    if (endR < 0 || endR >= n || endC < 0 || endC >= n) return null;

    const base = dna[r][c];
    const cells: CellPos[] = [{ row: r, col: c }];
    for (let i = 1; i < SEQUENCE_LENGTH; i++) {
      if (dna[r + dr * i][c + dc * i] !== base) return null;
      cells.push({ row: r + dr * i, col: c + dc * i });
    }
    return cells;
  }
}
