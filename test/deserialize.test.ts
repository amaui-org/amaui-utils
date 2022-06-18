/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/deserialize', () => {

  post(() => reset());

  to('deserialize', async () => {
    class A {
      a = 14;
    }

    const values_ = [
      'a',
      4,
      true,
      new Map(),
      function a() { },
      new A(),
      () => { },
      undefined,
      null,
      [1, 'a', [1, 'a', 4]],
      {
        a: 4,
        c: [1, 'a', '4', [1, 'a', 4]],
        b: {
          a: 447,
          d: { a: 4 },
          b: [true, undefined, function a() { }, new Map(), {}],
        },
      },
    ];

    const valueBrowsers = await evaluate((window: any) => {
      class A {
        a = 14;
      }

      const values_ = [
        'a',
        4,
        true,
        new Map(),
        function a() { },
        new A(),
        () => { },
        undefined,
        null,
        [1, 'a', [1, 'a', 4]],
        {
          a: 4,
          c: [1, 'a', '4', [1, 'a', 4]],
          b: {
            a: 447,
            d: { a: 4 },
            b: [true, undefined, function a() { }, new Map(), {}],
          },
        },
      ];

      return values_.map((value: any) => window.AmauiUtils.deserialize(window.AmauiUtils.serialize(value)));
    });
    const valueNode = values_.map((value: any) => AmauiUtils.deserialize(AmauiUtils.serialize(value)));
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      "a",
      4,
      true,
      {},
      "function a() { }",
      {
        "a": 14
      },
      "() => { }",
      "",
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
        "b": {
          "a": 447,
          "b": [
            true,
            "function a() { }",
            {},
            {}
          ],
          "d": {
            "a": 4
          }
        },
        "c": [
          1,
          "a",
          "4",
          [
            1,
            "a",
            4
          ]
        ]
      }
    ]));
  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.AmauiUtils.polyfills();

      return [
        ('a' as any).serialize().deserialize(),
      ];
    });

    AmauiUtils.polyfills();

    const valueNode = [
      ('a' as any).serialize().deserialize(),
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'a',
    ]));
  });

});
