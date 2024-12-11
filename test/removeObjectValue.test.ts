/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as OnesyUtils from '../src';

group('@onesy/utils/removeObjectValue', () => {

  post(() => reset());

  to('removeObjectValue', async () => {
    const value = {
      a: 1,
      b: 2,
      c: 3,
      d: {
        a: 1,
        b: {
          m: 1,
          a: {
            a: {
              a: 1,
            },
          },
          c: [
            1,
            {
              a: 1,
              b: 2,
              c: [1, 2, 3, 'a', 4],
            },
            3,
          ],
        },
        c: 3,
      },
    };
    const value1 = [1, 4, 1, 4, { a: 4 }];

    const valueBrowsers = await evaluate((window: any) => {
      // tslint:disable-next-line
      const value = {
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
                c: [1, 2, 3, 'a', 4],
              },
              3,
            ],
          },
          c: 3,
        },
      };
      const value1 = [1, 4, 1, 4, { a: 4 }];

      window.OnesyUtils.removeObjectValue(value, 'a.b.c');
      window.OnesyUtils.removeObjectValue(value, 'd.b.c.1.c.4');
      window.OnesyUtils.removeObjectValue(value, 'd.b.a');
      window.OnesyUtils.removeObjectValue(value1, '4.a');

      return [
        window.OnesyUtils.getObjectValue(value, 'a.b.c'),
        window.OnesyUtils.getObjectValue(value, 'd.b.c.1.c.4'),
        window.OnesyUtils.getObjectValue(value, 'd.b.a'),
        window.OnesyUtils.getObjectValue(value1, '4.a'),
      ];
    });

    OnesyUtils.removeObjectValue(value, 'a.b.c');
    OnesyUtils.removeObjectValue(value, 'd.b.c.1.c.4');
    OnesyUtils.removeObjectValue(value, 'd.b.a');
    OnesyUtils.removeObjectValue(value1, '4.a');

    const valueNode = [
      OnesyUtils.getObjectValue(value, 'a.b.c'),
      OnesyUtils.getObjectValue(value, 'd.b.c.1.c.4'),
      OnesyUtils.getObjectValue(value, 'd.b.a'),
      OnesyUtils.getObjectValue(value1, '4.a'),
    ];
    const values = [valueNode, ...valueBrowsers];

    values.forEach(item => assert(item).eql(new Array(4).fill(undefined)));
  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.OnesyUtils.polyfills();

      return [
        ({ a: '4' } as any).removeValue('a'),
        ([1, 4] as any).removeValue('1'),
      ];
    });

    OnesyUtils.polyfills();

    const valueNode = [
      ({ a: '4' } as any).removeValue('a'),
      ([1, 4] as any).removeValue('1'),
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      {},
      [1],
    ]));
  });

});
