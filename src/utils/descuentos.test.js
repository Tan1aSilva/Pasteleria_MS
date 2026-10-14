import { describe, it, expect, vi, beforeEach } from 'vitest';
import { calcularTotales } from './descuentos';

const torta = { nombre: 'Torta de Vainilla', precio: 40000, cantidad: 1 };
const mousse = { nombre: 'Mousse de Chocolate', precio: 5000, cantidad: 2 };

describe('Pruebas unitarias de los descuentos', () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(new Date(2026, 9, 13));
  });

  it('Regala la torta a un estudiante Duoc en su cumpleaños', () => {
    const estudiante = { correo: 'benja@duocuc.cl', fechaNacimiento: '2004-10-13', codigo: '' };
    const totales = calcularTotales([torta, mousse], estudiante);

    expect(totales.tortaGratis).toBe(40000);
    expect(totales.total).toBe(13000);
  });
});
