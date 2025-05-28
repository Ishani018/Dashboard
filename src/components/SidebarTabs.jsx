import React, { useEffect, useState } from 'react';
import { Tabs, List, Spin, message } from 'antd';

const SidebarTabs = () => {
  const [sidebarData, setSidebarData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://dummyjson.com/c/fce7-da87-4904-b310')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch sidebar data');
        return res.json();
      })
      .then((json) => {
        if (!json.sidebarData) throw new Error('sidebarData missing');
        setSidebarData(json.sidebarData); // Keep it raw, use dynamically
      })
      .catch((err) => {
        console.error(err);
        message.error('Error loading sidebar data');
      })
      .finally(() => setLoading(false));
  }, []);

  // 🔁 Dynamically convert keys to tab items
  const items = Object.entries(sidebarData).map(([key, itemList]) => ({
    key,
    label: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize key
    children: (
      <List
        dataSource={itemList}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={<strong>{item.title || item.description}</strong>}
              description={item.timestamp}
            />
          </List.Item>
        )}
      />
    ),
  }));

  return (
    <div className="sidebar-wrapper">
      {loading ? (
        <Spin size="large" />
      ) : (
        <Tabs defaultActiveKey={items[0]?.key} items={items} className="sidebar-tab-style" />
      )}
    </div>
  );
};

export default SidebarTabs;
