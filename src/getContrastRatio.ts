import getLuminance from './getLuminance';

const getContrastRatio = (valueA: string, valueB: string): number | undefined => {
  const lumA = getLuminance(valueA);
  const lumB = getLuminance(valueB);

  if (lumA !== undefined && lumB !== undefined) {
    return +((Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05)).toFixed(2);
  }
};

export default getContrastRatio;
