/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { startBrowsers, IBrowsers, evaluate, closeBrowsers, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/promisify', () => {
  let browsers: IBrowsers;

  pre(async () => browsers = await startBrowsers());

  post(async () => {
    await closeBrowsers(browsers);

    reset();
  });

  to('promise', async () => {
    const promiseMethod = new Promise(resolve => resolve(4));

    const values_ = [
      await promiseMethod === await (AmauiUtils.promisify(promiseMethod))(),
    ];

    const valueBrowsers = await evaluate(async (window: any) => {
      const promiseMethod = new Promise(resolve => resolve(4));

      const values_ = [
        await promiseMethod === await (window.AmauiUtils.promisify(promiseMethod))(),
      ];

      return values_;
    }, { browsers });
    const valueNode = values_;
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      true,
    ]));
  });

  to('response', async () => {
    const method = (a: string, ad: boolean, method_: AmauiUtils.TMethod) => setTimeout(() => method_([a, ad]), 400);

    const values_ = [
      await AmauiUtils.promisify(method)('a', true),
    ];

    const valueBrowsers = await evaluate(async (window: any) => {
      const method = (a: string, ad: boolean, method_: AmauiUtils.TMethod) => setTimeout(() => method_([a, ad]), 400);

      const values_ = [
        await window.AmauiUtils.promisify(method)('a', true),
      ];

      return values_;
    }, { browsers });
    const valueNode = values_;
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      [
        'a',
        true,
      ],
    ]));
  });

  to('error', async () => {
    const valueBrowsers = await evaluate(async (window: any) => {
      const method = (a: string, ad: boolean, method_: AmauiUtils.TMethod) => {
        setTimeout(() => {
          if (a !== 'a') method_([a, ad], new Error('a'));
          else (method_([a, ad]));
        }, 400);
      };

      const values_ = [
        await window.AmauiUtils.promisify(method)('a', true),
      ];

      try {
        await window.AmauiUtils.promisify(method)('ad', true);
      }
      catch (error) {
        values_.push(error);
      }

      return values_;
    }, { browsers });

    const method = (a: string, ad: boolean, method_: AmauiUtils.TMethod) => {
      setTimeout(() => {
        if (a !== 'a') method_([a, ad], new Error('a'));
        else (method_([a, ad]));
      }, 400);
    };

    const values_ = [
      await AmauiUtils.promisify(method)('a', true),
    ];

    try {
      await AmauiUtils.promisify(method)('ad', true);
    }
    catch (error) {
      values_.push(error);
    }

    const valueNode = values_;

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => {
      assert(value[0]).eql([
        'a',
        true,
      ]);
      assert(value[1] instanceof Error);
      assert(value[1].message === 'a');
    });
  });

  group('options', () => {

    group('onError', () => {

      to('resolve', async () => {
        const valueBrowsers = await evaluate(async (window: any) => {
          const method = (a: string, ad: boolean, method_: AmauiUtils.TMethod) => {
            setTimeout(() => {
              if (a !== 'a') method_([a, ad], new Error('a'));
              else (method_([a, ad]));
            }, 400);
          };

          const response = [
            await window.AmauiUtils.promisify(method)('a', true),
            await window.AmauiUtils.promisify(method, { onError: 'resolve' })('ad', true)
          ];

          response[1][1] = [response[1][1] instanceof Error, response[1][1].message];

          return response;
        }, { browsers });

        const method = (a: string, ad: boolean, method_: AmauiUtils.TMethod) => {
          setTimeout(() => {
            if (a !== 'a') method_([a, ad], new Error('a'));
            else (method_([a, ad]));
          }, 400);
        };

        const response = [
          await AmauiUtils.promisify(method)('a', true),
          await AmauiUtils.promisify(method, { onError: 'resolve' })('ad', true)
        ];

        response[1][1] = [response[1][1] instanceof Error, response[1][1].message];

        const valueNode = response;

        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => {
          assert(value).eql([
            ["a", true],
            [
              [
                "ad",
                true
              ],
              [
                true,
                "a"
              ]
            ]
          ]);
        });
      });

      to('reject', async () => {
        const valueBrowsers = await evaluate(async (window: any) => {
          const method = (a: string, ad: boolean, method_: AmauiUtils.TMethod) => {
            setTimeout(() => {
              if (a !== 'a') method_([a, ad], new Error('a'));
              else (method_([a, ad]));
            }, 400);
          };

          const response = [
            await window.AmauiUtils.promisify(method)('a', true)
          ];

          try {
            await window.AmauiUtils.promisify(method, { onError: 'reject' })('ad', true);
          }
          catch (error) {
            response.push([error instanceof Error, error.message]);
          }

          return response;
        }, { browsers });

        const method = (a: string, ad: boolean, method_: AmauiUtils.TMethod) => {
          setTimeout(() => {
            if (a !== 'a') method_([a, ad], new Error('a'));
            else (method_([a, ad]));
          }, 400);
        };

        const response = [
          await AmauiUtils.promisify(method)('a', true)
        ];

        try {
          await AmauiUtils.promisify(method, { onError: 'reject' })('ad', true);
        }
        catch (error) {
          response.push([error instanceof Error, error.message]);
        }

        const valueNode = response;

        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => {
          assert(value).eql([
            [
              "a",
              true
            ],
            [
              true,
              "a"
            ]
          ]);
        });
      });

    });

  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate(async (window: any) => {
      window.AmauiUtils.polyfills();

      const method = (a: string, ad: boolean, method_: AmauiUtils.TMethod) => setTimeout(() => method_([a, ad]), 400);

      return [
        await (method as any).promisify()('a', true),
      ];
    }, { browsers });

    AmauiUtils.polyfills();

    const method = (a: string, ad: boolean, method_: AmauiUtils.TMethod) => setTimeout(() => method_([a, ad]), 400);

    const valueNode = [
      await (method as any).promisify()('a', true),
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      [
        'a',
        true,
      ],
    ]));
  });

});
