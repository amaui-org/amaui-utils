/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as OnesyUtils from '../src';

group('@onesy/utils/copy', () => {

  post(() => reset());

  to('copy', async () => {
    class A { }
    const a = new A();
    const func = function aad() { };

    const values_ = [
      'a',
      4,
      true,
      undefined,
      null,
      [
        a,
        A,
        func,
        4,
        {
          a: 1,
          ab: {
            a: 1,
            c: 3,
            d: func,
          },
        },
        true,
        ' ',
        new Array(),
      ],
      {
        a: {
          a: 1,
          b: a,
          c: A,
          d: func,
        },
        b: a,
        c: A,
        d: func,
        e: [1, 3, 4, A, { a: 1, b: 4, c: { a: 1, b: A, d: func } }],
        i: 4,
        j: true,
        y: undefined,
      },
    ];

    const valueBrowsers = await evaluate((window: any) => {
      class A { }
      const a = new A();
      const func = function aad() { };

      const values_ = [
        'a',
        4,
        true,
        undefined,
        null,
        [
          a,
          A,
          func,
          4,
          {
            a: 1,
            ab: {
              a: 1,
              c: 3,
              d: func,
            },
          },
          true,
          ' ',
          new Array(),
        ],
        {
          a: {
            a: 1,
            b: a,
            c: A,
            d: func,
          },
          b: a,
          c: A,
          d: func,
          e: [1, 3, 4, A, { a: 1, b: 4, c: { a: 1, b: A, d: func } }],
          i: 4,
          j: true,
          y: undefined,
        },
      ];

      return values_.map(item => window.OnesyUtils.equalDeep(window.OnesyUtils.copy(item), item));
    });
    const valueNode = values_.map(item => OnesyUtils.equalDeep(OnesyUtils.copy(item), item));
    const values = [...valueNode, ...[].concat.apply([], valueBrowsers)];

    values.forEach(value => assert(value).eq(true));
  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.OnesyUtils.polyfills();

      const values_ = [
        [],
        {},
      ];

      return values_.map(item => window.OnesyUtils.equalDeep((item as any).copy(), item));
    });

    OnesyUtils.polyfills();

    const values_ = [
      [],
      {},
    ];

    const valueNode = values_.map(item => OnesyUtils.equalDeep((item as any).copy(), item));

    const values = [...valueNode, ...[].concat.apply([], valueBrowsers)];

    values.forEach(value => assert(value).eq(true));
  });

});
