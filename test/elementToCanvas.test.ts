/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { evaluate, reset } from '../utils/js/test/utils';

group('@onesy/utils/elementToCanvas', () => {

  post(() => reset());

  to('elementToCanvas', async () => {
    const valueBrowsers = await evaluate(async (window: any) => {
      const canvas = await window.OnesyUtils.elementToCanvas(window.document.body);

      return canvas.tagName === 'CANVAS';
    });

    const values = [...valueBrowsers];

    values.forEach(value => assert(value).eql([
      true
    ]));
  });

});
