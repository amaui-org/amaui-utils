
const canvasCrop = (canvas: HTMLCanvasElement, x: number, y: number, width: number, height: number) => {
  const newCanvas = document.createElement('canvas');

  newCanvas.width = width;
  newCanvas.height = height;

  newCanvas
    .getContext('2d')
    .drawImage(canvas, x, y, width, height, 0, 0, width, height);

  return newCanvas;
};

export default canvasCrop;
