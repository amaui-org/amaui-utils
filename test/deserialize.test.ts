/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as OnesyUtils from '../src';

group('@onesy/utils/deserialize', () => {

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

      return values_.map((value: any) => window.OnesyUtils.deserialize(window.OnesyUtils.serialize(value)));
    });
    const valueNode = values_.map((value: any) => OnesyUtils.deserialize(OnesyUtils.serialize(value)));
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
      window.OnesyUtils.polyfills();

      return [
        ('a' as any).serialize().deserialize(),
      ];
    });

    OnesyUtils.polyfills();

    const valueNode = [
      ('a' as any).serialize().deserialize(),
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'a',
    ]));
  });

});
