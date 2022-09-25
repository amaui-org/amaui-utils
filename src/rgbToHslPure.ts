
const rgbToHsl = (r_: number, g_: number, b_: number): number[] => {
  let [r, g, b] = [r_, g_, b_];

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

  return [h, s, l];
};

export default rgbToHsl;
