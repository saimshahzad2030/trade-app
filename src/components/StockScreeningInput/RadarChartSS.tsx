"use client"
import React from 'react';
import ReactECharts from 'echarts-for-react';
import { Stock } from '@/types/types';
import { getSpecificStockRadarChart } from '@/services/stock.services';
import SkeletonLoader from '../Loader/SkeletonLoader';
export type FinancialIndicatorsResponse = {
  financial_indicators_data: {
    result: {
      display: {
        symbol: string;
        name: string;
        roc: number;
        grossProfitMargin: number;
        dcf: number;
        debtToEquityRatio: number;
        peRatio: number;
        eps: number;
        beta: number;
        wacc: number;
        fcff: number;
      };
      normalized: {
        roc: number;
        grossProfitMargin: number;
        debtToEquityRatio: number;
        peRatio: number;
        eps: number;
        beta: number;
        wacc: number;
        fcff: number;
      };
    };
    error: string | null;
  };
};

type ScreenerRadarProps ={
  stocks:Stock[]}
const generateColorPalette = (count: number): string[] => {
  const hues = Array.from({ length: count }, (_, i) => (i * 360) / count);
  return hues.map(h => `hsla(${h}, 70%, 60%, 0.9)`); // 0.9 is the alpha
};

const radarIndicators = [
  { name: 'ROC', key: 'roc', max: 1 },
  { name: 'PE', key: 'peRatio', max: 1 },
  { name: 'Gross Margin', key: 'grossProfitMargin', max: 1 },
  { name: 'WACC', key: 'wacc', max: 1 },
  { name: 'D/E Ratio', key: 'debtToEquityRatio', max: 1 },
  { name: 'BetaEPS', key: 'beta', max: 1 },
  { name: 'DCF', key: 'dcf', max: 1 },
  { name: 'FCFF', key: 'fcff', max: 1 },
];

const RadarChartSS = ({stocks}:ScreenerRadarProps) => {
 const [data, setData] = React.useState<FinancialIndicatorsResponse[]>([]);
    const [loading,setLoading] = React.useState(true)

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

  


  
React.useEffect(() => {
  const fetchAllStockData = async () => {
    try {
      const responses = await Promise.all(
        stocks.map((stock) =>
          getSpecificStockRadarChart(stock.symbol) // your API function
        )
      );

      // Keep only those with HTTP status 200
      const validData = responses
        .filter((res) => res.status === 200 && res.data?.financial_indicators_data?.error==null)
        .map((res) => res.data as FinancialIndicatorsResponse); // cast type if API shape guaranteed
      console.log(validData,"ValidData")
      setData(validData);
      setLoading(false)
    } catch (error) {
      console.error("Error fetching stock indicators:", error);
    }
  };

  if (stocks.length) {
    fetchAllStockData();
  }
}, [stocks]);
  const colors = generateColorPalette(data.length);
const stockData = data.map((item, i) => {
  const { display, normalized } = item.financial_indicators_data.result;

  // Extract hue from generated color to reuse in gradient
  const match = colors[i].match(/hsla?\((\d+),/);
  const hue = match ? parseInt(match[1], 10) : i * 45;

  return {
    name: display.symbol,
     realValues: radarIndicators.map(ind => display[ind.key as keyof typeof display]), // 👈 add this
  
    value: radarIndicators.map(ind => normalized[ind.key as keyof typeof normalized]),
    areaStyle: {
      color: {
        type: 'radial',
        x: 0.5,
        y: 0.5,
        r: 0.8,
        colorStops: [
          { offset: 0, color: `hsla(${hue}, 70%, 60%, 0.9)` },
          { offset: 1, color: `hsla(${hue}, 70%, 60%, 0.2)` },
        ],
        global: false,
      },
    },
    lineStyle: {
      color: stockColors[i] || colors[i],
      width: 2,
    },
    symbol: 'none',
  };
});

const option = { 
  color: stockColors,
  title: {
    text: 'Stock Financial Indicators (Normalized)',
    left: 'center',
    bottom: 0,
    textStyle: {
      fontSize: "20px",
      color: '#fff',
    },
  },
  tooltip: {
  formatter: function (params: any) {
    const point = params;
    const real = point.data.realValues;

    const rows = radarIndicators.map((ind: any, idx: number) => {
      const val = real[idx];
      const formatted =
        typeof val === 'number' ? val.toFixed(2) : String(val);
      return `${ind.name}: ${formatted}`;
    });

    return `<b>${point.name}</b><br/>${rows.join('<br/>')}`;
  },
},
  legend: {
    data: stockData.map(s => s.name),
    textStyle: {
      color: '#fff',
    },
  },
  radar: {
    indicator: radarIndicators.map(ind => ({ name: ind.name, max: ind.max })),
    name: {
      textStyle: {
        color: '#fff',
      },
    },
    splitArea: { areaStyle: {} },
    axisLine: { lineStyle: { color: '#fff' } },
    splitLine: { lineStyle: { color: '#fff' } },
  },
  series: [
    {
      name: 'Stock Comparison',
      type: 'radar',
      data: stockData,
    },
  ],
};

  // return <div className='col-span-2'>
  //   <ReactECharts option={option} style={{ height: '500px' }} />
  //   {data.map((d)=>(<p className='bg-red-300 h-[100px] w-[100px]'>{d.financial_indicators_data.result.normalized.beta}</p>))}
  // </div>;
  return (
  <div className="col-span-2">
    {loading ? (
      <SkeletonLoader className='h-[500px] w-full bg-gray-700'/>
    ) : data.length > 0 ? (
      <ReactECharts option={option} style={{ height: '500px' }} />
    ) : (
      <p className="text-white">No valid stock data available to display radar chart.</p>
    )}
  </div>
);

};

export default RadarChartSS;
