import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Registro from './registro';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const original = await vi.importActual('react-router-dom');
  return { ...original, useNavigate: () => mockNavigate };
});

const renderRegistro = () => {
  render(
    <MemoryRouter>
      <Registro />
    </MemoryRouter>
  );
};

const llenarFormulario = (correo, claveConfirmada) => {
  fireEvent.change(screen.getByLabelText('Nombre Completo'), { target: { value: 'Ana Perez' } });
  fireEvent.change(screen.getByLabelText('Correo Electrónico'), { target: { value: correo } });
  fireEvent.change(screen.getByLabelText('Fecha de Nacimiento'), { target: { value: '1995-04-15' } });
  fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'secreta' } });
  fireEvent.change(screen.getByLabelText('Confirmar Contraseña'), { target: { value: claveConfirmada } });
};

describe('Pruebas unitarias para la pagina de Registro en Pasteleria_MS', () => {
  it('Registra al usuario con el codigo FELICES50 y lo lleva al perfil', () => {
    renderRegistro();
    llenarFormulario('ana@gmail.com', 'secreta');
    fireEvent.change(screen.getByLabelText('Código Promocional (opcional)'), { target: { value: 'felices50' } });
    fireEvent.click(screen.getAllByText('Crear Cuenta')[1]);

    const usuarios = JSON.parse(localStorage.getItem('milsabores_usuarios'));
    expect(usuarios[0].correo).toBe('ana@gmail.com');
    expect(usuarios[0].codigo).toBe('FELICES50');
    expect(mockNavigate).toHaveBeenCalledWith('/perfil');
  });
});
