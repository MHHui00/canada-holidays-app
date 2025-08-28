import dayjs from 'dayjs';

export const formatHolidayDate = (date: string, nameEn: string): string => {
  const dayObj = dayjs(date);
  // console.log('Formatting date:', date, nameEn);
  const dayName = dayObj.format('dddd');
  const monthName = dayObj.format('MMM');
  const day = dayObj.format('D');
  const year = dayObj.format('YYYY');
  
  return `${nameEn} on ${dayName} ${monthName} ${day}, ${year}`;
};

export const isDateInRange = (
  date: string, 
  startDate: string | null, 
  endDate: string | null
): boolean => {
  if (!startDate || !endDate) return true;
  
  const checkDate = dayjs(date);
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  
  return checkDate.isAfter(start.subtract(1, 'day')) && checkDate.isBefore(end.add(1, 'day'));
};

export const getPresetRanges = () => {
  const now = dayjs();
  
  return {
    'This Month': [now.startOf('month'), now.endOf('month')] as [dayjs.Dayjs, dayjs.Dayjs],
    'Next 3 Months': [now, now.add(3, 'month')] as [dayjs.Dayjs, dayjs.Dayjs],
    'This Year': [now.startOf('year'), now.endOf('year')] as [dayjs.Dayjs, dayjs.Dayjs],
    'Next Year': [now.add(1, 'year').startOf('year'), now.add(1, 'year').endOf('year')] as [dayjs.Dayjs, dayjs.Dayjs],
  };
};