/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { startBrowsers, IBrowsers, evaluate, closeBrowsers, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/rgbToRgba', () => {
  let browsers: IBrowsers;

  pre(async () => browsers = await startBrowsers());

  post(async () => {
    await closeBrowsers(browsers);

    reset();
  });

  to('rgbToRgba', async () => {
    const values_ = [
      'rgb(255, 165, 0)',
      'rgb(177, 177, 0)',
      'rgb(0, 245, 0)',
      'rgba(174, 214, 224, 0.44)',
      'rgb(255.414, 165.44, 0.4)',
      'rgb(144 140 0.4)',
      'rgb(140 140 a)',
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
        'rgb(255.414, 165.44, 0.4)',
        'rgb(144 140 0.4)',
        'rgb(140 140 a)',
        true,
        undefined,
        null,
        new Array(),
      ];

      return values_.map((value: any) => window.AmauiUtils.rgbToRgba(value));
    }, { browsers });
    const valueNode = values_.map((value: any) => AmauiUtils.rgbToRgba(value));
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'rgb(255, 165, 0)',
      'rgb(177, 177, 0)',
      'rgb(0, 245, 0)',
      'rgba(174, 214, 224, 0.44)',
      'rgb(255, 165, 0)',
      ...new Array(6).fill(undefined),
    ]));
  });

  to('opacity', async () => {
    const values_ = [
      'rgb(0, 245, 0)',
      'rgba(174, 214, 224, 0.44)',
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        'rgb(0, 245, 0)',
        'rgba(174, 214, 224, 0.44)',
      ];

      return values_.map((value: any) => window.AmauiUtils.rgbToRgba(value, 0.44));
    }, { browsers });
    const valueNode = values_.map((value: any) => AmauiUtils.rgbToRgba(value, 0.44));
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'rgba(0, 245, 0, 0.44)',
      'rgba(174, 214, 224, 0.44)',
    ]));
  });

  to('array', async () => {
    const values_ = [
      'rgb(0, 245, 0)',
      'rgba(174, 214, 224, 0.44)',
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        'rgb(0, 245, 0)',
        'rgba(174, 214, 224, 0.44)',
      ];

      return [
        window.AmauiUtils.rgbToRgba('rgb(0, 245, 0)', undefined, false),
        ...values_.map((value: any) => window.AmauiUtils.rgbToRgba(value, undefined, true)),
      ];
    }, { browsers });
    const valueNode = [
      AmauiUtils.rgbToRgba('rgb(0, 245, 0)', undefined, false),
      ...values_.map((value: any) => AmauiUtils.rgbToRgba(value, undefined, true)),
    ];
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'rgb(0, 245, 0)',
      [0, 245, 0],
      [174, 214, 224, 0.44],
    ]));
  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.AmauiUtils.polyfills();

      return [
        ('rgb(140, 140, 0)' as any).rgbToRgba(),
      ];
    }, { browsers });

    AmauiUtils.polyfills();

    const valueNode = [
      ('rgb(140, 140, 0)' as any).rgbToRgba(),
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'rgb(140, 140, 0)',
    ]));
  });

});
