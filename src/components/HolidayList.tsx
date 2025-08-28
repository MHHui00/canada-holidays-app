import { List, Card, Typography, Spin, Alert, Empty } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { useHolidayStore } from '../stores/useHolidayStore';
import { formatHolidayDate, isDateInRange } from '../utils/dateHelpers';

const { Text, Title } = Typography;

const HolidayList = () => {
  const { holidays, isLoading, error, dateRange, clearError } = useHolidayStore();

  // 
  const filteredHolidays = [];
  for (let i = 0; i < holidays.length; i++) {
    const holiday = holidays[i];
    if (isDateInRange(holiday.date, dateRange.startDate, dateRange.endDate)) {
      filteredHolidays.push(holiday);
    }
  }

  if (isLoading) {
    return (
      <Card>
        <div style={{ textAlign: 'center', padding: '50px 0' }}>
          <Spin size="large" />
          <div style={{ marginTop: 16 }}>
            <Text>Loading holidays...</Text>
          </div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert
        message="Error Loading Holidays"
        description={error}
        type="error"
        showIcon
        closable
        onClose={clearError}
      />
    );
  }

  if (filteredHolidays.length === 0) {
    return (
      <Card>
        <Empty 
          description="No holidays found for the selected criteria"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      </Card>
    );
  }

  return (
    <Card title={<Title level={3}>Public Holidays</Title>}>
      <List
        dataSource={filteredHolidays}
        renderItem={(holiday) => (
          <List.Item key={holiday.id}>
            <List.Item.Meta
              avatar={<CalendarOutlined style={{ fontSize: 24, color: '#ff6b6b' }} />}
              title={formatHolidayDate(holiday.date, holiday.nameEn)}
              description={
                <div>
                  <Text type="secondary">
                    {holiday.federal === 1 ? '🇨🇦 Federal Holiday' : '📍 Provincial Holiday'}
                  </Text>
                  {holiday.nameFr && holiday.nameFr !== holiday.nameEn && (
                    <div>
                      <Text italic>{holiday.nameFr}</Text>
                    </div>
                  )}
                </div>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default HolidayList;