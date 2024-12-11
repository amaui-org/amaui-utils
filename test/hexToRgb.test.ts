/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as OnesyUtils from '../src';

group('@onesy/utils/hexToRgb', () => {

  post(() => reset());

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

      return values_.map((value: any) => window.OnesyUtils.hexToRgb(value));
    });
    const valueNode = values_.map((value: any) => OnesyUtils.hexToRgb(value));
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

      return values_.map((value: any) => window.OnesyUtils.hexToRgb(value, .4));
    });
    const valueNode = values_.map((value: any) => OnesyUtils.hexToRgb(value, .4));
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
        window.OnesyUtils.hexToRgb('#b1b100', undefined, false),
        ...values_.map((value: any) => window.OnesyUtils.hexToRgb(value, undefined, true)),
      ];
    });
    const valueNode = [
      OnesyUtils.hexToRgb('#b1b100', undefined, false),
      ...values_.map((value: any) => OnesyUtils.hexToRgb(value, undefined, true)),
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
      window.OnesyUtils.polyfills();

      return [
        ('#ff8c00' as any).hexToRgb(.4),
      ];
    });

    OnesyUtils.polyfills();

    const valueNode = [
      ('#ff8c00' as any).hexToRgb(.4),
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'rgba(255, 140, 0, 0.4)',
    ]));
  });

});
