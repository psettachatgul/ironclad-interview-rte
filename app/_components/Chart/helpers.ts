// Color palette suitable for bar graphs
const BAR_CHART_COLORS = [
  '#8884d8', // Blue
  '#82ca9d', // Green
  '#ffc658', // Yellow
  '#ff7c7c', // Red
  '#8dd1e1', // Cyan
  '#d084d0', // Purple
  '#82d982', // Light Green
  '#ffb347', // Orange
  '#87ceeb', // Sky Blue
  '#20b2aa', // Light Sea Green
  '#dda0dd', // Plum
  '#f0e68c', // Khaki
  '#98d8c8', // Mint
  '#f7dc6f', // Light Orange
  '#bb8fce', // Medium Purple
];

/**
 * Randomly picks a color suitable for bar graphs
 * @returns A hex color string
 */
export const getRandomBarColor = (): string => {
  const randomIndex = Math.floor(Math.random() * BAR_CHART_COLORS.length);
  return BAR_CHART_COLORS[randomIndex];
};

/**
 * Gets a color by index from the bar chart color palette
 * @param index - The index in the color palette
 * @returns A hex color string
 */
export const getBarColorByIndex = (index: number): string => {
  return BAR_CHART_COLORS[index % BAR_CHART_COLORS.length];
};
