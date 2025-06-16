"use client"
import React from 'react';
import ReactECharts from 'echarts-for-react';

const LineChartRevenueGrowth = () => {
  const years = ['2020', '2021', '2022', '2023', '2024'];

  const stockRevenueGrowthData = {
    AAPL: [5, 7, 9, 10, 12],
    MSFT: [6, 8, 11, 13, 15],
    GOOGL: [7, 9, 12, 14, 16],
    AMZN: [10, 12, 15, 17, 20],
    TSLA: [12, 15, 18, 20, 23],
  };

  const stockColors = {
    AAPL: '#ff7c7c',
    MSFT: '#7cafff',
    GOOGL: '#7cffd1',
    AMZN: '#ffd97c',
    TSLA: '#d07cff',
  };

  const series = Object.entries(stockRevenueGrowthData).map(([name, data]) => ({
    name,
    data,
    type: 'line',
    symbol: 'none',
    lineStyle: {
      width: 3,
    },
    itemStyle: {
      color: stockColors[name as keyof typeof stockColors],
    },
  }));

  const minValue = Math.min(...Object.values(stockRevenueGrowthData).flat()) - 2;

  const option = {
    title: {
      text: 'Revenue Growth Over Last 5 Years',
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
      data: Object.keys(stockRevenueGrowthData),
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
      name: 'Revenue Growth (%)',
    },
    series,
  };

  return <div style={{ width: '100%', maxWidth: 900, margin: 'auto', backgroundColor: '#0d0d14', padding: 20, borderRadius: 8 }}>
    <ReactECharts option={option} style={{ height: '500px' }} /></div>
};

export default LineChartRevenueGrowth;
