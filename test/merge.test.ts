/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as OnesyUtils from '../src';

group('@onesy/utils/merge', () => {

  post(() => reset());

  to('merge', async () => {
    const values_ = [
      ['a', 4],
      [[], []],
      [[], [1, 4, 1]],
      [[1, undefined, [], { a: '4' }], [1, 4, [1, 4, undefined], { a: '4', ab: { a: 4 } }]],
      [{}, {}],
      [{}, { a: '4' }],
      [{ a: '4', ab: {} }, { a: { a: '4' }, ab: { a: 4 } }],
      [{}, undefined],
      [undefined, {}],
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        ['a', 4],
        [[], []],
        [[], [1, 4, 1]],
        [[1, undefined, [], { a: '4' }], [1, 4, [1, 4, undefined], { a: '4', ab: { a: 4 } }]],
        [{}, {}],
        [{}, { a: '4' }],
        [{ a: '4', ab: {} }, { a: { a: '4' }, ab: { a: 4 } }],
        [{}, undefined],
        [undefined, {}],
      ];

      return values_.map((value: [any, any]) => window.OnesyUtils.merge(...value));
    });

    const valueNode = values_.map((value: [any, any]) => OnesyUtils.merge(...value));
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'a',
      [],
      [],
      [1, undefined, [], { a: '4' }],
      {},
      {
        a: '4'
      },
      {
        a: '4',
        ab: {
          a: 4
        }
      },
      {},
      undefined,
    ]));
  });

  group('options', () => {

    to('copy', async () => {
      const o = { a: '4' };
      const o1 = { a: '4' };
      const o2 = { ab: { a: 4 } };

      const mo: any = OnesyUtils.merge(o, o2, { copy: true });
      const mo1: any = OnesyUtils.merge(o1, o2, { copy: false });

      const valueBrowsers = await evaluate((window: any) => {
        const o = { a: '4' };
        const o1 = { a: '4' };
        const o2 = { ab: { a: 4 } };

        const mo: any = window.OnesyUtils.merge(o, o2, { copy: true });
        const mo1: any = window.OnesyUtils.merge(o1, o2, { copy: false });

        return [
          mo.ab !== o2.ab,
          mo1.ab === o2.ab,
        ];
      });

      const valueNode = [
        mo.ab !== o2.ab,
        mo1.ab === o2.ab,
      ];
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql(new Array(2).fill(true)));
    });

    group('merge', () => {

      to('array', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          return [
            window.OnesyUtils.merge([], [1, 4, 1], { merge: { array: true } }),
            window.OnesyUtils.merge([], [1, 4, 1], { merge: { array: false } }),
          ];
        });

        const valueNode = [
          OnesyUtils.merge([], [1, 4, 1], { merge: { array: true } }),
          OnesyUtils.merge([], [1, 4, 1], { merge: { array: false } }),
        ];
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql([
          [1, 4, 1],
          [],
        ]));
      });

    });

  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.OnesyUtils.polyfills();

      return [
        ([] as any).merge([1, 4, 1], { merge: { array: true } }),
        ({} as any).merge({ a: '4' }),
      ];
    });

    OnesyUtils.polyfills();

    const valueNode = [
      ([] as any).merge([1, 4, 1], { merge: { array: true } }),
      ({} as any).merge({ a: '4' }),
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      [1, 4, 1],
      { a: '4' },
    ]));
  });

});
