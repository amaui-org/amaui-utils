/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { startBrowsers, IBrowsers, evaluate, closeBrowsers, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/encode', () => {
  let browsers: IBrowsers;

  pre(async () => browsers = await startBrowsers());

  post(async () => {
    await closeBrowsers(browsers);

    reset();
  });

  to('encode', async () => {
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

      return values_.map(value => window.AmauiUtils.encode(value));
    }, { browsers });
    const valueNode = values_.map(value => AmauiUtils.encode(value));
    const values = [valueNode, ...valueBrowsers];

    const actualValues = values.map(value => value.map((value_: any) => Buffer.from(value_, 'base64').toString('utf-8')));

    actualValues.forEach(value => {
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
        '{\"a\":4,\"b\":{\"a\":447,\"b\":[true,\"function a() { }\",\"[object Map]\",{}],\"d\":{\"a\":4}},\"c\":[1,\"a\",\"4\",[1,\"a\",4]]}'
      ]);
    });

    values.forEach(value => {
      value.splice(7, 1);

      assert(value.every((item: any) => AmauiUtils.isValid('base64', item))).eq(true);

      assert(value[5]).one.eq([
        'ImNsYXNzIEEge1xuICAgICAgICAgICAgICAgIH0i',
        'ImNsYXNzIEEge1xuICAgICAgICAgICAgfSI=',
      ]);

      value.splice(5, 1);

      assert(value).eql([
        'ImEi',
        'NA==',
        'dHJ1ZQ==',
        'IltvYmplY3QgTWFwXSI=',
        'ImZ1bmN0aW9uIGEoKSB7IH0i',
        'IigpID0+IHsgfSI=',
        'bnVsbA==',
        'WzEsImEiLFsxLCJhIiw0XV0=',
        'eyJhIjo0LCJiIjp7ImEiOjQ0NywiYiI6W3RydWUsImZ1bmN0aW9uIGEoKSB7IH0iLCJbb2JqZWN0IE1hcF0iLHt9XSwiZCI6eyJhIjo0fX0sImMiOlsxLCJhIiwiNCIsWzEsImEiLDRdXX0=',
      ]);
    });

  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.AmauiUtils.polyfills();

      return [
        ('a' as any).encode().decode(),
        (4 as any).encode().decode(),
        (true as any).encode().decode(),
        ([1, 4, 1] as any).encode().decode(),
        ({ a: '4' } as any).encode().decode(),
      ];
    }, { browsers });

    AmauiUtils.polyfills();

    const valueNode = [
      ('a' as any).encode().decode(),
      (4 as any).encode().decode(),
      (true as any).encode().decode(),
      ([1, 4, 1] as any).encode().decode(),
      ({ a: '4' } as any).encode().decode(),
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'a',
      4,
      true,
      [1, 4, 1],
      { a: '4' },
    ]));
  });

});
