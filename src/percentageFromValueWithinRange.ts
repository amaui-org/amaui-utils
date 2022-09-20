
const percentageFromValueWithinRange = (value: number, min: number, max: number, minAllowed = 0, maxAllowed = 100): number => {
  return (maxAllowed - minAllowed) * (value - min) / (max - min) + minAllowed;
};

export default percentageFromValueWithinRange;
