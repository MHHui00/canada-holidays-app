import { DatePicker, Typography } from 'antd';
import dayjs from 'dayjs';
import { useHolidayStore } from '../stores/useHolidayStore';
import { getPresetRanges } from '../utils/dateHelpers';

const { RangePicker } = DatePicker;
const { Text } = Typography;

const DateRangeSelector = () => {
  const { dateRange, setDateRange } = useHolidayStore();

  const handleDateChange = (_dates: any, dateStrings: [string, string]) => {
    
    const startDate = dateStrings[0] ? dateStrings[0] : null;
    const endDate = dateStrings[1] ? dateStrings[1] : null;
    
    setDateRange({
      startDate: startDate,
      endDate: endDate,
    });
  };

  const presets = getPresetRanges();

  return (
    <div style={{ minWidth: 300 }}>
      <Text strong>Date Range:</Text>
      <RangePicker
        value={dateRange.startDate && dateRange.endDate ? [dayjs(dateRange.startDate), dayjs(dateRange.endDate)] : null}
        onChange={handleDateChange}
        style={{ width: '100%', marginTop: 8 }}
        size="large"
        allowClear
        presets={Object.entries(presets).map(([label, range]) => ({
          label,
          value: range,
        }))}
      />
    </div>
  );
};

export default DateRangeSelector;