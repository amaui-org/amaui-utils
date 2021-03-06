/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/factorial', () => {

  post(() => reset());

  to('factorial', async () => {
    const values_ = [
      undefined,
      null,
      -1,
      0,
      1,
      4,
      5,
      7
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        undefined,
        null,
        -1,
        0,
        1,
        4,
        5,
        7
      ];

      return values_.map(value => window.AmauiUtils.factorial(value));
    });
    const valueNode = values_.map(value => AmauiUtils.factorial(value));
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      undefined,
      undefined,
      -1,
      1,
      1,
      24,
      120,
      5040
    ]));
  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.AmauiUtils.polyfills();

      return (4 as any).factorial();
    });

    AmauiUtils.polyfills();

    const valueNode = (4 as any).factorial();

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eq(24));
  });

});
