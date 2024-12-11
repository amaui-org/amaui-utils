/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as OnesyUtils from '../src';

group('@onesy/utils/combination', () => {

  post(() => reset());

  to('combination', async () => {
    const values_ = [
      [[undefined]],
      [[null]],
      [[-1]],
      [[1]],
      [[[]], 1],
      [[[1]], 1],

      [[[1, 2], 0], 1],
      [[[1, 2], 1], 2],
      [[[1, 2], 2], 1],

      [[[1, 2, 3], 0], 1],
      [[[1, 2, 3], 1], 3],
      [[[1, 2, 3], 2], 3],
      [[[1, 2, 3], 3], 1],

      [[[1, 2, 3, 4], 0], 1],
      [[[1, 2, 3, 4], 1], 4],
      [[[1, 2, 3, 4], 2], 6],
      [[[1, 2, 3, 4], 3], 4],
      [[[1, 2, 3, 4], 4], 1],

      [[[1, 2, 3, 4, 5], 4], 5],

      [[[1, 2, 3, 4, 5, 6, 7], 4], 35],

      [[[...Array(27).keys()], 2], 351],
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
        [[[1, 2], 2], 1],

        [[[1, 2, 3], 0], 1],
        [[[1, 2, 3], 1], 3],
        [[[1, 2, 3], 2], 3],
        [[[1, 2, 3], 3], 1],

        [[[1, 2, 3, 4], 0], 1],
        [[[1, 2, 3, 4], 1], 4],
        [[[1, 2, 3, 4], 2], 6],
        [[[1, 2, 3, 4], 3], 4],
        [[[1, 2, 3, 4], 4], 1],

        [[[1, 2, 3, 4, 5], 4], 5],

        [[[1, 2, 3, 4, 5, 6, 7], 4], 35],

        [[[...Array(27).keys()], 2], 351],
      ];

      return values_.map((value: any) => [window.OnesyUtils.combination(...value[0]), value[0][1], value[1]]).map(([item, len, length]) => !item ? item : [
        item.length === length,
        !len || item.filter(item_ => item_.length === len).length === length,
        item.length === window.OnesyUtils.unique(item.map(item_ => item_.join('-'))).length,
        item.filter(item_ => window.OnesyUtils.unique(item_).length === item_.length).length === item.length
      ]);
    });
    const valueNode = values_.map((value: [[any, any], any]) => [OnesyUtils.combination(...value[0]), value[0][1], value[1]]).map(([item, len, length]) => !item ? item : [
      item.length === length,
      !len || item.filter(item_ => item_.length === len).length === length,
      item.length === OnesyUtils.unique(item.map(item_ => item_.join('-'))).length,
      item.filter(item_ => OnesyUtils.unique(item_).length === item_.length).length === item.length
    ]);
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      ...new Array(4).fill(undefined),
      ...new Array(17).fill(new Array(4).fill(true)),
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
          [[[1, 2], 2], 1],

          [[[1, 2, 3], 0], 1],
          [[[1, 2, 3], 1], 3],
          [[[1, 2, 3], 2], 3],
          [[[1, 2, 3], 3], 1],

          [[[1, 2, 3, 4], 0], 1],
          [[[1, 2, 3, 4], 1], 4],
          [[[1, 2, 3, 4], 2], 6],
          [[[1, 2, 3, 4], 3], 4],
          [[[1, 2, 3, 4], 4], 1],

          [[[1, 2, 3, 4, 5], 4], 5],

          [[[1, 2, 3, 4, 5, 6, 7], 4], 35],

          [[[...Array(27).keys()], 2], 351],
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_: any = [
            [[[]], 1],
            [[[1]], 1],

            [[[1, 2], 0], 1],
            [[[1, 2], 1], 2],
            [[[1, 2], 2], 1],

            [[[1, 2, 3], 0], 1],
            [[[1, 2, 3], 1], 3],
            [[[1, 2, 3], 2], 3],
            [[[1, 2, 3], 3], 1],

            [[[1, 2, 3, 4], 0], 1],
            [[[1, 2, 3, 4], 1], 4],
            [[[1, 2, 3, 4], 2], 6],
            [[[1, 2, 3, 4], 3], 4],
            [[[1, 2, 3, 4], 4], 1],

            [[[1, 2, 3, 4, 5], 4], 5],

            [[[1, 2, 3, 4, 5, 6, 7], 4], 35],

            [[[...Array(27).keys()], 2], 351],
          ];

          return values_.map((value: any) => [window.OnesyUtils.combination(...value[0]), value[0][1], value[1]]).map(([item, len, length]) => !item ? item : [
            item.length === length,
            !len || item.filter(item_ => item_.length === len).length === length,
            item.length === window.OnesyUtils.unique(item.map(item_ => item_.join('-'))).length,
            item.filter(item_ => window.OnesyUtils.unique(item_).length === item_.length).length === item.length
          ]);
        });
        const valueNode = values_.map((value: [[any, any], any]) => [OnesyUtils.combination(...value[0]), value[0][1], value[1]]).map(([item, len, length]) => !item ? item : [
          item.length === length,
          !len || item.filter(item_ => item_.length === len).length === length,
          item.length === OnesyUtils.unique(item.map(item_ => item_.join('-'))).length,
          item.filter(item_ => OnesyUtils.unique(item_).length === item_.length).length === item.length
        ]);
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql([
          ...new Array(17).fill(new Array(4).fill(true)),
        ]));
      });

      to('yield', async () => {
        let values_: any = [
          [[[1, 2, 3], 2], 3],

          [[[1, 2, 3, 4], 2], 6],
          [[[1, 2, 3, 4], 3], 4],

          [[[1, 2, 3, 4, 5], 4], 5],

          [[[1, 2, 3, 4, 5, 6, 7], 2], 21],

          [[[1, 2, 3, 4, 5, 6, 7], 4], 35],

          [[[...Array(27).keys()], 2], 351],
        ];

        values_ = values_.map((item: [[any, any], any]) => {
          const result = [];

          const method = (OnesyUtils.combination(...item[0], { response: 'yield' }) as any)();
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
            [[[1, 2, 3], 2], 3],

            [[[1, 2, 3, 4], 2], 6],
            [[[1, 2, 3, 4], 3], 4],

            [[[1, 2, 3, 4, 5], 4], 5],

            [[[1, 2, 3, 4, 5, 6, 7], 2], 21],

            [[[1, 2, 3, 4, 5, 6, 7], 4], 35],

            [[[...Array(27).keys()], 2], 351],
          ];

          values_ = values_.map(item => {
            const result = [];
            const method = window.OnesyUtils.combination(...item[0], { response: 'yield' })();
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
            item.length === window.OnesyUtils.unique(item.map(item_ => item_.join('-'))).length,
            item.filter(item_ => window.OnesyUtils.unique(item_).length === item_.length).length === item.length
          ]);
        });
        const valueNode = values_.map(item => [item[0][0], item[0][1], item[1]]).map(([item, len, length]) => !item ? item : [
          item.length === length,
          !len || item.filter(item_ => item_.length === len).length === length,
          item.length === OnesyUtils.unique(item.map(item_ => item_.join('-'))).length,
          item.filter(item_ => OnesyUtils.unique(item_).length === item_.length).length === item.length
        ]);
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql([
          ...new Array(7).fill(new Array(4).fill(true)),
        ]));
      });

    });

  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.OnesyUtils.polyfills();

      return ([1, 2, 3, 4] as any).combination(3);
    });

    OnesyUtils.polyfills();

    const valueNode = ([1, 2, 3, 4] as any).combination(3);

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      [1, 2, 3], [1, 2, 4], [1, 3, 4], [2, 3, 4]
    ]));
  });

});
