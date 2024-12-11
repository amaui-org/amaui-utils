/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { evaluate, reset } from '../utils/js/test/utils';

group('@onesy/utils/canvasCrop', () => {

  post(() => reset());

  to('canvasCrop', async () => {
    const valueBrowsers = await evaluate(async (window: any) => {
      const canvas = await window.OnesyUtils.canvasCrop(window.document.body);
      const cropped = window.OnesyUtils.canvasCrop(canvas, 0, 0, 40, 40);

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
