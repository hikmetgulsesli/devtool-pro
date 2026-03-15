/**
 * Filter types for the global filtering system
 */

export interface FilterState {
  dateRange: {
    start: string | null;
    end: string | null;
  };
  originCountries: string[];
  destinationCountries: string[];
  transportModes: TransportMode[];
  serviceTypes: ServiceType[];
  assignedReps: string[];
  potentials: Potential[];
  statuses: Status[];
  currencies: Currency[];
  incoterms: Incoterm[];
}

export type TransportMode = 'sea' | 'air' | 'road' | 'rail' | 'multimodal';
export type ServiceType = 'ftl' | 'ltl' | 'fcl' | 'lcl' | 'charter' | 'courier';
export type Potential = 'high' | 'medium' | 'low';
export type Status = 'draft' | 'pending' | 'confirmed' | 'in_transit' | 'delivered' | 'cancelled';
export type Currency = 'USD' | 'EUR' | 'GBP' | 'TRY' | 'CNY';
export type Incoterm = 'EXW' | 'FCA' | 'FAS' | 'FOB' | 'CFR' | 'CIF' | 'CPT' | 'CIP' | 'DAP' | 'DPU' | 'DDP';

export const TRANSPORT_MODES: TransportMode[] = ['sea', 'air', 'road', 'rail', 'multimodal'];
export const SERVICE_TYPES: ServiceType[] = ['ftl', 'ltl', 'fcl', 'lcl', 'charter', 'courier'];
export const POTENTIALS: Potential[] = ['high', 'medium', 'low'];
export const STATUSES: Status[] = ['draft', 'pending', 'confirmed', 'in_transit', 'delivered', 'cancelled'];
export const CURRENCIES: Currency[] = ['USD', 'EUR', 'GBP', 'TRY', 'CNY'];
export const INCOTERMS: Incoterm[] = ['EXW', 'FCA', 'FAS', 'FOB', 'CFR', 'CIF', 'CPT', 'CIP', 'DAP', 'DPU', 'DDP'];

export const DEFAULT_FILTER_STATE: FilterState = {
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
};

export interface FilterOption<T = string> {
  value: T;
  label: string;
}

export const TRANSPORT_MODE_LABELS: Record<TransportMode, string> = {
  sea: 'Sea',
  air: 'Air',
  road: 'Road',
  rail: 'Rail',
  multimodal: 'Multimodal',
};

export const SERVICE_TYPE_LABELS: Record<ServiceType, string> = {
  ftl: 'FTL (Full Truckload)',
  ltl: 'LTL (Less Than Truckload)',
  fcl: 'FCL (Full Container Load)',
  lcl: 'LCL (Less Than Container Load)',
  charter: 'Charter',
  courier: 'Courier',
};

export const POTENTIAL_LABELS: Record<Potential, string> = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

export const STATUS_LABELS: Record<Status, string> = {
  draft: 'Draft',
  pending: 'Pending',
  confirmed: 'Confirmed',
  in_transit: 'In Transit',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

export const CURRENCY_LABELS: Record<Currency, string> = {
  USD: 'USD ($)',
  EUR: 'EUR (€)',
  GBP: 'GBP (£)',
  TRY: 'TRY (₺)',
  CNY: 'CNY (¥)',
};

export const INCOTERM_LABELS: Record<Incoterm, string> = {
  EXW: 'EXW - Ex Works',
  FCA: 'FCA - Free Carrier',
  FAS: 'FAS - Free Alongside Ship',
  FOB: 'FOB - Free On Board',
  CFR: 'CFR - Cost and Freight',
  CIF: 'CIF - Cost, Insurance and Freight',
  CPT: 'CPT - Carriage Paid To',
  CIP: 'CIP - Carriage and Insurance Paid To',
  DAP: 'DAP - Delivered at Place',
  DPU: 'DPU - Delivered at Place Unloaded',
  DDP: 'DDP - Delivered Duty Paid',
};
