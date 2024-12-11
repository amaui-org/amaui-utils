/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as OnesyUtils from '../src';

group('@onesy/utils/combinationWithRepetition', () => {

  post(() => reset());

  to('combinationWithRepetition', async () => {
    const values_ = [
      [[undefined]],
      [[null]],
      [[-1]],
      [[1]],
      [[[]], 1],
      [[[1]], 1],

      [[[1, 2], 0], 1],
      [[[1, 2], 1], 2],
      [[[1, 2], 2], 3],
      [[[1, 2], 3], 4],
      [[[1, 2], 7], 8],

      [[[1, 2, 3], 0], 1],
      [[[1, 2, 3], 1], 3],
      [[[1, 2, 3], 2], 6],
      [[[1, 2, 3], 3], 10],
      [[[1, 2, 3], 4], 15],
      [[[1, 2, 3], 7], 36],

      [[[1, 2, 3, 4], 0], 1],
      [[[1, 2, 3, 4], 1], 4],
      [[[1, 2, 3, 4], 2], 10],
      [[[1, 2, 3, 4], 3], 20],
      [[[1, 2, 3, 4], 4], 35],
      [[[1, 2, 3, 4], 5], 56],
      [[[1, 2, 3, 4], 7], 120],

      [[[1, 2, 3, 4, 5], 4], 70],
      [[[1, 2, 3, 4, 5], 5], 126],
      [[[1, 2, 3, 4, 5], 7], 330],

      [[[1, 2, 3, 4, 5, 6, 7], 4], 210],
      [[[1, 2, 3, 4, 5, 6, 7], 7], 1716],
      [[[1, 2, 3, 4, 5, 6, 7], 8], 3003],

      [[[...Array(27).keys()], 2], 378],
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        [[undefined]],
        [[null]],
        [[-1]],
        [[1]],
        [[[]], 1],
        [[[1]], 1],

        [[[1, 2], 0], 1],
        [[[1, 2], 1], 2],
        [[[1, 2], 2], 3],
        [[[1, 2], 3], 4],
        [[[1, 2], 7], 8],

        [[[1, 2, 3], 0], 1],
        [[[1, 2, 3], 1], 3],
        [[[1, 2, 3], 2], 6],
        [[[1, 2, 3], 3], 10],
        [[[1, 2, 3], 4], 15],
        [[[1, 2, 3], 7], 36],

        [[[1, 2, 3, 4], 0], 1],
        [[[1, 2, 3, 4], 1], 4],
        [[[1, 2, 3, 4], 2], 10],
        [[[1, 2, 3, 4], 3], 20],
        [[[1, 2, 3, 4], 4], 35],
        [[[1, 2, 3, 4], 5], 56],
        [[[1, 2, 3, 4], 7], 120],

        [[[1, 2, 3, 4, 5], 4], 70],
        [[[1, 2, 3, 4, 5], 5], 126],
        [[[1, 2, 3, 4, 5], 7], 330],

        [[[1, 2, 3, 4, 5, 6, 7], 4], 210],
        [[[1, 2, 3, 4, 5, 6, 7], 7], 1716],
        [[[1, 2, 3, 4, 5, 6, 7], 8], 3003],

        [[[...Array(27).keys()], 2], 378],
      ];

      return values_.map((value: any) => [window.OnesyUtils.combinationWithRepetition(...value[0]), value[0][1], value[1]]).map(([item, len, length]) => !item ? item : [
        item.length === length,
        !len || item.filter(item_ => item_.length === len).length === length,
        item.length === window.OnesyUtils.unique(item.map(item_ => item_.join('-'))).length
      ]);
    });
    const valueNode = values_.map((value: [[any, any], any]) => [OnesyUtils.combinationWithRepetition(...value[0]), value[0][1], value[1]]).map(([item, len, length]) => !item ? item : [
      item.length === length,
      !len || item.filter(item_ => item_.length === len).length === length,
      item.length === OnesyUtils.unique(item.map(item_ => item_.join('-'))).length
    ]);
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      ...new Array(4).fill(undefined),
      ...new Array(27).fill(new Array(3).fill(true)),
    ]));
  });

  group('options', () => {

    group('response', () => {

      to('array', async () => {
        const values_ = [
          [[[]], 1],
          [[[1]], 1],

          [[[1, 2], 0], 1],
          [[[1, 2], 1], 2],
          [[[1, 2], 2], 3],
          [[[1, 2], 3], 4],
          [[[1, 2], 7], 8],

          [[[1, 2, 3], 0], 1],
          [[[1, 2, 3], 1], 3],
          [[[1, 2, 3], 2], 6],
          [[[1, 2, 3], 3], 10],
          [[[1, 2, 3], 4], 15],
          [[[1, 2, 3], 7], 36],

          [[[1, 2, 3, 4], 0], 1],
          [[[1, 2, 3, 4], 1], 4],
          [[[1, 2, 3, 4], 2], 10],
          [[[1, 2, 3, 4], 3], 20],
          [[[1, 2, 3, 4], 4], 35],
          [[[1, 2, 3, 4], 5], 56],
          [[[1, 2, 3, 4], 7], 120],

          [[[1, 2, 3, 4, 5], 4], 70],
          [[[1, 2, 3, 4, 5], 5], 126],
          [[[1, 2, 3, 4, 5], 7], 330],

          [[[1, 2, 3, 4, 5, 6, 7], 4], 210],
          [[[1, 2, 3, 4, 5, 6, 7], 7], 1716],
          [[[1, 2, 3, 4, 5, 6, 7], 8], 3003],

          [[[...Array(27).keys()], 2], 378],
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_: any = [
            [[[]], 1],
            [[[1]], 1],

            [[[1, 2], 0], 1],
            [[[1, 2], 1], 2],
            [[[1, 2], 2], 3],
            [[[1, 2], 3], 4],
            [[[1, 2], 7], 8],

            [[[1, 2, 3], 0], 1],
            [[[1, 2, 3], 1], 3],
            [[[1, 2, 3], 2], 6],
            [[[1, 2, 3], 3], 10],
            [[[1, 2, 3], 4], 15],
            [[[1, 2, 3], 7], 36],

            [[[1, 2, 3, 4], 0], 1],
            [[[1, 2, 3, 4], 1], 4],
            [[[1, 2, 3, 4], 2], 10],
            [[[1, 2, 3, 4], 3], 20],
            [[[1, 2, 3, 4], 4], 35],
            [[[1, 2, 3, 4], 5], 56],
            [[[1, 2, 3, 4], 7], 120],

            [[[1, 2, 3, 4, 5], 4], 70],
            [[[1, 2, 3, 4, 5], 5], 126],
            [[[1, 2, 3, 4, 5], 7], 330],

            [[[1, 2, 3, 4, 5, 6, 7], 4], 210],
            [[[1, 2, 3, 4, 5, 6, 7], 7], 1716],
            [[[1, 2, 3, 4, 5, 6, 7], 8], 3003],

            [[[...Array(27).keys()], 2], 378],
          ];

          return values_.map((value: any) => [window.OnesyUtils.combinationWithRepetition(...value[0]), value[0][1], value[1]]).map(([item, len, length]) => !item ? item : [
            item.length === length,
            !len || item.filter(item_ => item_.length === len).length === length,
            item.length === window.OnesyUtils.unique(item.map(item_ => item_.join('-'))).length
          ]);
        });
        const valueNode = values_.map((value: [[any, any], any]) => [OnesyUtils.combinationWithRepetition(...value[0]), value[0][1], value[1]]).map(([item, len, length]) => !item ? item : [
          item.length === length,
          !len || item.filter(item_ => item_.length === len).length === length,
          item.length === OnesyUtils.unique(item.map(item_ => item_.join('-'))).length
        ]);
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql([
          ...new Array(27).fill(new Array(3).fill(true)),
        ]));
      });

      to('yield', async () => {
        let values_: any = [
          [[[1, 2], 2], 3],
          [[[1, 2], 3], 4],
          [[[1, 2], 7], 8],

          [[[1, 2, 3], 2], 6],
          [[[1, 2, 3], 3], 10],
          [[[1, 2, 3], 4], 15],
          [[[1, 2, 3], 7], 36],

          [[[1, 2, 3, 4], 2], 10],
          [[[1, 2, 3, 4], 3], 20],
          [[[1, 2, 3, 4], 4], 35],
          [[[1, 2, 3, 4], 5], 56],
          [[[1, 2, 3, 4], 7], 120],

          [[[1, 2, 3, 4, 5], 4], 70],
          [[[1, 2, 3, 4, 5], 5], 126],
          [[[1, 2, 3, 4, 5], 7], 330],

          [[[1, 2, 3, 4, 5, 6, 7], 4], 210],
          [[[1, 2, 3, 4, 5, 6, 7], 7], 1716],
          [[[1, 2, 3, 4, 5, 6, 7], 8], 3003],

          [[[...Array(27).keys()], 2], 378],
        ];

        values_ = values_.map((item: [[any, any], any]) => {
          const result = [];

          const method = (OnesyUtils.combinationWithRepetition(...item[0], { response: 'yield' }) as any)();
          let item_: any = { done: false };

          while (true) {
            item_ = method.next();

            if (item_.done) break;
            else result.push(item_.value);
          }

          item[0][0] = result;

          return item;
        });

        const valueBrowsers = await evaluate((window: any) => {
          let values_: any = [
            [[[1, 2], 2], 3],
            [[[1, 2], 3], 4],
            [[[1, 2], 7], 8],

            [[[1, 2, 3], 2], 6],
            [[[1, 2, 3], 3], 10],
            [[[1, 2, 3], 4], 15],
            [[[1, 2, 3], 7], 36],

            [[[1, 2, 3, 4], 2], 10],
            [[[1, 2, 3, 4], 3], 20],
            [[[1, 2, 3, 4], 4], 35],
            [[[1, 2, 3, 4], 5], 56],
            [[[1, 2, 3, 4], 7], 120],

            [[[1, 2, 3, 4, 5], 4], 70],
            [[[1, 2, 3, 4, 5], 5], 126],
            [[[1, 2, 3, 4, 5], 7], 330],

            [[[1, 2, 3, 4, 5, 6, 7], 4], 210],
            [[[1, 2, 3, 4, 5, 6, 7], 7], 1716],
            [[[1, 2, 3, 4, 5, 6, 7], 8], 3003],

            [[[...Array(27).keys()], 2], 378],
          ];

          values_ = values_.map(item => {
            const result = [];
            const method = window.OnesyUtils.combinationWithRepetition(...item[0], { response: 'yield' })();
            let item_: any = { done: false };

            while (true) {
              item_ = method.next();

              if (item_.done) break;
              else result.push(item_.value);
            }

            item[0][0] = result;

            return item;
          });

          return values_.map(item => [item[0][0], item[0][1], item[1]]).map(([item, len, length]) => !item ? item : [
            item.length === length,
            !len || item.filter(item_ => item_.length === len).length === length,
            item.length === window.OnesyUtils.unique(item.map(item_ => item_.join('-'))).length
          ]);
        });
        const valueNode = values_.map(item => [item[0][0], item[0][1], item[1]]).map(([item, len, length]) => !item ? item : [
          item.length === length,
          !len || item.filter(item_ => item_.length === len).length === length,
          item.length === OnesyUtils.unique(item.map(item_ => item_.join('-'))).length
        ]);
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql([
          ...new Array(19).fill(new Array(3).fill(true)),
        ]));
      });

    });

  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.OnesyUtils.polyfills();

      return ([1, 2, 3, 4] as any).combinationWithRepetition(3);
    });

    OnesyUtils.polyfills();

    const valueNode = ([1, 2, 3, 4] as any).combinationWithRepetition(3);

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      [1, 1, 1], [1, 1, 2], [1, 1, 3], [1, 1, 4], [1, 2, 2], [1, 2, 3], [1, 2, 4], [1, 3, 3], [1, 3, 4], [1, 4, 4], [2, 2, 2], [2, 2, 3], [2, 2, 4], [2, 3, 3], [2, 3, 4], [2, 4, 4], [3, 3, 3], [3, 3, 4], [3, 4, 4], [4, 4, 4]
    ]));
  });

});
