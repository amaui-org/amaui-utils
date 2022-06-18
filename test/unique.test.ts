/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/unique', () => {

  post(() => reset());

  to('unique', async () => {
    const value = [
      1,
      2,
      3,
      4,
      4,
      3,
      4,
      3,
      { a: { a: 1 } },
      { a: { a: 1 }, ab: 4 },
      { a: { a: 4 }, ab: 4 },
      [1, 4],
      [1, 3, 4],
      [1, 3]
    ];

    const valueBrowsers = await evaluate((window: any) => {
      // tslint:disable-next-line
      const value = [
        1,
        2,
        3,
        4,
        4,
        3,
        4,
        3,
        { a: { a: 1 } },
        { a: { a: 1 }, ab: 4 },
        { a: { a: 4 }, ab: 4 },
        [1, 4],
        [1, 3, 4],
        [1, 3]
      ];

      return window.AmauiUtils.unique(value, 'a.a', '1');
    });
    const valueNode = AmauiUtils.unique(value, 'a.a', '1');
    const values = [valueNode, ...valueBrowsers];

    values.forEach(item => assert(item).eql([
      1,
      2,
      3,
      4,
      { a: { a: 1 } },
      { a: { a: 4 }, ab: 4 },
      [1, 4],
      [1, 3, 4],
    ]));
  });

  to('simple', async () => {
    const value = [
      1,
      2,
      3,
      4,
      4,
      3,
      4,
      3,
    ];

    const valueBrowsers = await evaluate((window: any) => {
      // tslint:disable-next-line
      const value = [
        1,
        2,
        3,
        4,
        4,
        3,
        4,
        3,
      ];

      return window.AmauiUtils.unique(value);
    });
    const valueNode = AmauiUtils.unique(value);
    const values = [valueNode, ...valueBrowsers];

    values.forEach(item => assert(item).eql([
      1,
      2,
      3,
      4,
    ]));
  });

  to('arrays and / or objects', async () => {
    const value = [
      { a: { a: 1 } },
      { a: { a: 1 }, ab: 4 },
      { a: { a: 4 }, ab: 4 },
      [1, 4],
      [1, 3, 4],
      [1, 3],
    ];

    const valueBrowsers = await evaluate((window: any) => {
      // tslint:disable-next-line
      const value = [
        { a: { a: 1 } },
        { a: { a: 1 }, ab: 4 },
        { a: { a: 4 }, ab: 4 },
        [1, 4],
        [1, 3, 4],
        [1, 3],
      ];

      return window.AmauiUtils.unique(value, 'a.a', '1');
    });
    const valueNode = AmauiUtils.unique(value, 'a.a', '1');
    const values = [valueNode, ...valueBrowsers];

    values.forEach(item => assert(item).eql([
      { a: { a: 1 } },
      { a: { a: 4 }, ab: 4 },
      [1, 4],
      [1, 3, 4],
    ]));
  });

  to('arrays and / or objects, with no keys', async () => {
    const value = [
      { a: { a: 1 } },
      { a: { a: 1 }, ab: 4 },
      { a: { a: 4 }, ab: 4 },
      [1, 4],
      [1, 3, 4],
      [1, 3],
    ];

    const valueBrowsers = await evaluate((window: any) => {
      // tslint:disable-next-line
      const value = [
        { a: { a: 1 } },
        { a: { a: 1 }, ab: 4 },
        { a: { a: 4 }, ab: 4 },
        [1, 4],
        [1, 3, 4],
        [1, 3],
      ];

      return window.AmauiUtils.unique(value);
    });
    const valueNode = AmauiUtils.unique(value);
    const values = [valueNode, ...valueBrowsers];

    values.forEach(item => assert(item).eql([
      { a: { a: 1 } },
      { a: { a: 1 }, ab: 4 },
      { a: { a: 4 }, ab: 4 },
      [1, 4],
      [1, 3, 4],
      [1, 3],
    ]));
  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.AmauiUtils.polyfills();

      return [
        ([1, 4, 1] as any).unique(),
      ];
    });

    AmauiUtils.polyfills();

    const valueNode = [
      ([1, 4, 1] as any).unique(),
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      [1, 4],
    ]));
  });

});
