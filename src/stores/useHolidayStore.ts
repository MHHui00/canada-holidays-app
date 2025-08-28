import { create } from 'zustand';
import { holidayApi } from '../services/holidayApi';

interface Holiday {
  id: number;
  date: string;
  nameEn: string;
  nameFr: string;
  federal: number;
  observedDate: string;
}

interface DateRange {
  startDate: string | null;
  endDate: string | null;
}

interface HolidayStore {
  selectedProvince: string;
  dateRange: DateRange;
  holidays: Holiday[];
  isLoading: boolean;
  error: string | null;
  setSelectedProvince: (province: string) => void;
  setDateRange: (range: DateRange) => void;
  fetchHolidays: (province: string, year?: number) => Promise<void>;
  fetchHolidaysForDateRange: (province: string, startYear: number, endYear: number) => Promise<void>;
  clearError: () => void;
}

export const useHolidayStore = create<HolidayStore>((set, get) => ({
  selectedProvince: 'ON',
  // selectedProvince: 'INVALID', 
  dateRange: {
    startDate: null,
    endDate: null,
  },
  holidays: [],
  isLoading: false,
  error: null,

  setSelectedProvince: (province: string) => {
    set({ selectedProvince: province });
    get().fetchHolidays(province);
  },

  setDateRange: (range: DateRange) => {
    const newRange = { dateRange: range };
    set(newRange);
    
    
    const { selectedProvince } = get();
    if (range.startDate && range.endDate) {
      const startYear = new Date(range.startDate).getFullYear();
      const endYear = new Date(range.endDate).getFullYear();
      
      
      get().fetchHolidaysForDateRange(selectedProvince, startYear, endYear);
    } else {
      // 沒有選擇日期就用現在年份
      get().fetchHolidays(selectedProvince);
    }
  },

  fetchHolidays: async (province: string, year?: number) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await holidayApi.getHolidays(province, year);
      set({ 
        holidays: response.province.holidays,
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        isLoading: false,
        holidays: []
      });
    }
  },

  fetchHolidaysForDateRange: async (province: string, startYear: number, endYear: number) => {
    set({ isLoading: true, error: null });
    
    try {
      // 獲取多個年份，逐個請求
      const allHolidays = [];
      for (let year = startYear; year <= endYear; year++) {
        const response = await holidayApi.getHolidays(province, year);
        allHolidays.push(...response.province.holidays);
      }
      
      set({ 
        holidays: allHolidays,
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        isLoading: false,
        holidays: []
      });
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));