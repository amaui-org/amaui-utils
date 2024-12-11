/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as OnesyUtils from '../src';

group('@onesy/utils/flattenObject', () => {

  post(() => reset());

  to('flattenObject', async () => {
    const values_ = [
      {
        a: 1,
        b: 2,
        c: 3,
        d: {
          a: 1,
          b: {
            a: 1,
            b: 2,
            c: [
              1,
              {
                a: 1,
                b: 2,
                c: [1, 2, 3],
              },
              3,
            ],
          },
          c: 3,
        },
      },
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        {
          a: 1,
          b: 2,
          c: 3,
          d: {
            a: 1,
            b: {
              a: 1,
              b: 2,
              c: [
                1,
                {
                  a: 1,
                  b: 2,
                  c: [1, 2, 3],
                },
                3,
              ],
            },
            c: 3,
          },
        },
      ];

      return values_.map(value => window.OnesyUtils.flattenObject(value as any));
    });
    const valueNode = values_.map(value => OnesyUtils.flattenObject(value as any));
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      {
        'a': 1,
        'b': 2,
        'c': 3,
        'd.a': 1,
        'd.b.a': 1,
        'd.b.b': 2,
        'd.b.c.0': 1,
        'd.b.c.1.a': 1,
        'd.b.c.1.b': 2,
        'd.b.c.1.c.0': 1,
        'd.b.c.1.c.1': 2,
        'd.b.c.1.c.2': 3,
        'd.b.c.2': 3,
        'd.c': 3,
      },
    ]));
  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.OnesyUtils.polyfills();

      return [
        ({ a: 4, ab: { a: '4' } } as any).flatten(),
      ];
    });

    OnesyUtils.polyfills();

    const valueNode = [
      ({ a: 4, ab: { a: '4' } } as any).flatten(),
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      {
        'a': 4,
        'ab.a': '4',
      },
    ]));
  });

});
