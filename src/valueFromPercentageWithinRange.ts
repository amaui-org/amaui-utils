
const valueFromPercentageWithinRange = (value: number, min: number, max: number, minAllowed = 0, maxAllowed = 100): number => {
  return min + ((value * (max - min + minAllowed)) / (maxAllowed - minAllowed));
};

export default valueFromPercentageWithinRange;
