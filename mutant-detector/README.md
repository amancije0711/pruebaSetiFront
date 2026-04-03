# 🧬 Mutant Detector

Aplicación Angular que detecta si un humano es mutante basándose en su secuencia de ADN.

## ¿Cómo funciona?

Un humano es **mutante** si su ADN contiene **más de una secuencia** de 4 letras iguales en dirección horizontal, vertical o diagonal.

```
isMutant(dna: string[]): boolean
```

## Instalación y ejecución

```bash
npm install
ng serve
```

Abre `http://localhost:4200`

## Ejemplo

```ts
const dna = ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"];
isMutant(dna) // → true
```

## Estructura

```
src/app/
├── core/
│   └── dna.service.ts       # Algoritmo isMutant
├── models/
│   └── dna.model.ts         # Interfaces
└── components/
    ├── dna-input/            # Entrada de ADN + presets
    ├── dna-grid/             # Visualización de la matriz
    └── result-display/       # Resultado animado
```

## Algoritmo

El algoritmo recorre la matriz NxN evaluando las 4 direcciones posibles (horizontal, vertical, diagonal, anti-diagonal) para cada celda. Se detiene en cuanto encuentra la segunda secuencia válida (early exit), logrando complejidad **O(N²)**.
