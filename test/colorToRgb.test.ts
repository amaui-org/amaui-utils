/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/colorToRgb', () => {

  post(() => reset());

  to('colorToRgb', async () => {
    const values_ = [
      '#ff8c00',
      '#ff8c0070',
      'rgb(255, 140, 0)',
      'rgba(255, 140, 0, 0.44)',
      'rgba(255.414, 140.41, 0.4, 0.44)',
      'hsl(33, 100%, 50%)',
      'hsla(33.414, 100.41%, 50.4%, 0.4)',
      'a',
      'rgb(255, 140 a)',
      true,
      undefined,
      null,
      new Array(),
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        '#ff8c00',
        '#ff8c0070',
        'rgb(255, 140, 0)',
        'rgba(255, 140, 0, 0.44)',
        'rgba(255.414, 140.41, 0.4, 0.44)',
        'hsl(33, 100%, 50%)',
        'hsla(33.414, 100.41%, 50.4%, 0.4)',
        'a',
        'rgb(255, 140 a)',
        true,
        undefined,
        null,
        new Array(),
      ];

      return values_.map((value: any) => window.AmauiUtils.colorToRgb(value));
    });
    const valueNode = values_.map((value: any) => AmauiUtils.colorToRgb(value));
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'rgb(255, 140, 0)',
      'rgba(255, 140, 0, 0.44)',
      'rgb(255, 140, 0)',
      'rgba(255, 140, 0, 0.44)',
      'rgba(255, 140, 0, 0.44)',
      'rgb(255, 140, 0)',
      'rgba(255, 140, 0, 0.4)',
      ...new Array(6).fill(undefined),
    ]));
  });

  to('opacity', async () => {
    const values_ = [
      '#ff8c00',
      '#ff8c0070',
      'rgb(255, 140, 0)',
      'rgba(255, 140, 0, 0.44)',
      'hsl(33, 100%, 50%)',
      'hsla(33.414, 100.41%, 50.4%, 0.4)',
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        '#ff8c00',
        '#ff8c0070',
        'rgb(255, 140, 0)',
        'rgba(255, 140, 0, 0.44)',
        'hsl(33, 100%, 50%)',
        'hsla(33.414, 100.41%, 50.4%, 0.4)',
      ];

      return values_.map((value: any) => window.AmauiUtils.colorToRgb(value, 0.4));
    });
    const valueNode = values_.map((value: any) => AmauiUtils.colorToRgb(value, 0.4));
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'rgba(255, 140, 0, 0.4)',
      'rgba(255, 140, 0, 0.4)',
      'rgba(255, 140, 0, 0.4)',
      'rgba(255, 140, 0, 0.4)',
      'rgba(255, 140, 0, 0.4)',
      'rgba(255, 140, 0, 0.4)',
    ]));
  });

  to('array', async () => {
    const values_ = [
      '#ff8c00',
      '#ff8c0070',
      'rgb(255, 140, 0)',
      'rgba(255, 140, 0, 0.44)',
      'hsl(33, 100%, 50%)',
      'hsla(33.414, 100.41%, 50.4%, 0.4)',
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        '#ff8c00',
        '#ff8c0070',
        'rgb(255, 140, 0)',
        'rgba(255, 140, 0, 0.44)',
        'hsl(33, 100%, 50%)',
        'hsla(33.414, 100.41%, 50.4%, 0.4)',
      ];

      return [
        window.AmauiUtils.colorToRgb('rgb(255, 140, 0)', undefined, false),
        ...values_.map((value: any) => window.AmauiUtils.colorToRgb(value, undefined, true)),
      ];
    });
    const valueNode = [
      AmauiUtils.colorToRgb('rgb(255, 140, 0)', undefined, false),
      ...values_.map((value: any) => AmauiUtils.colorToRgb(value, undefined, true)),
    ];
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'rgb(255, 140, 0)',
      [255, 140, 0],
      [255, 140, 0, 0.44],
      [255, 140, 0],
      [255, 140, 0, 0.44],
      [255, 140, 0],
      [255, 140, 0, 0.4]
    ]));
  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.AmauiUtils.polyfills();

      return [
        ('rgb(255, 140, 0)' as any).colorToRgb(.4),
      ];
    });

    AmauiUtils.polyfills();

    const valueNode = [
      ('rgb(255, 140, 0)' as any).colorToRgb(.4),
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'rgba(255, 140, 0, 0.4)',
    ]));
  });

});
