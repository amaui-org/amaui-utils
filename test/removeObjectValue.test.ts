/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { startBrowsers, IBrowsers, evaluate, closeBrowsers, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/removeObjectValue', () => {
  let browsers: IBrowsers;

  pre(async () => browsers = await startBrowsers());

  post(async () => {
    await closeBrowsers(browsers);

    reset();
  });

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

      window.AmauiUtils.removeObjectValue(value, 'a.b.c');
      window.AmauiUtils.removeObjectValue(value, 'd.b.c.1.c.4');
      window.AmauiUtils.removeObjectValue(value, 'd.b.a');
      window.AmauiUtils.removeObjectValue(value1, '4.a');

      return [
        window.AmauiUtils.getObjectValue(value, 'a.b.c'),
        window.AmauiUtils.getObjectValue(value, 'd.b.c.1.c.4'),
        window.AmauiUtils.getObjectValue(value, 'd.b.a'),
        window.AmauiUtils.getObjectValue(value1, '4.a'),
      ];
    }, { browsers });

    AmauiUtils.removeObjectValue(value, 'a.b.c');
    AmauiUtils.removeObjectValue(value, 'd.b.c.1.c.4');
    AmauiUtils.removeObjectValue(value, 'd.b.a');
    AmauiUtils.removeObjectValue(value1, '4.a');

    const valueNode = [
      AmauiUtils.getObjectValue(value, 'a.b.c'),
      AmauiUtils.getObjectValue(value, 'd.b.c.1.c.4'),
      AmauiUtils.getObjectValue(value, 'd.b.a'),
      AmauiUtils.getObjectValue(value1, '4.a'),
    ];
    const values = [valueNode, ...valueBrowsers];

    values.forEach(item => assert(item).eql(new Array(4).fill(undefined)));
  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.AmauiUtils.polyfills();

      return [
        ({ a: '4' } as any).removeValue('a'),
        ([1, 4] as any).removeValue('1'),
      ];
    }, { browsers });

    AmauiUtils.polyfills();

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
