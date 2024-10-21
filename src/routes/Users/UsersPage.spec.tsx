import UsersPage from './UsersPage';
import { renderWithProviders } from '@/shared/store/test';
import { reloadDatabase } from '@/test/db';
import { screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

const renderPage = () => renderWithProviders(
    <MemoryRouter>
      <UsersPage />
    </MemoryRouter>,
  );

describe('UsersPage', () => {
  beforeEach(() => {
    reloadDatabase();
    renderPage();
  });

  test('Should load page title', () => {
    const text = screen.getByText(/users/i);
    expect(text).toBeInTheDocument();
  });

  test('Should load users', async () => {
    await waitFor(() => {
      expect(screen.getAllByTestId('user-item').length).toBe(2);
    });
  });
});
