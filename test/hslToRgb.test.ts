/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/hslToRgb', () => {

  post(() => reset());

  to('hslToRgb', async () => {
    const values_ = [
      'hsl(39, 100%, 50%)',
      'hsl(60, 100%, 35%)',
      'hsl(120, 100%, 48%)',
      'hsla(192, 45%, 78%, 0.4)',
      'hsla(192.414, 45.41%, 78.4%, 0.4)',
      'hsla(192, 45%, a)',
      'a',
      'rgb(255, 140 a)',
      true,
      undefined,
      null,
      new Array(),
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        'hsl(39, 100%, 50%)',
        'hsl(60, 100%, 35%)',
        'hsl(120, 100%, 48%)',
        'hsla(192, 45%, 78%, 0.4)',
        'hsla(192.414, 45.41%, 78.4%, 0.4)',
        'hsla(192, 45%, a)',
        'a',
        'rgb(255, 140 a)',
        true,
        undefined,
        null,
        new Array(),
      ];

      return values_.map((value: any) => window.AmauiUtils.hslToRgb(value));
    });
    const valueNode = values_.map((value: any) => AmauiUtils.hslToRgb(value));
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'rgb(255, 166, 0)',
      'rgb(179, 179, 0)',
      'rgb(0, 245, 0)',
      'rgba(174, 214, 224, 0.4)',
      'rgba(174, 214, 224, 0.4)',
      ...new Array(7).fill(undefined),
    ]));
  });

  to('opacity', async () => {
    const values_ = [
      'hsl(39, 100%, 50%)',
      'hsl(60, 100%, 35%)',
      'hsl(120, 100%, 48%)',
      'hsla(192, 45%, 78%, 0.4)',
      'hsla(192.414, 45.41%, 78.4%, 0.4)',
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        'hsl(39, 100%, 50%)',
        'hsl(60, 100%, 35%)',
        'hsl(120, 100%, 48%)',
        'hsla(192, 45%, 78%, 0.4)',
        'hsla(192.414, 45.41%, 78.4%, 0.4)',
      ];

      return values_.map((value: any) => window.AmauiUtils.hslToRgb(value, 0.4));
    });
    const valueNode = values_.map((value: any) => AmauiUtils.hslToRgb(value, 0.4));
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'rgba(255, 166, 0, 0.4)',
      'rgba(179, 179, 0, 0.4)',
      'rgba(0, 245, 0, 0.4)',
      'rgba(174, 214, 224, 0.4)',
      'rgba(174, 214, 224, 0.4)',
    ]));
  });

  to('array', async () => {
    const values_ = [
      'hsl(60, 100%, 35%)',
      'hsla(192, 45%, 78%, 0.4)',
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        'hsl(60, 100%, 35%)',
        'hsla(192, 45%, 78%, 0.4)',
      ];

      return [
        window.AmauiUtils.hslToRgb('hsl(39, 100%, 50%)', undefined, false),
        ...values_.map((value: any) => window.AmauiUtils.hslToRgb(value, undefined, true)),
      ];
    });
    const valueNode = [
      AmauiUtils.hslToRgb('hsl(39, 100%, 50%)', undefined, false),
      ...values_.map((value: any) => AmauiUtils.hslToRgb(value, undefined, true)),
    ];
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'rgb(255, 166, 0)',
      [179, 179, 0],
      [174, 214, 224, 0.4],
    ]));
  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.AmauiUtils.polyfills();

      return [
        ('hsl(40, 100%, 40%)' as any).hslToRgb(),
      ];
    });

    AmauiUtils.polyfills();

    const valueNode = [
      ('hsl(40, 100%, 40%)' as any).hslToRgb(),
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'rgb(204, 136, 0)',
    ]));
  });

});
