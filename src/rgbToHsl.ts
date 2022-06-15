import { is, isValid } from './is';
import clamp from './clamp';
import castParam from './castParam';

const rgbToHsl = (
  value: string,
  opacity: number = undefined,
  array: boolean = false
): string | number[] => {
  if (isValid('color-rgb', value)) {
    let values: any[] = value.replace(/rgb|a|\(|\s|\)/g, '').split(',').filter(Boolean);

    let [r, g, b, a] = values;

    r /= 255;
    g /= 255;
    b /= 255;

    // find greatest and smallest channel values
    const cmin = Math.min(r, g, b);
    const cmax = Math.max(r, g, b);
    const delta = cmax - cmin;
    let h = 0;
    let s = 0;
    let l = 0;

    if (delta === 0) h = 0;
    else if (cmax === r) h = ((g - b) / delta) % 6;
    else if (cmax === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    if (h < 0) h += 360;

    l = (cmax + cmin) / 2;
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    s = +(s * 100).toFixed(0);
    l = +(l * 100).toFixed(0);

    a = opacity !== undefined ? +(opacity > 1 ? (opacity / 100).toFixed(2) : clamp(opacity, 0, 1)) : a;

    values = [...[h, s, l].map(value_ => Math.round(castParam(value_))), a && +a];

    return array ? values.filter(value_ => is('number', value_)) : `hsl${a ? 'a' : ''}(${h}, ${s}%, ${l}%${a ? `, ${a}` : ''})`;
  }
};

export default rgbToHsl;
