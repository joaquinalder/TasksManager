import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { EditTaskModal } from './taskEditModal';

it('sends null when the user removes the task from its project', async () => {
  const user = userEvent.setup();
  const save = vi.fn().mockResolvedValue(undefined);
  const project = { id: 8, name: 'Sitio', description: '', createdAt: '2026-01-10', tasks: [] };
  render(
    <EditTaskModal
      task={{
        id: 1,
        title: 'Revisar interfaz',
        completed: false,
        project,
        projectId: project.id,
        createdAt: '2026-01-10',
        updatedAt: '2026-01-10',
      }}
      projects={[project]}
      onClose={vi.fn()}
      onSave={save}
    />,
  );

  await user.selectOptions(screen.getByRole('combobox', { name: 'Proyecto' }), '');
  await user.click(screen.getByRole('button', { name: 'Guardar Cambios' }));

  expect(save).toHaveBeenCalledWith(1, expect.objectContaining({ projectId: null }));
});
