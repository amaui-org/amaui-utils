/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as OnesyUtils from '../src';

group('@onesy/utils/castParam', () => {

  post(() => reset());

  to('castParam', async () => {
    const values_ = [
      'a',
      '4',
      'true',
      'undefined',
      'null',
      'NaN',
      '',
      4,
      true,
      null,
      new Array(),
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        'a',
        '4',
        'true',
        'undefined',
        'null',
        'NaN',
        '',
        4,
        true,
        null,
        new Array(),
      ];

      return values_.map((value: any) => window.OnesyUtils.castParam(value));
    });
    const valueNode = values_.map((value: any) => OnesyUtils.castParam(value));
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'a',
      4,
      true,
      undefined,
      null,
      NaN,
      '',
      4,
      true,
      null,
      new Array(),
    ]));
  });

  group('options', () => {

    to('decode', async () => {
      const valueBrowsers = await evaluate((window: any) => [
        window.OnesyUtils.castParam('a%2C4', { decode: true }),
        window.OnesyUtils.castParam('a%2C4', { decode: false }),
      ]);
      const valueNode = [
        OnesyUtils.castParam('a%2C4', { decode: true }),
        OnesyUtils.castParam('a%2C4', { decode: false }),
      ];
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        'a,4',
        'a%2C4',
      ]));
    });

    to('decodeMethod', async () => {
      const valueBrowsers = await evaluate((window: any) => [
        window.OnesyUtils.castParam('a', { decode: true, decodeMethod: () => (4 as any) }),
      ]);

      const valueNode = [
        OnesyUtils.castParam('a', { decode: true, decodeMethod: () => (4 as any) }),
      ];

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        4,
      ]));
    });

  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.OnesyUtils.polyfills();

      const values_ = [
        'a',
        '4',
        'true',
      ];

      return values_.map((value: any) => value.castParam());
    });

    OnesyUtils.polyfills();

    const values_ = [
      'a',
      '4',
      'true',
    ];

    const valueNode = values_.map((value: any) => value.castParam());

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'a',
      4,
      true,
    ]));
  });

});
