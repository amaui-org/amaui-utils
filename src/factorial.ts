import { is } from './is';

function factorial(value: number): number {
  if (is('number', value)) {
    if (value < 0) return -1;

    if (value === 0) return 1;

    return value * factorial(value - 1);
  }
}

export default factorial;
