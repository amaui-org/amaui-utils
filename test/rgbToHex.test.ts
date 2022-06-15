/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { startBrowsers, IBrowsers, evaluate, closeBrowsers, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/rgbToHex', () => {
  let browsers: IBrowsers;

  pre(async () => browsers = await startBrowsers());

  post(async () => {
    await closeBrowsers(browsers);

    reset();
  });

  to('rgbToHex', async () => {
    const values_ = [
      'rgb(255, 165, 0)',
      'rgb(177, 177, 0)',
      'rgb(0, 245, 0)',
      'rgba(174, 214, 224, 0.44)',
      'rgb(174 214 224)',
      'rgb(174 214 a)',
      true,
      undefined,
      null,
      new Array(),
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        'rgb(255, 165, 0)',
        'rgb(177, 177, 0)',
        'rgb(0, 245, 0)',
        'rgba(174, 214, 224, 0.44)',
        'rgb(174 214 224)',
        'rgb(255, 140 a)',
        true,
        undefined,
        null,
        new Array(),
      ];

      return values_.map((value: any) => window.AmauiUtils.rgbToHex(value));
    }, { browsers });
    const valueNode = values_.map((value: any) => AmauiUtils.rgbToHex(value));
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      '#ffa500',
      '#b1b100',
      '#00f500',
      '#aed6e070',
      ...new Array(6).fill(undefined),
    ]));
  });

  to('opacity', async () => {
    const values_ = [
      'rgb(255, 140, 0)',
      'rgba(255, 140, 0, 0.44)',
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        'rgb(255, 140, 0)',
        'rgba(255, 140, 0, 0.44)',
      ];

      return values_.map((value: any) => window.AmauiUtils.rgbToHex(value, 0.44));
    }, { browsers });
    const valueNode = values_.map((value: any) => AmauiUtils.rgbToHex(value, 0.44));
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      '#ff8c0070',
      '#ff8c0070',
    ]));
  });

  to('array', async () => {
    const values_ = [
      'rgb(255, 140, 0)',
      'rgba(255, 140, 0, 0.44)',
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        'rgb(255, 140, 0)',
        'rgba(255, 140, 0, 0.44)',
      ];

      return [
        window.AmauiUtils.rgbToHex('rgb(255, 140, 0)', undefined, false),
        ...values_.map((value: any) => window.AmauiUtils.rgbToHex(value, undefined, true)),
      ];
    }, { browsers });
    const valueNode = [
      AmauiUtils.rgbToHex('rgb(255, 140, 0)', undefined, false),
      ...values_.map((value: any) => AmauiUtils.rgbToHex(value, undefined, true)),
    ];
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      '#ff8c00',
      ['ff', '8c', '00'],
      ['ff', '8c', '00', '70'],
    ]));
  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.AmauiUtils.polyfills();

      return [
        ('rgb(255, 140, 0)' as any).rgbToHex(),
      ];
    }, { browsers });

    AmauiUtils.polyfills();

    const valueNode = [
      ('rgb(255, 140, 0)' as any).rgbToHex(),
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      '#ff8c00',
    ]));
  });

});
