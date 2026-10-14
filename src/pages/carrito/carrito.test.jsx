import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Carrito from './carrito';

const torta = { idLinea: 'TC001-', id: 'TC001', nombre: 'Torta Cuadrada de Chocolate', precio: 45000, cantidad: 1, mensaje: '' };
const mousse = { idLinea: 'PI001-', id: 'PI001', nombre: 'Mousse de Chocolate', precio: 5000, cantidad: 2, mensaje: '' };

const renderCarrito = () => {
    render(
        <MemoryRouter>
            <Carrito />
        </MemoryRouter>
    );
};

describe('Pruebas unitarias para la pagina de Carrito en Pasteleria_MS', () => {
    it('Elimina un producto y recalcula el total', () => {
        localStorage.setItem('milsabores_carrito', JSON.stringify([torta, mousse]));
        renderCarrito();

        fireEvent.click(screen.getAllByLabelText('Eliminar producto')[0]);

        expect(screen.queryByText('Torta Cuadrada de Chocolate')).toBeNull();
        expect(screen.getByTestId('total-carrito')).toHaveTextContent('$13.000');
    });

    it('Aplica 50% de descuento a usuarios mayores de 50', () => {
        localStorage.setItem('milsabores_carrito', JSON.stringify([torta]));
        localStorage.setItem('milsabores_usuario_activo', JSON.stringify({ id: 2, nombre: 'Rosa', correo: 'rosa@gmail.com', fechaNacimiento: '1968-08-12', codigo: '' }));
        renderCarrito();

        expect(screen.getByText('Descuento 50% (mayores de 50)')).toBeInTheDocument();
        expect(screen.getByTestId('total-carrito')).toHaveTextContent('$25.500');
    });
});
