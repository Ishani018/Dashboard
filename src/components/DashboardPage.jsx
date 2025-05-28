import React, { useEffect, useState } from 'react';
import { Layout, Spin, message } from 'antd';
import DataCard from './DataCard';
import SidebarTabs from './SidebarTabs';
import MainTabs from './MainTabs';
import GaugeChart from './GaugeChart';

const { Sider, Content } = Layout;

const DashboardPage = () => {
  const [data, setData] = useState(null);
  const [tabKeys, setTabKeys] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://dummyjson.com/c/fce7-da87-4904-b310')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch data');
        return res.json();
      })
      .then((json) => {
        const keys = Object.keys(json).filter((key) => key.endsWith('Data') && key !== 'sidebarData');
        setTabKeys(keys);
        setData(json);
        setActiveTab(keys[1]); // Set default tab
      })
      .catch((err) => {
        console.error(err);
        message.error('Error fetching data');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading || !data || !activeTab) {
    return (
      <div style={{ padding: '100px', textAlign: 'center' }}>
        <Spin size="large" />
      </div>
    );
  }

  const currentStats = data?.[activeTab]?.stats || [];

  return (
    <Layout>
      <Layout>
        <Content style={{ flex: 3 }}>
          <MainTabs
            tabKeys={tabKeys}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '30px',
              backgroundColor: '#000000',
              gap: '30px',
              minHeight: '100vh',
              width: '99vw',
            }}
          >
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              {currentStats.map((stat) => (
                <DataCard
                  key={stat.id}
                  unit={stat.unit}
                  value={stat.value}
                  label={stat.label}
                />
              ))}
            </div>

            {activeTab === 'tab2Data' && (
              <div style={{ marginLeft: '15px', marginTop: '20px' }}>
                <GaugeChart />
              </div>
            )}
          </div>
        </Content>

        <Sider width={300} style={{ background: '#3d3d3d', padding: '16px' }}>
          <SidebarTabs data={data.sidebarData} />
        </Sider>
      </Layout>
    </Layout>
  );
};

export default DashboardPage;
