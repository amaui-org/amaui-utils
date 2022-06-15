
const colorRange = (value: Array<[number, number, number]>) => {
  const min = new Array(3).fill(Number.MAX_VALUE);
  const max = new Array(3).fill(Number.MIN_VALUE);

  value.forEach(item => {
    item.forEach((value_, index) => {
      min[index] = Math.min(min[index], value_);

      max[index] = Math.max(max[index], value_);
    });
  });

  const ranges = min.map((item, index) => max[index] - item);

  const maxRange = Math.max(...ranges);

  if (maxRange === ranges[0]) return 0;
  else if (maxRange === ranges[1]) return 1;

  return 2;
};

const quantizeMethod = (value: Array<[number, number, number]>, depth = 0): Array<number | [number, number, number]> => {
  const MAX_DEPTH = 7;

  if (!value.length) return [];

  if (MAX_DEPTH === depth) {
    const color = value.reduce((result, item) => {
      item.forEach((value_, index) => result[index] += value_);

      return result;
    }, [0, 0, 0]);

    return [color.map(item => Math.round(item / value.length))] as any;
  }

  const sortIndex = colorRange(value);

  value.sort((a, b) => a[sortIndex] - b[sortIndex]);

  const mid = value.length / 2;

  // Reverse so primary is a first value
  return [
    ...quantizeMethod(value.slice(0, mid), depth + 1),
    ...quantizeMethod(value.slice(mid + 1), depth + 1),
  ].reverse();
};

const quantize = (value: Array<[number, number, number]>, amount = 4): Array<[number, number, number]> => {
  const depth = 7 - Math.ceil(Math.log2(amount));

  return quantizeMethod(value, depth).slice(0, amount) as Array<[number, number, number]>;
};

export default quantize;
