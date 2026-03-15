/**
 * Quotes List Page
 * Demonstrates the global filtering system on a different page
 */

'use client';

import { Suspense } from 'react';
import { FilterBar } from '@/components/filters';
import { useUrlFilters, TransportMode, ServiceType, Potential, Currency, Incoterm } from '@/lib/filters';

interface Quote {
  id: string;
  customer: string;
  origin: string;
  destination: string;
  transportMode: TransportMode;
  serviceType: ServiceType;
  status: string;
  potential: Potential;
  assignedRep: string;
  currency: Currency;
  incoterm: Incoterm;
  validUntil: string;
  amount: number;
}

// Sample data for quotes
const SAMPLE_QUOTES: Quote[] = [
  {
    id: 'QT-001',
    customer: 'ABC Logistics',
    origin: 'Turkey',
    destination: 'Germany',
    transportMode: 'sea',
    serviceType: 'fcl',
    status: 'approved',
    potential: 'high',
    assignedRep: 'John Doe',
    currency: 'USD',
    incoterm: 'FOB',
    validUntil: '2024-04-15',
    amount: 5000,
  },
  {
    id: 'QT-002',
    customer: 'Global Freight Inc',
    origin: 'China',
    destination: 'USA',
    transportMode: 'air',
    serviceType: 'courier',
    status: 'pending',
    potential: 'medium',
    assignedRep: 'Jane Smith',
    currency: 'EUR',
    incoterm: 'CIF',
    validUntil: '2024-04-10',
    amount: 8500,
  },
  {
    id: 'QT-003',
    customer: 'Euro Transport Ltd',
    origin: 'Germany',
    destination: 'France',
    transportMode: 'road',
    serviceType: 'ftl',
    status: 'rejected',
    potential: 'low',
    assignedRep: 'John Doe',
    currency: 'EUR',
    incoterm: 'DAP',
    validUntil: '2024-03-30',
    amount: 1200,
  },
  {
    id: 'QT-004',
    customer: 'UK Imports Co',
    origin: 'Turkey',
    destination: 'UK',
    transportMode: 'rail',
    serviceType: 'lcl',
    status: 'draft',
    potential: 'high',
    assignedRep: 'Bob Wilson',
    currency: 'GBP',
    incoterm: 'DDP',
    validUntil: '2024-04-20',
    amount: 3200,
  },
];

const STATUS_COLORS: Record<string, string> = {
  draft: 'bg-gray-500/20 text-gray-400',
  pending: 'bg-yellow-500/20 text-yellow-400',
  approved: 'bg-green-500/20 text-green-400',
  rejected: 'bg-red-500/20 text-red-400',
  expired: 'bg-purple-500/20 text-purple-400',
};

const POTENTIAL_COLORS: Record<string, string> = {
  high: 'text-green-400',
  medium: 'text-yellow-400',
  low: 'text-red-400',
};

function QuotesContent() {
  const { filters, setFilters, clearFilters, hasFilters, activeFilterCount } = useUrlFilters();

  // Filter the sample data
  const filteredQuotes = SAMPLE_QUOTES.filter((quote) => {
    // Date range filter (using validUntil)
    if (filters.dateRange.start && quote.validUntil < filters.dateRange.start) return false;
    if (filters.dateRange.end && quote.validUntil > filters.dateRange.end) return false;

    // Origin countries filter
    if (filters.originCountries.length > 0 && !filters.originCountries.includes(quote.origin)) {
      return false;
    }

    // Destination countries filter
    if (filters.destinationCountries.length > 0 && !filters.destinationCountries.includes(quote.destination)) {
      return false;
    }

    // Transport mode filter
    if (filters.transportModes.length > 0 && !filters.transportModes.includes(quote.transportMode)) {
      return false;
    }

    // Service type filter
    if (filters.serviceTypes.length > 0 && !filters.serviceTypes.includes(quote.serviceType)) {
      return false;
    }

    // Assigned rep filter
    if (filters.assignedReps.length > 0 && !filters.assignedReps.includes(quote.assignedRep)) {
      return false;
    }

    // Potential filter
    if (filters.potentials.length > 0 && !filters.potentials.includes(quote.potential)) {
      return false;
    }

    // Currency filter
    if (filters.currencies.length > 0 && !filters.currencies.includes(quote.currency)) {
      return false;
    }

    // Incoterm filter
    if (filters.incoterms.length > 0 && !filters.incoterms.includes(quote.incoterm)) {
      return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--text-primary)] font-display mb-2">
            Quotes
          </h1>
          <p className="text-[var(--text-secondary)]">
            Manage customer quotes with the same filtering system
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filter Sidebar */}
          <div className="lg:col-span-1">
            <FilterBar
              filters={filters}
              onFiltersChange={setFilters}
              onClearFilters={clearFilters}
              hasFilters={hasFilters}
              activeFilterCount={activeFilterCount}
            />
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-xl overflow-hidden">
              {/* Results Header */}
              <div className="px-6 py-4 border-b border-[var(--border-primary)] flex items-center justify-between">
                <h2 className="font-semibold text-[var(--text-primary)]">
                  Results ({filteredQuotes.length})
                </h2>
                {hasFilters && (
                  <span className="text-sm text-[var(--text-secondary)]">
                    Filtered from {SAMPLE_QUOTES.length} total
                  </span>
                )}
              </div>

              {/* Quotes Cards */}
              <div className="divide-y divide-[var(--border-primary)]">
                {filteredQuotes.map((quote) => (
                  <div
                    key={quote.id}
                    className="p-6 hover:bg-[var(--bg-tertiary)]/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-lg font-semibold text-[var(--neon-primary)]">
                            {quote.id}
                          </span>
                          <span
                            className={`px-2 py-0.5 text-xs font-medium rounded-full ${STATUS_COLORS[quote.status]}`}
                          >
                            {quote.status}
                          </span>
                          <span
                            className={`text-sm font-medium capitalize ${POTENTIAL_COLORS[quote.potential]}`}
                          >
                            {quote.potential} potential
                          </span>
                        </div>
                        <h3 className="text-[var(--text-primary)] font-medium mb-1">
                          {quote.customer}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                          <span>{quote.origin}</span>
                          <span>→</span>
                          <span>{quote.destination}</span>
                          <span className="text-[var(--border-primary)]">|</span>
                          <span className="capitalize">{quote.transportMode}</span>
                          <span className="text-[var(--border-primary)]">|</span>
                          <span>{quote.incoterm}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-[var(--text-primary)]">
                          {quote.amount.toLocaleString()} {quote.currency}
                        </div>
                        <div className="text-sm text-[var(--text-secondary)] mt-1">
                          Valid until {quote.validUntil}
                        </div>
                        <div className="text-sm text-[var(--text-secondary)] mt-1">
                          Rep: {quote.assignedRep}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {filteredQuotes.length === 0 && (
                  <div className="px-6 py-12 text-center text-[var(--text-secondary)]">
                    <div className="flex flex-col items-center gap-2">
                      <svg
                        className="w-12 h-12 text-[var(--text-secondary)]/30"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p>No quotes match your filters</p>
                      <button
                        type="button"
                        onClick={clearFilters}
                        className="text-[var(--neon-primary)] hover:underline"
                      >
                        Clear all filters
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function QuotesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center">
        <div className="text-[var(--text-secondary)]">Loading...</div>
      </div>
    }>
      <QuotesContent />
    </Suspense>
  );
}
