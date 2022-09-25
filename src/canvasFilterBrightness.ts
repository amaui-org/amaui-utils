import clamp from './clamp';

const canvasFilterBrightness = (value: number, canvas: HTMLCanvasElement) => {
  const context = canvas.getContext('2d');

  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

  const { data } = imageData;

  for (let i = 0; i < data.length; i += 4) {
    data[i + 0] = clamp(data[i + 0] + value, 0, 255);
    data[i + 1] = clamp(data[i + 1] + value, 0, 255);
    data[i + 2] = clamp(data[i + 2] + value, 0, 255);
  }

  context.putImageData(imageData, 0, 0);

  return canvas;
};

export default canvasFilterBrightness;
