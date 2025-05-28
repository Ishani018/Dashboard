import React, { useEffect, useState } from 'react';
import Highcharts, { color } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Spin, message } from 'antd';

const GaugeChart = () => {
  const [modulesLoaded, setModulesLoaded] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState(null);
  const [loadData, setLoadData] = useState({ value: null, label: '' });


  useEffect(() => {
    async function loadModules() {
      try {
        const HighchartsMoreModule = await import('highcharts/highcharts-more');
        const SolidGaugeModule = await import('highcharts/modules/solid-gauge');

        const HighchartsMore = HighchartsMoreModule.default || HighchartsMoreModule;
        const SolidGauge = SolidGaugeModule.default || SolidGaugeModule;

        if (typeof HighchartsMore === 'function') {
          HighchartsMore(Highcharts);
        }

        if (typeof SolidGauge === 'function') {
          SolidGauge(Highcharts);
        }

        setModulesLoaded(true);
      } catch (err) {
        console.error('Error loading Highcharts modules:', err);
        setError('Failed to load chart modules');
      }
    }

    loadModules();
  }, []);

  useEffect(() => {
    if (!modulesLoaded) return;

    setLoadingData(true);
    fetch('https://dummyjson.com/c/fce7-da87-4904-b310')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch data');
        return res.json();
      })



      .then(json => {
        const loadStat = json?.tab2Data?.stats?.find(stat => stat.id === 'load');
        setLoadData({ value: loadStat.value, label: loadStat.label });
        setLoadingData(false);
      })



      .catch(err => {
        setError(err.message);
        setLoadingData(false);
        message.error('Error fetching data');
      });
  }, [modulesLoaded]);

  if (error) {
    return <div className="gauge-widget-error">Error: {error}</div>;
  }

  if (!modulesLoaded || loadingData) {
    return (
      <div>
        <Spin></Spin>  
      </div>
    );
  }
  const yAxisMax = loadData.value <= 50 ? 50 : 100;

  const options = {
    chart: {
      type: 'gauge',
      backgroundColor: 'transparent',
      height: 212,
    },
    title: { text: '' },
    pane: {
      
      startAngle: -120,
      endAngle: 120,
      background: [{
        backgroundColor: '#222',
        borderWidth:0,
        outerRadius: '105%',
        innerRadius: '85%',
        shape: 'arc',
        
      }],
    },
    yAxis: {
      min: 0,
      max: loadData.value <= 50 ? 50 : 100,
      tickInterval: 5,
      labels: {
        style: {
          color: '#fff',
          fontSize: '10px',
        },
      
    
      },
      tickLength: 17,
      tickPosition: 'inside',
      tickColor: '#fff',
      plotBands: [
        { from: yAxisMax-10, to: yAxisMax, color: '#DF5353' },
      ],
      lineWidth: 0,
    },
    series: [{
      name: 'Load',
      data: [loadData.value],
      tooltip: { valueSuffix: '%' },
      dial: {
        radius: '90%',
        backgroundColor: '#ff9500',
        baseWidth: 10,
        topWidth: 0,
        baseLength: '0%',
        rearLength: 20,
      },
      pivot: {
        backgroundColor: '#333',
        radius: 8,
        borderWidth: 2,
        borderColor: '#999',
      },
      dataLabels: {
        enabled: false,
      },
    }],
    credits: { enabled: false },
  };

  return (
    <div
      style={{
        padding: '11px',
        borderRadius: '20px',
        background: 'radial-gradient(circle at top right, #262626, #171717)',
        width: 209,
        height: 270,
        margin: '7px',
      }}
    >
      <div
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
          padding: '10px',
        }}
      >
        <HighchartsReact highcharts={Highcharts} options={options} />
        <div style={{ marginTop: '-40px', color: '#ddd', fontWeight: 'bold', fontSize: '18px' }}>
          {loadData.value.toFixed(2)}%
        </div>


        <div style={{ fontSize: '14px', color: '#6ca0ff', fontWeight: 500 }}>
          {loadData.label}
        </div>


      </div>
    </div>
  );
};

export default GaugeChart;
