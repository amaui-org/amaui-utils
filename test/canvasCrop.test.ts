/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { evaluate, reset } from '../utils/js/test/utils';

group('@amaui/utils/canvasCrop', () => {

  post(() => reset());

  to('canvasCrop', async () => {
    const valueBrowsers = await evaluate(async (window: any) => {
      const canvas = await window.AmauiUtils.canvasCrop(window.document.body);
      const cropped = window.AmauiUtils.canvasCrop(canvas, 0, 0, 40, 40);

      return (
        canvas.tagName === 'CANVAS' &&
        cropped.width === 40 &&
        cropped.height === 40
      );
    });

    const values = [...valueBrowsers];

    values.forEach(value => assert(value).eql([
      true
    ]));
  });

});
