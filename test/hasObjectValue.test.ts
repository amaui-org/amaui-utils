/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/hasObjectProperty', () => {

  post(() => reset());

  to('hasObjectProperty', async () => {
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
        window.AmauiUtils.hasObjectProperty(4 as any),
        window.AmauiUtils.hasObjectProperty([1, 4, 1, 4, { a: 4 }], '4.a'),
        window.AmauiUtils.hasObjectProperty(value, 'a.b.c', 'd.c.0.a', 'd.b.c.1.c.2'),
        window.AmauiUtils.hasObjectProperty(value, 'a.b.c'),
      ];
    });
    const valueNode = [
      AmauiUtils.hasObjectProperty(4 as any),
      AmauiUtils.hasObjectProperty([1, 4, 1, 4, { a: 4 }], '4.a'),
      AmauiUtils.hasObjectProperty(value, 'a.b.c', 'd.c.0.a', 'd.b.c.1.c.2'),
      AmauiUtils.hasObjectProperty(value, 'a.b.c'),
    ];
    const values = [valueNode, ...valueBrowsers];

    values.forEach(item => assert(item).eql([
      false,
      true,
      true,
      false,
    ]));
  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.AmauiUtils.polyfills();

      return [
        ({ a: { a: '4' } } as any).hasProperty('a.a'),
        ([1, 4, 1, 4, { a: 4 }] as any).hasProperty('4.a'),
      ];
    });

    AmauiUtils.polyfills();

    const valueNode = [
      ({ a: { a: '4' } } as any).hasProperty('a.a'),
      ([1, 4, 1, 4, { a: 4 }] as any).hasProperty('4.a'),
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      true,
      true,
    ]));
  });

});
