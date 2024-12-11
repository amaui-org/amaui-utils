/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as OnesyUtils from '../src';

group('@onesy/utils/stringify', () => {

  post(() => reset());

  to('stringify', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        'a',
        4,
        true,
        [1, 'a', [1, 'a', 4], undefined],
        {
          a: 4,
          c: [1, 'a', '4', [1, 'a', 4]],
          b: {
            a: 447,
            d: { a: 4 },
            b: [true, undefined, function a() { }, new Map(), {}],
          },
        },
        undefined,
        null,
      ];

      return values_.map(value => window.OnesyUtils.stringify(value));
    });

    const values_ = [
      'a',
      4,
      true,
      [1, 'a', [1, 'a', 4], undefined],
      {
        a: 4,
        c: [1, 'a', '4', [1, 'a', 4]],
        b: {
          a: 447,
          d: { a: 4 },
          b: [undefined, true, function a() { }, new Map(), {}],
        },
      },
      undefined,
      null,
    ];

    const valueNode = values_.map(value => OnesyUtils.stringify(value));

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      '"a"',
      '4',
      'true',
      "[\n  1,\n  \"a\",\n  [\n    1,\n    \"a\",\n    4\n  ]\n]",
      "{\n  \"a\": 4,\n  \"c\": [\n    1,\n    \"a\",\n    \"4\",\n    [\n      1,\n      \"a\",\n      4\n    ]\n  ],\n  \"b\": {\n    \"a\": 447,\n    \"d\": {\n      \"a\": 4\n    },\n    \"b\": [\n      true,\n      {},\n      {}\n    ]\n  }\n}",
      'undefined',
      "null"
    ]));
  });

  to('stringify circular ref', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const a: any = [1, 4];
      const a1 = { a: 14 };

      a[2] = a;
      a1['ad'] = a1;

      const values = [
        a,
        a1
      ];

      return values.map(value => window.OnesyUtils.stringify(value));
    });

    const a: any = [1, 4];
    const a1 = { a: 14 };

    a[2] = a;
    a1['ad'] = a1;

    const values_ = [
      a,
      a1
    ];

    const valueNode = values_.map(value => OnesyUtils.stringify(value));

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      "[\n  1,\n  4\n]",
      "{\n  \"a\": 14\n}"
    ]));
  });

  to('spaces', async () => {
    const values_ = [
      'a',
      [1, 'a', [1, 'a', 4]],
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        'a',
        [1, 'a', [1, 'a', 4]],
      ];

      return values_.map(value => window.OnesyUtils.stringify(value, 4));
    });
    const valueNode = values_.map(value => OnesyUtils.stringify(value, 4));
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      '"a"',
      "[\n    1,\n    \"a\",\n    [\n        1,\n        \"a\",\n        4\n    ]\n]",
    ]));
  });

  to('replacer', async () => {
    const values_ = [
      [1, 'a', [1, 'a', 4]],
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        [1, 'a', [1, 'a', 4]],
      ];

      return values_.map(value => window.OnesyUtils.stringify(value, 4, (property, value) => value === 1 ? 14 : value));
    });
    const valueNode = values_.map(value => OnesyUtils.stringify(value, 4, (property, value) => value === 1 ? 14 : value));
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      "[\n    14,\n    \"a\",\n    [\n        14,\n        \"a\",\n        4\n    ]\n]",
    ]));
  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.OnesyUtils.polyfills();

      return [
        ('a' as any).stringify(),
        (4 as any).stringify(),
        (true as any).stringify(),
        ([] as any).stringify(),
        ({} as any).stringify(),
      ];
    });

    OnesyUtils.polyfills();

    const valueNode = [
      ('a' as any).stringify(),
      (4 as any).stringify(),
      (true as any).stringify(),
      ([] as any).stringify(),
      ({} as any).stringify(),
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      '"a"',
      '4',
      'true',
      '[]',
      '{}',
    ]));
  });

});
