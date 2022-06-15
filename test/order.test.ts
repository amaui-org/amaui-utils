/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { startBrowsers, IBrowsers, evaluate, closeBrowsers, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/order', () => {
  let browsers: IBrowsers;

  pre(async () => browsers = await startBrowsers());

  post(async () => {
    await closeBrowsers(browsers);

    reset();
  });

  to('object', async () => {
    const values_ = [
      AmauiUtils.order({
        ad: 4,
        d: 1,
        a: [4, 1],
        b: {
          b: 'a',
          a: 4,
        },
      }),
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        window.AmauiUtils.order({
          ad: 4,
          d: 1,
          a: [4, 1],
          b: {
            b: 'a',
            a: 4,
          },
        }),
      ];

      return values_;
    }, { browsers });
    const valueNode = values_;
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      {
        a: [
          1,
          4
        ],
        ad: 4,
        b: {
          a: 4,
          b: 'a'
        },
        d: 1
      },
    ]));
  });

  to('array', async () => {
    const values_ = [
      AmauiUtils.order(['a', 4, { ad: 4, a: 1 }, 1]),
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        window.AmauiUtils.order(['a', 4, { ad: 4, a: 1 }, 1]),
      ];

      return values_;
    }, { browsers });
    const valueNode = values_;
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      [
        1,
        4,
        {
          a: 1,
          ad: 4,
        },
        'a',
      ],
    ]));
  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.AmauiUtils.polyfills();

      return [
        ({ a: [1, 4], ad: 4, b: { a: 4, b: 'a' }, d: 1 } as any).order(),
        (['a', 4, { ad: 4, a: 1 }, 1] as any).order(),
      ];
    }, { browsers });

    AmauiUtils.polyfills();

    const valueNode = [
      ({ a: [1, 4], ad: 4, b: { a: 4, b: 'a' }, d: 1 } as any).order(),
      (['a', 4, { ad: 4, a: 1 }, 1] as any).order(),
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      {
        a: [
          1,
          4,
        ],
        ad: 4,
        b: {
          a: 4,
          b: 'a',
        },
        d: 1,
      },
      [
        1,
        4,
        {
          a: 1,
          ad: 4,
        },
        'a',
      ],
    ]));
  });

});
