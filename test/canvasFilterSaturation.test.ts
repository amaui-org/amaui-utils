/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { evaluate, reset } from '../utils/js/test/utils';

group('@amaui/utils/canvasFilterSaturation', () => {

  post(() => reset());

  to('canvasFilterSaturation', async () => {
    const valueBrowsers = await evaluate(async (window: any) => {
      window.document.body.style.background = 'linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c)';

      const canvas = await window.AmauiUtils.elementToCanvas(window.document.body);

      const cropped = window.AmauiUtils.canvasCrop(canvas, 0, 0, 14, 14);

      const method = value => {
        const contextCropped = value.getContext('2d');

        const imageData = contextCropped.getImageData(0, 0, 14, 14);

        return Array.from(imageData.data).reduce((result: any, item: any) => result += item, '');
      };

      const data: any = {
        canvas: method(cropped)
      };

      window.AmauiUtils.canvasFilterSaturation(14, cropped);

      data.updated = method(cropped);

      return [
        data.canvas !== data.updated
      ];
    });

    const values = [...valueBrowsers];

    values.forEach(value => assert(value).eql([
      true
    ]));
  });

});
