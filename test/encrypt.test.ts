/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';
import cryptojs from 'crypto-js';

import { startBrowsers, IBrowsers, evaluate, closeBrowsers, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/encrypt', () => {
  let browsers: IBrowsers;

  pre(async () => browsers = await startBrowsers());

  post(async () => {
    await closeBrowsers(browsers);

    reset();
  });

  to('encrypt', async () => {
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

      return values_.map(value => window.AmauiUtils.encrypt(value, 'amaui'));
    }, { browsers });
    const valueNode = values_.map(value => AmauiUtils.encrypt(value, 'amaui'));
    const values = [valueNode, ...valueBrowsers];

    const actualValues = values.map(value => value.map((value_: any) => cryptojs.AES.decrypt(value_, 'amaui').toString(cryptojs.enc.Utf8)));

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

    values.forEach(value => assert(value.map((item: any) => item.indexOf('U2FsdGVkX') > -1)).eql(new Array(11).fill(true)));
  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.AmauiUtils.polyfills();

      return [
        ('a' as any).encrypt('amaui').decrypt('amaui'),
        (4 as any).encrypt('amaui').decrypt('amaui'),
        (true as any).encrypt('amaui').decrypt('amaui'),
        ([1, 4, 1] as any).encrypt('amaui').decrypt('amaui'),
        ({ a: 'a' } as any).encrypt('amaui').decrypt('amaui'),
      ];
    }, { browsers });

    AmauiUtils.polyfills();

    const valueNode = [
      ('a' as any).encrypt('amaui').decrypt('amaui'),
      (4 as any).encrypt('amaui').decrypt('amaui'),
      (true as any).encrypt('amaui').decrypt('amaui'),
      ([1, 4, 1] as any).encrypt('amaui').decrypt('amaui'),
      ({ a: 'a' } as any).encrypt('amaui').decrypt('amaui'),
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
