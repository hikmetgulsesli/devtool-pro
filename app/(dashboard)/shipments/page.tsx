/**
 * Shipments List Page
 * Demonstrates the global filtering system with URL state persistence
 */

'use client';

import { Suspense } from 'react';
import { FilterBar } from '@/components/filters';
import { useUrlFilters, TransportMode, ServiceType, Status, Potential, Currency, Incoterm } from '@/lib/filters';

interface Shipment {
  id: string;
  origin: string;
  destination: string;
  transportMode: TransportMode;
  serviceType: ServiceType;
  status: Status;
  potential: Potential;
  assignedRep: string;
  currency: Currency;
  incoterm: Incoterm;
  date: string;
}

// Sample data for demonstration
const SAMPLE_SHIPMENTS: Shipment[] = [
  {
    id: 'SHP-001',
    origin: 'Turkey',
    destination: 'Germany',
    transportMode: 'sea',
    serviceType: 'fcl',
    status: 'in_transit',
    potential: 'high',
    assignedRep: 'John Doe',
    currency: 'USD',
    incoterm: 'FOB',
    date: '2024-03-15',
  },
  {
    id: 'SHP-002',
    origin: 'China',
    destination: 'USA',
    transportMode: 'air',
    serviceType: 'courier',
    status: 'delivered',
    potential: 'medium',
    assignedRep: 'Jane Smith',
    currency: 'EUR',
    incoterm: 'CIF',
    date: '2024-03-14',
  },
  {
    id: 'SHP-003',
    origin: 'Germany',
    destination: 'France',
    transportMode: 'road',
    serviceType: 'ftl',
    status: 'pending',
    potential: 'low',
    assignedRep: 'John Doe',
    currency: 'EUR',
    incoterm: 'DAP',
    date: '2024-03-16',
  },
  {
    id: 'SHP-004',
    origin: 'Turkey',
    destination: 'UK',
    transportMode: 'rail',
    serviceType: 'lcl',
    status: 'confirmed',
    potential: 'high',
    assignedRep: 'Bob Wilson',
    currency: 'GBP',
    incoterm: 'DDP',
    date: '2024-03-17',
  },
  {
    id: 'SHP-005',
    origin: 'China',
    destination: 'Turkey',
    transportMode: 'sea',
    serviceType: 'lcl',
    status: 'draft',
    potential: 'medium',
    assignedRep: 'Jane Smith',
    currency: 'TRY',
    incoterm: 'EXW',
    date: '2024-03-18',
  },
];

const STATUS_COLORS: Record<string, string> = {
  draft: 'bg-gray-500/20 text-gray-400',
  pending: 'bg-yellow-500/20 text-yellow-400',
  confirmed: 'bg-blue-500/20 text-blue-400',
  in_transit: 'bg-purple-500/20 text-purple-400',
  delivered: 'bg-green-500/20 text-green-400',
  cancelled: 'bg-red-500/20 text-red-400',
};

const POTENTIAL_COLORS: Record<string, string> = {
  high: 'text-green-400',
  medium: 'text-yellow-400',
  low: 'text-red-400',
};

function ShipmentsContent() {
  const { filters, setFilters, clearFilters, hasFilters, activeFilterCount } = useUrlFilters();

  // Filter the sample data
  const filteredShipments = SAMPLE_SHIPMENTS.filter((shipment) => {
    // Date range filter
    if (filters.dateRange.start && shipment.date < filters.dateRange.start) return false;
    if (filters.dateRange.end && shipment.date > filters.dateRange.end) return false;

    // Origin countries filter
    if (filters.originCountries.length > 0 && !filters.originCountries.includes(shipment.origin)) {
      return false;
    }

    // Destination countries filter
    if (filters.destinationCountries.length > 0 && !filters.destinationCountries.includes(shipment.destination)) {
      return false;
    }

    // Transport mode filter
    if (filters.transportModes.length > 0 && !filters.transportModes.includes(shipment.transportMode)) {
      return false;
    }

    // Service type filter
    if (filters.serviceTypes.length > 0 && !filters.serviceTypes.includes(shipment.serviceType)) {
      return false;
    }

    // Assigned rep filter
    if (filters.assignedReps.length > 0 && !filters.assignedReps.includes(shipment.assignedRep)) {
      return false;
    }

    // Potential filter
    if (filters.potentials.length > 0 && !filters.potentials.includes(shipment.potential)) {
      return false;
    }

    // Status filter
    if (filters.statuses.length > 0 && !filters.statuses.includes(shipment.status)) {
      return false;
    }

    // Currency filter
    if (filters.currencies.length > 0 && !filters.currencies.includes(shipment.currency)) {
      return false;
    }

    // Incoterm filter
    if (filters.incoterms.length > 0 && !filters.incoterms.includes(shipment.incoterm)) {
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
            Shipments
          </h1>
          <p className="text-[var(--text-secondary)]">
            Manage and track all your shipments with advanced filtering
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
                  Results ({filteredShipments.length})
                </h2>
                {hasFilters && (
                  <span className="text-sm text-[var(--text-secondary)]">
                    Filtered from {SAMPLE_SHIPMENTS.length} total
                  </span>
                )}
              </div>

              {/* Shipments Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[var(--bg-tertiary)]">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
                        Route
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
                        Mode
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
                        Rep
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
                        Potential
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border-primary)]">
                    {filteredShipments.map((shipment) => (
                      <tr
                        key={shipment.id}
                        className="hover:bg-[var(--bg-tertiary)]/50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[var(--neon-primary)]">
                          {shipment.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-secondary)]">
                          <div className="flex items-center gap-2">
                            <span>{shipment.origin}</span>
                            <span className="text-[var(--text-secondary)]/50">→</span>
                            <span>{shipment.destination}</span>
                          </div>
                          <div className="text-xs text-[var(--text-secondary)]/60 mt-1">
                            {shipment.incoterm} • {shipment.currency}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-secondary)]">
                          <div className="capitalize">{shipment.transportMode}</div>
                          <div className="text-xs text-[var(--text-secondary)]/60 capitalize">
                            {shipment.serviceType}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${STATUS_COLORS[shipment.status]}`}
                          >
                            {shipment.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-secondary)]">
                          {shipment.assignedRep}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`text-sm font-medium capitalize ${POTENTIAL_COLORS[shipment.potential]}`}
                          >
                            {shipment.potential}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {filteredShipments.length === 0 && (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-6 py-12 text-center text-[var(--text-secondary)]"
                        >
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
                            <p>No shipments match your filters</p>
                            <button
                              type="button"
                              onClick={clearFilters}
                              className="text-[var(--neon-primary)] hover:underline"
                            >
                              Clear all filters
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ShipmentsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center">
        <div className="text-[var(--text-secondary)]">Loading...</div>
      </div>
    }>
      <ShipmentsContent />
    </Suspense>
  );
}
