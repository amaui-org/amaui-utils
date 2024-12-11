/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as OnesyUtils from '../src';

group('@onesy/utils/rgbToRgba', () => {

  post(() => reset());

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

      return values_.map((value: any) => window.OnesyUtils.rgbToRgba(value));
    });
    const valueNode = values_.map((value: any) => OnesyUtils.rgbToRgba(value));
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

      return values_.map((value: any) => window.OnesyUtils.rgbToRgba(value, 0.44));
    });
    const valueNode = values_.map((value: any) => OnesyUtils.rgbToRgba(value, 0.44));
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
        window.OnesyUtils.rgbToRgba('rgb(0, 245, 0)', undefined, false),
        ...values_.map((value: any) => window.OnesyUtils.rgbToRgba(value, undefined, true)),
      ];
    });
    const valueNode = [
      OnesyUtils.rgbToRgba('rgb(0, 245, 0)', undefined, false),
      ...values_.map((value: any) => OnesyUtils.rgbToRgba(value, undefined, true)),
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
      window.OnesyUtils.polyfills();

      return [
        ('rgb(140, 140, 0)' as any).rgbToRgba(),
      ];
    });

    OnesyUtils.polyfills();

    const valueNode = [
      ('rgb(140, 140, 0)' as any).rgbToRgba(),
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'rgb(140, 140, 0)',
    ]));
  });

});
