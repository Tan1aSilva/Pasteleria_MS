import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Catalogo from './catalogo';

describe('Pruebas unitarias para la pagina de Catalogo en Pasteleria_MS', () => {
    it('Renderiza los 16 productos inicialmente', () => {
        render(
            <MemoryRouter>
                <Catalogo />
            </MemoryRouter>
        );
        const titulo = screen.getByText(/Catalogo de Productos \(16\)/i);
        expect(titulo).toBeDefined();
    });

    it('Filtra los productos por forma al hacer clic en Cuadradas', () => {
        render(
            <MemoryRouter>
                <Catalogo />
            </MemoryRouter>
        );
        const botonCuadradas = screen.getByText('Cuadradas');
        fireEvent.click(botonCuadradas);

        const productoCuadrado = screen.getByText('Torta Cuadrada de Chocolate');
        const productoCircular = screen.queryByText('Torta Circular de Vainilla');

        expect(productoCuadrado).toBeDefined();
        expect(productoCircular).toBeNull();
    });

    it('Filtra los productos por tamano Individual', () => {
        render(
            <MemoryRouter>
                <Catalogo />
            </MemoryRouter>
        );
        const selectTamano = screen.getByRole('combobox', { name: /Filtrar por Tamano/i });
        fireEvent.change(selectTamano, { target: { value: 'Individual' } });

        const mousse = screen.getByText('Mousse de Chocolate');
        const tortaFamiliar = screen.queryByText('Torta Cuadrada de Chocolate');

        expect(mousse).toBeDefined();
        expect(tortaFamiliar).toBeNull();
    });

    it('Abre el modal de personalizacion al presionar el boton', () => {
        render(
            <MemoryRouter>
                <Catalogo />
            </MemoryRouter>
        );
        const botonesPersonalizar = screen.getAllByText('Personalizar');
        fireEvent.click(botonesPersonalizar[0]);

        const tituloModal = screen.getByText('Personalizar Pedido');
        expect(tituloModal).toBeDefined();
    });
});