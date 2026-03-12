import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(viteConfig, defineConfig({
  test: {
    globals: true,           // Permite usar 'describe', 'test', 'expect' sin importarlos
    environment: 'jsdom',    // Simula el navegador
    setupFiles: './src/setupTests.ts', // Configuración inicial de cada test
    css: true,               // Útil si querés testear visibilidad de clases Tailwind/SCSS
  },
}));