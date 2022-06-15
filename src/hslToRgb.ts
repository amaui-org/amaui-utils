import { is, isValid } from './is';
import castParam from './castParam';
import clamp from './clamp';

const hslToRgb = (
  value: string,
  opacity: number = undefined,
  array: boolean = false
): string | number[] => {
  if (isValid('color-hsl', value)) {
    let values: any = value.replace(/hsl|a|\(|%|\s|\)/g, '').split(',');

    let [h, s, l, a] = [...values.slice(0, 3).map((item: number) => +castParam(item).toFixed(0)), values[3]];

    h = parseInt(h, 10);
    s = parseInt(s, 10) / 100;
    l = parseInt(l, 10) / 100;
    a = opacity !== undefined ? (opacity > 1 ? (opacity / 100).toFixed(2) : clamp(opacity, 0, 1)) : parseFloat(a);

    const k = (n: number) => (n + h / 30) % 12;
    const u = s * Math.min(l, 1 - l);
    const f = (n: number) => l - u * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

    let r = 255 * f(0);
    let g = 255 * f(8);
    let b = 255 * f(4);

    values = [...[r, g, b].map(item => Math.round(castParam(item))), a && +a];

    [r, g, b, a] = values;

    return array ? values.filter((value_: any) => is('number', value_)) : `rgb${a ? 'a' : ''}(${r}, ${g}, ${b}${a ? `, ${a}` : ''})`;
  }
};

export default hslToRgb;
