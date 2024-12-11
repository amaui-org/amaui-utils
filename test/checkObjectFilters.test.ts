/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as OnesyUtils from '../src';

group('@onesy/utils/checkObjectFilters', () => {

  post(() => reset());

  to('checkObjectFilters', async () => {
    const valueBrowsers = await evaluate((window: any) => [
      window.OnesyUtils.checkObjectFilters(
        { a: 4, ab: [1, 4, 7], ad: { a: 4 } },
        [
          { field: 'a', operator: 'equal', value: 40 },
          { field: 'ab', operator: 'equal', value: 4 },
          { field: 'ad.a', operator: 'equal', value: 4 },
        ],
        'or'
      ),
      window.OnesyUtils.checkObjectFilters(
        { a: 4, ab: [1, 4, 7], ad: { a: 4 } },
        [
          { field: 'a', operator: 'equal', value: 40 },
          { field: 'ab', operator: 'equal', value: 4 },
        ],
        'or'
      ),
    ]);
    const valueNode = [
      OnesyUtils.checkObjectFilters(
        { a: 4, ab: [1, 4, 7], ad: { a: 4 } },
        [
          { field: 'a', operator: 'equal', value: 40 },
          { field: 'ab', operator: 'equal', value: 4 },
          { field: 'ad.a', operator: 'equal', value: 4 },
        ],
        'or'
      ),
      OnesyUtils.checkObjectFilters(
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
        window.OnesyUtils.checkObjectFilters(
          { a: 4, ab: [1, 4, 7], ad: { a: 4 } },
          [
            { field: 'a', operator: 'equal', value: 40 },
            { field: 'ab', operator: 'equal', value: 4 },
            { field: 'ad.a', operator: 'equal', value: 4 },
          ],
          'or'
        ),
        window.OnesyUtils.checkObjectFilters(
          { a: 4, ab: [1, 4, 7], ad: { a: 4 } },
          [
            { field: 'a', operator: 'equal', value: 40 },
            { field: 'ab', operator: 'equal', value: 4 },
          ],
          'or'
        ),
      ]);
      const valueNode = [
        OnesyUtils.checkObjectFilters(
          { a: 4, ab: [1, 4, 7], ad: { a: 4 } },
          [
            { field: 'a', operator: 'equal', value: 40 },
            { field: 'ab', operator: 'equal', value: 4 },
            { field: 'ad.a', operator: 'equal', value: 4 },
          ],
          'or'
        ),
        OnesyUtils.checkObjectFilters(
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
        window.OnesyUtils.checkObjectFilters(
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
        window.OnesyUtils.checkObjectFilters(
          { a: 4, ab: [1, 4, 7], ad: { a: 4 } },
          [
            { field: 'a', operator: 'equal', value: 4 },
            { field: 'ab', operator: 'equal', value: 4 },
          ],
          'and'
        ),
      ]);
      const valueNode = [
        OnesyUtils.checkObjectFilters(
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
        OnesyUtils.checkObjectFilters(
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
      window.OnesyUtils.polyfills();

      return [
        ({ a: 4, ab: [1, 4, 7], ad: { a: 4 } } as any).checkFilters(
          [
            { field: 'a', operator: 'equal', value: 4 },
            { field: 'ab', operator: 'equal', value: 4 },
          ],
        ),
      ];
    });

    OnesyUtils.polyfills();

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
