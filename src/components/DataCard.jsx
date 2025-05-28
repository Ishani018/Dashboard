import React from 'react';
import { Card } from 'antd';

const DataCard = ({ unit, value, label }) => {
  return (
    <div
      style={{
        padding: '11px',
        borderRadius: '20px',
        background: 'radial-gradient(circle at top right, #262626, #171717)', // fake border with gradient
        width: 209, // outer box slightly larger
        height: 270,
        margin: '20px',
      }}
    >
      <Card
        style={{
          background: 'radial-gradient(circle at bottom left, #1c1c1c, #181818)',
          color: '#cbd5e1',
          width: '100%',
          height: '100%',
          borderRadius: '16px',
          boxShadow: 'inset 0 0 8px #171717, 0 4px 10px rgba(0, 0, 0, 0.6)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          border: 'none',
        }}
        bodyStyle={{
          padding: '10px',
        }}
      >
        <div style={{ fontSize: '12px', color: 'white', marginBottom: '4px' }}>{unit}</div>
        <div style={{ fontSize: '16px', fontWeight: 500 }}>{parseFloat(value).toFixed(2)}</div>
        <div style={{ fontSize: '12px', color: '#93c5fd', marginTop: '4px' }}>{label}</div>
      </Card>
    </div>
  );
};

export default DataCard;
