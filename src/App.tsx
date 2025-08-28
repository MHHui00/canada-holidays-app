import { ConfigProvider, Layout, Typography } from 'antd';
import { useEffect } from 'react';
import ProvinceSelector from './components/ProvinceSelector';
import DateRangeSelector from './components/DateRangeSelector';
import HolidayList from './components/HolidayList';
import { useHolidayStore } from './stores/useHolidayStore';
import './App.css';

const { Header, Content } = Layout;
const { Title } = Typography;

function App() {
  const { selectedProvince, fetchHolidays } = useHolidayStore();

  useEffect(() => {
    fetchHolidays(selectedProvince);
  }, []);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#ff6b6b',
          borderRadius: 8,
        },
      }}
    >
      <Layout className="app-layout">
        <Header className="app-header">
          <Title level={2} style={{ color: 'white', margin: 0 }}>
            🇨🇦 Canada Public Holidays
          </Title>
        </Header>
        <Content className="app-content">
          <div className="filters-container">
            <ProvinceSelector />
            <DateRangeSelector />
          </div>
          <HolidayList />
        </Content>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
