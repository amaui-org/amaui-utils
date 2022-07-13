import isValid from './isValid';
import rgbToRgba from './rgbToRgba';
import hexToRgb from './hexToRgb';
import hslToRgb from './hslToRgb';

const colorToRgb = (
  value: string,
  opacity: number = undefined,
  array: boolean = false
): string | number[] => {
  if (isValid('color-rgb', value)) return rgbToRgba(value, opacity, array);
  if (isValid('color-hex', value)) return hexToRgb(value, opacity, array);
  if (isValid('color-hsl', value)) return hslToRgb(value, opacity, array);
};

export default colorToRgb;
