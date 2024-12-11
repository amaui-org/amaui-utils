/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as OnesyUtils from '../src';

group('@onesy/utils/order', () => {

  post(() => reset());

  to('object', async () => {
    const values_ = [
      OnesyUtils.order({
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
        window.OnesyUtils.order({
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
    });
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
      OnesyUtils.order(['a', 4, { ad: 4, a: 1 }, 1]),
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        window.OnesyUtils.order(['a', 4, { ad: 4, a: 1 }, 1]),
      ];

      return values_;
    });
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
      window.OnesyUtils.polyfills();

      return [
        ({ a: [1, 4], ad: 4, b: { a: 4, b: 'a' }, d: 1 } as any).order(),
        (['a', 4, { ad: 4, a: 1 }, 1] as any).order(),
      ];
    });

    OnesyUtils.polyfills();

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
