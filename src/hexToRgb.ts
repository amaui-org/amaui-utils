import { is, isValid } from './is';
import clamp from './clamp';
import castParam from './castParam';

const hexToRgb = (
  value: string,
  opacity: number = undefined,
  array: boolean = false
): string | number[] => {
  if (isValid('color-hex', value)) {
    const hex = value.slice(1);
    let r = parseInt(hex.length === 3 ? `${hex[0]}${hex[0]}` : hex.slice(0, 2), 16);
    let g = parseInt(hex.length === 3 ? `${hex[1]}${hex[1]}` : hex.slice(2, 4), 16);
    let b = parseInt(hex.length === 3 ? `${hex[2]}${hex[2]}` : hex.slice(4, 6), 16);
    let a = opacity !== undefined ? opacity > 1 ? (opacity / 100).toFixed(2) : clamp(opacity, 0, 1) : (hex.length === 8) && (parseInt(hex.slice(6), 16) / 255).toFixed(2);

    const values = [...[r, g, b].map(item => Math.round(castParam(item))), a && +a];

    [r, g, b, a] = values;

    return array ? values.filter(value_ => is('number', value_)) : `rgb${a ? 'a' : ''}(${r}, ${g}, ${b}${a ? `, ${a}` : ''})`;
  }
};

export default hexToRgb;
