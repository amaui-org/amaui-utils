/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/encode', () => {

  post(() => reset());

  to('encode', async () => {
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

      return values_.map(value => window.AmauiUtils.encode(value));
    });

    const valueNode = values_.map(value => AmauiUtils.encode(value));

    const values = [valueNode, ...valueBrowsers];

    const actualValues = values.map(value => value.map((value_: any) => Buffer.from(value_, 'base64').toString('utf-8')));

    actualValues.forEach(value => assert(value).eql([
      '"a"',
      '4',
      'true',
      '{}',
      '"function a() { }"',
      '{"a":14}',
      '"() => { }"',
      '',
      'null',
      '[1,"a",[1,"a",4]]',
      '{"a":4,"b":{"a":447,"b":[true,"function a() { }",{},{}],"d":{"a":4}},"c":[1,"a","4",[1,"a",4]]}'
    ]));

    values.forEach(value => {
      value.splice(7, 1);

      assert(value.every((item: any) => AmauiUtils.isValid('base64', item))).eq(true);

      assert(value).eql([
        'ImEi',
        'NA==',
        'dHJ1ZQ==',
        'e30=',
        'ImZ1bmN0aW9uIGEoKSB7IH0i',
        'eyJhIjoxNH0=',
        'IigpID0+IHsgfSI=',
        'bnVsbA==',
        'WzEsImEiLFsxLCJhIiw0XV0=',
        'eyJhIjo0LCJiIjp7ImEiOjQ0NywiYiI6W3RydWUsImZ1bmN0aW9uIGEoKSB7IH0iLHt9LHt9XSwiZCI6eyJhIjo0fX0sImMiOlsxLCJhIiwiNCIsWzEsImEiLDRdXX0='
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
    });

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
