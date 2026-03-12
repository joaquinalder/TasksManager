import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { CreateTaskCard } from './createTaskCard'
import '@testing-library/jest-dom';

describe('CreateTaskCard', () => {
  
  test('debería llamar a onCreate y limpiar el input al enviar un título válido', async () => {
    const mockOnCreate = vi.fn().mockResolvedValue(undefined);
    render(<CreateTaskCard onCreate={mockOnCreate} />);
    
    const input = screen.getByPlaceholderText(/¿Qué hay que hacer?/i);
    const button = screen.getByRole('button', { name: /AÑADIR A LA LISTA/i });

    fireEvent.change(input, { target: { value: 'Nueva Tarea de Prueba' } });
    fireEvent.click(button);

    expect(mockOnCreate).toHaveBeenCalledWith('Nueva Tarea de Prueba');
    
    // 2. En lugar de expect directo, esperamos a que el input cambie
    await waitFor(() => {
        expect(input).toHaveValue('');
    });
    });

  test('no debería llamar a onCreate si el input está vacío o tiene solo espacios', () => {
    const mockOnCreate = vi.fn();
    render(<CreateTaskCard onCreate={mockOnCreate} />);
    
    const input = screen.getByPlaceholderText(/¿Qué hay que hacer?/i);
    const button = screen.getByRole('button', { name: /AÑADIR A LA LISTA/i });

    // Caso: Solo espacios
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(button);

    // Verificamos que NO se llamó
    expect(mockOnCreate).not.toHaveBeenCalled();
  });
});