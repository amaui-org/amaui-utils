/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as OnesyUtils from '../src';

group('@onesy/utils/getObjectPropertyValue', () => {

  post(() => reset());

  to('getObjectPropertyValue', async () => {
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

      return [
        window.OnesyUtils.getObjectPropertyValue(4 as any),
        window.OnesyUtils.getObjectPropertyValue([1, 4, 1, 4, { a: 4 }], '4.a'),
        window.OnesyUtils.getObjectPropertyValue(value, 'd.b.c.1.c.4'),
        window.OnesyUtils.getObjectPropertyValue(value, 'a.b.c'),
      ];
    });
    const valueNode = [
      OnesyUtils.getObjectPropertyValue(4 as any),
      OnesyUtils.getObjectPropertyValue([1, 4, 1, 4, { a: 4 }], '4.a'),
      OnesyUtils.getObjectPropertyValue(value, 'd.b.c.1.c.4'),
      OnesyUtils.getObjectPropertyValue(value, 'a.b.c'),
    ];
    const values = [valueNode, ...valueBrowsers];

    values.forEach(item => assert(item).eql([
      undefined,
      4,
      4,
      undefined,
    ]));
  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.OnesyUtils.polyfills();

      return [
        ({ a: { a: '4' } } as any).getPropertyValue('a.a'),
        ([1, 4, 1, 4, { a: 4 }] as any).getPropertyValue('4.a'),
      ];
    });

    OnesyUtils.polyfills();

    const valueNode = [
      ({ a: { a: '4' } } as any).getPropertyValue('a.a'),
      ([1, 4, 1, 4, { a: 4 }] as any).getPropertyValue('4.a'),
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      '4',
      4,
    ]));
  });

});
