/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as OnesyUtils from '../src';

group('@onesy/utils/simpleNormalize', () => {

  post(() => reset());

  to('simpleNormalize', async () => {
    const values_ = [
      OnesyUtils.simpleNormalize('a'),
      OnesyUtils.simpleNormalize('ui'),
      OnesyUtils.simpleNormalize(4, { normalize: { map: new Map([['4', 'a']]) } }),
      OnesyUtils.simpleNormalize(true),
      OnesyUtils.simpleNormalize('id, _apI, ui true a4false'),
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        window.OnesyUtils.simpleNormalize('a'),
        window.OnesyUtils.simpleNormalize('ui'),
        window.OnesyUtils.simpleNormalize(4, { normalize: { map: new Map([['4', 'a']]) } }),
        window.OnesyUtils.simpleNormalize(true),
        window.OnesyUtils.simpleNormalize('id, _apI, ui true a4false'),
      ];

      return values_;
    });
    const valueNode = values_;
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'a',
      'UI',
      'a',
      'yes',
      'ID API UI yes a4no'
    ]));
  });

  group('options', () => {

    to('clean', async () => {
      const values_ = [
        OnesyUtils.simpleNormalize('ui', {
          clean: true,
          normalize: { map: new Map<any, any>([['ui', '_UI']]) },
        }),
        OnesyUtils.simpleNormalize('ui', {
          clean: false,
          normalize: { map: new Map<any, any>([['ui', '_UI']]) },
        }),
      ];

      const valueBrowsers = await evaluate((window: any) => {
        const values_ = [
          window.OnesyUtils.simpleNormalize('ui', {
            clean: true,
            normalize: { map: new Map<any, any>([['ui', '_UI']]) },
          }),
          window.OnesyUtils.simpleNormalize('ui', {
            clean: false,
            normalize: { map: new Map<any, any>([['ui', '_UI']]) },
          }),
        ];

        return values_;
      });
      const valueNode = values_;
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        'UI',
        '_UI'
      ]));
    });

    to('cleanAfter', async () => {
      const values_ = [
        OnesyUtils.simpleNormalize('ui', {
          cleanAfter: true,
          normalize: { map: new Map<any, any>([['ui', '_UI']]) },
        }),
        OnesyUtils.simpleNormalize('ui', {
          cleanAfter: false,
          normalize: { map: new Map<any, any>([['ui', '_UI']]) },
        }),
      ];

      const valueBrowsers = await evaluate((window: any) => {
        const values_ = [
          window.OnesyUtils.simpleNormalize('ui', {
            cleanAfter: true,
            normalize: { map: new Map<any, any>([['ui', '_UI']]) },
          }),
          window.OnesyUtils.simpleNormalize('ui', {
            cleanAfter: false,
            normalize: { map: new Map<any, any>([['ui', '_UI']]) },
          }),
        ];

        return values_;
      });
      const valueNode = values_;
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        'UI',
        '_UI'
      ]));
    });

    to('optionsCleanValue', async () => {
      const values_ = [
        OnesyUtils.simpleNormalize('ui', {
          cleanAfter: true,
          optionsCleanValue: { replaceWith: 'a' },
          normalize: { map: new Map<any, any>([['ui', '_UI']]) },
        }),
      ];

      const valueBrowsers = await evaluate((window: any) => {
        const values_ = [
          window.OnesyUtils.simpleNormalize('ui', {
            cleanAfter: true,
            optionsCleanValue: { replaceWith: 'a' },
            normalize: { map: new Map<any, any>([['ui', '_UI']]) },
          }),
        ];

        return values_;
      });
      const valueNode = values_;
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        'aUI'
      ]));
    });

    group('normalize', () => {

      to('map', async () => {
        const values_ = [
          OnesyUtils.simpleNormalize('ui', {
            normalize: { map: new Map<any, any>([['ui', 'aUI']]) },
          }),
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            window.OnesyUtils.simpleNormalize('ui', {
              normalize: { map: new Map<any, any>([['ui', 'aUI']]) },
            }),
          ];

          return values_;
        });
        const valueNode = values_;
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql([
          'aUI'
        ]));
      });

    });

  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.OnesyUtils.polyfills();

      return [
        ('ui' as any).simpleNormalize(),
        (4 as any).simpleNormalize(),
        (true as any).simpleNormalize(),
      ];
    });

    OnesyUtils.polyfills();

    const valueNode = [
      ('ui' as any).simpleNormalize(),
      (4 as any).simpleNormalize(),
      (true as any).simpleNormalize(),
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'UI',
      '4',
      'yes',
    ]));
  });

});
