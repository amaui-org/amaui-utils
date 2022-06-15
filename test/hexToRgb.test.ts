/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { startBrowsers, IBrowsers, evaluate, closeBrowsers, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/hexToRgb', () => {
  let browsers: IBrowsers;

  pre(async () => browsers = await startBrowsers());

  post(async () => {
    await closeBrowsers(browsers);

    reset();
  });

  to('hexToRgb', async () => {
    const values_ = [
      '#ffa500',
      '#b1b100',
      '#00f500',
      '#aed6e070',
      '#aaaaaaa',
      'a',
      true,
      undefined,
      null,
      new Array(),
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        '#ffa500',
        '#b1b100',
        '#00f500',
        '#aed6e070',
        '#aaaaaaa',
        'a',
        true,
        undefined,
        null,
        new Array(),
      ];

      return values_.map((value: any) => window.AmauiUtils.hexToRgb(value));
    }, { browsers });
    const valueNode = values_.map((value: any) => AmauiUtils.hexToRgb(value));
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'rgb(255, 165, 0)',
      'rgb(177, 177, 0)',
      'rgb(0, 245, 0)',
      'rgba(174, 214, 224, 0.44)',
      ...new Array(6).fill(undefined),
    ]));
  });

  to('opacity', async () => {
    const values_ = [
      '#ffa500',
      '#b1b100',
      '#00f500',
      '#aed6e070',
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        '#ffa500',
        '#b1b100',
        '#00f500',
        '#aed6e070',
      ];

      return values_.map((value: any) => window.AmauiUtils.hexToRgb(value, .4));
    }, { browsers });
    const valueNode = values_.map((value: any) => AmauiUtils.hexToRgb(value, .4));
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'rgba(255, 165, 0, 0.4)',
      'rgba(177, 177, 0, 0.4)',
      'rgba(0, 245, 0, 0.4)',
      'rgba(174, 214, 224, 0.4)'
    ]));
  });

  to('array', async () => {
    const values_ = [
      '#b1b100',
      '#aed6e070',
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        '#b1b100',
        '#aed6e070',
      ];

      return [
        window.AmauiUtils.hexToRgb('#b1b100', undefined, false),
        ...values_.map((value: any) => window.AmauiUtils.hexToRgb(value, undefined, true)),
      ];
    }, { browsers });
    const valueNode = [
      AmauiUtils.hexToRgb('#b1b100', undefined, false),
      ...values_.map((value: any) => AmauiUtils.hexToRgb(value, undefined, true)),
    ];
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'rgb(177, 177, 0)',
      [177, 177, 0],
      [174, 214, 224, 0.44],
    ]));
  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.AmauiUtils.polyfills();

      return [
        ('#ff8c00' as any).hexToRgb(.4),
      ];
    }, { browsers });

    AmauiUtils.polyfills();

    const valueNode = [
      ('#ff8c00' as any).hexToRgb(.4),
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'rgba(255, 140, 0, 0.4)',
    ]));
  });

});
