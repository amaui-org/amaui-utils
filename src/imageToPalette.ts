import { isEnvironment } from './is';
import quantize from './quantize';

const imageToPalette = (value: string, options: { amount?: number; size?: number; allowCrossOrigin?: boolean } = { amount: 4, size: 400, allowCrossOrigin: false }): Promise<Array<string>> => new Promise(resolve => {
  if (isEnvironment('browser')) {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (options.allowCrossOrigin) img.crossOrigin = 'Anonymous';

    img.onload = () => {
      const size = options.size || 140;

      let width = img.naturalWidth || img.offsetWidth || img.width;
      let height = img.naturalHeight || img.offsetHeight || img.height;

      // resize
      if (width > size) {
        height /= width / size;
        width = size;
      }

      if (height > size) {
        width /= height / size;
        height = size;
      }

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // image data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      const data = imageData.data;
      const length = data.length;

      const values = [];

      // array of rgb values
      for (let i = 0; i < length; i += 4) values.push([data[i], data[i + 1], data[i + 2]]);

      // quantize image values to a palette
      const result = quantize(values, options.amount || 4);

      return resolve(result.map(item => `rgb(${item[0]}, ${item[1]}, ${item[2]})`));
    };

    img.onerror = () => resolve([]);

    // src
    img.src = value;
  }
  else resolve(undefined);
});

export default imageToPalette;
