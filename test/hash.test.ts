/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as OnesyUtils from '../src';

group('@onesy/utils/hash', () => {

  post(() => reset());

  to('hash', async () => {
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

      return values_.map(value => window.OnesyUtils.hash(value));
    });
    const valueNode = values_.map(value => OnesyUtils.hash(value));
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => {
      // A separate expect, as in browser environment
      // there's different amount of spaces in String(class A {}) vs in the node
      assert(value[5]).one.eq([
        '0x26f582d1cc10b4ca45d37225f13bc72a0f52f42f8afbfbf942068ed4cb67a954',
        '0x8ac4943f488aba4881d623b2226bb4f350adb4e37251f12e6954dc9c02901c8f',
      ]);

      value.splice(5, 1);

      assert(value).eql([
        '0xac8d8342bbb2362d13f0a559a3621bb407011368895164b628a54f7fc33fc43c',
        '0x4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a',
        '0xb5bea41b6c623f7c09f1bf24dcae58ebab3c0cdd90ad966bc43a45b44867e12b',
        '0x44136fa355b3678a1146ad16f7e8649e94fb4fc21fe77e8310c060f61caaff8a',
        '0x71047b3ff31e14678c9efaf7cb1b9c32166fa5a7b09c24ca1bdb33fa29cab590',
        '0x302e5bed656bca90e2a9982a20c1983d3854f5c2404679f279002ced5586bebf',
        '0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        '0x74234e98afe7498fb5daf1f36ac2d78acc339464f950703b8c019892f982b90b',
        '0x5302090aad87a3ba1943e5db8145535fb96b149059400055edb465e62553482d',
        '0x375d5c418f0d1864a46592bbb9453e37c6b78d3ae85725a05b486529307ec74b'
      ]);
    });
  });

  group('options', () => {

    to('withPrefix', async () => {
      const valueBrowsers = await evaluate((window: any) => [
        window.OnesyUtils.hash('a', { withPrefix: true }),
        window.OnesyUtils.hash('a', { withPrefix: false }),
      ]);
      const valueNode = [
        OnesyUtils.hash('a', { withPrefix: true }),
        OnesyUtils.hash('a', { withPrefix: false }),
      ];
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        '0xac8d8342bbb2362d13f0a559a3621bb407011368895164b628a54f7fc33fc43c',
        'ac8d8342bbb2362d13f0a559a3621bb407011368895164b628a54f7fc33fc43c',
      ]));
    });

    to('serialize', async () => {
      const valueBrowsers = await evaluate((window: any) => [
        window.OnesyUtils.hash('a', { serialize: true }),
        window.OnesyUtils.hash('a', { serialize: false }),
      ]);
      const valueNode = [
        OnesyUtils.hash('a', { serialize: true }),
        OnesyUtils.hash('a', { serialize: false }),
      ];
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        '0xac8d8342bbb2362d13f0a559a3621bb407011368895164b628a54f7fc33fc43c',
        '0xca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb',
      ]));
    });

  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.OnesyUtils.polyfills();

      return [
        ('a' as any).hash(),
        (4 as any).hash(),
        (true as any).hash(),
        ([1, 4, 1] as any).hash(),
        ({ a: '4' } as any).hash(),
      ];
    });

    OnesyUtils.polyfills();

    const valueNode = [
      ('a' as any).hash(),
      (4 as any).hash(),
      (true as any).hash(),
      ([1, 4, 1] as any).hash(),
      ({ a: '4' } as any).hash(),
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      '0xac8d8342bbb2362d13f0a559a3621bb407011368895164b628a54f7fc33fc43c',
      '0x4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a',
      '0xb5bea41b6c623f7c09f1bf24dcae58ebab3c0cdd90ad966bc43a45b44867e12b',
      '0x34993fa07cb3d2f52071509310842e0d0b9018d6b19b26149af25ee12f6258c2',
      '0xee6a4a9e1553a80ea463b1506c29fb07bac5dd2493651bfa828b2c767fa8c164'
    ]));
  });

});
