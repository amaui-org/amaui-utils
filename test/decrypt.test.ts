/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as OnesyUtils from '../src';

group('@onesy/utils/decrypt', () => {

  post(() => reset());

  to('decrypt', async () => {
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

      return values_.map((value: any) => window.OnesyUtils.decrypt(window.OnesyUtils.encrypt(value, 'onesy'), 'onesy'));
    });

    const valueNode = values_.map((value: any) => OnesyUtils.decrypt(OnesyUtils.encrypt(value, 'onesy'), 'onesy'));

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

  to('Invalid private value', async () => {
    const values_ = [
      'a',
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        'a',
      ];

      return values_.map(value => window.OnesyUtils.decrypt(window.OnesyUtils.encrypt(value, 'onesy'), 'a'));
    });

    const valueNode = values_.map(value => OnesyUtils.decrypt(OnesyUtils.encrypt(value, 'onesy'), 'a'));

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      undefined,
    ]));
  });

  group('options', () => {

    to('exception', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const values_ = [];

        try {
          window.OnesyUtils.decrypt(window.OnesyUtils.encrypt('a', 'onesy'), 'a', { exception: true });
        }
        catch (error) {
          values_.push(true);
        }

        values_.push(!window.OnesyUtils.decrypt(window.OnesyUtils.encrypt('a', 'onesy'), 'a', { exception: false }));

        return values_;
      });

      const values_ = [];

      try {
        OnesyUtils.decrypt(OnesyUtils.encrypt('a', 'onesy'), 'a', { exception: true });
      }
      catch (error) {
        values_.push(true);
      }

      values_.push(!OnesyUtils.decrypt(OnesyUtils.encrypt('a', 'onesy'), 'a', { exception: false }));

      const valueNode = values_;
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql(new Array(2).fill(true)));
    });

  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.OnesyUtils.polyfills();

      return [
        ('a' as any).encrypt('onesy').decrypt('onesy'),
      ];
    });

    OnesyUtils.polyfills();

    const valueNode = [
      ('a' as any).encrypt('onesy').decrypt('onesy'),
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'a',
    ]));
  });

});
