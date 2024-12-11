/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as OnesyUtils from '../src';

group('@onesy/utils/wait', () => {

  post(() => reset());

  to('wait', async () => {
    const start = new Date().getTime();

    const valueBrowsers = await evaluate(async (window: any) => {
      // tslint:disable-next-line
      const start = new Date().getTime();

      await window.OnesyUtils.wait(140);

      return new Date().getTime() - start >= 140;
    });

    await OnesyUtils.wait(140);

    const valueNode = new Date().getTime() - start >= 140;
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eq(true));
  });

});
