/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { startBrowsers, IBrowsers, evaluate, closeBrowsers, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/emphasize', () => {
  let browsers: IBrowsers;

  pre(async () => browsers = await startBrowsers());

  post(async () => {
    await closeBrowsers(browsers);

    reset();
  });

  to('emphasize', async () => {
    const values_ = [
      '#ffa500',
      '#ffa50070',
      'rgb(174, 214, 224)',
      'rgba(174, 214, 224, 0.44)',
      'hsl(192, 45%, 77%)',
      'hsla(192.414, 45.41%, 77.4%, 0.4)',
      'rgb(174 214 a)',
      'a',
      true,
      undefined,
      null,
      new Array(),
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        '#ffa500',
        '#ffa50070',
        'rgb(174, 214, 224)',
        'rgba(174, 214, 224, 0.44)',
        'hsl(192, 45%, 77%)',
        'hsla(192.414, 45.41%, 77.4%, 0.4)',
        'rgb(174 214 a)',
        'a',
        true,
        undefined,
        null,
        new Array(),
      ];

      return values_.map((value: any) => window.AmauiUtils.emphasize(value, .4));
    }, { browsers });
    const valueNode = values_.map((value: any) => AmauiUtils.emphasize(value, .4));
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'rgb(255, 201, 102)',
      'rgba(255, 201, 102, 0.44)',
      'rgb(104, 128, 134)',
      'rgba(104, 128, 134, 0.44)',
      'rgb(102, 127, 134)',
      'rgba(102, 127, 134, 0.4)',
      ...new Array(6).fill(undefined),
    ]));
  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.AmauiUtils.polyfills();

      return [
        ('rgb(174, 214, 224)' as any).emphasize(.4),
      ];
    }, { browsers });

    AmauiUtils.polyfills();

    const valueNode = [
      ('rgb(174, 214, 224)' as any).emphasize(.4),
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'rgb(104, 128, 134)',
    ]));
  });

});
