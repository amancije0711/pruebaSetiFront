export interface DnaAnalysis {
  dna: string[];
  isMutant: boolean;
  sequences: SequenceMatch[];
}

export interface SequenceMatch {
  cells: CellPos[];
  direction: 'horizontal' | 'vertical' | 'diagonal' | 'anti-diagonal';
}

export interface CellPos {
  row: number;
  col: number;
}
