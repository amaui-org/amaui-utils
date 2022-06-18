/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/cleanValue', () => {

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

      return values_.map((value: any) => window.AmauiUtils.cleanValue(value));
    });
    const valueNode = values_.map((value: any) => AmauiUtils.cleanValue(value));
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
        window.AmauiUtils.cleanValue('a +', { filters: ['+'] }),
      ]);
      const valueNode = [
        AmauiUtils.cleanValue('a +', { filters: ['+'] }),
      ];
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        'a',
      ]));
    });

    to('className', async () => {
      const valueBrowsers = await evaluate((window: any) => [
        window.AmauiUtils.cleanValue('BackgroundImage', { className: true }),
        window.AmauiUtils.cleanValue('BackgroundImage', { className: false }),
      ]);
      const valueNode = [
        AmauiUtils.cleanValue('BackgroundImage', { className: true }),
        AmauiUtils.cleanValue('BackgroundImage', { className: false }),
      ];
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        'background-image',
        'BackgroundImage',
      ]));
    });

    to('cammelCaseTransform', async () => {
      const valueBrowsers = await evaluate((window: any) => [
        window.AmauiUtils.cleanValue('BackgroundImage', { cammelCaseTransform: true }),
        window.AmauiUtils.cleanValue('BackgroundImage', { cammelCaseTransform: false }),
      ]);
      const valueNode = [
        AmauiUtils.cleanValue('BackgroundImage', { cammelCaseTransform: true }),
        AmauiUtils.cleanValue('BackgroundImage', { cammelCaseTransform: false }),
      ];
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        'Background Image',
        'BackgroundImage',
      ]));
    });

    to('url', async () => {
      const valueBrowsers = await evaluate((window: any) => [
        window.AmauiUtils.cleanValue('https://asd.com/a/?a=a4', { url: true }),
        window.AmauiUtils.cleanValue('https://asd.com/a/?a=a4', { url: false }),
      ]);
      const valueNode = [
        AmauiUtils.cleanValue('https://asd.com/a/?a=a4', { url: true }),
        AmauiUtils.cleanValue('https://asd.com/a/?a=a4', { url: false }),
      ];
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        'https://asd.com/a?a=a4',
        'https://asd com/a/?a=a4',
      ]));
    });

    to('replaceWith', async () => {
      const valueBrowsers = await evaluate((window: any) => [
        window.AmauiUtils.cleanValue('a-', { replaceWith: '+' }),
      ]);
      const valueNode = [
        AmauiUtils.cleanValue('a-', { replaceWith: '+' }),
      ];
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        'a+',
      ]));
    });

    to('trim', async () => {
      const valueBrowsers = await evaluate((window: any) => [
        window.AmauiUtils.cleanValue('  a  ', { trim: true }),
        window.AmauiUtils.cleanValue('  a  ', { trim: false }),
      ]);
      const valueNode = [
        AmauiUtils.cleanValue('  a  ', { trim: true }),
        AmauiUtils.cleanValue('  a  ', { trim: false }),
      ];
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        'a',
        ' a ',
      ]));
    });

    to('capitalize', async () => {
      const valueBrowsers = await evaluate((window: any) => [
        window.AmauiUtils.cleanValue('a', { capitalize: true }),
        window.AmauiUtils.cleanValue('a', { capitalize: false }),
      ]);
      const valueNode = [
        AmauiUtils.cleanValue('a', { capitalize: true }),
        AmauiUtils.cleanValue('a', { capitalize: false }),
      ];
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        'A',
        'a',
      ]));
    });

    to('lowercase', async () => {
      const valueBrowsers = await evaluate((window: any) => [
        window.AmauiUtils.cleanValue('A', { lowercase: true }),
        window.AmauiUtils.cleanValue('A', { lowercase: false }),
      ]);
      const valueNode = [
        AmauiUtils.cleanValue('A', { lowercase: true }),
        AmauiUtils.cleanValue('A', { lowercase: false }),
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
      window.AmauiUtils.polyfills();

      return [
        (' a, ' as any).clean(),
      ];
    });

    AmauiUtils.polyfills();

    const valueNode = [
      (' a, ' as any).clean(),
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'a',
    ]));
  });

});
