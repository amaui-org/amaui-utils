/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { startBrowsers, IBrowsers, evaluate, closeBrowsers, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/castParam', () => {
  let browsers: IBrowsers;

  pre(async () => browsers = await startBrowsers());

  post(async () => {
    await closeBrowsers(browsers);

    reset();
  });

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

      return values_.map((value: any) => window.AmauiUtils.castParam(value));
    }, { browsers });
    const valueNode = values_.map((value: any) => AmauiUtils.castParam(value));
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
        window.AmauiUtils.castParam('a%2C4', { decode: true }),
        window.AmauiUtils.castParam('a%2C4', { decode: false }),
      ], { browsers });
      const valueNode = [
        AmauiUtils.castParam('a%2C4', { decode: true }),
        AmauiUtils.castParam('a%2C4', { decode: false }),
      ];
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        'a,4',
        'a%2C4',
      ]));
    });

    to('decodeMethod', async () => {
      const valueBrowsers = await evaluate((window: any) => [
        window.AmauiUtils.castParam('a', { decode: true, decodeMethod: () => (4 as any) }),
      ], { browsers });

      const valueNode = [
        AmauiUtils.castParam('a', { decode: true, decodeMethod: () => (4 as any) }),
      ];

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        4,
      ]));
    });

  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.AmauiUtils.polyfills();

      const values_ = [
        'a',
        '4',
        'true',
      ];

      return values_.map((value: any) => value.castParam());
    }, { browsers });

    AmauiUtils.polyfills();

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
