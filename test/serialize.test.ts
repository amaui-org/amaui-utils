/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { startBrowsers, IBrowsers, evaluate, closeBrowsers, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/serialize', () => {
  let browsers: IBrowsers;

  pre(async () => browsers = await startBrowsers());

  post(async () => {
    await closeBrowsers(browsers);

    reset();
  });

  to('serialize', async () => {
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

      return values_.map(value => window.AmauiUtils.serialize(value));
    }, { browsers });

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

    const valueNode = values_.map(value => AmauiUtils.serialize(value));

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => {
      assert(value[5]).one.eq([
        '"class A {\\n                }"',
        '"class A {\\n            }"',
      ]);

      value.splice(5, 1);

      assert(value).eql([
        '"a"',
        '4',
        'true',
        '"[object Map]"',
        '"function a() { }"',
        '"() => { }"',
        '',
        'null',
        '[1,"a",[1,"a",4]]',
        '{"a":4,"b":{"a":447,"b":[true,"function a() { }","[object Map]",{}],"d":{"a":4}},"c":[1,"a","4",[1,"a",4]]}'
      ]);
    });
  });

  to('serialize circular ref', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const a: any = [1, 4];
      const a1 = { a: 14 };

      a[2] = a;
      a1['ad'] = a1;

      const values = [
        a,
        a1
      ];

      return values.map(value => window.AmauiUtils.serialize(value));
    }, { browsers });

    const a: any = [1, 4];
    const a1 = { a: 14 };

    a[2] = a;
    a1['ad'] = a1;

    const values_ = [
      a,
      a1
    ];

    const valueNode = values_.map(value => AmauiUtils.serialize(value));

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      "[1,4]",
      "{\"a\":14}"
    ]));
  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.AmauiUtils.polyfills();

      return [
        ('a' as any).serialize().deserialize(),
        (4 as any).serialize().deserialize(),
        (true as any).serialize().deserialize(),
        ([1, 4] as any).serialize().deserialize(),
        ({ a: '4' } as any).serialize().deserialize(),
      ];
    }, { browsers });

    AmauiUtils.polyfills();

    const valueNode = [
      ('a' as any).serialize().deserialize(),
      (4 as any).serialize().deserialize(),
      (true as any).serialize().deserialize(),
      ([1, 4] as any).serialize().deserialize(),
      ({ a: '4' } as any).serialize().deserialize(),
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'a',
      4,
      true,
      [1, 4],
      { a: '4' },
    ]));
  });

});
