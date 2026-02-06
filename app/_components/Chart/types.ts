export type ChartData = Record<string, Record<string, number>>;

export type ChartDataPoint = {
  name: string,
  [key: string]: string | number;
};
