/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { startBrowsers, IBrowsers, evaluate, closeBrowsers, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/decode', () => {
  let browsers: IBrowsers;

  pre(async () => browsers = await startBrowsers());

  post(async () => {
    await closeBrowsers(browsers);

    reset();
  });

  to('decode', async () => {
    const values_ = [
      'a',
      4,
      true,
      new Map(),
      function a() { },
      class A { },
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
      const values_ = [
        'a',
        4,
        true,
        new Map(),
        function a() { },
        class A { },
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

      return values_.map((value: any) => window.AmauiUtils.decode(window.AmauiUtils.encode(value)));
    }, { browsers });
    const valueNode = values_.map((value: any) => AmauiUtils.decode(AmauiUtils.encode(value)));
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => {
      assert(value[5]).one.eq([
        'class A {\n                }',
        'class A {\n            }',
      ]);

      value.splice(5, 1);

      assert(value).eql([
        'a',
        4,
        true,
        '[object Map]',
        'function a() { }',
        '() => { }',
        '',
        null,
        [
          1,
          'a',
          [
            1,
            'a',
            4
          ]
        ],
        {
          'a': 4,
          'b': {
            'a': 447,
            'b': [
              true,
              'function a() { }',
              '[object Map]',
              {}
            ],
            'd': {
              'a': 4
            }
          },
          'c': [
            1,
            'a',
            '4',
            [
              1,
              'a',
              4
            ]
          ]
        }
      ]);
    });
  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.AmauiUtils.polyfills();

      return [
        ('a' as any).encode().decode(),
      ];
    }, { browsers });

    AmauiUtils.polyfills();

    const valueNode = [
      ('a' as any).encode().decode(),
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'a',
    ]));
  });

});
