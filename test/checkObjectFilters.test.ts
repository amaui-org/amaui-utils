/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { startBrowsers, IBrowsers, evaluate, closeBrowsers, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/checkObjectFilters', () => {
  let browsers: IBrowsers;

  pre(async () => browsers = await startBrowsers());

  post(async () => {
    await closeBrowsers(browsers);

    reset();
  });

  to('checkObjectFilters', async () => {
    const valueBrowsers = await evaluate((window: any) => [
      window.AmauiUtils.checkObjectFilters(
        { a: 4, ab: [1, 4, 7], ad: { a: 4 } },
        [
          { field: 'a', operator: 'equal', value: 40 },
          { field: 'ab', operator: 'equal', value: 4 },
          { field: 'ad.a', operator: 'equal', value: 4 },
        ],
        'or'
      ),
      window.AmauiUtils.checkObjectFilters(
        { a: 4, ab: [1, 4, 7], ad: { a: 4 } },
        [
          { field: 'a', operator: 'equal', value: 40 },
          { field: 'ab', operator: 'equal', value: 4 },
        ],
        'or'
      ),
    ], { browsers });
    const valueNode = [
      AmauiUtils.checkObjectFilters(
        { a: 4, ab: [1, 4, 7], ad: { a: 4 } },
        [
          { field: 'a', operator: 'equal', value: 40 },
          { field: 'ab', operator: 'equal', value: 4 },
          { field: 'ad.a', operator: 'equal', value: 4 },
        ],
        'or'
      ),
      AmauiUtils.checkObjectFilters(
        { a: 4, ab: [1, 4, 7], ad: { a: 4 } },
        [
          { field: 'a', operator: 'equal', value: 40 },
          { field: 'ab', operator: 'equal', value: 4 },
        ],
        'or'
      ),
    ];
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      true,
      false,
    ]));
  });

  group('operators', () => {

    to('or', async () => {
      const valueBrowsers = await evaluate((window: any) => [
        window.AmauiUtils.checkObjectFilters(
          { a: 4, ab: [1, 4, 7], ad: { a: 4 } },
          [
            { field: 'a', operator: 'equal', value: 40 },
            { field: 'ab', operator: 'equal', value: 4 },
            { field: 'ad.a', operator: 'equal', value: 4 },
          ],
          'or'
        ),
        window.AmauiUtils.checkObjectFilters(
          { a: 4, ab: [1, 4, 7], ad: { a: 4 } },
          [
            { field: 'a', operator: 'equal', value: 40 },
            { field: 'ab', operator: 'equal', value: 4 },
          ],
          'or'
        ),
      ], { browsers });
      const valueNode = [
        AmauiUtils.checkObjectFilters(
          { a: 4, ab: [1, 4, 7], ad: { a: 4 } },
          [
            { field: 'a', operator: 'equal', value: 40 },
            { field: 'ab', operator: 'equal', value: 4 },
            { field: 'ad.a', operator: 'equal', value: 4 },
          ],
          'or'
        ),
        AmauiUtils.checkObjectFilters(
          { a: 4, ab: [1, 4, 7], ad: { a: 4 } },
          [
            { field: 'a', operator: 'equal', value: 40 },
            { field: 'ab', operator: 'equal', value: 4 },
          ],
          'or'
        ),
      ];
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        true,
        false,
      ]));
    });

    to('and', async () => {
      const valueBrowsers = await evaluate((window: any) => [
        window.AmauiUtils.checkObjectFilters(
          { a: 4, ab: [1, 4, 7], ad: { a: 'a ad' } },
          [
            { field: 'a', operator: 'less-than', value: 5 },
            { field: 'a', operator: 'less-than-equal', value: 4 },
            { field: 'a', operator: 'equal', value: 4 },
            { field: 'a', operator: 'not-equal', value: 40 },
            { field: 'a.a', operator: 'not-equal', value: 40 },
            { field: 'a', operator: 'less-than-equal', value: 4 },
            { field: 'a', operator: 'greater-than', value: 1 },
            { field: 'ab', operator: 'equal', value: [1, 4, 7] },
            { field: 'ab', operator: 'array-all', value: [1, 4, 7] },
            { field: 'ab', operator: 'array-some', value: [1, 4] },
            { field: 'ad.a', operator: 'starts-with', value: 'a' },
            { field: 'ad.a', operator: 'contains', value: 'ad' },
          ],
          'and'
        ),
        window.AmauiUtils.checkObjectFilters(
          { a: 4, ab: [1, 4, 7], ad: { a: 4 } },
          [
            { field: 'a', operator: 'equal', value: 4 },
            { field: 'ab', operator: 'equal', value: 4 },
          ],
          'and'
        ),
      ], { browsers });
      const valueNode = [
        AmauiUtils.checkObjectFilters(
          { a: 4, ab: [1, 4, 7], ad: { a: 'a ad' } },
          [
            { field: 'a', operator: 'less-than', value: 5 },
            { field: 'a', operator: 'less-than-equal', value: 4 },
            { field: 'a', operator: 'equal', value: 4 },
            { field: 'a', operator: 'not-equal', value: 40 },
            { field: 'a.a', operator: 'not-equal', value: 40 },
            { field: 'a', operator: 'less-than-equal', value: 4 },
            { field: 'a', operator: 'greater-than', value: 1 },
            { field: 'ab', operator: 'equal', value: [1, 4, 7] },
            { field: 'ab', operator: 'array-all', value: [1, 4, 7] },
            { field: 'ab', operator: 'array-some', value: [1, 4] },
            { field: 'ad.a', operator: 'starts-with', value: 'a' },
            { field: 'ad.a', operator: 'contains', value: 'ad' },
          ],
          'and'
        ),
        AmauiUtils.checkObjectFilters(
          { a: 4, ab: [1, 4, 7], ad: { a: 4 } },
          [
            { field: 'a', operator: 'equal', value: 4 },
            { field: 'ab', operator: 'equal', value: 4 },
          ],
          'and'
        ),
      ];
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        true,
        false,
      ]));
    });

  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.AmauiUtils.polyfills();

      return [
        ({ a: 4, ab: [1, 4, 7], ad: { a: 4 } } as any).checkFilters(
          [
            { field: 'a', operator: 'equal', value: 4 },
            { field: 'ab', operator: 'equal', value: 4 },
          ],
        ),
      ];
    }, { browsers });

    AmauiUtils.polyfills();

    const valueNode = [
      ({ a: 4, ab: [1, 4, 7], ad: { a: 4 } } as any).checkFilters(
        [
          { field: 'a', operator: 'equal', value: 4 },
          { field: 'ab', operator: 'equal', value: 4 },
        ],
        'or'
      ),
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      true,
    ]));
  });

});
