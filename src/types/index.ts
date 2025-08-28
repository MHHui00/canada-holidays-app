export interface Holiday {
  id: number;
  date: string;
  nameEn: string;
  nameFr: string;
  federal: boolean;
  observedDate: string;
}

export interface Province {
  id: string;
  nameEn: string;
  nameFr: string;
  sourceLink: string;
  sourceEn: string;
  holidays: Holiday[];
}

export interface HolidayApiResponse {
  province: Province;
}

export interface DateRange {
  startDate: string | null;
  endDate: string | null;
}

export interface HolidayStore {
  selectedProvince: string;
  dateRange: DateRange;
  holidays: Holiday[];
  isLoading: boolean;
  error: string | null;
  setSelectedProvince: (province: string) => void;
  setDateRange: (range: DateRange) => void;
  fetchHolidays: (province: string, year?: number) => Promise<void>;
  clearError: () => void;
}

export const PROVINCE_OPTIONS = [
  { value: 'AB', label: 'Alberta' },
  { value: 'BC', label: 'British Columbia' },
  { value: 'MB', label: 'Manitoba' },
  { value: 'NB', label: 'New Brunswick' },
  { value: 'NL', label: 'Newfoundland and Labrador' },
  { value: 'NS', label: 'Nova Scotia' },
  { value: 'NT', label: 'Northwest Territories' },
  { value: 'NU', label: 'Nunavut' },
  { value: 'ON', label: 'Ontario' },
  { value: 'PE', label: 'Prince Edward Island' },
  { value: 'QC', label: 'Quebec' },
  { value: 'SK', label: 'Saskatchewan' },
  { value: 'YT', label: 'Yukon' },
] as const;