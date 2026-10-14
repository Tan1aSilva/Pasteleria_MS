import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProductoCard from './producto_card';

const producto = { id: 'TC001', nombre: 'Torta Cuadrada de Chocolate', precio: 45000, forma: 'Cuadrada', tamano: 'Familiar', descripcion: 'Torta de chocolate', imagen: 'torta.jpg' };

describe('Pruebas unitarias del componente ProductoCard', () => {
    it('Llama a la funcion onClick con el producto al presionar el boton', () => {
        const funcionMock = vi.fn();
        render(<ProductoCard producto={producto} textoBoton="Personalizar" onClick={funcionMock} />);

        fireEvent.click(screen.getByText('Personalizar'));

        expect(funcionMock).toHaveBeenCalledTimes(1);
        expect(funcionMock).toHaveBeenCalledWith(producto);
    });
});
