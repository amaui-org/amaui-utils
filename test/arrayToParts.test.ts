/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as OnesyUtils from '../src';

group('@onesy/utils/arrayToParts', () => {

  post(() => reset());

  to('arrayToParts', async () => {
    const values_ = [
      [[], 1],
      [[1], 1],
      [[1, 4], 1],
      [[1, 3, 4], 2],
      [[1, 2, 3, 4], 2],
      ['a'],
      [true],
      [undefined],
      [null],
      [new Object()],
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        [[], 1],
        [[1], 1],
        [[1, 4], 1],
        [[1, 3, 4], 2],
        [[1, 2, 3, 4], 2],
        ['a'],
        [true],
        [undefined],
        [null],
        [new Object()],
      ];

      return values_.map((value: [any, any]) => window.OnesyUtils.arrayToParts(...value));
    });
    const valueNode = values_.map((value: [any, any]) => OnesyUtils.arrayToParts(...value));
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      [],
      [[1]],
      [[1], [4]],
      [[1, 3], [4]],
      [[1, 2], [3, 4]],
      'a',
      true,
      undefined,
      null,
      new Object(),
    ]));
  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.OnesyUtils.polyfills();

      return [
        ([1, 4] as any).toParts(1),
      ];
    });

    OnesyUtils.polyfills();

    const valueNode = [
      ([1, 4] as any).toParts(1),
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      [[1], [4]],
    ]));
  });

});
