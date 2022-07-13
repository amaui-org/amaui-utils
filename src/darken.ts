import is from './is';
import clamp from './clamp';
import colorToRgb from './colorToRgb';

const darken = (value: string, coefficient: number): string | undefined => {
  const values = colorToRgb(value, undefined, true) as number[];

  if (is('array', values) && values.length >= 3) {
    values.slice(0, 3).forEach((_, index) => values[index] *= 1 - clamp(coefficient, 0, 1));

    const [r, g, b, a] = [...values.slice(0, 3).map(item => Math.round(Number(item))), values[3]];

    return `rgb${a ? 'a' : ''}(${r}, ${g}, ${b}${a ? `, ${a}` : ''})`;
  }
};

export default darken;
