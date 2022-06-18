/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/wait', () => {

  post(() => reset());

  to('wait', async () => {
    const start = new Date().getTime();

    const valueBrowsers = await evaluate(async (window: any) => {
      // tslint:disable-next-line
      const start = new Date().getTime();

      await window.AmauiUtils.wait(140);

      return new Date().getTime() - start >= 140;
    });

    await AmauiUtils.wait(140);

    const valueNode = new Date().getTime() - start >= 140;
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eq(true));
  });

});
