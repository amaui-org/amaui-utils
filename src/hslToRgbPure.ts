
const hslToRgbPure = (h_: number, s_: number, l_: number): number[] => {
  let [h, s, l] = [h_, s_, l_];

  h = parseInt(String(h), 10);
  s = parseInt(String(s), 10) / 100;
  l = parseInt(String(l), 10) / 100;

  const k = (n: number) => (n + h / 30) % 12;
  const u = s * Math.min(l, 1 - l);
  const f = (n: number) => l - u * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

  let r = 255 * f(0);
  let g = 255 * f(8);
  let b = 255 * f(4);

  return [r, g, b];
};

export default hslToRgbPure;
