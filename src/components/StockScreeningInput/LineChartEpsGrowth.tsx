"use client"
import React from 'react';
import ReactECharts from 'echarts-for-react';

const LineChartEPSGrowth = () => {
  const years = ['2020', '2021', '2022', '2023', '2024'];

  const stockEPSGrowthData = {
    AAPL: [10, 12, 15, 18, 20],
    MSFT: [8, 10, 14, 16, 19],
    GOOGL: [12, 14, 17, 20, 22],
    AMZN: [9, 11, 13, 15, 17],
    TSLA: [15, 18, 21, 23, 25],
  };

  const stockColors = {
    AAPL: '#ff7c7c',
    MSFT: '#7cafff',
    GOOGL: '#7cffd1',
    AMZN: '#ffd97c',
    TSLA: '#d07cff',
  };

  const series = Object.entries(stockEPSGrowthData).map(([name, data]) => ({
    name,
    data,
    type: 'line',
    // smooth: true,
    symbol: 'none',
    lineStyle: {
      width: 3,
    },
    itemStyle: {
      color: stockColors[name as keyof typeof stockColors],
    },
  }));

  const minValue = Math.min(...Object.values(stockEPSGrowthData).flat()) - 2;

  const option = {
    title: {
      text: 'EPS Growth Over Last 5 Years',
      left: 'center',
      textStyle: {
        color: 'white',
        fontSize: 20,
      },
      bottom: '0',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      top: '1%',
      textStyle: {
        color: 'white',
      },
      data: Object.keys(stockEPSGrowthData),
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
        color: '#999',
      },
      type: 'category',
      data: years,
    },
    yAxis: {
      min: minValue,
      splitLine: {
        lineStyle: {
          type: 'dotted',
          width: 0.3,
          color: '#999',
        },
      },
      type: 'value',
      name: 'EPS Growth (%)',
    },
    series,
  };

  return <div style={{ width: '100%', maxWidth: 900, margin: 'auto', backgroundColor: '#0d0d14', padding: 20, borderRadius: 8 }}>
    <ReactECharts option={option} style={{ height: '500px' }} /></div>
};

export default LineChartEPSGrowth;
