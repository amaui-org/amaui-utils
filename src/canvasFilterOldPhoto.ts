import clamp from './clamp';

const canvasFilterOldPhoto = (value: number, canvas: HTMLCanvasElement) => {
  const context = canvas.getContext('2d');

  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

  const { data } = imageData;

  const percentage = (value_: number) => (Math.abs(value) / 100) * value_ * (value < 0 ? -1 : 1);

  for (let i = 0; i < data.length; i += 4) {
    data[i + 0] = clamp(((((data[i + 0] / 255) - 0.4) + (percentage(data[i + 0]) / 255)) + 0.4) * 255, 0, 255);
    data[i + 1] = clamp(((((data[i + 0] / 255) - 0.4) + (percentage(data[i + 0]) / 255)) + 0.4) * 255, 0, 255);
    data[i + 2] = clamp(((((data[i + 0] / 255) - 0.4) + (percentage(data[i + 0]) / 255)) + 0.4) * 255, 0, 255);
  }

  context.putImageData(imageData, 0, 0);

  return canvas;
};

export default canvasFilterOldPhoto;
