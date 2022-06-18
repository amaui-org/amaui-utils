/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/setStringVariables', () => {

  post(() => reset());

  to('setStringVariables', async () => {
    const values_ = [
      AmauiUtils.setStringVariables('a'),
      AmauiUtils.setStringVariables('a {a} a [ab]'),
      AmauiUtils.setStringVariables('a {a} a [ab]', [{ key: 'a', value: 'a' }, { key: 'ab', value: 4 }]),
      AmauiUtils.setStringVariables('a {a} {a} a [ab]', [{ key: 'a', value: 'a' }]),
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        window.AmauiUtils.setStringVariables('a'),
        window.AmauiUtils.setStringVariables('a {a} a [ab]'),
        window.AmauiUtils.setStringVariables('a {a} a [ab]', [{ key: 'a', value: 'a' }, { key: 'ab', value: 4 }]),
        window.AmauiUtils.setStringVariables('a {a} {a} a [ab]', [{ key: 'a', value: 'a' }]),
      ];

      return values_;
    });
    const valueNode = values_;
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'a',
      'a _0 a _1',
      'a a a 4',
      'a a a a _2'
    ]));
  });

  group('options', () => {

    to('getVariables', async () => {
      const values_ = [
        AmauiUtils.setStringVariables('a {a} a [ab]', [], { getVariables: true }),
        AmauiUtils.setStringVariables('a {a} a [ab]', [{ key: 'a', value: 'a' }, { key: 'ab', value: 4 }], { getVariables: true }),
        AmauiUtils.setStringVariables('a {a} a [ab]', [], { getVariables: false }),
        AmauiUtils.setStringVariables('a {a} a [ab]', [{ key: 'a', value: 'a' }, { key: 'ab', value: 4 }], { getVariables: false }),
      ];

      const valueBrowsers = await evaluate((window: any) => {
        const values_ = [
          window.AmauiUtils.setStringVariables('a {a} a [ab]', [], { getVariables: true }),
          window.AmauiUtils.setStringVariables('a {a} a [ab]', [{ key: 'a', value: 'a' }, { key: 'ab', value: 4 }], { getVariables: true }),
          window.AmauiUtils.setStringVariables('a {a} a [ab]', [], { getVariables: false }),
          window.AmauiUtils.setStringVariables('a {a} a [ab]', [{ key: 'a', value: 'a' }, { key: 'ab', value: 4 }], { getVariables: false }),
        ];

        return values_;
      });
      const valueNode = values_;
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        'a _0 a _1',
        'a a a 4',
        'a {a} a [ab]',
        'a {a} a [ab]'
      ]));
    });

    to('cleanVariables', async () => {
      const values_ = [
        AmauiUtils.setStringVariables('a {a} a [ab]', [], { cleanVariables: true }),
        AmauiUtils.setStringVariables('a {a} a [ab]', [{ key: 'a', value: 'a' }, { key: 'ab', value: 4 }], { cleanVariables: true }),
        AmauiUtils.setStringVariables('a {a} a [ab]', [], { cleanVariables: false }),
        AmauiUtils.setStringVariables('a {a} a [ab]', [{ key: 'a', value: 'a' }, { key: 'ab', value: 4 }], { cleanVariables: false }),
      ];

      const valueBrowsers = await evaluate((window: any) => {
        const values_ = [
          window.AmauiUtils.setStringVariables('a {a} a [ab]', [], { cleanVariables: true }),
          window.AmauiUtils.setStringVariables('a {a} a [ab]', [{ key: 'a', value: 'a' }, { key: 'ab', value: 4 }], { cleanVariables: true }),
          window.AmauiUtils.setStringVariables('a {a} a [ab]', [], { cleanVariables: false }),
          window.AmauiUtils.setStringVariables('a {a} a [ab]', [{ key: 'a', value: 'a' }, { key: 'ab', value: 4 }], { cleanVariables: false }),
        ];

        return values_;
      });
      const valueNode = values_;
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        'a _0 a _1',
        'a a a 4',
        'a _0 a _1',
        'a _0 a _1'
      ]));
    });

    to('placeholderPrefix', async () => {
      const values_ = [
        AmauiUtils.setStringVariables('a +0 a +1', [], { getVariables: false, placeholderPrefix: '_' }),
        AmauiUtils.setStringVariables('a +0 a +1', [{ key: 'a', value: 'a' }, { key: 'ab', value: 4 }], { getVariables: false, placeholderPrefix: '_' }),
        AmauiUtils.setStringVariables('a +0 a +1', [], { getVariables: false, placeholderPrefix: '+' }),
        AmauiUtils.setStringVariables('a +0 a +1', [{ key: 'a', value: 'a' }, { key: 'ab', value: 4 }], { getVariables: false, placeholderPrefix: '+' }),
      ];

      const valueBrowsers = await evaluate((window: any) => {
        const values_ = [
          window.AmauiUtils.setStringVariables('a +0 a +1', [], { getVariables: false, placeholderPrefix: '_' }),
          window.AmauiUtils.setStringVariables('a +0 a +1', [{ key: 'a', value: 'a' }, { key: 'ab', value: 4 }], { getVariables: false, placeholderPrefix: '_' }),
          window.AmauiUtils.setStringVariables('a +0 a +1', [], { getVariables: false, placeholderPrefix: '+' }),
          window.AmauiUtils.setStringVariables('a +0 a +1', [{ key: 'a', value: 'a' }, { key: 'ab', value: 4 }], { getVariables: false, placeholderPrefix: '+' }),
        ];

        return values_;
      });
      const valueNode = values_;
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        'a +0 a +1',
        'a +0 a +1',
        'a +0 a +1',
        'a a a 4'
      ]));
    });

  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.AmauiUtils.polyfills();

      return [
        ('a {a} a [ab]' as any).setVariables([{ key: 'a', value: 'a' }, { key: 'ab', value: 4 }]),
      ];
    });

    AmauiUtils.polyfills();

    const valueNode = [
      ('a {a} a [ab]' as any).setVariables([{ key: 'a', value: 'a' }, { key: 'ab', value: 4 }]),
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'a a a 4',
    ]));
  });

});
