import { renderHook, act } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('debería inicializar con el usuario del localStorage si existe', () => {
    const mockUser = { id: 1, email: 'test@test.com', name: 'Joaquin' };
    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('token', 'fake-token');

    // renderHook permite testear hooks sin crear un componente de prueba
    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => <AuthProvider>{children}</AuthProvider>,
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.loading).toBe(false);
  });

  it('debería limpiar el estado y el localStorage al hacer logout', () => {
    localStorage.setItem('token', 'old-token');
    
    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => <AuthProvider>{children}</AuthProvider>,
    });

    act(() => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(localStorage.getItem('token')).toBeNull();
  });
});