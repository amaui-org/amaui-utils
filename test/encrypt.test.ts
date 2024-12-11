/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';
import cryptojs from 'crypto-js';

import { evaluate, reset } from '../utils/js/test/utils';

import * as OnesyUtils from '../src';

group('@onesy/utils/encrypt', () => {

  post(() => reset());

  to('encrypt', async () => {
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

      return values_.map(value => window.OnesyUtils.encrypt(value, 'onesy'));
    });
    const valueNode = values_.map(value => OnesyUtils.encrypt(value, 'onesy'));
    const values = [valueNode, ...valueBrowsers];

    const actualValues = values.map(value => value.map((value_: any) => cryptojs.AES.decrypt(value_, 'onesy').toString(cryptojs.enc.Utf8)));

    actualValues.forEach(value => {
      assert(value).eql([
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
        '{\"a\":4,\"b\":{\"a\":447,\"b\":[true,\"function a() { }\",{},{}],\"d\":{\"a\":4}},\"c\":[1,\"a\",\"4\",[1,\"a\",4]]}'
      ]);
    });

    values.forEach(value => assert(value.map((item: any) => item.indexOf('U2FsdGVkX') > -1)).eql(new Array(11).fill(true)));
  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.OnesyUtils.polyfills();

      return [
        ('a' as any).encrypt('onesy').decrypt('onesy'),
        (4 as any).encrypt('onesy').decrypt('onesy'),
        (true as any).encrypt('onesy').decrypt('onesy'),
        ([1, 4, 1] as any).encrypt('onesy').decrypt('onesy'),
        ({ a: 'a' } as any).encrypt('onesy').decrypt('onesy'),
      ];
    });

    OnesyUtils.polyfills();

    const valueNode = [
      ('a' as any).encrypt('onesy').decrypt('onesy'),
      (4 as any).encrypt('onesy').decrypt('onesy'),
      (true as any).encrypt('onesy').decrypt('onesy'),
      ([1, 4, 1] as any).encrypt('onesy').decrypt('onesy'),
      ({ a: 'a' } as any).encrypt('onesy').decrypt('onesy'),
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'a',
      4,
      true,
      [1, 4, 1],
      { a: 'a' },
    ]));
  });

});
