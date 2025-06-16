"use client"
import React from 'react';
import ReactECharts from 'echarts-for-react';

const LineChartGrossProfit = () => {
  const years = ['2020', '2021', '2022', '2023', '2024'];

  // Dummy gross profit data (in billions USD)
  const stockGrossProfitData = {
    AAPL: [104, 110, 120, 125, 130],
    MSFT: [96, 102, 110, 115, 118],
    GOOGL: [89, 95, 100, 105, 108],
    AMZN: [75, 82, 90, 95, 98],
    TSLA: [18, 25, 34, 40, 42],
  };

  const stockColors = {
    AAPL: '#ff7c7c',
    MSFT: '#7cafff',
    GOOGL: '#7cffd1',
    AMZN: '#ffd97c',
    TSLA: '#d07cff',
  };

  const series = Object.entries(stockGrossProfitData).map(([name, data]) => ({
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

  const option = {
   title: {
      text: 'Gross Profit Over Last 5 Years',
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
      data: Object.keys(stockGrossProfitData),
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
      min: Math.min(...Object.values(stockGrossProfitData).flat()) - 5,
      splitLine: {
        lineStyle: {
          type: 'dotted',
          width: 0.3,
          color: '#999',
        },
      },
      type: 'value',
      name: 'Gross Profit (Billion USD)',
    },
    series,
  };

  return (
    <div style={{ width: '100%', maxWidth: 900, margin: 'auto', backgroundColor: '#0d0d14', padding: 20, borderRadius: 8 }}>
      <ReactECharts option={option} style={{ height: '500px' }} />
    </div>
  );
};

export default LineChartGrossProfit;
