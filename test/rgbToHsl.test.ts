/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/rgbToHsl', () => {

  post(() => reset());

  to('rgbToHsl', async () => {
    const values_ = [
      'rgb(255, 165, 0)',
      'rgb(177, 177, 0)',
      'rgb(0, 245, 0)',
      'rgba(174, 214, 224, 0.44)',
      'rgba(255, 140 0.4)',
      'rgb(255, 140 a)',
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
        'rgba(255, 140 0.4)',
        'rgb(255, 140 a)',
        true,
        undefined,
        null,
        new Array(),
      ];

      return values_.map((value: any) => window.AmauiUtils.rgbToHsl(value));
    });
    const valueNode = values_.map((value: any) => AmauiUtils.rgbToHsl(value));
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'hsl(39, 100%, 50%)',
      'hsl(60, 100%, 35%)',
      'hsl(120, 100%, 48%)',
      'hsla(192, 45%, 78%, 0.44)',
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

      return values_.map((value: any) => window.AmauiUtils.rgbToHsl(value, 0.44));
    });
    const valueNode = values_.map((value: any) => AmauiUtils.rgbToHsl(value, 0.44));
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'hsla(120, 100%, 48%, 0.44)',
      'hsla(192, 45%, 78%, 0.44)',
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
        window.AmauiUtils.rgbToHsl('rgb(240, 140, 0)', undefined, false),
        ...values_.map((value: any) => window.AmauiUtils.rgbToHsl(value, undefined, true)),
      ];
    });
    const valueNode = [
      AmauiUtils.rgbToHsl('rgb(240, 140, 0)', undefined, false),
      ...values_.map((value: any) => AmauiUtils.rgbToHsl(value, undefined, true)),
    ];
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'hsl(35, 100%, 47%)',
      [120, 100, 48],
      [192, 45, 78, 0.44],
    ]));
  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.AmauiUtils.polyfills();

      return [
        ('rgb(240, 140, 0)' as any).rgbToHsl(),
      ];
    });

    AmauiUtils.polyfills();

    const valueNode = [
      ('rgb(240, 140, 0)' as any).rgbToHsl(),
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'hsl(35, 100%, 47%)',
    ]));
  });

});
