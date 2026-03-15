/**
 * Hook for persisting filter state in URL query parameters
 */

'use client';

import { useCallback, useMemo } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import {
  FilterState,
  TRANSPORT_MODES,
  SERVICE_TYPES,
  POTENTIALS,
  STATUSES,
  CURRENCIES,
  INCOTERMS,
} from './types';

const FILTER_KEYS = {
  dateStart: 'ds',
  dateEnd: 'de',
  originCountries: 'oc',
  destinationCountries: 'dc',
  transportModes: 'tm',
  serviceTypes: 'st',
  assignedReps: 'ar',
  potentials: 'po',
  statuses: 'ss',
  currencies: 'cu',
  incoterms: 'ic',
} as const;

function parseArrayParam(value: string | null): string[] {
  if (!value) return [];
  return value.split(',').filter(Boolean);
}

function parseEnumArrayParam<T extends string>(
  value: string | null,
  validValues: readonly T[]
): T[] {
  const parsed = parseArrayParam(value);
  return parsed.filter((v): v is T => validValues.includes(v as T));
}

function serializeArrayParam(value: string[]): string | null {
  if (value.length === 0) return null;
  return value.join(',');
}

export function useUrlFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters = useMemo<FilterState>(() => {
    return {
      dateRange: {
        start: searchParams.get(FILTER_KEYS.dateStart) || null,
        end: searchParams.get(FILTER_KEYS.dateEnd) || null,
      },
      originCountries: parseArrayParam(searchParams.get(FILTER_KEYS.originCountries)),
      destinationCountries: parseArrayParam(searchParams.get(FILTER_KEYS.destinationCountries)),
      transportModes: parseEnumArrayParam(searchParams.get(FILTER_KEYS.transportModes), TRANSPORT_MODES),
      serviceTypes: parseEnumArrayParam(searchParams.get(FILTER_KEYS.serviceTypes), SERVICE_TYPES),
      assignedReps: parseArrayParam(searchParams.get(FILTER_KEYS.assignedReps)),
      potentials: parseEnumArrayParam(searchParams.get(FILTER_KEYS.potentials), POTENTIALS),
      statuses: parseEnumArrayParam(searchParams.get(FILTER_KEYS.statuses), STATUSES),
      currencies: parseEnumArrayParam(searchParams.get(FILTER_KEYS.currencies), CURRENCIES),
      incoterms: parseEnumArrayParam(searchParams.get(FILTER_KEYS.incoterms), INCOTERMS),
    };
  }, [searchParams]);

  const setFilters = useCallback(
    (newFilters: Partial<FilterState>) => {
      const params = new URLSearchParams(searchParams.toString());

      // Date range
      if (newFilters.dateRange) {
        if (newFilters.dateRange.start !== undefined) {
          if (newFilters.dateRange.start) {
            params.set(FILTER_KEYS.dateStart, newFilters.dateRange.start);
          } else {
            params.delete(FILTER_KEYS.dateStart);
          }
        }
        if (newFilters.dateRange.end !== undefined) {
          if (newFilters.dateRange.end) {
            params.set(FILTER_KEYS.dateEnd, newFilters.dateRange.end);
          } else {
            params.delete(FILTER_KEYS.dateEnd);
          }
        }
      }

      // Arrays
      if (newFilters.originCountries !== undefined) {
        const value = serializeArrayParam(newFilters.originCountries);
        if (value) {
          params.set(FILTER_KEYS.originCountries, value);
        } else {
          params.delete(FILTER_KEYS.originCountries);
        }
      }

      if (newFilters.destinationCountries !== undefined) {
        const value = serializeArrayParam(newFilters.destinationCountries);
        if (value) {
          params.set(FILTER_KEYS.destinationCountries, value);
        } else {
          params.delete(FILTER_KEYS.destinationCountries);
        }
      }

      if (newFilters.transportModes !== undefined) {
        const value = serializeArrayParam(newFilters.transportModes);
        if (value) {
          params.set(FILTER_KEYS.transportModes, value);
        } else {
          params.delete(FILTER_KEYS.transportModes);
        }
      }

      if (newFilters.serviceTypes !== undefined) {
        const value = serializeArrayParam(newFilters.serviceTypes);
        if (value) {
          params.set(FILTER_KEYS.serviceTypes, value);
        } else {
          params.delete(FILTER_KEYS.serviceTypes);
        }
      }

      if (newFilters.assignedReps !== undefined) {
        const value = serializeArrayParam(newFilters.assignedReps);
        if (value) {
          params.set(FILTER_KEYS.assignedReps, value);
        } else {
          params.delete(FILTER_KEYS.assignedReps);
        }
      }

      if (newFilters.potentials !== undefined) {
        const value = serializeArrayParam(newFilters.potentials);
        if (value) {
          params.set(FILTER_KEYS.potentials, value);
        } else {
          params.delete(FILTER_KEYS.potentials);
        }
      }

      if (newFilters.statuses !== undefined) {
        const value = serializeArrayParam(newFilters.statuses);
        if (value) {
          params.set(FILTER_KEYS.statuses, value);
        } else {
          params.delete(FILTER_KEYS.statuses);
        }
      }

      if (newFilters.currencies !== undefined) {
        const value = serializeArrayParam(newFilters.currencies);
        if (value) {
          params.set(FILTER_KEYS.currencies, value);
        } else {
          params.delete(FILTER_KEYS.currencies);
        }
      }

      if (newFilters.incoterms !== undefined) {
        const value = serializeArrayParam(newFilters.incoterms);
        if (value) {
          params.set(FILTER_KEYS.incoterms, value);
        } else {
          params.delete(FILTER_KEYS.incoterms);
        }
      }

      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams]
  );

  const clearFilters = useCallback(() => {
    router.push(pathname);
  }, [pathname, router]);

  const hasFilters = useMemo(() => {
    return (
      filters.dateRange.start !== null ||
      filters.dateRange.end !== null ||
      filters.originCountries.length > 0 ||
      filters.destinationCountries.length > 0 ||
      filters.transportModes.length > 0 ||
      filters.serviceTypes.length > 0 ||
      filters.assignedReps.length > 0 ||
      filters.potentials.length > 0 ||
      filters.statuses.length > 0 ||
      filters.currencies.length > 0 ||
      filters.incoterms.length > 0
    );
  }, [filters]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.dateRange.start || filters.dateRange.end) count++;
    if (filters.originCountries.length > 0) count++;
    if (filters.destinationCountries.length > 0) count++;
    if (filters.transportModes.length > 0) count++;
    if (filters.serviceTypes.length > 0) count++;
    if (filters.assignedReps.length > 0) count++;
    if (filters.potentials.length > 0) count++;
    if (filters.statuses.length > 0) count++;
    if (filters.currencies.length > 0) count++;
    if (filters.incoterms.length > 0) count++;
    return count;
  }, [filters]);

  return {
    filters,
    setFilters,
    clearFilters,
    hasFilters,
    activeFilterCount,
  };
}

export type UseUrlFiltersReturn = ReturnType<typeof useUrlFilters>;
