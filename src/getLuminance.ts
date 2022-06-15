import { is } from './is';
import colorToRgb from './colorToRgb';

const getLuminance = (value: string): number => {
  let values = colorToRgb(value, undefined, true) as number[];

  if (is('array', values) && values.length >= 3) {
    values = values.slice(0, 3).map(item => {
      // Normalize
      item /= 255;

      return item <= 0.03928 ? item / 12.92 : ((item + 0.055) / 1.055) ** 2.4;
    });

    const [r, g, b] = values;

    return Number((r * 0.2126 + g * 0.7152 + b * 0.0722).toFixed(2));
  }
};

export default getLuminance;
