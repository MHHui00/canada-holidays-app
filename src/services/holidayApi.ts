import axios from 'axios';

const BASE_URL = 'https://canada-holidays.ca/api/v1';

interface Holiday {
  id: number;
  date: string;
  nameEn: string;
  nameFr: string;
  federal: number;
  observedDate: string;
}

interface Province {
  id: string;
  nameEn: string;
  nameFr: string;
  sourceLink: string;
  sourceEn: string;
  holidays: Holiday[];
}

interface HolidayApiResponse {
  province: Province;
}

export const holidayApi = {
  async getHolidays(province: string, year: number = new Date().getFullYear()): Promise<HolidayApiResponse> {
    if (year < 2014 || year > 2035) {
      throw new Error(`Year ${year} is not supported by the Canada Holidays API. Please select a year between 2014 and 2035.`);
    }
    
    try {
      const response = await axios.get(`${BASE_URL}/provinces/${province}`, {
        params: { year },
        timeout: 10000,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        
        if (status === 404) {
          throw new Error(`Province code "${province}" is invalid. Please select a valid Canadian province or territory.`);
        } else if (status === 400) {
          throw new Error(error.response?.data?.message || `Invalid request for ${province} in year ${year}.`);
        } else if (error.code === 'ECONNABORTED') {
          throw new Error('Request timed out. Please check your internet connection.');
        } else if (error.code === 'ERR_NETWORK') {
          throw new Error('Network error. Please check your internet connection.');
        }
        
        throw new Error(error.response?.data?.message || 'Failed to fetch holidays');
      }
      throw new Error('Unknown error occurred while fetching holidays');
    }
  },

  async getAllProvinces(): Promise<any> {
    try {
      const response = await axios.get(`${BASE_URL}/provinces`, {
        timeout: 10000,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to fetch provinces');
      }
      throw new Error('Unknown error occurred while fetching provinces');
    }
  },
};