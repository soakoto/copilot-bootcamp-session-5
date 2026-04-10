import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from '../App';

// Create a test query client
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

// Mock fetch for tests
global.fetch = jest.fn();

beforeEach(() => {
  // Default mock: successful fetch returning empty array
  global.fetch.mockResolvedValue({
    ok: true,
    json: () => Promise.resolve([]),
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

test('renders TODO App heading', async () => {
  const testQueryClient = createTestQueryClient();

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  const headingElement = await screen.findByText(/TODO App/i);
  expect(headingElement).toBeInTheDocument();
});

// Test: Delete functionality
describe('Delete functionality', () => {
  test('should call DELETE API when delete button is clicked', async () => {
    const mockTodos = [
      { id: 1, title: 'Test todo', completed: false },
    ];

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockTodos),
    });

    const testQueryClient = createTestQueryClient();
    const user = userEvent.setup();

    render(
      <QueryClientProvider client={testQueryClient}>
        <App />
      </QueryClientProvider>
    );

    // Wait for todos to load
    await waitFor(() => {
      expect(screen.getByText('Test todo')).toBeInTheDocument();
    });

    // Mock successful DELETE response
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({}),
    });

    // Mock the refetch after delete (returns empty array)
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([]),
    });

    // Find and click delete button
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    await user.click(deleteButton);

    // Verify DELETE was called with correct URL
    await waitFor(() => {
      const deleteCalls = global.fetch.mock.calls.filter(
        call => call[1]?.method === 'DELETE'
      );
      expect(deleteCalls.length).toBeGreaterThan(0);
    });
    
    const deleteCalls = global.fetch.mock.calls.filter(
      call => call[1]?.method === 'DELETE'
    );
    expect(deleteCalls[0][0]).toContain('/api/todos/1');
  });
});

// Test: Stats calculation
describe('Stats calculation', () => {
  test('should display correct count of incomplete todos', async () => {
    const mockTodos = [
      { id: 1, title: 'Incomplete 1', completed: false },
      { id: 2, title: 'Completed 1', completed: true },
      { id: 3, title: 'Incomplete 2', completed: false },
    ];

    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockTodos),
    });

    const testQueryClient = createTestQueryClient();

    render(
      <QueryClientProvider client={testQueryClient}>
        <App />
      </QueryClientProvider>
    );

    // Wait for stats to display correct counts
    await waitFor(() => {
      expect(screen.getByText('2 items left')).toBeInTheDocument();
    });
  });

  test('should display correct count of completed todos', async () => {
    const mockTodos = [
      { id: 1, title: 'Incomplete 1', completed: false },
      { id: 2, title: 'Completed 1', completed: true },
      { id: 3, title: 'Completed 2', completed: true },
    ];

    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockTodos),
    });

    const testQueryClient = createTestQueryClient();

    render(
      <QueryClientProvider client={testQueryClient}>
        <App />
      </QueryClientProvider>
    );

    // Wait for stats to display correct counts
    await waitFor(() => {
      expect(screen.getByText('2 completed')).toBeInTheDocument();
    });
  });

  test('should update stats when toggling todo completion', async () => {
    const mockTodos = [
      { id: 1, title: 'Test todo', completed: false },
    ];

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockTodos),
    });

    const testQueryClient = createTestQueryClient();
    const user = userEvent.setup();

    render(
      <QueryClientProvider client={testQueryClient}>
        <App />
      </QueryClientProvider>
    );

    // Initially should show 1 item left, 0 completed
    await waitFor(() => {
      expect(screen.getByText('1 items left')).toBeInTheDocument();
    });
    expect(screen.getByText('0 completed')).toBeInTheDocument();

    // Mock toggle and refetch responses
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({}),
    });

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([
        { id: 1, title: 'Test todo', completed: true },
      ]),
    });

    // Toggle the checkbox
    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    // After toggle, should show 0 items left, 1 completed
    await waitFor(() => {
      expect(screen.getByText('0 items left')).toBeInTheDocument();
    });
    expect(screen.getByText('1 completed')).toBeInTheDocument();
  });
});

// Test: Empty state
describe('Empty state', () => {
  test('should display empty state message when no todos exist', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([]),
    });

    const testQueryClient = createTestQueryClient();

    render(
      <QueryClientProvider client={testQueryClient}>
        <App />
      </QueryClientProvider>
    );

    // Wait for empty state message
    await waitFor(() => {
      expect(
        screen.getByText(/no todos yet/i) || screen.getByText(/empty/i)
      ).toBeInTheDocument();
    });
  });

  test('should not display empty state when todos exist', async () => {
    const mockTodos = [
      { id: 1, title: 'Test todo', completed: false },
    ];

    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockTodos),
    });

    const testQueryClient = createTestQueryClient();

    render(
      <QueryClientProvider client={testQueryClient}>
        <App />
      </QueryClientProvider>
    );

    // Wait for todo to appear
    await waitFor(() => {
      expect(screen.getByText('Test todo')).toBeInTheDocument();
    });

    // Empty state should not be present
    expect(screen.queryByText(/no todos yet/i)).not.toBeInTheDocument();
  });
});

// Test: Error handling
describe('Error handling', () => {
  test('should display error message when fetch fails', async () => {
    // Mock a failed fetch
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    const testQueryClient = createTestQueryClient();

    render(
      <QueryClientProvider client={testQueryClient}>
        <App />
      </QueryClientProvider>
    );

    // Wait for error message to appear
    await waitFor(() => {
      expect(
        screen.getByText(/error/i) || screen.getByText(/failed/i)
      ).toBeInTheDocument();
    });
  });

  test('should display error message when API returns error status', async () => {
    // Mock a failed response with error status
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: () => Promise.resolve({ error: 'Server error' }),
    });

    const testQueryClient = createTestQueryClient();

    render(
      <QueryClientProvider client={testQueryClient}>
        <App />
      </QueryClientProvider>
    );

    // Wait for error message to appear
    await waitFor(() => {
      expect(
        screen.getByText(/error/i) || screen.getByText(/failed/i)
      ).toBeInTheDocument();
    });
  });
});
