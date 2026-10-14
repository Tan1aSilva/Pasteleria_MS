import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Checkout from './checkout';

const usuario = { id: 3, nombre: 'Camila Rojas', correo: 'camila@gmail.com', fechaNacimiento: '1995-08-20', direccion: '', codigo: 'FELICES50' };
const torta = { idLinea: 'TC001-', id: 'TC001', nombre: 'Torta Cuadrada de Chocolate', precio: 45000, cantidad: 1, mensaje: '' };

const renderCheckout = () => {
    render(
        <MemoryRouter>
            <Checkout />
        </MemoryRouter>
    );
};

function fechaManana() {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() + 2);
    return fecha.getFullYear() + '-' + String(fecha.getMonth() + 1).padStart(2, '0') + '-' + String(fecha.getDate()).padStart(2, '0');
}

describe('Pruebas unitarias para la pagina de Checkout en Pasteleria_MS', () => {
    it('Crea el pedido con el descuento FELICES50 y vacia el carrito', () => {
        localStorage.setItem('milsabores_usuario_activo', JSON.stringify(usuario));
        localStorage.setItem('milsabores_carrito', JSON.stringify([torta]));
        renderCheckout();

        fireEvent.change(screen.getByLabelText('Dirección'), { target: { value: 'Av. Siempre Viva 123' } });
        fireEvent.change(screen.getByLabelText('Comuna'), { target: { value: 'Ñuñoa' } });
        fireEvent.change(screen.getByLabelText('Fecha de Entrega Preferida'), { target: { value: fechaManana() } });
        fireEvent.click(screen.getByText('Pagar $43.500'));

        expect(screen.getByText('¡Gracias por tu compra!')).toBeInTheDocument();
        expect(screen.getByText('PED-1001')).toBeInTheDocument();

        const pedidos = JSON.parse(localStorage.getItem('milsabores_pedidos'));
        expect(pedidos[0].total).toBe(43500);
        expect(pedidos[0].comuna).toBe('Ñuñoa');
        expect(localStorage.getItem('milsabores_carrito')).toBeNull();
    });
});