/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as OnesyUtils from '../src';

group('@onesy/utils/permutationWithRepetition', () => {

  post(() => reset());

  to('permutationWithRepetition', async () => {
    const values_ = [
      [undefined],
      [null],
      [-1],
      [1],
      [[], 1],
      [[1], 1],
      [[1, 2], 4],
      [[1, 2, 3], 27],
      [[1, 2, 3, 4], 256],
      [[1, 2, 3, 3, 4, 4], 256],
      [[1, 2, 3, 4, 5], 3125],
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        [undefined],
        [null],
        [-1],
        [1],
        [[], 1],
        [[1], 1],
        [[1, 2], 4],
        [[1, 2, 3], 27],
        [[1, 2, 3, 4], 256],
        [[1, 2, 3, 3, 4, 4], 256],
        [[1, 2, 3, 4, 5], 3125],
      ];

      return values_.map((value: any) => [window.OnesyUtils.permutationWithRepetition(value[0]), value[1]]).map(([item, length]) => !item ? item : [
        item.length === length,
        item.length === window.OnesyUtils.unique(item.map(item_ => item_.join(''))).length,
      ]);
    });
    const valueNode = values_.map((value: any) => [OnesyUtils.permutationWithRepetition(value[0]), value[1]]).map(([item, length]) => !item ? item : [
      item.length === length,
      item.length === OnesyUtils.unique(item.map(item_ => item_.join(''))).length
    ]);
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      ...new Array(4).fill(undefined),
      ...new Array(7).fill(new Array(2).fill(true)),
    ]));
  });

  group('options', () => {

    group('response', () => {

      to('array', async () => {
        const values_ = [
          [[], 1],
          [[1], 1],
          [[1, 2], 4],
          [[1, 2, 3], 27],
          [[1, 2, 3, 4], 256],
          [[1, 2, 3, 3, 4, 4], 256],
          [[1, 2, 3, 4, 5], 3125],
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_: any = [
            [[], 1],
            [[1], 1],
            [[1, 2], 4],
            [[1, 2, 3], 27],
            [[1, 2, 3, 4], 256],
            [[1, 2, 3, 3, 4, 4], 256],
            [[1, 2, 3, 4, 5], 3125],
          ];

          return values_.map((value: any) => [window.OnesyUtils.permutationWithRepetition(value[0]), value[1]]).map(([item, length]) => [
            item.length === length,
            item.length === window.OnesyUtils.unique(item.map(item_ => item_.join(''))).length
          ]);
        });
        const valueNode = values_.map((value: any) => [OnesyUtils.permutationWithRepetition(value[0]), value[1]]).map(([item, length]) => [
          item.length === length,
          item.length === OnesyUtils.unique(item.map(item_ => item_.join(''))).length
        ]);
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql([
          ...new Array(7).fill(new Array(2).fill(true)),
        ]));
      });

      to('yield', async () => {
        let values_: any = [
          [[1, 2, 3], 27],
          [[1, 2, 3, 4], 256],
          [[1, 2, 3, 3, 4, 4], 256],
          [[1, 2, 3, 4, 5], 3125],
        ];

        values_ = values_.map(item => {
          const result = [];
          const method = (OnesyUtils.permutationWithRepetition(item[0], { response: 'yield' }) as any)();
          let item_: any = { done: false };

          while (true) {
            item_ = method.next();

            if (item_.done) break;
            else result.push(item_.value);
          }

          item[0] = result;

          return item;
        });

        const valueBrowsers = await evaluate((window: any) => {
          let values_: any = [
            [[1, 2, 3], 27],
            [[1, 2, 3, 4], 256],
            [[1, 2, 3, 3, 4, 4], 256],
            [[1, 2, 3, 4, 5], 3125],
          ];

          values_ = values_.map(item => {
            const result = [];
            const method = window.OnesyUtils.permutationWithRepetition(item[0], { response: 'yield' })();
            let item_: any = { done: false };

            while (true) {
              item_ = method.next();

              if (item_.done) break;
              else result.push(item_.value);
            }

            item[0] = result;

            return item;
          });

          return values_.map(([item, length]) => [
            item.length === length,
            item.length === window.OnesyUtils.unique(item.map(item_ => item_.join(''))).length
          ]);
        });
        const valueNode = values_.map(([item, length]) => [
          item.length === length,
          item.length === OnesyUtils.unique(item.map(item_ => item_.join(''))).length
        ]);
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql([
          ...new Array(4).fill(new Array(2).fill(true)),
        ]));
      });

    });

  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.OnesyUtils.polyfills();

      return ([1, 2, 3] as any).permutationWithRepetition();
    });

    OnesyUtils.polyfills();

    const valueNode = ([1, 2, 3] as any).permutationWithRepetition();

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      [1, 1, 1], [1, 1, 2], [1, 1, 3], [1, 2, 1], [1, 2, 2], [1, 2, 3], [1, 3, 1], [1, 3, 2], [1, 3, 3], [2, 1, 1], [2, 1, 2], [2, 1, 3], [2, 2, 1], [2, 2, 2], [2, 2, 3], [2, 3, 1], [2, 3, 2], [2, 3, 3], [3, 1, 1], [3, 1, 2], [3, 1, 3], [3, 2, 1], [3, 2, 2], [3, 2, 3], [3, 3, 1], [3, 3, 2], [3, 3, 3]
    ]));
  });

});
