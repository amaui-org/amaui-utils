import clamp from './clamp';
import rgbToHslPure from './rgbToHslPure';
import hslToRgbPure from './hslToRgbPure';

const canvasFilterBrightness = (value: number, canvas: HTMLCanvasElement) => {
  const context = canvas.getContext('2d');

  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

  const { data } = imageData;

  for (let i = 0; i < data.length; i += 4) {
    const [h, s_, l] = rgbToHslPure(data[i + 0], data[i + 1], data[i + 2]) as Array<number>;

    let s = Math.round(s_ + (s_ * (value / 100)));

    if (s < 0) s = 0;

    if (s > 100) s = 100;

    const [r, g, b] = hslToRgbPure(h, s, l) as Array<number>;

    data[i + 0] = clamp(r, 0, 255);
    data[i + 1] = clamp(g, 0, 255);
    data[i + 2] = clamp(b, 0, 255);
  }

  context.putImageData(imageData, 0, 0);

  return canvas;
};

export default canvasFilterBrightness;
