/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/setObjectValue', () => {

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

      window.AmauiUtils.setObjectValue(value, 'a', 4);
      window.AmauiUtils.setObjectValue(value, 'd.b.c.1.c.4', 'a');
      window.AmauiUtils.setObjectValue(value, 'd.b.a', 44);
      window.AmauiUtils.setObjectValue(value1, '4.a', 40);

      return [
        window.AmauiUtils.getObjectValue(value, 'a'),
        window.AmauiUtils.getObjectValue(value, 'd.b.c.1.c.4'),
        window.AmauiUtils.getObjectValue(value, 'd.b.a'),
        window.AmauiUtils.getObjectValue(value1, '4.a'),
      ];
    });

    AmauiUtils.setObjectValue(value, 'a', 4);
    AmauiUtils.setObjectValue(value, 'd.b.c.1.c.4', 'a');
    AmauiUtils.setObjectValue(value, 'd.b.a', 44);
    AmauiUtils.setObjectValue(value1, '4.a', 40);

    const valueNode = [
      AmauiUtils.getObjectValue(value, 'a'),
      AmauiUtils.getObjectValue(value, 'd.b.c.1.c.4'),
      AmauiUtils.getObjectValue(value, 'd.b.a'),
      AmauiUtils.getObjectValue(value1, '4.a'),
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

        window.AmauiUtils.setObjectValue(value, 'a', 4, { valueOverride: false });
        window.AmauiUtils.setObjectValue(value, 'a.d.a', 4, { valueOverride: true });
        window.AmauiUtils.setObjectValue(value1, '1', 40, { valueOverride: false });
        window.AmauiUtils.setObjectValue(value1, '4.a', 40, { valueOverride: true });

        return [
          window.AmauiUtils.getObjectValue(value, 'a'),
          window.AmauiUtils.getObjectValue(value, 'a.d.a'),
          window.AmauiUtils.getObjectValue(value1, '1'),
          window.AmauiUtils.getObjectValue(value1, '4.a'),
        ];
      });

      AmauiUtils.setObjectValue(value, 'a', 4, { valueOverride: false });
      AmauiUtils.setObjectValue(value, 'a.d.a', 4, { valueOverride: true });
      AmauiUtils.setObjectValue(value1, '1', 40, { valueOverride: false });
      AmauiUtils.setObjectValue(value1, '4.a', 40, { valueOverride: true });

      const valueNode = [
        AmauiUtils.getObjectValue(value, 'a'),
        AmauiUtils.getObjectValue(value, 'a.d.a'),
        AmauiUtils.getObjectValue(value1, '1'),
        AmauiUtils.getObjectValue(value1, '4.a'),
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
      window.AmauiUtils.polyfills();

      return [
        ({ a: '4' } as any).setValue('a', 4),
        ([1, 4] as any).setValue('1', 40),
      ];
    });

    AmauiUtils.polyfills();

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
