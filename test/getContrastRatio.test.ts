/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as OnesyUtils from '../src';

group('@onesy/utils/getContrastRatio', () => {

  post(() => reset());

  to('getContrastRatio', async () => {
    const values_ = [
      ['rgb(255, 255, 255)', 'rgb(0, 0, 0)'],
      ['rgb(255, 165, 0)', 'rgb(255, 201, 102)'],
      ['rgba(174.414, 214.41, 224.4, 0.44)', 'rgb(104, 128, 134)'],
      ['hsl(120, 100%, 48%)', 'rgb(0, 147, 0)'],
      ['hsla(60, 100%, 34%)', 'rgb(207, 207, 103)'],
      ['rgb(255, 255, 255)', '#949494'],
      ['rgb(0, 0, 0)', '#5a5a5a70'],
      ['rgb(255, 140 a)', 'rgba(174, 214, 224, 0.4)'],
      ['a', 'rgba(174, 214, 224, 0.4)'],
      [true, 'rgba(174, 214, 224, 0.4)'],
      [undefined, 'rgba(174, 214, 224, 0.4)'],
      [null, 'rgba(174, 214, 224, 0.4)'],
      [new Array(), 'rgba(174, 214, 224, 0.4)'],
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        ['rgb(255, 255, 255)', 'rgb(0, 0, 0)'],
        ['rgb(255, 165, 0)', 'rgb(255, 201, 102)'],
        ['rgba(174.414, 214.41, 224.4, 0.44)', 'rgb(104, 128, 134)'],
        ['hsl(120, 100%, 48%)', 'rgb(0, 147, 0)'],
        ['hsla(60, 100%, 34%)', 'rgb(207, 207, 103)'],
        ['rgb(255, 255, 255)', '#949494'],
        ['rgb(0, 0, 0)', '#5a5a5a70'],
        ['rgb(255, 140 a)', 'rgba(174, 214, 224, 0.4)'],
        ['a', 'rgba(174, 214, 224, 0.4)'],
        [true, 'rgba(174, 214, 224, 0.4)'],
        [undefined, 'rgba(174, 214, 224, 0.4)'],
        [null, 'rgba(174, 214, 224, 0.4)'],
        [new Array(), 'rgba(174, 214, 224, 0.4)'],
      ];

      return values_.map((value: [any, any]) => window.OnesyUtils.getContrastRatio(...value));
    });
    const valueNode = values_.map((value: [any, any]) => OnesyUtils.getContrastRatio(...value));
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      21,
      1.3,
      2.68,
      2.69,
      1.45,
      3,
      3,
      ...new Array(6).fill(undefined),
    ]));
  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.OnesyUtils.polyfills();

      return [
        ('rgb(140, 104, 40)' as any).getContrastRatio('rgb(140, 140, 70)'),
      ];
    });

    OnesyUtils.polyfills();

    const valueNode = [
      ('rgb(140, 104, 40)' as any).getContrastRatio('rgb(140, 140, 70)'),
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      1.43,
    ]));
  });

});
