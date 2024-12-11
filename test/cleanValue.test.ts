/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as OnesyUtils from '../src';

group('@onesy/utils/cleanValue', () => {

  post(() => reset());

  to('cleanValue', async () => {
    const values_ = [
      '',
      'a',
      'a a',
      'a, a. a- a_',
      ' a ',
      '     a    ',
      true,
      undefined,
      null,
      new Array(),
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        '',
        'a',
        'a a',
        'a, a. a- a_',
        ' a ',
        '     a    ',
        true,
        undefined,
        null,
        new Array(),
      ];

      return values_.map((value: any) => window.OnesyUtils.cleanValue(value));
    });
    const valueNode = values_.map((value: any) => OnesyUtils.cleanValue(value));
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      '',
      'a',
      'a a',
      'a a a a',
      'a',
      'a',
      true,
      undefined,
      null,
      new Array(),
    ]));
  });

  group('options', () => {

    to('filters', async () => {
      const valueBrowsers = await evaluate((window: any) => [
        window.OnesyUtils.cleanValue('a +', { filters: ['+'] }),
      ]);
      const valueNode = [
        OnesyUtils.cleanValue('a +', { filters: ['+'] }),
      ];
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        'a',
      ]));
    });

    to('className', async () => {
      const valueBrowsers = await evaluate((window: any) => [
        window.OnesyUtils.cleanValue('BackgroundImage', { className: true }),
        window.OnesyUtils.cleanValue('BackgroundImage', { className: false }),
      ]);
      const valueNode = [
        OnesyUtils.cleanValue('BackgroundImage', { className: true }),
        OnesyUtils.cleanValue('BackgroundImage', { className: false }),
      ];
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        'background-image',
        'BackgroundImage',
      ]));
    });

    to('cammelCaseTransform', async () => {
      const valueBrowsers = await evaluate((window: any) => [
        window.OnesyUtils.cleanValue('BackgroundImage', { cammelCaseTransform: true }),
        window.OnesyUtils.cleanValue('BackgroundImage', { cammelCaseTransform: false }),
      ]);
      const valueNode = [
        OnesyUtils.cleanValue('BackgroundImage', { cammelCaseTransform: true }),
        OnesyUtils.cleanValue('BackgroundImage', { cammelCaseTransform: false }),
      ];
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        'Background Image',
        'BackgroundImage',
      ]));
    });

    to('url', async () => {
      const valueBrowsers = await evaluate((window: any) => [
        window.OnesyUtils.cleanValue('https://asd.com/a/?a=a4', { url: true }),
        window.OnesyUtils.cleanValue('https://asd.com/a/?a=a4', { url: false }),
      ]);
      const valueNode = [
        OnesyUtils.cleanValue('https://asd.com/a/?a=a4', { url: true }),
        OnesyUtils.cleanValue('https://asd.com/a/?a=a4', { url: false }),
      ];
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        'https://asd.com/a?a=a4',
        'https://asd com/a/?a=a4',
      ]));
    });

    to('replaceWith', async () => {
      const valueBrowsers = await evaluate((window: any) => [
        window.OnesyUtils.cleanValue('a-', { replaceWith: '+' }),
      ]);
      const valueNode = [
        OnesyUtils.cleanValue('a-', { replaceWith: '+' }),
      ];
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        'a+',
      ]));
    });

    to('trim', async () => {
      const valueBrowsers = await evaluate((window: any) => [
        window.OnesyUtils.cleanValue('  a  ', { trim: true }),
        window.OnesyUtils.cleanValue('  a  ', { trim: false }),
      ]);
      const valueNode = [
        OnesyUtils.cleanValue('  a  ', { trim: true }),
        OnesyUtils.cleanValue('  a  ', { trim: false }),
      ];
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        'a',
        ' a ',
      ]));
    });

    to('capitalize', async () => {
      const valueBrowsers = await evaluate((window: any) => [
        window.OnesyUtils.cleanValue('a', { capitalize: true }),
        window.OnesyUtils.cleanValue('a', { capitalize: false }),
      ]);
      const valueNode = [
        OnesyUtils.cleanValue('a', { capitalize: true }),
        OnesyUtils.cleanValue('a', { capitalize: false }),
      ];
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        'A',
        'a',
      ]));
    });

    to('lowercase', async () => {
      const valueBrowsers = await evaluate((window: any) => [
        window.OnesyUtils.cleanValue('A', { lowercase: true }),
        window.OnesyUtils.cleanValue('A', { lowercase: false }),
      ]);
      const valueNode = [
        OnesyUtils.cleanValue('A', { lowercase: true }),
        OnesyUtils.cleanValue('A', { lowercase: false }),
      ];
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        'a',
        'A',
      ]));
    });

  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.OnesyUtils.polyfills();

      return [
        (' a, ' as any).clean(),
      ];
    });

    OnesyUtils.polyfills();

    const valueNode = [
      (' a, ' as any).clean(),
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'a',
    ]));
  });

});
