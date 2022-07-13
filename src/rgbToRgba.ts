import is from './is';
import isValid from './isValid';
import castParam from './castParam';
import clamp from './clamp';

const rgbToRgba = (
  value: string,
  opacity: number = undefined,
  array: boolean = false
): string | number[] => {
  if (isValid('color-rgb', value)) {
    let values: any[] = value.replace(/rgb|a|\(|\s|\)/g, '').split(',').map((value_, index) => {
      if (index < 3) return Math.round(castParam(value_));

      return castParam(value_);
    });

    const a = opacity !== undefined ? +(opacity > 1 ? (opacity / 100).toFixed(2) : clamp(opacity, 0, 1)) : values[3];

    values = [...values.slice(0, 3).map(item => Math.round(castParam(item))), a && +a];

    const [r, g, b] = values;

    return array ? values.filter(value_ => is('number', value_)) : `rgb${a ? 'a' : ''}(${r}, ${g}, ${b}${a ? `, ${a}` : ''})`;
  }
};

export default rgbToRgba;
