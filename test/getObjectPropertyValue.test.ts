/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { startBrowsers, IBrowsers, evaluate, closeBrowsers, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/getObjectPropertyValue', () => {
  let browsers: IBrowsers;

  pre(async () => browsers = await startBrowsers());

  post(async () => {
    await closeBrowsers(browsers);

    reset();
  });

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
        window.AmauiUtils.getObjectPropertyValue(4 as any),
        window.AmauiUtils.getObjectPropertyValue([1, 4, 1, 4, { a: 4 }], '4.a'),
        window.AmauiUtils.getObjectPropertyValue(value, 'd.b.c.1.c.4'),
        window.AmauiUtils.getObjectPropertyValue(value, 'a.b.c'),
      ];
    }, { browsers });
    const valueNode = [
      AmauiUtils.getObjectPropertyValue(4 as any),
      AmauiUtils.getObjectPropertyValue([1, 4, 1, 4, { a: 4 }], '4.a'),
      AmauiUtils.getObjectPropertyValue(value, 'd.b.c.1.c.4'),
      AmauiUtils.getObjectPropertyValue(value, 'a.b.c'),
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
      window.AmauiUtils.polyfills();

      return [
        ({ a: { a: '4' } } as any).getPropertyValue('a.a'),
        ([1, 4, 1, 4, { a: 4 }] as any).getPropertyValue('4.a'),
      ];
    }, { browsers });

    AmauiUtils.polyfills();

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
