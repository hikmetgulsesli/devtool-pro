/**
 * Tests for useUrlFilters hook
 */

import { renderHook, act } from '@testing-library/react';
import { useUrlFilters } from '@/lib/filters/useUrlFilters';

// Mock Next.js navigation
const mockPush = jest.fn();
const mockSearchParams = new URLSearchParams();

jest.mock('next/navigation', () => ({
  useSearchParams: () => mockSearchParams,
  useRouter: () => ({ push: mockPush }),
  usePathname: () => '/shipments',
}));

describe('useUrlFilters', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSearchParams.delete('tm');
    mockSearchParams.delete('ss');
    mockSearchParams.delete('ds');
    mockSearchParams.delete('de');
  });

  it('returns default filter state', () => {
    const { result } = renderHook(() => useUrlFilters());
    
    expect(result.current.filters).toEqual({
      dateRange: { start: null, end: null },
      originCountries: [],
      destinationCountries: [],
      transportModes: [],
      serviceTypes: [],
      assignedReps: [],
      potentials: [],
      statuses: [],
      currencies: [],
      incoterms: [],
    });
  });

  it('returns correct initial state for hasFilters and activeFilterCount', () => {
    const { result } = renderHook(() => useUrlFilters());
    
    expect(result.current.hasFilters).toBe(false);
    expect(result.current.activeFilterCount).toBe(0);
  });

  it('provides setFilters function', () => {
    const { result } = renderHook(() => useUrlFilters());
    
    expect(typeof result.current.setFilters).toBe('function');
  });

  it('provides clearFilters function', () => {
    const { result } = renderHook(() => useUrlFilters());
    
    expect(typeof result.current.clearFilters).toBe('function');
  });

  it('clearFilters calls router.push with pathname', () => {
    const { result } = renderHook(() => useUrlFilters());
    
    act(() => {
      result.current.clearFilters();
    });
    
    expect(mockPush).toHaveBeenCalledWith('/shipments');
  });
});
