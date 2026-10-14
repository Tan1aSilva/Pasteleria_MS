import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Envios from './envios';

const pedido = { codigo: 'PED-1001', usuarioId: 2, direccion: 'Calle 1', comuna: 'Macul', fechaEntrega: '2026-10-20', estado: 'Preparando', items: [], total: 48000 };

const renderEnvios = () => {
    render(
        <MemoryRouter>
            <Envios />
        </MemoryRouter>
    );
};

describe('Pruebas unitarias para la pagina de Envios en Pasteleria_MS', () => {
    it('Avanza el estado del envio y muestra la notificacion', () => {
        localStorage.setItem('milsabores_pedidos', JSON.stringify([pedido]));
        localStorage.setItem('milsabores_usuario_activo', JSON.stringify({ id: 2, nombre: 'Rosa Martinez', correo: 'rosa@gmail.com' }));
        renderEnvios();

        fireEvent.click(screen.getByText('Avanzar Estado'));

        expect(screen.getByText('Tu pedido PED-1001 ahora está: En Camino')).toBeInTheDocument();
        expect(JSON.parse(localStorage.getItem('milsabores_pedidos'))[0].estado).toBe('En Camino');
    });
});
