import clamp from './clamp';

const canvasFilterFade = (value_: number, canvas: HTMLCanvasElement) => {
  const context = canvas.getContext('2d');

  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

  const { data } = imageData;

  let value = value_;

  if (value > 0) value *= -1;

  const factor = (259 * (value + 255)) / (255 * (259 - value));

  for (let i = 0; i < data.length; i += 4) {
    data[i + 0] = clamp((factor * (data[i + 0] - 100)) + 100, 0, 255);
    data[i + 1] = clamp((factor * (data[i + 1] - 100)) + 100, 0, 255);
    data[i + 2] = clamp((factor * (data[i + 2] - 100)) + 100, 0, 255);
  }

  context.putImageData(imageData, 0, 0);

  return canvas;
};

export default canvasFilterFade;
