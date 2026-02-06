'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Margin,
} from 'recharts';
import { useMemo } from 'react';
import { useTheme } from '@mui/material/styles';
import { ChartData, ChartDataPoint } from './types';
import { getRandomBarColor } from './helpers';
import locale from '../../../_locale/en-US';
import get from 'lodash/get';

interface PropTypes {
  chartData: ChartData;
  margin?: Partial<Margin>;
}

const Chart = ({
  chartData,
  margin = { top: 20, right: 30, left: 0, bottom: 20 },
}: PropTypes) => {
  const theme = useTheme();

  const { data, barKeys } = useMemo(() => {
    return Object.entries(chartData)
      .reduce<{ data: ChartDataPoint[], barKeys: string[]; }>(
        (_chartParams, [name, values]) => {
          return {
            data: [
              ..._chartParams.data,
              {
                name: get(locale.charts, name, 'Chart'),
                ...values,
              },
            ],
            barKeys: [
              ..._chartParams.barKeys,
              ...Object.keys(values),
            ],
          };
        },
        {
          data: [],
          barKeys: [],
        },
      );
  }, [chartData]);


  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={margin}
        style={{
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={theme.palette.divider}
        />
        <XAxis
          dataKey="name"
          stroke={theme.palette.text.secondary}
          style={{ fontSize: '0.875rem' }}
        />
        <YAxis
          stroke={theme.palette.text.secondary}
          style={{ fontSize: '0.875rem' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: theme.palette.background.default,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: '4px',
          }}
          labelStyle={{ color: theme.palette.text.primary }}
        />
        <Legend />
        {barKeys.map((barKey) => {
          return (
            <Bar key={`${Date.now}-${barKey}`} dataKey={barKey} fill={getRandomBarColor()} />
          );
        })}

      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;
