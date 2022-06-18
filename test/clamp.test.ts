/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/clamp', () => {

  post(() => reset());

  to('clamp', async () => {
    const values_ = [
      [1],
      [-11],
      [14, 1],
      [-1, 1, 4],
      [5, 1, 4],
      [4, 1, 4],
      ['a'],
      [true],
      [null],
      [undefined],
      [new Array()],
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        [1],
        [-11],
        [14, 1],
        [-1, 1, 4],
        [5, 1, 4],
        [4, 1, 4],
        ['a'],
        [true],
        [null],
        [undefined],
        [new Array()],
      ];

      return values_.map((value: [any, any, any]) => window.AmauiUtils.clamp(...value));
    });
    const valueNode = values_.map((value: [any, any, any]) => AmauiUtils.clamp(...value));
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      1,
      -11,
      14,
      1,
      4,
      4,
      'a',
      true,
      null,
      undefined,
      new Array(),
    ]));
  });

  to('min', async () => {
    const values_ = [
      [1],
      [-1, 1, 4],
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        [1],
        [-1, 1, 4],
      ];

      return values_.map((value: [any, any, any]) => window.AmauiUtils.clamp(...value));
    });
    const valueNode = values_.map((value: [any, any, any]) => AmauiUtils.clamp(...value));
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      1,
      1,
    ]));
  });

  to('max', async () => {
    const values_ = [
      [5, 1, 4],
      [4, 1, 4],
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        [5, 1, 4],
        [4, 1, 4],
      ];

      return values_.map((value: [any, any, any]) => window.AmauiUtils.clamp(...value));
    });
    const valueNode = values_.map((value: [any, any, any]) => AmauiUtils.clamp(...value));
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      4,
      4,
    ]));
  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.AmauiUtils.polyfills();

      return [
        (-1 as any).clamp(1, 4),
      ];
    });

    AmauiUtils.polyfills();

    const valueNode = [
      (-1 as any).clamp(1, 4),
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      1,
    ]));
  });

});
