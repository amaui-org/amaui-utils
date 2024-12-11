/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as OnesyUtils from '../src';

group('@onesy/utils/setObjectValue', () => {

  post(() => reset());

  to('setObjectValue', async () => {
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

      window.OnesyUtils.setObjectValue(value, 'a', 4);
      window.OnesyUtils.setObjectValue(value, 'd.b.c.1.c.4', 'a');
      window.OnesyUtils.setObjectValue(value, 'd.b.a', 44);
      window.OnesyUtils.setObjectValue(value1, '4.a', 40);

      return [
        window.OnesyUtils.getObjectValue(value, 'a'),
        window.OnesyUtils.getObjectValue(value, 'd.b.c.1.c.4'),
        window.OnesyUtils.getObjectValue(value, 'd.b.a'),
        window.OnesyUtils.getObjectValue(value1, '4.a'),
      ];
    });

    OnesyUtils.setObjectValue(value, 'a', 4);
    OnesyUtils.setObjectValue(value, 'd.b.c.1.c.4', 'a');
    OnesyUtils.setObjectValue(value, 'd.b.a', 44);
    OnesyUtils.setObjectValue(value1, '4.a', 40);

    const valueNode = [
      OnesyUtils.getObjectValue(value, 'a'),
      OnesyUtils.getObjectValue(value, 'd.b.c.1.c.4'),
      OnesyUtils.getObjectValue(value, 'd.b.a'),
      OnesyUtils.getObjectValue(value1, '4.a'),
    ];
    const values = [valueNode, ...valueBrowsers];

    values.forEach(item => assert(item).eql([
      4,
      'a',
      44,
      40,
    ]));
  });

  group('options', () => {

    to('valueOverride', async () => {
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

        window.OnesyUtils.setObjectValue(value, 'a', 4, { valueOverride: false });
        window.OnesyUtils.setObjectValue(value, 'a.d.a', 4, { valueOverride: true });
        window.OnesyUtils.setObjectValue(value1, '1', 40, { valueOverride: false });
        window.OnesyUtils.setObjectValue(value1, '4.a', 40, { valueOverride: true });

        return [
          window.OnesyUtils.getObjectValue(value, 'a'),
          window.OnesyUtils.getObjectValue(value, 'a.d.a'),
          window.OnesyUtils.getObjectValue(value1, '1'),
          window.OnesyUtils.getObjectValue(value1, '4.a'),
        ];
      });

      OnesyUtils.setObjectValue(value, 'a', 4, { valueOverride: false });
      OnesyUtils.setObjectValue(value, 'a.d.a', 4, { valueOverride: true });
      OnesyUtils.setObjectValue(value1, '1', 40, { valueOverride: false });
      OnesyUtils.setObjectValue(value1, '4.a', 40, { valueOverride: true });

      const valueNode = [
        OnesyUtils.getObjectValue(value, 'a'),
        OnesyUtils.getObjectValue(value, 'a.d.a'),
        OnesyUtils.getObjectValue(value1, '1'),
        OnesyUtils.getObjectValue(value1, '4.a'),
      ];
      const values = [valueNode, ...valueBrowsers];

      values.forEach(item => assert(item).eql([
        { d: { a: 4 } },
        4,
        40,
        40
      ]));
    });

  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.OnesyUtils.polyfills();

      return [
        ({ a: '4' } as any).setValue('a', 4),
        ([1, 4] as any).setValue('1', 40),
      ];
    });

    OnesyUtils.polyfills();

    const valueNode = [
      ({ a: '4' } as any).setValue('a', 4),
      ([1, 4] as any).setValue('1', 40),
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      { a: 4 },
      [1, 40],
    ]));
  });

});
