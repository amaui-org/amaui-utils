/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/decrypt', () => {

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

      return values_.map((value: any) => window.AmauiUtils.decrypt(window.AmauiUtils.encrypt(value, 'amaui'), 'amaui'));
    });

    const valueNode = values_.map((value: any) => AmauiUtils.decrypt(AmauiUtils.encrypt(value, 'amaui'), 'amaui'));

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

      return values_.map(value => window.AmauiUtils.decrypt(window.AmauiUtils.encrypt(value, 'amaui'), 'a'));
    });

    const valueNode = values_.map(value => AmauiUtils.decrypt(AmauiUtils.encrypt(value, 'amaui'), 'a'));

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
          window.AmauiUtils.decrypt(window.AmauiUtils.encrypt('a', 'amaui'), 'a', { exception: true });
        }
        catch (error) {
          values_.push(true);
        }

        values_.push(!window.AmauiUtils.decrypt(window.AmauiUtils.encrypt('a', 'amaui'), 'a', { exception: false }));

        return values_;
      });

      const values_ = [];

      try {
        AmauiUtils.decrypt(AmauiUtils.encrypt('a', 'amaui'), 'a', { exception: true });
      }
      catch (error) {
        values_.push(true);
      }

      values_.push(!AmauiUtils.decrypt(AmauiUtils.encrypt('a', 'amaui'), 'a', { exception: false }));

      const valueNode = values_;
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql(new Array(2).fill(true)));
    });

  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.AmauiUtils.polyfills();

      return [
        ('a' as any).encrypt('amaui').decrypt('amaui'),
      ];
    });

    AmauiUtils.polyfills();

    const valueNode = [
      ('a' as any).encrypt('amaui').decrypt('amaui'),
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'a',
    ]));
  });

});
