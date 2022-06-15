/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { startBrowsers, IBrowsers, evaluate, closeBrowsers, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/simpleNormalize', () => {
  let browsers: IBrowsers;

  pre(async () => browsers = await startBrowsers());

  post(async () => {
    await closeBrowsers(browsers);

    reset();
  });

  to('simpleNormalize', async () => {
    const values_ = [
      AmauiUtils.simpleNormalize('a'),
      AmauiUtils.simpleNormalize('ui'),
      AmauiUtils.simpleNormalize(4, { normalize: { map: new Map([['4', 'a']]) } }),
      AmauiUtils.simpleNormalize(true),
      AmauiUtils.simpleNormalize('id, _apI, ui true a4false'),
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        window.AmauiUtils.simpleNormalize('a'),
        window.AmauiUtils.simpleNormalize('ui'),
        window.AmauiUtils.simpleNormalize(4, { normalize: { map: new Map([['4', 'a']]) } }),
        window.AmauiUtils.simpleNormalize(true),
        window.AmauiUtils.simpleNormalize('id, _apI, ui true a4false'),
      ];

      return values_;
    }, { browsers });
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
        AmauiUtils.simpleNormalize('ui', {
          clean: true,
          normalize: { map: new Map<any, any>([['ui', '_UI']]) },
        }),
        AmauiUtils.simpleNormalize('ui', {
          clean: false,
          normalize: { map: new Map<any, any>([['ui', '_UI']]) },
        }),
      ];

      const valueBrowsers = await evaluate((window: any) => {
        const values_ = [
          window.AmauiUtils.simpleNormalize('ui', {
            clean: true,
            normalize: { map: new Map<any, any>([['ui', '_UI']]) },
          }),
          window.AmauiUtils.simpleNormalize('ui', {
            clean: false,
            normalize: { map: new Map<any, any>([['ui', '_UI']]) },
          }),
        ];

        return values_;
      }, { browsers });
      const valueNode = values_;
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        'UI',
        '_UI'
      ]));
    });

    to('cleanAfter', async () => {
      const values_ = [
        AmauiUtils.simpleNormalize('ui', {
          cleanAfter: true,
          normalize: { map: new Map<any, any>([['ui', '_UI']]) },
        }),
        AmauiUtils.simpleNormalize('ui', {
          cleanAfter: false,
          normalize: { map: new Map<any, any>([['ui', '_UI']]) },
        }),
      ];

      const valueBrowsers = await evaluate((window: any) => {
        const values_ = [
          window.AmauiUtils.simpleNormalize('ui', {
            cleanAfter: true,
            normalize: { map: new Map<any, any>([['ui', '_UI']]) },
          }),
          window.AmauiUtils.simpleNormalize('ui', {
            cleanAfter: false,
            normalize: { map: new Map<any, any>([['ui', '_UI']]) },
          }),
        ];

        return values_;
      }, { browsers });
      const valueNode = values_;
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        'UI',
        '_UI'
      ]));
    });

    to('optionsCleanValue', async () => {
      const values_ = [
        AmauiUtils.simpleNormalize('ui', {
          cleanAfter: true,
          optionsCleanValue: { replaceWith: 'a' },
          normalize: { map: new Map<any, any>([['ui', '_UI']]) },
        }),
      ];

      const valueBrowsers = await evaluate((window: any) => {
        const values_ = [
          window.AmauiUtils.simpleNormalize('ui', {
            cleanAfter: true,
            optionsCleanValue: { replaceWith: 'a' },
            normalize: { map: new Map<any, any>([['ui', '_UI']]) },
          }),
        ];

        return values_;
      }, { browsers });
      const valueNode = values_;
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        'aUI'
      ]));
    });

    group('normalize', () => {

      to('map', async () => {
        const values_ = [
          AmauiUtils.simpleNormalize('ui', {
            normalize: { map: new Map<any, any>([['ui', 'aUI']]) },
          }),
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            window.AmauiUtils.simpleNormalize('ui', {
              normalize: { map: new Map<any, any>([['ui', 'aUI']]) },
            }),
          ];

          return values_;
        }, { browsers });
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
      window.AmauiUtils.polyfills();

      return [
        ('ui' as any).simpleNormalize(),
        (4 as any).simpleNormalize(),
        (true as any).simpleNormalize(),
      ];
    }, { browsers });

    AmauiUtils.polyfills();

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
