import isValid from './isValid';
import clamp from './clamp';
import castParam from './castParam';

const intToHex = (value: number): string => {
  const hex = castParam(value).toString(16);

  return hex.length === 1 ? `0${hex}` : hex;
};

const rgbToHex = (
  value: string,
  opacity_: number = undefined,
  array: boolean = false
): string | number[] => {
  if (isValid('color-rgb', value)) {
    let values: any[] = value.replace(/rgb|a|\(|\s|\)/g, '').split(',').filter(Boolean);

    // If alpha value exists, multiply it by 255 rgb max range value
    if (values[3]) values[3] = Math.round(parseFloat(values[3]) * 255);

    const opacity: any = opacity_ !== undefined && (opacity_ > 1 ? +(opacity_ / 100).toFixed(2) : clamp(opacity_, 0, 1));

    if (opacity) values.push(Math.round(parseFloat(opacity) * 255));

    values = values.map(item => intToHex(item));

    const [r, g, b, a] = values;

    return array ? values.filter(Boolean) : `#${r}${g}${b}${a ? a : ''}`;
  }
};

export default rgbToHex;
