/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { startBrowsers, IBrowsers, evaluate, closeBrowsers, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/unflattenObject', () => {
  let browsers: IBrowsers;

  pre(async () => browsers = await startBrowsers());

  post(async () => {
    await closeBrowsers(browsers);

    reset();
  });

  to('unflattenObject', async () => {
    const values_ = [
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
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
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
      ];

      return values_.map(value => window.AmauiUtils.unflattenObject(value as any));
    }, { browsers });
    const valueNode = values_.map(value => AmauiUtils.unflattenObject(value as any));
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
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
    ]));
  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.AmauiUtils.polyfills();

      return [
        ({ 'a': 4, 'ab.a': '4' } as any).unflatten(),
      ];
    }, { browsers });

    AmauiUtils.polyfills();

    const valueNode = [
      ({ 'a': 4, 'ab.a': '4' } as any).unflatten(),
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      { a: 4, ab: { a: '4' } },
    ]));
  });

});
