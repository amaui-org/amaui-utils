import { is } from './is';

const clamp = (value: number, min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER): number => {
  if (is('number', value)) {
    if (value < min) return min;
    if (value > max) return max;

    return value;
  }

  return value;
};

export default clamp;
