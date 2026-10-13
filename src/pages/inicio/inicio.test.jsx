import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Inicio from './Inicio';

describe('Pruebas unitarias para la pagina de Inicio en Pasteleria_MS', () => {
    it('Renderiza la seccion del Origen de Recetas Tradicionales', () => {
        render(
            <MemoryRouter>
                <Inicio />
            </MemoryRouter>
        );
        const tituloOrigen = screen.getByText('Origen de Nuestras Recetas Tradicionales');
        expect(tituloOrigen).toBeDefined();
    });

    it('Muestra recomendaciones de Chocolate por defecto y cambia a Manjar al hacer clic', () => {
        render(
            <MemoryRouter>
                <Inicio />
            </MemoryRouter>
        );
        const recomendadoInicial = screen.getByText('Torta Cuadrada de Chocolate');
        expect(recomendadoInicial).toBeDefined();

        const botonManjar = screen.getByText('Manjar y Tradicional');
        fireEvent.click(botonManjar);

        const recomendadoNuevo = screen.getByText('Torta Circular de Manjar');
        expect(recomendadoNuevo).toBeDefined();
    });

    it('Renderiza la Seccion de Impacto Comunitario', () => {
        render(
            <MemoryRouter>
                <Inicio />
            </MemoryRouter>
        );
        const tituloImpacto = screen.getByText('Seccion de Impacto Comunitario');
        const apoyoEstudiantil = screen.getByText('Apoyo Estudiantil');
        expect(tituloImpacto).toBeDefined();
        expect(apoyoEstudiantil).toBeDefined();
    });
});