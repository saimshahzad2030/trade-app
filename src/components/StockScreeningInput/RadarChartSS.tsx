"use client"
import React from 'react';
import ReactECharts from 'echarts-for-react';

const RadarChartSS = () => {
  const stockColors = [
    '#ff7c7c', // AAPL
    '#7cafff', // MSFT
    '#7cffd1', // GOOGL
    '#ffd97c', // AMZN
    '#d07cff', // TSLA
  ];

  const gradientFills = [
    ['#ff7c7c', '#ffbcbc'],
    ['#7cafff', '#bcd9ff'],
    ['#7cffd1', '#bcfff0'],
    ['#ffd97c', '#fff1bc'],
    ['#d07cff', '#ebbcff'],
  ];

  const stockData = [
    { name: 'AAPL', value: [25, 35, 60, 9, 1.2, 1.3, 250, 70] },
    { name: 'MSFT', value: [22, 30, 65, 8.5, 1.0, 1.5, 240, 68] },
    { name: 'GOOGL', value: [18, 28, 55, 10, 0.9, 1.6, 220, 60] },
    { name: 'AMZN', value: [20, 60, 40, 11, 2.1, 1.9, 180, 50] },
    { name: 'TSLA', value: [28, 90, 30, 12, 2.8, 2.2, 150, 40] },
  ];

  const radarData = stockData.map((stock, i) => ({
    ...stock,
    areaStyle: {
      color: {
        type: 'radial',
        x: 0.5,
        y: 0.5,
        r: 0.8,
        colorStops: [
          { offset: 0, color: gradientFills[i][0] },
          { offset: 1, color: gradientFills[i][1] },
        ],
        global: false,
      },
      opacity: 0.6,
    },
    lineStyle: {
      color: stockColors[i],
      width: 2,
    },
    symbol: 'none',
  }));

  const option = { 
    color: stockColors, // 🔥 Assign radar line/legend colors
    title: {
      text: 'Stock Financial Indicators (Gradient Filled)',
       left: 'center', // 👈 Center title
      bottom: 0,
      textStyle: {
        fontSize:"20px",
        color: '#fff',
      },
    },
    tooltip: {},
    legend: {
      data: stockData.map(s => s.name),
      textStyle: {
        color: '#fff',
      },
    },
    radar: {
        
      indicator: [
        { name: 'ROC', max: 30 },
        { name: 'PE', max: 100 },
        { name: 'Gross Margin', max: 80 },
        { name: 'WACC', max: 15 },
        { name: 'D/E Ratio', max: 3 },
        { name: 'BetaEPS', max: 5 },
        { name: 'DCF', max: 300 },
        { name: 'FCFF', max: 100 },
      ],
      name: {
        textStyle: {
          color: '#fff',
        },
      },
      splitArea: {
        areaStyle: {},
      },
      axisLine: {
        lineStyle: {
          color: '#fff',
        },
      },
      splitLine: {
        lineStyle: {
          color: '#fff',
        },
      },
    },
    series: [
      {
        name: 'Stock Comparison',
        type: 'radar',
        data: radarData,
      },
    ],
  };

  return <div className='col-span-2'>
    <ReactECharts option={option} style={{ height: '500px' }} />
  </div>;
};

export default RadarChartSS;
