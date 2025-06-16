"use client"
import React from 'react';
import ReactECharts from 'echarts-for-react';

const LineChartROC = () => {
  const years = ['2020', '2021', '2022', '2023', '2024'];

  // Dummy ROC data (in %)
  const stockROCData = {
    AAPL: [20, 23, 25, 26, 25],
    MSFT: [18, 20, 22, 23, 22],
    GOOGL: [16, 17, 19, 20, 18],
    AMZN: [14, 18, 21, 20, 19],
    TSLA: [12, 22, 28, 30, 28],
  };
  
  const stockColors = {
    AAPL: '#ff7c7c',
    MSFT: '#7cafff',
    GOOGL: '#7cffd1',
    AMZN: '#ffd97c',
    TSLA: '#d07cff',
  };

  const series = Object.entries(stockROCData).map(([name, data]) => ({
    name,
    data,
    type: 'line',
    // smooth: true,
    symbol: 'none',
    lineStyle: {
      width: 3,
    },
    itemStyle: {
      color:stockColors[name as keyof typeof stockColors],
    },
  }));

  const option = { 
    title: {
      text: 'ROC Over Last 5 Years',
      left: 'center',
      textStyle: {
        color: 'white',
        fontSize: 20,
      },
      bottom:'0'
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      top: '1%',
       textStyle: {
        color: 'white', 
      },
      data: Object.keys(stockROCData),
    },
    grid: {
      left: '10%',
      right: '10%',
      bottom: '15%',
    },
    xAxis: {
        boundaryGap: false, 
              lineStyle: {
    type: 'dotted',
    width: 0.5,
    color: '#999', // or any subtle gray
  },
      type: 'category',
      data: years,
    },
    yAxis: {
        min: Math.min(...Object.values(stockROCData).flat())-2,
   splitLine: {
      lineStyle: {
        type: 'dotted', // 👈 dotted lines
        width: 0.3,      // 👈 thin stroke
        color: '#999',   // 👈 light gray
      },
    },
      type: 'value',
      name: 'ROC (%)',
    },
    series,
  };

  return <div style={{ width: '100%', maxWidth: 900, margin: 'auto', backgroundColor: '#0d0d14', padding: 20, borderRadius: 8 }}>
    <ReactECharts option={option} style={{ height: '500px' }} />
    </div>
};

export default LineChartROC;
