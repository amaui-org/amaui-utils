/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as OnesyUtils from '../src';

group('@onesy/utils/setStringVariables', () => {

  post(() => reset());

  to('setStringVariables', async () => {
    const values_ = [
      OnesyUtils.setStringVariables('a'),
      OnesyUtils.setStringVariables('a {a} a [ab]'),
      OnesyUtils.setStringVariables('a {a} a [ab]', [{ key: 'a', value: 'a' }, { key: 'ab', value: 4 }]),
      OnesyUtils.setStringVariables('a {a} {a} a [ab]', [{ key: 'a', value: 'a' }]),
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        window.OnesyUtils.setStringVariables('a'),
        window.OnesyUtils.setStringVariables('a {a} a [ab]'),
        window.OnesyUtils.setStringVariables('a {a} a [ab]', [{ key: 'a', value: 'a' }, { key: 'ab', value: 4 }]),
        window.OnesyUtils.setStringVariables('a {a} {a} a [ab]', [{ key: 'a', value: 'a' }]),
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
        OnesyUtils.setStringVariables('a {a} a [ab]', [], { getVariables: true }),
        OnesyUtils.setStringVariables('a {a} a [ab]', [{ key: 'a', value: 'a' }, { key: 'ab', value: 4 }], { getVariables: true }),
        OnesyUtils.setStringVariables('a {a} a [ab]', [], { getVariables: false }),
        OnesyUtils.setStringVariables('a {a} a [ab]', [{ key: 'a', value: 'a' }, { key: 'ab', value: 4 }], { getVariables: false }),
      ];

      const valueBrowsers = await evaluate((window: any) => {
        const values_ = [
          window.OnesyUtils.setStringVariables('a {a} a [ab]', [], { getVariables: true }),
          window.OnesyUtils.setStringVariables('a {a} a [ab]', [{ key: 'a', value: 'a' }, { key: 'ab', value: 4 }], { getVariables: true }),
          window.OnesyUtils.setStringVariables('a {a} a [ab]', [], { getVariables: false }),
          window.OnesyUtils.setStringVariables('a {a} a [ab]', [{ key: 'a', value: 'a' }, { key: 'ab', value: 4 }], { getVariables: false }),
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
        OnesyUtils.setStringVariables('a {a} a [ab]', [], { cleanVariables: true }),
        OnesyUtils.setStringVariables('a {a} a [ab]', [{ key: 'a', value: 'a' }, { key: 'ab', value: 4 }], { cleanVariables: true }),
        OnesyUtils.setStringVariables('a {a} a [ab]', [], { cleanVariables: false }),
        OnesyUtils.setStringVariables('a {a} a [ab]', [{ key: 'a', value: 'a' }, { key: 'ab', value: 4 }], { cleanVariables: false }),
      ];

      const valueBrowsers = await evaluate((window: any) => {
        const values_ = [
          window.OnesyUtils.setStringVariables('a {a} a [ab]', [], { cleanVariables: true }),
          window.OnesyUtils.setStringVariables('a {a} a [ab]', [{ key: 'a', value: 'a' }, { key: 'ab', value: 4 }], { cleanVariables: true }),
          window.OnesyUtils.setStringVariables('a {a} a [ab]', [], { cleanVariables: false }),
          window.OnesyUtils.setStringVariables('a {a} a [ab]', [{ key: 'a', value: 'a' }, { key: 'ab', value: 4 }], { cleanVariables: false }),
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
        OnesyUtils.setStringVariables('a +0 a +1', [], { getVariables: false, placeholderPrefix: '_' }),
        OnesyUtils.setStringVariables('a +0 a +1', [{ key: 'a', value: 'a' }, { key: 'ab', value: 4 }], { getVariables: false, placeholderPrefix: '_' }),
        OnesyUtils.setStringVariables('a +0 a +1', [], { getVariables: false, placeholderPrefix: '+' }),
        OnesyUtils.setStringVariables('a +0 a +1', [{ key: 'a', value: 'a' }, { key: 'ab', value: 4 }], { getVariables: false, placeholderPrefix: '+' }),
      ];

      const valueBrowsers = await evaluate((window: any) => {
        const values_ = [
          window.OnesyUtils.setStringVariables('a +0 a +1', [], { getVariables: false, placeholderPrefix: '_' }),
          window.OnesyUtils.setStringVariables('a +0 a +1', [{ key: 'a', value: 'a' }, { key: 'ab', value: 4 }], { getVariables: false, placeholderPrefix: '_' }),
          window.OnesyUtils.setStringVariables('a +0 a +1', [], { getVariables: false, placeholderPrefix: '+' }),
          window.OnesyUtils.setStringVariables('a +0 a +1', [{ key: 'a', value: 'a' }, { key: 'ab', value: 4 }], { getVariables: false, placeholderPrefix: '+' }),
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
      window.OnesyUtils.polyfills();

      return [
        ('a {a} a [ab]' as any).setVariables([{ key: 'a', value: 'a' }, { key: 'ab', value: 4 }]),
      ];
    });

    OnesyUtils.polyfills();

    const valueNode = [
      ('a {a} a [ab]' as any).setVariables([{ key: 'a', value: 'a' }, { key: 'ab', value: 4 }]),
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'a a a 4',
    ]));
  });

});
