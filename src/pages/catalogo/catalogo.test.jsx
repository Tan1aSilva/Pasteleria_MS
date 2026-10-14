import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Catalogo from './catalogo';

const renderCatalogo = () => {
    render(
        <MemoryRouter>
            <Catalogo />
        </MemoryRouter>
    );
};

describe('Pruebas unitarias para la pagina de Catalogo en Pasteleria_MS', () => {
    it('Filtra los productos por forma Cuadrada', () => {
        renderCatalogo();
        const selectForma = screen.getByLabelText('Forma de Torta:');
        fireEvent.change(selectForma, { target: { value: 'Cuadrada' } });

        expect(screen.getByText('Torta Cuadrada de Chocolate')).toBeInTheDocument();
        expect(screen.queryByText('Torta Circular de Vainilla')).toBeNull();
    });

    it('Guardar y Agregar guarda la torta con su mensaje en el carrito', () => {
        renderCatalogo();
        fireEvent.click(screen.getAllByText('Personalizar')[0]);

        fireEvent.change(screen.getByLabelText(/mensaje especial/i), { target: { value: 'Feliz Aniversario' } });
        fireEvent.change(screen.getByLabelText('Cantidad:'), { target: { value: '2' } });
        fireEvent.click(screen.getByText('Guardar y Agregar'));

        const carrito = JSON.parse(localStorage.getItem('milsabores_carrito'));
        expect(carrito.length).toBe(1);
        expect(carrito[0].nombre).toBe('Torta Cuadrada de Chocolate');
        expect(carrito[0].cantidad).toBe(2);
        expect(carrito[0].mensaje).toBe('Feliz Aniversario');
        expect(screen.getByText(/agregado al carrito/)).toBeInTheDocument();
    });
});
