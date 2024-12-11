/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as OnesyUtils from '../src';

group('@onesy/utils/arrayMoveItem', () => {

  post(() => reset());

  to('arrayMoveItem', async () => {
    const values_ = [
      [[], 1, 4],
      [[1], 1, 4],
      [[1, 4], 1, 0],
      [[1, 3, 4], 1, 4],
      ['a'],
      [true],
      [undefined],
      [null],
      [new Object()],
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        [[], 1, 4],
        [[1], 1, 4],
        [[1, 4], 1, 0],
        [[1, 3, 4], 1, 4],
        ['a'],
        [true],
        [undefined],
        [null],
        [new Object()],
      ];

      return values_.map((value: [any, any, any]) => window.OnesyUtils.arrayMoveItem(...value));
    });
    const valueNode = values_.map((value: [any, any, any]) => OnesyUtils.arrayMoveItem(...value));
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      [undefined, undefined, undefined, undefined, undefined],
      [1, undefined, undefined, undefined, undefined],
      [4, 1],
      [1, 4, undefined, undefined, 3],
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
        ([1, 3, 4] as any).moveItem(1, 4),
      ];
    });

    OnesyUtils.polyfills();

    const valueNode = [
      ([1, 3, 4] as any).moveItem(1, 4),
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      [1, 4, undefined, undefined, 3],
    ]));
  });

});
