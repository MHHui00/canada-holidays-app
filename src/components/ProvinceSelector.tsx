import { Select, Typography } from 'antd';
import { useHolidayStore } from '../stores/useHolidayStore';

const PROVINCE_OPTIONS = [
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
  // { value: 'INVALID', label: 'Testing wrong province code' },
];

const { Text } = Typography;

const ProvinceSelector = () => {
  const { selectedProvince, setSelectedProvince } = useHolidayStore();

  return (
    <div style={{ minWidth: 200 }}>
      <Text strong>Province/Territory:</Text>
      <Select
        value={selectedProvince}
        onChange={setSelectedProvince}
        style={{ width: '100%', marginTop: 8 }}
        size="large"
        placeholder="Select a province"
        showSearch
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
        options={PROVINCE_OPTIONS}
      />
    </div>
  );
};

export default ProvinceSelector;