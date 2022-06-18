/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/arrayToParts', () => {

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

      return values_.map((value: [any, any]) => window.AmauiUtils.arrayToParts(...value));
    });
    const valueNode = values_.map((value: [any, any]) => AmauiUtils.arrayToParts(...value));
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
      window.AmauiUtils.polyfills();

      return [
        ([1, 4] as any).toParts(1),
      ];
    });

    AmauiUtils.polyfills();

    const valueNode = [
      ([1, 4] as any).toParts(1),
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      [[1], [4]],
    ]));
  });

});
