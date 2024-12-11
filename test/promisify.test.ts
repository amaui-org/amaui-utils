/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as OnesyUtils from '../src';

group('@onesy/utils/promisify', () => {

  post(() => reset());

  to('promise', async () => {
    const promiseMethod = new Promise(resolve => resolve(4));

    const values_ = [
      await promiseMethod === await (OnesyUtils.promisify(promiseMethod))(),
    ];

    const valueBrowsers = await evaluate(async (window: any) => {
      const promiseMethod = new Promise(resolve => resolve(4));

      const values_ = [
        await promiseMethod === await (window.OnesyUtils.promisify(promiseMethod))(),
      ];

      return values_;
    });
    const valueNode = values_;
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      true,
    ]));
  });

  to('response', async () => {
    const method = (a: string, ad: boolean, method_: OnesyUtils.TMethod) => setTimeout(() => method_([a, ad]), 400);

    const values_ = [
      await OnesyUtils.promisify(method)('a', true),
    ];

    const valueBrowsers = await evaluate(async (window: any) => {
      const method = (a: string, ad: boolean, method_: OnesyUtils.TMethod) => setTimeout(() => method_([a, ad]), 400);

      const values_ = [
        await window.OnesyUtils.promisify(method)('a', true),
      ];

      return values_;
    });
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
      const method = (a: string, ad: boolean, method_: OnesyUtils.TMethod) => {
        setTimeout(() => {
          if (a !== 'a') method_([a, ad], new Error('a'));
          else (method_([a, ad]));
        }, 400);
      };

      const values_ = [
        await window.OnesyUtils.promisify(method)('a', true),
      ];

      try {
        await window.OnesyUtils.promisify(method)('ad', true);
      }
      catch (error) {
        values_.push(error);
      }

      return values_;
    });

    const method = (a: string, ad: boolean, method_: OnesyUtils.TMethod) => {
      setTimeout(() => {
        if (a !== 'a') method_([a, ad], new Error('a'));
        else (method_([a, ad]));
      }, 400);
    };

    const values_ = [
      await OnesyUtils.promisify(method)('a', true),
    ];

    try {
      await OnesyUtils.promisify(method)('ad', true);
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
          const method = (a: string, ad: boolean, method_: OnesyUtils.TMethod) => {
            setTimeout(() => {
              if (a !== 'a') method_([a, ad], new Error('a'));
              else (method_([a, ad]));
            }, 400);
          };

          const response = [
            await window.OnesyUtils.promisify(method)('a', true),
            await window.OnesyUtils.promisify(method, { onError: 'resolve' })('ad', true)
          ];

          response[1][1] = [response[1][1] instanceof Error, response[1][1].message];

          return response;
        });

        const method = (a: string, ad: boolean, method_: OnesyUtils.TMethod) => {
          setTimeout(() => {
            if (a !== 'a') method_([a, ad], new Error('a'));
            else (method_([a, ad]));
          }, 400);
        };

        const response = [
          await OnesyUtils.promisify(method)('a', true),
          await OnesyUtils.promisify(method, { onError: 'resolve' })('ad', true)
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
          const method = (a: string, ad: boolean, method_: OnesyUtils.TMethod) => {
            setTimeout(() => {
              if (a !== 'a') method_([a, ad], new Error('a'));
              else (method_([a, ad]));
            }, 400);
          };

          const response = [
            await window.OnesyUtils.promisify(method)('a', true)
          ];

          try {
            await window.OnesyUtils.promisify(method, { onError: 'reject' })('ad', true);
          }
          catch (error) {
            response.push([error instanceof Error, error.message]);
          }

          return response;
        });

        const method = (a: string, ad: boolean, method_: OnesyUtils.TMethod) => {
          setTimeout(() => {
            if (a !== 'a') method_([a, ad], new Error('a'));
            else (method_([a, ad]));
          }, 400);
        };

        const response = [
          await OnesyUtils.promisify(method)('a', true)
        ];

        try {
          await OnesyUtils.promisify(method, { onError: 'reject' })('ad', true);
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
      window.OnesyUtils.polyfills();

      const method = (a: string, ad: boolean, method_: OnesyUtils.TMethod) => setTimeout(() => method_([a, ad]), 400);

      return [
        await (method as any).promisify()('a', true),
      ];
    });

    OnesyUtils.polyfills();

    const method = (a: string, ad: boolean, method_: OnesyUtils.TMethod) => setTimeout(() => method_([a, ad]), 400);

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
