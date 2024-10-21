import PostsPage from '@/routes/Posts/PostsPage';
import { renderWithProviders } from '@/shared/store/test';
import { reloadDatabase } from '@/test/db';
import { screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

const renderPage = () => renderWithProviders(
    <MemoryRouter>
      <PostsPage />
    </MemoryRouter>,
  );

describe('PostsPage', () => {
  beforeEach(() => {
    reloadDatabase();
    renderPage();
  });

  test('Should load page title', () => {
    const text = screen.getByText(/posts/i);
    expect(text).toBeInTheDocument();
  });

  test('Should load posts', async () => {
    await waitFor(() => {
      expect(screen.getAllByTestId('post-item').length).toBe(5);
    });
  });
});
