import React from 'react';
import { Tabs } from 'antd';

const MainTabs = ({ tabKeys, activeTab, onTabChange }) => {
  const items = tabKeys.map((key) => {
    const tabNumber = key.match(/\d+/)?.[0] || '';
    return {
      key,
      label: `Tab ${tabNumber}`,
    };
  });

  return (
    <Tabs
      className="custom-tabs"
      items={items}
      activeKey={activeTab}
      onChange={onTabChange}
      tabBarStyle={{
        backgroundColor: 'black',
        marginBottom: 0,
      }}
    />
  );
};

export default MainTabs;
