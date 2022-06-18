/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/parse', () => {

  post(() => reset());

  to('parse', async () => {
    const values_ = [
      "[\n  1,\n  \"a\",\n  [\n    1,\n    \"a\",\n    4\n  ]\n]",
      "{\n  \"a\": 4,\n  \"c\": [\n    1,\n    \"a\",\n    \"4\",\n    [\n      1,\n      \"a\",\n      4\n    ]\n  ],\n  \"b\": {\n    \"a\": 447,\n    \"d\": {\n      \"a\": 4\n    },\n    \"b\": [\n      true,\n      null,\n      null,\n      {},\n      {}\n    ]\n  }\n}",
      "true",
      undefined,
      "null",
      [1, 'a', [1, 'a', 4]],
      {
        a: 4,
        c: [1, 'a', '4', [1, 'a', 4]],
        b: {
          a: 447,
          d: { a: 4 },
          b: [true, undefined, 'a', {}],
        },
      },
      true,
      undefined,
      null,
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        "[\n  1,\n  \"a\",\n  [\n    1,\n    \"a\",\n    4\n  ]\n]",
        "{\n  \"a\": 4,\n  \"c\": [\n    1,\n    \"a\",\n    \"4\",\n    [\n      1,\n      \"a\",\n      4\n    ]\n  ],\n  \"b\": {\n    \"a\": 447,\n    \"d\": {\n      \"a\": 4\n    },\n    \"b\": [\n      true,\n      null,\n      null,\n      {},\n      {}\n    ]\n  }\n}",
        "true",
        undefined,
        "null",
        [1, 'a', [1, 'a', 4]],
        {
          a: 4,
          c: [1, 'a', '4', [1, 'a', 4]],
          b: {
            a: 447,
            d: { a: 4 },
            b: [true, undefined, 'a', {}],
          },
        },
        true,
        undefined,
        null,
      ];

      return values_.map(value => window.AmauiUtils.parse(value));
    });
    const valueNode = values_.map(value => AmauiUtils.parse(value));
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      [
        1,
        "a",
        [
          1,
          "a",
          4
        ]
      ],
      {
        "a": 4,
        "c": [
          1,
          "a",
          "4",
          [
            1,
            "a",
            4
          ]
        ],
        "b": {
          "a": 447,
          "d": {
            "a": 4
          },
          "b": [
            true,
            null,
            null,
            {},
            {}
          ]
        }
      },
      true,
      undefined,
      null,
      [
        1,
        "a",
        [
          1,
          "a",
          4
        ]
      ],
      {
        "a": 4,
        "c": [
          1,
          "a",
          "4",
          [
            1,
            "a",
            4
          ]
        ],
        "b": {
          "a": 447,
          "d": {
            "a": 4
          },
          "b": [
            true,
            undefined,
            "a",
            {}
          ]
        }
      },
      true,
      undefined,
      null
    ]));
  });

  group('options', () => {

    to('log', async () => {
      global.AMAUI = {
        env: 'test',
      };

      const values_ = [
        "[\n  1,\n  \"a\",\n  [\n    1,\n    \"a\",\n    4\n  ]\n]",
        new Map(),
      ];

      values_.map(value => AmauiUtils.parse(value, 'JSON', { log: true }));
      values_.map(value => AmauiUtils.parse(value, 'JSON', { log: false }));

      const valueBrowsers = await evaluate((window: any) => {
        window.AMAUI = {
          env: 'test',
        };

        const values_ = [
          "[\n  1,\n  \"a\",\n  [\n    1,\n    \"a\",\n    4\n  ]\n]",
          new Map(),
        ];

        values_.map(value => window.AmauiUtils.parse(value, 'JSON', { log: true }));
        values_.map(value => window.AmauiUtils.parse(value, 'JSON', { log: false }));

        return [
          window.AMAUI.test.parse.logs.length,
        ];
      });
      const valueNode = [
        global.AMAUI.test.parse.logs.length,
      ];
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        1,
      ]));
    });

    to('returnSame', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        return [
          window.AmauiUtils.parse([], 'JSON', { returnSame: true }),
          window.AmauiUtils.parse([], 'JSON', { returnSame: false }),
        ];
      });
      const valueNode = [
        AmauiUtils.parse([], 'JSON', { returnSame: true }),
        AmauiUtils.parse([], 'JSON', { returnSame: false }),
      ];
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        [],
        undefined,
      ]));
    });

  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.AmauiUtils.polyfills();

      return [
        ('"a"' as any).parse(),
        ('4' as any).parse(),
        ('true' as any).parse(),
        ('[]' as any).parse(),
        ('{}' as any).parse(),
      ];
    });

    AmauiUtils.polyfills();

    const valueNode = [
      ('"a"' as any).parse(),
      ('4' as any).parse(),
      ('true' as any).parse(),
      ('[]' as any).parse(),
      ('{}' as any).parse(),
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'a',
      4,
      true,
      [],
      {},
    ]));
  });

});
