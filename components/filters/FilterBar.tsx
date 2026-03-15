/**
 * Global Filter Bar Component
 * Usable across all list/detail pages with URL state persistence
 */

'use client';

import React, { useState, useCallback } from 'react';
import {
  FilterState,
  TRANSPORT_MODES,
  SERVICE_TYPES,
  POTENTIALS,
  STATUSES,
  CURRENCIES,
  INCOTERMS,
  TRANSPORT_MODE_LABELS,
  SERVICE_TYPE_LABELS,
  POTENTIAL_LABELS,
  STATUS_LABELS,
  CURRENCY_LABELS,
  INCOTERM_LABELS,
  TransportMode,
  ServiceType,
  Potential,
  Status,
  Currency,
  Incoterm,
} from '@/lib/filters';

export interface FilterBarProps {
  filters: FilterState;
  onFiltersChange: (filters: Partial<FilterState>) => void;
  onClearFilters: () => void;
  hasFilters: boolean;
  activeFilterCount: number;
}

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

function FilterSection({ title, children, isOpen, onToggle }: FilterSectionProps) {
  return (
    <div className="border-b border-[var(--border-primary)] last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between py-3 px-4 text-left hover:bg-[var(--bg-secondary)] transition-colors"
      >
        <span className="font-medium text-[var(--text-primary)]">{title}</span>
        <svg
          className={`w-5 h-5 text-[var(--text-secondary)] transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}

interface CheckboxGroupProps<T extends string> {
  options: readonly T[];
  labels: Record<T, string>;
  selected: T[];
  onChange: (values: T[]) => void;
}

function CheckboxGroup<T extends string>({
  options,
  labels,
  selected,
  onChange,
}: CheckboxGroupProps<T>) {
  const handleToggle = useCallback(
    (value: T) => {
      if (selected.includes(value)) {
        onChange(selected.filter((v) => v !== value));
      } else {
        onChange([...selected, value]);
      }
    },
    [selected, onChange]
  );

  return (
    <div className="space-y-2 max-h-48 overflow-y-auto">
      {options.map((option) => (
        <label
          key={option}
          className="flex items-center gap-2 cursor-pointer hover:bg-[var(--bg-secondary)] p-1 rounded transition-colors"
        >
          <input
            type="checkbox"
            checked={selected.includes(option)}
            onChange={() => handleToggle(option)}
            className="w-4 h-4 rounded border-[var(--border-primary)] text-[var(--neon-primary)] focus:ring-[var(--neon-primary)] bg-[var(--bg-tertiary)]"
          />
          <span className="text-sm text-[var(--text-secondary)]">{labels[option]}</span>
        </label>
      ))}
    </div>
  );
}

export function FilterBar({
  filters,
  onFiltersChange,
  onClearFilters,
  hasFilters,
  activeFilterCount,
}: FilterBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    dateRange: true,
    countries: false,
    transport: false,
    service: false,
    assignment: false,
    status: false,
    financial: false,
  });

  const toggleSection = useCallback((section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  }, []);

  return (
    <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[var(--border-primary)]">
        <div className="flex items-center gap-3">
          <svg
            className="w-5 h-5 text-[var(--neon-primary)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          <h3 className="font-semibold text-[var(--text-primary)]">Filters</h3>
          {activeFilterCount > 0 && (
            <span className="px-2 py-0.5 text-xs font-medium bg-[var(--neon-primary)]/20 text-[var(--neon-primary)] rounded-full">
              {activeFilterCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {hasFilters && (
            <button
              type="button"
              onClick={onClearFilters}
              className="text-sm text-[var(--text-secondary)] hover:text-[var(--neon-accent)] transition-colors px-3 py-1.5"
            >
              Clear all
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm font-medium text-[var(--neon-primary)] hover:text-[var(--neon-secondary)] transition-colors px-3 py-1.5 rounded-lg border border-[var(--neon-primary)]/30 hover:border-[var(--neon-secondary)]/50"
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </button>
        </div>
      </div>

      {/* Filter Content */}
      {isExpanded && (
        <div className="max-h-[70vh] overflow-y-auto">
          {/* Date Range */}
          <FilterSection
            title="Date Range"
            isOpen={openSections.dateRange}
            onToggle={() => toggleSection('dateRange')}
          >
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={filters.dateRange.start || ''}
                  onChange={(e) =>
                    onFiltersChange({
                      dateRange: { ...filters.dateRange, start: e.target.value || null },
                    })
                  }
                  className="w-full px-3 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-lg text-[var(--text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--neon-primary)]/50"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={filters.dateRange.end || ''}
                  onChange={(e) =>
                    onFiltersChange({
                      dateRange: { ...filters.dateRange, end: e.target.value || null },
                    })
                  }
                  className="w-full px-3 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-lg text-[var(--text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--neon-primary)]/50"
                />
              </div>
            </div>
          </FilterSection>

          {/* Countries */}
          <FilterSection
            title="Countries"
            isOpen={openSections.countries}
            onToggle={() => toggleSection('countries')}
          >
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[var(--text-secondary)] mb-2">
                  Origin Countries (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Turkey, Germany, China"
                  value={filters.originCountries.join(', ')}
                  onChange={(e) =>
                    onFiltersChange({
                      originCountries: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  className="w-full px-3 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-lg text-[var(--text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--neon-primary)]/50"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--text-secondary)] mb-2">
                  Destination Countries (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. USA, UK, France"
                  value={filters.destinationCountries.join(', ')}
                  onChange={(e) =>
                    onFiltersChange({
                      destinationCountries: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  className="w-full px-3 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-lg text-[var(--text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--neon-primary)]/50"
                />
              </div>
            </div>
          </FilterSection>

          {/* Transport Mode */}
          <FilterSection
            title="Transport Mode"
            isOpen={openSections.transport}
            onToggle={() => toggleSection('transport')}
          >
            <CheckboxGroup<TransportMode>
              options={TRANSPORT_MODES}
              labels={TRANSPORT_MODE_LABELS}
              selected={filters.transportModes}
              onChange={(transportModes) => onFiltersChange({ transportModes })}
            />
          </FilterSection>

          {/* Service Type */}
          <FilterSection
            title="Service Type"
            isOpen={openSections.service}
            onToggle={() => toggleSection('service')}
          >
            <CheckboxGroup<ServiceType>
              options={SERVICE_TYPES}
              labels={SERVICE_TYPE_LABELS}
              selected={filters.serviceTypes}
              onChange={(serviceTypes) => onFiltersChange({ serviceTypes })}
            />
          </FilterSection>

          {/* Assignment */}
          <FilterSection
            title="Assignment & Potential"
            isOpen={openSections.assignment}
            onToggle={() => toggleSection('assignment')}
          >
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[var(--text-secondary)] mb-2">
                  Assigned Reps (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. John Doe, Jane Smith"
                  value={filters.assignedReps.join(', ')}
                  onChange={(e) =>
                    onFiltersChange({
                      assignedReps: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  className="w-full px-3 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-lg text-[var(--text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--neon-primary)]/50"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--text-secondary)] mb-2">
                  Potential
                </label>
                <CheckboxGroup<Potential>
                  options={POTENTIALS}
                  labels={POTENTIAL_LABELS}
                  selected={filters.potentials}
                  onChange={(potentials) => onFiltersChange({ potentials })}
                />
              </div>
            </div>
          </FilterSection>

          {/* Status */}
          <FilterSection
            title="Status"
            isOpen={openSections.status}
            onToggle={() => toggleSection('status')}
          >
            <CheckboxGroup<Status>
              options={STATUSES}
              labels={STATUS_LABELS}
              selected={filters.statuses}
              onChange={(statuses) => onFiltersChange({ statuses })}
            />
          </FilterSection>

          {/* Financial */}
          <FilterSection
            title="Financial"
            isOpen={openSections.financial}
            onToggle={() => toggleSection('financial')}
          >
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[var(--text-secondary)] mb-2">
                  Currency
                </label>
                <CheckboxGroup<Currency>
                  options={CURRENCIES}
                  labels={CURRENCY_LABELS}
                  selected={filters.currencies}
                  onChange={(currencies) => onFiltersChange({ currencies })}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--text-secondary)] mb-2">
                  Incoterm
                </label>
                <CheckboxGroup<Incoterm>
                  options={INCOTERMS}
                  labels={INCOTERM_LABELS}
                  selected={filters.incoterms}
                  onChange={(incoterms) => onFiltersChange({ incoterms })}
                />
              </div>
            </div>
          </FilterSection>
        </div>
      )}

      {/* Active Filters Summary */}
      {hasFilters && !isExpanded && (
        <div className="px-4 py-3 bg-[var(--bg-tertiary)] border-t border-[var(--border-primary)]">
          <div className="flex flex-wrap gap-2">
            {filters.dateRange.start && (
              <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-[var(--neon-primary)]/10 text-[var(--neon-primary)] rounded-full">
                From: {filters.dateRange.start}
                <button
                  type="button"
                  onClick={() => onFiltersChange({ dateRange: { ...filters.dateRange, start: null } })}
                  className="hover:text-[var(--neon-accent)]"
                >
                  ×
                </button>
              </span>
            )}
            {filters.dateRange.end && (
              <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-[var(--neon-primary)]/10 text-[var(--neon-primary)] rounded-full">
                To: {filters.dateRange.end}
                <button
                  type="button"
                  onClick={() => onFiltersChange({ dateRange: { ...filters.dateRange, end: null } })}
                  className="hover:text-[var(--neon-accent)]"
                >
                  ×
                </button>
              </span>
            )}
            {filters.originCountries.map((country) => (
              <span
                key={`origin-${country}`}
                className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-[var(--neon-secondary)]/10 text-[var(--neon-secondary)] rounded-full"
              >
                Origin: {country}
                <button
                  type="button"
                  onClick={() =>
                    onFiltersChange({
                      originCountries: filters.originCountries.filter((c) => c !== country),
                    })
                  }
                  className="hover:text-[var(--neon-accent)]"
                >
                  ×
                </button>
              </span>
            ))}
            {filters.destinationCountries.map((country) => (
              <span
                key={`dest-${country}`}
                className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-[var(--neon-secondary)]/10 text-[var(--neon-secondary)] rounded-full"
              >
                Dest: {country}
                <button
                  type="button"
                  onClick={() =>
                    onFiltersChange({
                      destinationCountries: filters.destinationCountries.filter((c) => c !== country),
                    })
                  }
                  className="hover:text-[var(--neon-accent)]"
                >
                  ×
                </button>
              </span>
            ))}
            {filters.transportModes.map((mode) => (
              <span
                key={`transport-${mode}`}
                className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-[var(--neon-accent)]/10 text-[var(--neon-accent)] rounded-full"
              >
                {TRANSPORT_MODE_LABELS[mode]}
                <button
                  type="button"
                  onClick={() =>
                    onFiltersChange({
                      transportModes: filters.transportModes.filter((m) => m !== mode),
                    })
                  }
                  className="hover:text-[var(--text-primary)]"
                >
                  ×
                </button>
              </span>
            ))}
            {filters.statuses.map((status) => (
              <span
                key={`status-${status}`}
                className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-blue-500/10 text-blue-400 rounded-full"
              >
                {STATUS_LABELS[status]}
                <button
                  type="button"
                  onClick={() =>
                    onFiltersChange({
                      statuses: filters.statuses.filter((s) => s !== status),
                    })
                  }
                  className="hover:text-white"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default FilterBar;
