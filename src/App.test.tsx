import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import App from './App';

describe('ToDo', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByText('ToDo')).toBeInTheDocument();
  });

  it('adds new task', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Добавить новую задачу');
    fireEvent.change(input, { target: { value: 'Новая задача' } });
    fireEvent.submit(input);
    expect(screen.getByText('Новая задача')).toBeInTheDocument();
  });

  it('toggles task completion', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Добавить новую задачу');
    fireEvent.change(input, { target: { value: 'Тестовая задача' } });
    fireEvent.submit(input);

    const checkbox = screen.getByLabelText('Отметить задачу "Тестовая задача"');
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('deletes task', async () => {
    render(<App />);

    const input = screen.getByPlaceholderText('Добавить новую задачу');
    fireEvent.change(input, { target: { value: 'Задача на удаление' } });
    fireEvent.submit(input);

    const deleteButton = screen.getByRole('button', { name: /удалить задачу/i });

    fireEvent.click(deleteButton);
    expect(screen.queryByLabelText('Задача на удаление')).not.toBeInTheDocument();
  });
});