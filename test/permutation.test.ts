/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/permutation', () => {

  post(() => reset());

  to('permutation', async () => {
    const values_ = [
      [undefined],
      [null],
      [-1],
      [1],
      [[], 1],
      [[1], 1],
      [[1, 2], 2],
      [[1, 2, 3], 6],
      [[1, 2, 3, 4], 24],
      [[1, 2, 3, 3, 4, 4], 24],
      [[1, 2, 3, 4, 5], 120],
      [[1, 2, 3, 4, 5, 6], 720],
      [[1, 2, 3, 4, 5, 6, 7], 5040],
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        [undefined],
        [null],
        [-1],
        [1],
        [[], 1],
        [[1], 1],
        [[1, 2], 2],
        [[1, 2, 3], 6],
        [[1, 2, 3, 4], 24],
        [[1, 2, 3, 3, 4, 4], 24],
        [[1, 2, 3, 4, 5], 120],
        [[1, 2, 3, 4, 5, 6], 720],
        [[1, 2, 3, 4, 5, 6, 7], 5040],
      ];

      return values_.map((value: any) => [window.AmauiUtils.permutation(value[0]), value[1]]).map(([item, length]) => !item ? item : [
        item.length === length,
        item.length === window.AmauiUtils.unique(item.map(item_ => item_.join(''))).length,
        item.filter(item_ => window.AmauiUtils.unique(item_).length === item_.length).length === item.length
      ]);
    });
    const valueNode = values_.map((value: any) => [AmauiUtils.permutation(value[0]), value[1]]).map(([item, length]) => !item ? item : [
      item.length === length,
      item.length === AmauiUtils.unique(item.map(item_ => item_.join(''))).length,
      item.filter(item_ => AmauiUtils.unique(item_).length === item_.length).length === item.length
    ]);
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      ...new Array(4).fill(undefined),
      ...new Array(9).fill(new Array(3).fill(true)),
    ]));
  });

  group('options', () => {

    group('response', () => {

      to('array', async () => {
        const values_ = [
          [[], 1],
          [[1], 1],
          [[1, 2], 2],
          [[1, 2, 3], 6],
          [[1, 2, 3, 4], 24],
          [[1, 2, 3, 3, 4, 4], 24],
          [[1, 2, 3, 4, 5], 120],
          [[1, 2, 3, 4, 5, 6], 720],
          [[1, 2, 3, 4, 5, 6, 7], 5040],
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_: any = [
            [[], 1],
            [[1], 1],
            [[1, 2], 2],
            [[1, 2, 3], 6],
            [[1, 2, 3, 4], 24],
            [[1, 2, 3, 3, 4, 4], 24],
            [[1, 2, 3, 4, 5], 120],
            [[1, 2, 3, 4, 5, 6], 720],
            [[1, 2, 3, 4, 5, 6, 7], 5040],
          ];

          return values_.map((value: any) => [window.AmauiUtils.permutation(value[0]), value[1]]).map(([item, length]) => [
            item.length === length,
            item.length === window.AmauiUtils.unique(item.map(item_ => item_.join(''))).length,
            item.filter(item_ => window.AmauiUtils.unique(item_).length === item_.length).length === item.length
          ]);
        });
        const valueNode = values_.map((value: any) => [AmauiUtils.permutation(value[0]), value[1]]).map(([item, length]) => [
          item.length === length,
          item.length === AmauiUtils.unique(item.map(item_ => item_.join(''))).length,
          item.filter(item_ => AmauiUtils.unique(item_).length === item_.length).length === item.length
        ]);
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql([
          ...new Array(9).fill(new Array(3).fill(true)),
        ]));
      });

      to('yield', async () => {
        let values_: any = [
          [[1, 2, 3], 6],
          [[1, 2, 3, 4], 24],
          [[1, 2, 3, 3, 4, 4], 24],
          [[1, 2, 3, 4, 5], 120],
          [[1, 2, 3, 4, 5, 6], 720],
          [[1, 2, 3, 4, 5, 6, 7], 5040],
        ];

        values_ = values_.map(item => {
          const result = [];
          const method = (AmauiUtils.permutation(item[0], { response: 'yield' }) as any)();
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
            [[1, 2, 3], 6],
            [[1, 2, 3, 4], 24],
            [[1, 2, 3, 3, 4, 4], 24],
            [[1, 2, 3, 4, 5], 120],
            [[1, 2, 3, 4, 5, 6], 720],
            [[1, 2, 3, 4, 5, 6, 7], 5040],
          ];

          values_ = values_.map(item => {
            const result = [];
            const method = window.AmauiUtils.permutation(item[0], { response: 'yield' })();
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
            item.length === window.AmauiUtils.unique(item.map(item_ => item_.join(''))).length,
            item.filter(item_ => window.AmauiUtils.unique(item_).length === item_.length).length === item.length
          ]);
        });
        const valueNode = values_.map(([item, length]) => [
          item.length === length,
          item.length === AmauiUtils.unique(item.map(item_ => item_.join(''))).length,
          item.filter(item_ => AmauiUtils.unique(item_).length === item_.length).length === item.length
        ]);
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql([
          ...new Array(6).fill(new Array(3).fill(true)),
        ]));
      });

    });

  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.AmauiUtils.polyfills();

      return ([1, 2, 3] as any).permutation();
    });

    AmauiUtils.polyfills();

    const valueNode = ([1, 2, 3] as any).permutation();

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      [1, 2, 3],
      [1, 3, 2],
      [2, 1, 3],
      [2, 3, 1],
      [3, 1, 2],
      [3, 2, 1]
    ]));
  });

});
