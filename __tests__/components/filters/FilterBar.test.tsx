/**
 * Tests for FilterBar component
 */

import { render, screen, fireEvent } from '@testing-library/react';
import { FilterBar } from '@/components/filters/FilterBar';
import { DEFAULT_FILTER_STATE } from '@/lib/filters';

// Mock Next.js navigation hooks
jest.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams(),
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => '/shipments',
}));

describe('FilterBar', () => {
  const mockOnFiltersChange = jest.fn();
  const mockOnClearFilters = jest.fn();

  const defaultProps = {
    filters: DEFAULT_FILTER_STATE,
    onFiltersChange: mockOnFiltersChange,
    onClearFilters: mockOnClearFilters,
    hasFilters: false,
    activeFilterCount: 0,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders filter bar with title', () => {
    render(<FilterBar {...defaultProps} />);
    expect(screen.getByText('Filters')).toBeInTheDocument();
  });

  it('shows expand/collapse button', () => {
    render(<FilterBar {...defaultProps} />);
    expect(screen.getByText('Expand')).toBeInTheDocument();
  });

  it('expands when expand button is clicked', () => {
    render(<FilterBar {...defaultProps} />);
    const expandButton = screen.getByText('Expand');
    fireEvent.click(expandButton);
    expect(screen.getByText('Collapse')).toBeInTheDocument();
  });

  it('shows active filter count badge when filters are applied', () => {
    render(
      <FilterBar
        {...defaultProps}
        hasFilters={true}
        activeFilterCount={3}
        filters={{
          ...DEFAULT_FILTER_STATE,
          transportModes: ['sea', 'air'],
          statuses: ['pending'],
        }}
      />
    );
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('calls onClearFilters when clear all is clicked', () => {
    render(
      <FilterBar
        {...defaultProps}
        hasFilters={true}
        filters={{
          ...DEFAULT_FILTER_STATE,
          transportModes: ['sea'],
        }}
      />
    );
    const clearButton = screen.getByText('Clear all');
    fireEvent.click(clearButton);
    expect(mockOnClearFilters).toHaveBeenCalledTimes(1);
  });

  it('renders date range section when expanded', () => {
    render(<FilterBar {...defaultProps} />);
    fireEvent.click(screen.getByText('Expand'));
    expect(screen.getByText('Date Range')).toBeInTheDocument();
    expect(screen.getByText('Start Date')).toBeInTheDocument();
    expect(screen.getByText('End Date')).toBeInTheDocument();
  });

  it('renders transport mode options when expanded', () => {
    render(<FilterBar {...defaultProps} />);
    fireEvent.click(screen.getByText('Expand'));
    // Expand the transport section
    fireEvent.click(screen.getByText('Transport Mode'));
    expect(screen.getByLabelText('Sea')).toBeInTheDocument();
    expect(screen.getByLabelText('Air')).toBeInTheDocument();
    expect(screen.getByLabelText('Road')).toBeInTheDocument();
  });

  it('renders status options when expanded', () => {
    render(<FilterBar {...defaultProps} />);
    fireEvent.click(screen.getByText('Expand'));
    // Expand the status section
    fireEvent.click(screen.getByText('Status'));
    expect(screen.getByLabelText('Draft')).toBeInTheDocument();
    expect(screen.getByLabelText('Pending')).toBeInTheDocument();
    expect(screen.getByLabelText('Delivered')).toBeInTheDocument();
  });

  it('renders currency options when expanded', () => {
    render(<FilterBar {...defaultProps} />);
    fireEvent.click(screen.getByText('Expand'));
    // Expand the financial section
    fireEvent.click(screen.getByText('Financial'));
    expect(screen.getByLabelText('USD ($)')).toBeInTheDocument();
    expect(screen.getByLabelText('EUR (€)')).toBeInTheDocument();
  });
});
