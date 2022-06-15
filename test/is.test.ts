/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import playwright from 'playwright';
import React from 'react';

declare const WorkerGlobalScope: any;

import { startBrowsers, IBrowsers, evaluate, startBrowser, closeBrowsers, IBrowser, reset, evaluateWorker } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/is', () => {
  let browsers: IBrowsers;

  pre(async () => browsers = await startBrowsers());

  post(async () => {
    await closeBrowsers(browsers);

    reset();
  });

  group('is', () => {

    group('string', () => {

      to('is string', async () => {
        const values_ = [
          '',
          'a',
          "a",
          `a`
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            '',
            'a',
            "a",
            `a`
          ];

          return values_.map(value => window.AmauiUtils.is('string', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('string', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(4).fill(true)));
      });

      to('is not string', async () => {
        const values_ = [
          123,
          [],
          null
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            123,
            [],
            null
          ];

          return values_.map(value => window.AmauiUtils.is('string', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('string', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(3).fill(false)));
      });

    });

    group('number', () => {

      to('is number', async () => {
        const values_ = [
          1,
          1e4,
          -1.4,
          0
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            1,
            1e4,
            -1.4,
            0
          ];

          return values_.map(value => window.AmauiUtils.is('number', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('number', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(4).fill(true)));
      });

      to('is not number', async () => {
        const values_ = [
          NaN,
          'a',
          undefined,
          [],
          null
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            NaN,
            'a',
            undefined,
            [],
            null
          ];

          return values_.map(value => window.AmauiUtils.is('number', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('number', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(5).fill(false)));
      });

    });

    group('boolean', () => {

      to('is boolean', async () => {
        const values_ = [
          true,
          false,
          !!4,
          !!null,
          !!undefined
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            true,
            false,
            !!4,
            !!null,
            !!undefined
          ];

          return values_.map(value => window.AmauiUtils.is('boolean', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('boolean', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(5).fill(true)));
      });

      to('is not boolean', async () => {
        const values_ = [
          'a',
          undefined,
          [],
          null
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            'a',
            undefined,
            [],
            null
          ];

          return values_.map(value => window.AmauiUtils.is('boolean', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('boolean', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(4).fill(false)));
      });

    });

    group('array', () => {

      to('is array', async () => {
        const values_ = [
          [4, 'a', Array(4)],
          Array.from(new Set([4, 5, 7])),
          new Array(4),
          []
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            [4, 'a', Array(4)],
            Array.from(new Set([4, 5, 7])),
            new Array(4),
            []
          ];

          return values_.map(value => window.AmauiUtils.is('array', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('array', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(4).fill(true)));
      });

      to('is not array', async () => {
        const values_ = [
          'a',
          undefined,
          14,
          null
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            'a',
            undefined,
            14,
            null
          ];

          return values_.map(value => window.AmauiUtils.is('array', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('array', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(4).fill(false)));
      });

    });

    group('object', () => {

      to('is object', async () => {
        const values_ = [
          { a: 134 },
          new Object({ a: 134 })
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            { a: 134 },
            new Object({ a: 134 })
          ];

          return values_.map(value => window.AmauiUtils.is('object', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('object', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(2).fill(true)));
      });

      to('is not object', async () => {
        const values_ = [
          'a',
          new Map(),
          new Date(),
          new WeakMap(),
          undefined,
          null,
          function asd() { }
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            'a',
            new Map(),
            new Date(),
            new WeakMap(),
            undefined,
            null,
            function asd() { }
          ];

          return values_.map(value => window.AmauiUtils.is('object', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('object', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(7).fill(false)));
      });

    });

    group('object-like', () => {

      to('is object-like', async () => {
        const values_ = [
          new Map(),
          new Date(),
          new WeakMap(),
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            new Map(),
            new Date(),
            new WeakMap(),
          ];

          return values_.map(value => window.AmauiUtils.is('object-like', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('object-like', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(3).fill(true)));
      });

      to('is not object-like', async () => {
        const values_ = [
          { a: 134 },
          new Object({ a: 134 }),
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            { a: 134 },
            new Object({ a: 134 }),
          ];

          return values_.map(value => window.AmauiUtils.is('object-like', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('object-like', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(2).fill(false)));
      });

    });

    group('class', () => {

      to('is class', async () => {
        class A { }

        const values_ = [
          A,
          new A()
        ];

        const valueBrowsers = await evaluate((window: any) => {
          // tslint:disable-next-line
          class A { }

          const values_ = [
            A,
            new A()
          ];

          return values_.map(value => window.AmauiUtils.is('class', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('class', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(2).fill(true)));
      });

      to('is not class', async () => {
        const values_ = [
          4,
          undefined,
          'a',
          { a: 134 },
          new Object({ a: 134 }),
          null,
          function asd() { }
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            4,
            undefined,
            'a',
            { a: 134 },
            new Object({ a: 134 }),
            null,
            function asd() { }
          ];

          return values_.map(value => window.AmauiUtils.is('class', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('class', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(7).fill(false)));
      });

    });

    group('function', () => {

      to('is function', async () => {
        const a = () => { };

        const values_ = [
          a,
          function asd() { }
        ];

        const valueBrowsers = await evaluate((window: any) => {
          // tslint:disable-next-line
          const a = () => { };

          const values_ = [
            a,
            function asd() { }
          ];

          return values_.map(value => window.AmauiUtils.is('function', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('function', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(2).fill(true)));
      });

      to('is not function', async () => {
        const values_ = [
          'a',
          undefined,
          14,
          null
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            'a',
            undefined,
            14,
            null
          ];

          return values_.map(value => window.AmauiUtils.is('function', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('function', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(4).fill(false)));
      });

    });

    group('async', () => {

      to('is async', async () => {
        const a = async () => { };

        const values_ = [
          a,
          async function aa() { }
        ];

        const valueBrowsers = await evaluate((window: any) => {
          // tslint:disable-next-line
          const a = async () => { };

          const values_ = [
            a,
            async function aa() { }
          ];

          return values_.map(value => window.AmauiUtils.is('async', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('async', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(2).fill(true)));
      });

      to('is not async', async () => {
        const a = () => { };

        const values_ = [
          a,
          'a',
          undefined,
          [],
          null
        ];

        const valueBrowsers = await evaluate((window: any) => {
          // tslint:disable-next-line
          const a = () => { };

          const values_ = [
            a,
            'a',
            undefined,
            [],
            null
          ];

          return values_.map(value => window.AmauiUtils.is('async', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('async', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(5).fill(false)));
      });

    });

    group('map', () => {

      to('is map', async () => {
        const values_ = [
          new Map(),
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            new Map(),
          ];

          return values_.map(value => window.AmauiUtils.is('map', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('map', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(1).fill(true)));
      });

      to('is not map', async () => {
        const values_ = [
          14,
          'a',
          async function a() { },
          undefined,
          null
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            14,
            'a',
            async function a() { },
            undefined,
            null
          ];

          return values_.map(value => window.AmauiUtils.is('map', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('map', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(5).fill(false)));
      });

    });

    group('weakmap', () => {

      to('is weakmap', async () => {
        const values_ = [
          new WeakMap(),
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            new WeakMap(),
          ];

          return values_.map(value => window.AmauiUtils.is('weakmap', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('weakmap', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(1).fill(true)));
      });

      to('is not weakmap', async () => {
        const values_ = [
          14,
          'a',
          async function a() { },
          undefined,
          null
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            14,
            'a',
            async function a() { },
            undefined,
            null
          ];

          return values_.map(value => window.AmauiUtils.is('weakmap', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('weakmap', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(5).fill(false)));
      });

    });

    group('set', () => {

      to('is set', async () => {
        const values_ = [
          new Set(),
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            new Set(),
          ];

          return values_.map(value => window.AmauiUtils.is('set', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('set', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(1).fill(true)));
      });

      to('is not set', async () => {
        const values_ = [
          14,
          'a',
          async function a() { },
          undefined,
          null
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            14,
            'a',
            async function a() { },
            undefined,
            null
          ];

          return values_.map(value => window.AmauiUtils.is('set', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('set', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(5).fill(false)));
      });

    });

    group('weakset', () => {

      to('is weakset', async () => {
        const values_ = [
          new WeakSet(),
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            new WeakSet(),
          ];

          return values_.map(value => window.AmauiUtils.is('weakset', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('weakset', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(1).fill(true)));
      });

      to('is not weakset', async () => {
        const values_ = [
          14,
          'a',
          async function a() { },
          undefined,
          null
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            14,
            'a',
            async function a() { },
            undefined,
            null
          ];

          return values_.map(value => window.AmauiUtils.is('weakset', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('weakset', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(5).fill(false)));
      });

    });

    group('promise', () => {

      to('is promise', async () => {
        const values_ = [
          new Promise((resolve, reject) => resolve(true)),
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            new Promise((resolve, reject) => resolve(true)),
          ];

          return values_.map(value => window.AmauiUtils.is('promise', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('promise', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(1).fill(true)));
      });

      to('is not promise', async () => {
        const values_ = [
          'a',
          undefined,
          function a() { },
          [],
          null
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            'a',
            undefined,
            function a() { },
            [],
            null
          ];

          return values_.map(value => window.AmauiUtils.is('promise', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('promise', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(5).fill(false)));
      });

    });

    group('int8array', () => {

      to('is int8array', async () => {
        const values_ = [
          new Int8Array(),
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            new Int8Array(),
          ];

          return values_.map(value => window.AmauiUtils.is('int8array', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('int8array', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(1).fill(true)));
      });

      to('is not int8array', async () => {
        const values_ = [
          14,
          'a',
          async function a() { },
          undefined,
          null
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            14,
            'a',
            async function a() { },
            undefined,
            null
          ];

          return values_.map(value => window.AmauiUtils.is('int8array', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('int8array', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(5).fill(false)));
      });

    });

    group('uint8array', () => {

      to('is uint8array', async () => {
        const values_ = [
          new Uint8Array(),
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            new Uint8Array(),
          ];

          return values_.map(value => window.AmauiUtils.is('uint8array', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('uint8array', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(1).fill(true)));
      });

      to('is not uint8array', async () => {
        const values_ = [
          14,
          'a',
          async function a() { },
          undefined,
          null
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            14,
            'a',
            async function a() { },
            undefined,
            null
          ];

          return values_.map(value => window.AmauiUtils.is('uint8array', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('uint8array', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(5).fill(false)));
      });

    });

    group('uint8clampedarray', () => {

      to('is uint8clampedarray', async () => {
        const values_ = [
          new Uint8ClampedArray(),
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            new Uint8ClampedArray(),
          ];

          return values_.map(value => window.AmauiUtils.is('uint8clampedarray', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('uint8clampedarray', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(1).fill(true)));
      });

      to('is not uint8clampedarray', async () => {
        const values_ = [
          14,
          'a',
          async function a() { },
          undefined,
          null
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            14,
            'a',
            async function a() { },
            undefined,
            null
          ];

          return values_.map(value => window.AmauiUtils.is('uint8clampedarray', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('uint8clampedarray', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(5).fill(false)));
      });

    });

    group('int16array', () => {

      to('is int16array', async () => {
        const values_ = [
          new Int16Array(),
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            new Int16Array(),
          ];

          return values_.map(value => window.AmauiUtils.is('int16array', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('int16array', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(1).fill(true)));
      });

      to('is not int16array', async () => {
        const values_ = [
          14,
          'a',
          async function a() { },
          undefined,
          null
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            14,
            'a',
            async function a() { },
            undefined,
            null
          ];

          return values_.map(value => window.AmauiUtils.is('int16array', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('int16array', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(5).fill(false)));
      });

    });

    group('uint16array', () => {

      to('is uint16array', async () => {
        const values_ = [
          new Uint16Array(),
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            new Uint16Array(),
          ];

          return values_.map(value => window.AmauiUtils.is('uint16array', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('uint16array', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(1).fill(true)));
      });

      to('is not uint16array', async () => {
        const values_ = [
          14,
          'a',
          async function a() { },
          undefined,
          null
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            14,
            'a',
            async function a() { },
            undefined,
            null
          ];

          return values_.map(value => window.AmauiUtils.is('uint16array', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('uint16array', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(5).fill(false)));
      });

    });

    group('int32array', () => {

      to('is int32array', async () => {
        const values_ = [
          new Int32Array(),
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            new Int32Array(),
          ];

          return values_.map(value => window.AmauiUtils.is('int32array', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('int32array', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(1).fill(true)));
      });

      to('is not int32array', async () => {
        const values_ = [
          14,
          'a',
          async function a() { },
          undefined,
          null
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            14,
            'a',
            async function a() { },
            undefined,
            null
          ];

          return values_.map(value => window.AmauiUtils.is('int32array', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('int32array', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(5).fill(false)));
      });

    });

    group('uint32array', () => {

      to('is uint32array', async () => {
        const values_ = [
          new Uint32Array(),
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            new Uint32Array(),
          ];

          return values_.map(value => window.AmauiUtils.is('uint32array', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('uint32array', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(1).fill(true)));
      });

      to('is not uint32array', async () => {
        const values_ = [
          14,
          'a',
          async function a() { },
          undefined,
          null
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            14,
            'a',
            async function a() { },
            undefined,
            null
          ];

          return values_.map(value => window.AmauiUtils.is('uint32array', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('uint32array', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(5).fill(false)));
      });

    });

    group('float32array', () => {

      to('is float32array', async () => {
        const values_ = [
          new Float32Array(),
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            new Float32Array(),
          ];

          return values_.map(value => window.AmauiUtils.is('float32array', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('float32array', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(1).fill(true)));
      });

      to('is not float32array', async () => {
        const values_ = [
          14,
          'a',
          async function a() { },
          undefined,
          null
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            14,
            'a',
            async function a() { },
            undefined,
            null
          ];

          return values_.map(value => window.AmauiUtils.is('float32array', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('float32array', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(5).fill(false)));
      });

    });

    group('float64array', () => {

      to('is float64array', async () => {
        const values_ = [
          new Float64Array(),
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            new Float64Array(),
          ];

          return values_.map(value => window.AmauiUtils.is('float64array', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('float64array', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(1).fill(true)));
      });

      to('is not float64array', async () => {
        const values_ = [
          14,
          'a',
          async function a() { },
          undefined,
          null
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            14,
            'a',
            async function a() { },
            undefined,
            null
          ];

          return values_.map(value => window.AmauiUtils.is('float64array', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('float64array', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(5).fill(false)));
      });

    });

    group('bigint64array', () => {

      to('is bigint64array', async () => {
        const values_ = [
          new BigInt64Array(),
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            new BigInt64Array(),
          ];

          return values_.map(value => window.AmauiUtils.is('bigint64array', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('bigint64array', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(1).fill(true)));
      });

      to('is not bigint64array', async () => {
        const values_ = [
          14,
          'a',
          async function a() { },
          undefined,
          null
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            14,
            'a',
            async function a() { },
            undefined,
            null
          ];

          return values_.map(value => window.AmauiUtils.is('bigint64array', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('bigint64array', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(5).fill(false)));
      });

    });

    group('biguint64array', () => {

      to('is biguint64array', async () => {
        const values_ = [
          new BigUint64Array(),
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            new BigUint64Array(),
          ];

          return values_.map(value => window.AmauiUtils.is('biguint64array', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('biguint64array', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(1).fill(true)));
      });

      to('is not biguint64array', async () => {
        const values_ = [
          14,
          'a',
          async function a() { },
          undefined,
          null
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            14,
            'a',
            async function a() { },
            undefined,
            null
          ];

          return values_.map(value => window.AmauiUtils.is('biguint64array', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('biguint64array', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(5).fill(false)));
      });

    });

    group('typedarray', () => {

      to('is typedarray', async () => {
        const values_ = [
          new Int8Array(),
          new Uint8Array(),
          new Uint8ClampedArray(),
          new Int16Array(),
          new Uint16Array(),
          new Int32Array(),
          new Uint32Array(),
          new Float32Array(),
          new Float64Array(),
          new BigInt64Array(),
          new BigUint64Array(),
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            new Int8Array(),
            new Uint8Array(),
            new Uint8ClampedArray(),
            new Int16Array(),
            new Uint16Array(),
            new Int32Array(),
            new Uint32Array(),
            new Float32Array(),
            new Float64Array(),
            new BigInt64Array(),
            new BigUint64Array(),
          ];

          return values_.map(value => window.AmauiUtils.is('typedarray', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('typedarray', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(11).fill(true)));
      });

      to('is not typedarray', async () => {
        const values_ = [
          14,
          'a',
          async function a() { },
          undefined,
          null
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            14,
            'a',
            async function a() { },
            undefined,
            null
          ];

          return values_.map(value => window.AmauiUtils.is('typedarray', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('typedarray', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(5).fill(false)));
      });

    });

    group('dataview', () => {

      to('is dataview', async () => {
        const values_ = [
          new DataView(new ArrayBuffer(3)),
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            new DataView(new ArrayBuffer(3)),
          ];

          return values_.map(value => window.AmauiUtils.is('dataview', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('dataview', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(1).fill(true)));
      });

      to('is not dataview', async () => {
        const values_ = [
          14,
          'a',
          async function a() { },
          undefined,
          null
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            14,
            'a',
            async function a() { },
            undefined,
            null
          ];

          return values_.map(value => window.AmauiUtils.is('dataview', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('dataview', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(5).fill(false)));
      });

    });

    group('arraybuffer', () => {

      to('is arraybuffer', async () => {
        const values_ = [
          new ArrayBuffer(3),
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            new ArrayBuffer(3),
          ];

          return values_.map(value => window.AmauiUtils.is('arraybuffer', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('arraybuffer', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(1).fill(true)));
      });

      to('is not arraybuffer', async () => {
        const values_ = [
          14,
          'a',
          async function a() { },
          undefined,
          null
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            14,
            'a',
            async function a() { },
            undefined,
            null
          ];

          return values_.map(value => window.AmauiUtils.is('arraybuffer', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('arraybuffer', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(5).fill(false)));
      });

    });

    group('sharedarraybuffer', () => {

      to('is sharedarraybuffer', async () => {
        // Playwright browsers don't have SharedArrayBuffer atm
        const values_ = [
          new SharedArrayBuffer(3),
        ];

        const valueNode = values_.map(value => AmauiUtils.is('sharedarraybuffer', value));
        const values = [valueNode];

        values.forEach(value => assert(value).eql(new Array(1).fill(true)));
      });

      to('is not sharedarraybuffer', async () => {
        const values_ = [
          14,
          'a',
          async function a() { },
          undefined,
          null
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            14,
            'a',
            async function a() { },
            undefined,
            null
          ];

          return values_.map(value => window.AmauiUtils.is('sharedarraybuffer', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('sharedarraybuffer', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(5).fill(false)));
      });

    });

    group('symbol', () => {

      to('is symbol', async () => {
        const values_ = [
          Symbol(),
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            Symbol(),
          ];

          return values_.map(value => window.AmauiUtils.is('symbol', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('symbol', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(1).fill(true)));
      });

      to('is not symbol', async () => {
        const values_ = [
          14,
          'a',
          async function a() { },
          undefined,
          null
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            14,
            'a',
            async function a() { },
            undefined,
            null
          ];

          return values_.map(value => window.AmauiUtils.is('symbol', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('symbol', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(5).fill(false)));
      });

    });

    group('error', () => {

      to('is error', async () => {
        const values_ = [
          new Error(),
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            new Error(),
          ];

          return values_.map(value => window.AmauiUtils.is('error', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('error', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(1).fill(true)));
      });

      to('is not error', async () => {
        const values_ = [
          14,
          'a',
          async function a() { },
          undefined,
          null
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            14,
            'a',
            async function a() { },
            undefined,
            null
          ];

          return values_.map(value => window.AmauiUtils.is('error', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('error', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(5).fill(false)));
      });

    });

    group('date', () => {

      to('is date', async () => {
        const values_ = [
          new Date(),
          new Date(new Date().getTime()),
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            new Date(),
            new Date(new Date().getTime()),
          ];

          return values_.map(value => window.AmauiUtils.is('date', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('date', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(2).fill(true)));
      });

      to('is not date', async () => {
        const values_ = [
          14,
          'a',
          new Date().getTime(),
          null
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            14,
            'a',
            new Date().getTime(),
            null
          ];

          return values_.map(value => window.AmauiUtils.is('date', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('date', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(4).fill(false)));
      });

    });

    group('regexp', () => {

      to('is regexp', async () => {
        const values_ = [
          new RegExp(''),
          /a+/g,
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            new RegExp(''),
            /a+/g,
          ];

          return values_.map(value => window.AmauiUtils.is('regexp', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('regexp', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(2).fill(true)));
      });

      to('is not regexp', async () => {
        const values_ = [
          14,
          'a',
          async function a() { },
          undefined,
          null
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            14,
            'a',
            async function a() { },
            undefined,
            null
          ];

          return values_.map(value => window.AmauiUtils.is('regexp', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('regexp', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(5).fill(false)));
      });

    });

    group('arguments', () => {

      to('is arguments', async () => {
        const values_ = [
          (function a() { return AmauiUtils.is('arguments', arguments); })(),
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            (function a() { return window.AmauiUtils.is('arguments', arguments); })(),
          ];

          return values_;
        }, { browsers });
        const valueNode = values_;
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(1).fill(true)));
      });

      to('is not arguments', async () => {
        const values_ = [
          14,
          'a',
          async function a() { },
          undefined,
          null
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            14,
            'a',
            async function a() { },
            undefined,
            null
          ];

          return values_.map(value => window.AmauiUtils.is('arguments', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('arguments', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(5).fill(false)));
      });

    });

    group('null', () => {

      to('is null', async () => {
        const values_ = [
          null,
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            null,
          ];

          return values_.map(value => window.AmauiUtils.is('null', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('null', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(1).fill(true)));
      });

      to('is not null', async () => {
        const values_ = [
          14,
          'a',
          async function a() { },
          undefined,
          {},
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            14,
            'a',
            async function a() { },
            undefined,
            {},
          ];

          return values_.map(value => window.AmauiUtils.is('null', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('null', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(5).fill(false)));
      });

    });

    group('undefined', () => {

      to('is undefined', async () => {
        const values_ = [
          undefined,
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            undefined,
          ];

          return values_.map(value => window.AmauiUtils.is('undefined', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('undefined', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(1).fill(true)));
      });

      to('is not undefined', async () => {
        const values_ = [
          14,
          'a',
          async function a() { },
          'undefined',
          null
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            14,
            'a',
            async function a() { },
            'undefined',
            null
          ];

          return values_.map(value => window.AmauiUtils.is('undefined', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('undefined', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(5).fill(false)));
      });

    });

    group('blob', () => {

      to('is blob', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            new Blob([new ArrayBuffer(4)]),
          ];

          return values_.map(value => window.AmauiUtils.is('blob', value));
        }, { browsers });
        const values = [...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(1).fill(true)));
      });

      to('is not blob', async () => {
        const values_ = [
          14,
          [1, 3, 4],
          {},
          null,
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            14,
            [1, 3, 4],
            {},
            null,
          ];

          return values_.map(value => window.AmauiUtils.is('blob', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('blob', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(4).fill(false)));
      });

    });

    group('buffer', () => {

      to('is buffer', async () => {
        const values_ = [
          Buffer.from('a'),
        ];

        const valueNode = values_.map(value => AmauiUtils.is('buffer', value));
        const values = [valueNode];

        values.forEach(value => assert(value).eql(new Array(1).fill(true)));
      });

      to('is not buffer', async () => {
        const values_ = [
          14,
          [1, 3, 4],
          {},
          null,
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            14,
            [1, 3, 4],
            {},
            null,
          ];

          return values_.map(value => window.AmauiUtils.is('buffer', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('buffer', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(4).fill(false)));
      });

    });

    group('element', () => {

      to('is element', async () => {
        const values_ = [
          [React.createElement('a'), { variant: 'react' }],
          [React.createElement('a'), { variant: 'react' }],
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            [window.document.createElement('div')],
            [window.document.createElement('div'), { variant: 'html' }],
            [window.document.createElement('div'), { variant: 'element' }],
            [window.document.createTextNode('a'), { variant: 'node' }],
            [window.React.createElement('a'), { variant: 'react' }],
          ];

          return values_.map(value => window.AmauiUtils.is('element', ...value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('element', ...value));

        assert(valueNode).eql(new Array(2).fill(true));

        valueBrowsers.forEach(value => assert(value).eql(new Array(5).fill(true)));
      });

      to('is not element', async () => {
        const values_ = [
          14,
          new Date().getTime(),
          undefined,
          null
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            14,
            new Date().getTime(),
            undefined,
            null
          ];

          return values_.map(value => window.AmauiUtils.is('element', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('element', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(4).fill(false)));
      });

    });

    group('simple', () => {

      to('is simple', async () => {
        const values_ = [
          'a',
          123,
          true,
          undefined,
          null
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            'a',
            123,
            true,
            undefined,
            null
          ];

          return [
            ...values_.map(value => window.AmauiUtils.is('simple', value)),
          ];
        }, { browsers });
        const valueNode = [
          ...values_.map(value => AmauiUtils.is('simple', value)),
        ];
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(5).fill(true)));
      });

      to('is not simple', async () => {
        const values_ = [
          [{ a: '4' }],
          [['1', '3', '4']],
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            [{ a: '4' }],
            [['1', '3', '4']],
          ];

          return values_.map(value => window.AmauiUtils.is('simple', ...value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('simple', ...value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(2).fill(false)));
      });

    });

    group('not-array-object', () => {

      to('is not-array-object', async () => {
        const values_ = [
          14,
          'a',
          new Map(),
          new WeakMap(),
          new Date(),
          null
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            14,
            'a',
            new Map(),
            new WeakMap(),
            new Date(),
            null
          ];

          return values_.map(value => window.AmauiUtils.is('not-array-object', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('not-array-object', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(6).fill(true)));
      });

      to('is array-object', async () => {
        const values_ = [
          [1, 3, 4],
          { a: 1, c: 4 },
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            [1, 3, 4],
            { a: 1, c: 4 },
          ];

          return values_.map(value => window.AmauiUtils.is('not-array-object', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.is('not-array-object', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(2).fill(false)));
      });

    });

  });

  group('isState', () => {

    group('online', () => {

      to('is online', async () => {
        const browser: IBrowser = await startBrowser('chromium', { context: { ...playwright.devices['iPhone 13 Pro'] } });

        const valueBrowsers = await evaluate((window: any) => window.AmauiUtils.isState('online'), { browsers: { chromium: browser } });

        valueBrowsers.forEach(value => assert(value).eq(true));

        await browser.browser.close();
      });

      to('is not online', async () => {
        const valueNode = AmauiUtils.isState('online');

        assert(valueNode).eq(false);
      });

    });

    group('offline', () => {

      to('is offline', async () => {
        const browser: IBrowser = await startBrowser('chromium');

        const valueBrowsers = await evaluate((window: any) => window.AmauiUtils.isState('offline'), {
          browsers: { chromium: browser },
          preEvaluate: async browser => await browser.context.setOffline(true),
          postEvaluate: async browser => await browser.context.setOffline(false),
        });

        valueBrowsers.forEach(value => assert(value).eq(true));

        await browser.browser.close();
      });

      to('is not offline', async () => {
        const valueBrowsers = await evaluate((window: any) => window.AmauiUtils.isState('offline'), { browsers });
        const valueNode = AmauiUtils.isState('offline');
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eq(false));
      });

    });

  });

  group('isValid', () => {

    group('date', () => {

      to('is date', async () => {
        const values_ = [
          new Date(),
          new Date(new Date().getTime()),
          new Date().getTime() / 1000,
          new Date().toISOString(),
          new Date().toUTCString(),
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            new Date(),
            new Date(new Date().getTime()),
            new Date().getTime() / 1000,
            new Date().toISOString(),
            new Date().toUTCString(),
          ];

          return values_.map(value => window.AmauiUtils.isValid('date', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.isValid('date', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(5).fill(true)));
      });

      to('is not date', async () => {
        const values_ = [
          'a',
          new Date().getTime() / 1e7,
          new Date().getTime() * 1e4,
          NaN,
          undefined,
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            'a',
            new Date().getTime() / 1e7,
            new Date().getTime() * 1e4,
            NaN,
            undefined,
          ];

          return values_.map(value => window.AmauiUtils.isValid('date', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.isValid('date', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(5).fill(false)));
      });

    });

    group('uuid', () => {

      to('is uuid', async () => {
        const values_ = [
          AmauiUtils.getID(),
          AmauiUtils.getID(),
          AmauiUtils.getID(),
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            window.AmauiUtils.getID(),
            window.AmauiUtils.getID(),
            window.AmauiUtils.getID(),
          ];

          return values_.map(value => window.AmauiUtils.isValid('uuid', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.isValid('uuid', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(3).fill(true)));
      });

      to('is not uuid', async () => {
        const values_ = [
          14,
          [1, 3, 4],
          {},
          null,
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            14,
            [1, 3, 4],
            {},
            null,
          ];

          return values_.map(value => window.AmauiUtils.isValid('uuid', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.isValid('uuid', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(4).fill(false)));
      });

    });

    group('binary-string', () => {

      to('is binary-string', async () => {
        const values_ = [
          '',
          '110101',
          '1',
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            '',
            '110101',
            '1',
          ];

          return values_.map(value => window.AmauiUtils.isValid('binary-string', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.isValid('binary-string', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(3).fill(true)));
      });

      to('is not binary-string', async () => {
        const values_ = [
          14,
          'a',
          async function a() { },
          undefined,
          null
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            14,
            'a',
            async function a() { },
            undefined,
            null
          ];

          return values_.map(value => window.AmauiUtils.isValid('binary-string', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.isValid('binary-string', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(5).fill(false)));
      });

    });

    group('hexadecimal-string', () => {

      to('is hexadecimal-string', async () => {
        const values_ = [
          '',
          '123456789abcdef',
          'a',
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            '',
            '123456789abcdef',
            'a',
          ];

          return values_.map(value => window.AmauiUtils.isValid('hexadecimal-string', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.isValid('hexadecimal-string', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(3).fill(true)));
      });

      to('is not hexadecimal-string', async () => {
        const values_ = [
          14,
          'y',
          async function a() { },
          undefined,
          null
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            14,
            'y',
            async function a() { },
            undefined,
            null
          ];

          return values_.map(value => window.AmauiUtils.isValid('hexadecimal-string', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.isValid('hexadecimal-string', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(5).fill(false)));
      });

    });

    group('url', () => {

      to('is url', async () => {
        const values_ = [
          'asd.com',
          'www.asd.com',
          'http://asd.com',
          'https://asd.com/a',
          'https://asd.com/a?a=a4',
          'https://www.asd.com/a?a=a4',
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            'asd.com',
            'www.asd.com',
            'http://asd.com',
            'https://asd.com/a',
            'https://asd.com/a?a=a4',
            'https://www.asd.com/a?a=a4',
          ];

          return values_.map(value => window.AmauiUtils.isValid('url', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.isValid('url', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(6).fill(true)));
      });

      to('is not url', async () => {
        const values_ = [
          'asd',
          'htt://google.com',
          '',
          '/a',
          '/a?a=a4',
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            'asd',
            'htt://google.com',
            '',
            '/a',
            '/a?a=a4',
          ];

          return values_.map(value => window.AmauiUtils.isValid('url', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.isValid('url', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(5).fill(false)));
      });

    });

    group('url-path', () => {

      to('is url-path', async () => {
        const values_ = [
          '/',
          '/a',
          '/a?a=a4',
          '/a/a?a=a4',
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            '/',
            '/a',
            '/a?a=a4',
            '/a/a?a=a4',
          ];

          return values_.map(value => window.AmauiUtils.isValid('url-path', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.isValid('url-path', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(4).fill(true)));
      });

      to('is not url-path', async () => {
        const values_ = [
          'asd',
          '',
          '//a',
          '//a?a=a4',
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            'asd',
            '',
            '//a',
            '//a?a=a4',
          ];

          return values_.map(value => window.AmauiUtils.isValid('url-path', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.isValid('url-path', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(4).fill(false)));
      });

    });

    group('compare', () => {

      to('compare', async () => {
        const values_ = [
          ['', { valueA: 3, valueB: 4, operator: 'less-than' }],
          ['', { valueA: 4, valueB: 4, operator: 'less-than-equal' }],
          ['', { valueA: [4], valueB: [4], operator: 'equal' }],
          ['', { valueA: { a: 4 }, valueB: { a: 4 }, operator: 'equal' }],
          ['', { valueA: 4, valueB: 4, operator: 'equal' }],
          ['', { valueA: [1, 4], valueB: [1, 40], operator: 'array-some' }],
          ['', { valueA: [1, 4], valueB: [1, 4], operator: 'array-all' }],
          ['', { valueA: 4, valueB: 4, operator: 'greater-than-equal' }],
          ['', { valueA: 5, valueB: 4, operator: 'greater-than' }],
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            ['', { valueA: 3, valueB: 4, operator: 'less-than' }],
            ['', { valueA: 4, valueB: 4, operator: 'less-than-equal' }],
            ['', { valueA: [4], valueB: [4], operator: 'equal' }],
            ['', { valueA: { a: 4 }, valueB: { a: 4 }, operator: 'equal' }],
            ['', { valueA: 4, valueB: 4, operator: 'equal' }],
            ['', { valueA: [1, 4], valueB: [1, 40], operator: 'array-some' }],
            ['', { valueA: [1, 4], valueB: [1, 4], operator: 'array-all' }],
            ['', { valueA: 4, valueB: 4, operator: 'greater-than-equal' }],
            ['', { valueA: 5, valueB: 4, operator: 'greater-than' }],
          ];

          return values_.map(value => window.AmauiUtils.isValid('compare', ...value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.isValid('compare', ...value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(9).fill(true)));
      });

    });

    group('semver', () => {

      to('is semver', async () => {
        const values_ = [
          '1.4.1',
          '1.4.1-alpha',
          '1.4.1-beta',
          '1.4.1-rc',
          '1.4.1-rc.4',
          '1.4.1-alpha.4',
          '1.4.1-alpha.4+123',
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            '1.4.1',
            '1.4.1-alpha',
            '1.4.1-beta',
            '1.4.1-rc',
            '1.4.1-rc.4',
            '1.4.1-alpha.4',
            '1.4.1-alpha.4+123',
          ];

          return values_.map(value => window.AmauiUtils.isValid('semver', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.isValid('semver', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(7).fill(true)));
      });

      to('is not semver', async () => {
        const values_ = [
          'a',
          4,
          undefined,
          null
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            'a',
            4,
            undefined,
            null
          ];

          return values_.map(value => window.AmauiUtils.isValid('semver', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.isValid('semver', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(4).fill(false)));
      });

    });

    group('semver-compare', () => {

      to('semver-compare', async () => {
        const values_ = [
          ['', { valueA: '1.4.3', valueB: '1.4.4', operator: 'less-than' }],
          ['', { valueA: '1.4.1-alpha.3', valueB: '1.4.1-alpha.4', operator: 'less-than' }],
          ['', { valueA: '1.4.1-alpha.4', valueB: '1.4.4-alpha.4', operator: 'less-than' }],
          ['', { valueA: '1.4.1-alpha.4+1', valueB: '1.4.1-alpha.4+4', operator: 'less-than' }],
          ['', { valueA: '1.4.1', valueB: '1.4.1', operator: 'less-than-equal' }],
          ['', { valueA: '1.4.1', valueB: '1.4.1', operator: 'equal' }],
          ['', { valueA: '1.4.1', valueB: '1.4.1', operator: 'greater-than-equal' }],
          ['', { valueA: '1.4.4', valueB: '1.4.1', operator: 'greater-than' }],
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            ['', { valueA: '1.4.3', valueB: '1.4.4', operator: 'less-than' }],
            ['', { valueA: '1.4.1-alpha.3', valueB: '1.4.1-alpha.4', operator: 'less-than' }],
            ['', { valueA: '1.4.1-alpha.4', valueB: '1.4.4-alpha.4', operator: 'less-than' }],
            ['', { valueA: '1.4.1-alpha.4+1', valueB: '1.4.1-alpha.4+4', operator: 'less-than' }],
            ['', { valueA: '1.4.1', valueB: '1.4.1', operator: 'less-than-equal' }],
            ['', { valueA: '1.4.1', valueB: '1.4.1', operator: 'equal' }],
            ['', { valueA: '1.4.1', valueB: '1.4.1', operator: 'greater-than-equal' }],
            ['', { valueA: '1.4.4', valueB: '1.4.1', operator: 'greater-than' }],
          ];

          return values_.map(value => window.AmauiUtils.isValid('semver-compare', ...value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.isValid('semver-compare', ...value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(8).fill(true)));
      });

    });

    group('timestamp', () => {

      to('is timestamp', async () => {
        const values_ = [
          1638223021044,
          1638223021,
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            1638223021044,
            1638223021,
          ];

          return values_.map(value => window.AmauiUtils.isValid('timestamp', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.isValid('timestamp', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(2).fill(true)));
      });

      to('is not timestamp', async () => {
        const values_ = [
          'a',
          163822304,
          -1.4,
          0,
          null,
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            'a',
            163822304,
            -1.4,
            0,
            null,
          ];

          return values_.map(value => window.AmauiUtils.isValid('timestamp', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.isValid('timestamp', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(5).fill(false)));
      });

    });

    group('email', () => {

      to('is email', async () => {
        const values_ = [
          'asd@asd.com',
          'a@a.co'
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            'asd@asd.com',
            'a@a.co'
          ];

          return values_.map(value => window.AmauiUtils.isValid('email', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.isValid('email', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(2).fill(true)));
      });

      to('is not email', async () => {
        const values_ = [
          'a.com',
          '@a.com',
          'a@',
          'a',
          14,
          null,
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            'a.com',
            '@a.com',
            'a@',
            'a',
            14,
            null,
          ];

          return values_.map(value => window.AmauiUtils.isValid('email', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.isValid('email', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(6).fill(false)));
      });

    });

    group('hash', () => {

      to('is hash', async () => {
        const values_ = [
          'aa7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad',
          '0xaa7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad',
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            'aa7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad',
            '0xaa7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad',
          ];

          return values_.map(value => window.AmauiUtils.isValid('hash', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.isValid('hash', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(2).fill(true)));
      });

      to('is not hash', async () => {
        const values_ = [
          'a',
          '0xa',
          '0xaaa',
          'aa7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015a',
          '0xaa7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015a',
          4,
          undefined,
          { a: 134 },
          new Object({ a: 134 }),
          null,
          function asd() { }
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            'a',
            '0xa',
            '0xaaa',
            'aa7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015a',
            '0xaa7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015a',
            4,
            undefined,
            { a: 134 },
            new Object({ a: 134 }),
            null,
            function asd() { }
          ];

          return values_.map(value => window.AmauiUtils.isValid('hash', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.isValid('hash', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(11).fill(false)));
      });

    });

    group('mobile', () => {

      to('is mobile', async () => {
        const values_ = [
          '12312123425',
          '+381611234123',
          '0611234123',
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            '12312123425',
            '+381611234123',
            '0611234123',
          ];

          return values_.map(value => window.AmauiUtils.isValid('mobile', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.isValid('mobile', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(3).fill(true)));
      });

      to('is not mobile', async () => {
        const values_ = [
          1,
          1e4,
          -1.4,
          0
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            1,
            1e4,
            -1.4,
            0
          ];

          return values_.map(value => window.AmauiUtils.isValid('mobile', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.isValid('mobile', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(4).fill(false)));
      });

    });

    group('color-rgb', () => {

      to('is color-rgb', async () => {
        const values_ = [
          'rgb(1, 144, 144)',
          'rgb(255.414, 165.44, 0.4)',
          'rgba(140, 140, 144, 0.4)',
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            'rgb(1, 144, 144)',
            'rgb(255.414, 165.44, 0.4)',
            'rgba(140, 140, 144, 0.4)',
          ];

          return values_.map(value => window.AmauiUtils.isValid('color-rgb', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.isValid('color-rgb', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(3).fill(true)));
      });

      to('is not color-rgb', async () => {
        const values_ = [
          'rgb(1, 144, 144 0.4)',
          'rgba(14, 144, 144, 1.4)',
          'rgba(144, 144)',
          'rgb(144, 144 a)',
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            'rgb(1, 144, 144 0.4)',
            'rgba(14, 144, 144, 1.4)',
            'rgba(144, 144)',
            'rgb(144, 144 a)',
          ];

          return values_.map(value => window.AmauiUtils.isValid('color-rgb', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.isValid('color-rgb', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(4).fill(false)));
      });

    });

    group('color-hex', () => {

      to('is color-hex', async () => {
        const values_ = [
          '#f44',
          '#ff44ff',
          '#ff444fff',
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            '#f44',
            '#ff44ff',
            '#ff444fff',
          ];

          return values_.map(value => window.AmauiUtils.isValid('color-hex', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.isValid('color-hex', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(3).fill(true)));
      });

      to('is not color-hex', async () => {
        const values_ = [
          '#44',
          '#ff44fff',
          '#ff444ffff',
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            '#44',
            '#ff44fff',
            '#ff444ffff',
          ];

          return values_.map(value => window.AmauiUtils.isValid('color-hex', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.isValid('color-hex', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(3).fill(false)));
      });

    });

    group('color-hsl', () => {

      to('is color-hsl', async () => {
        const values_ = [
          'hsl(1, 40%, 40%)',
          'hsla(140.414, 40.41%, 40.4%, 0.4)',
          'hsla(140, 40%, 40%, 0.4)',
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            'hsl(1, 40%, 40%)',
            'hsla(140.414, 40.41%, 40.4%, 0.4)',
            'hsla(140, 40%, 40%, 0.4)',
          ];

          return values_.map(value => window.AmauiUtils.isValid('color-hsl', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.isValid('color-hsl', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(3).fill(true)));
      });

      to('is not color-hsl', async () => {
        const values_ = [
          'hsl(1, 144%, 144%)',
          'hsla(140, 40%, 40% 0.4)',
          'hsla(1, 144, 140)',
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            'hsl(1, 144%, 144%)',
            'hsla(140, 40%, 40% 0.4)',
            'hsla(1, 144, 140)',
          ];

          return values_.map(value => window.AmauiUtils.isValid('color-hsl', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.isValid('color-hsl', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(3).fill(false)));
      });

    });

    group('json', () => {

      to('is json', async () => {
        const values_ = [
          '[1, "3", 4]',
          '{"a":4,"c":4}',
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            '[1, "3", 4]',
            '{"a":4,"c":4}',
          ];

          return values_.map(value => window.AmauiUtils.isValid('json', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.isValid('json', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(2).fill(true)));
      });

      to('is not json', async () => {
        const values_ = [
          'a',
          function a() { },
          new Array(),
          null,
          14,
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            'a',
            function a() { },
            new Array(),
            null,
            14,
          ];

          return values_.map(value => window.AmauiUtils.isValid('json', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.isValid('json', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(5).fill(false)));
      });

    });

    group('min', () => {

      to('is min', async () => {
        const values_ = [
          [4, { min: 1 }],
          [4, { min: 4 }],
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            [4, { min: 1 }],
            [4, { min: 4 }],
          ];

          return values_.map(value => window.AmauiUtils.isValid('min', ...value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.isValid('min', ...value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(2).fill(true)));
      });

      to('is not min', async () => {
        const values_ = [
          [4, { min: 14 }],
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            [4, { min: 14 }],
          ];

          return values_.map(value => window.AmauiUtils.isValid('min', ...value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.isValid('min', ...value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(1).fill(false)));
      });

    });

    group('max', () => {

      to('is max', async () => {
        const values_ = [
          [1, { max: 14 }],
          [4, { max: 4 }],
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            [1, { max: 14 }],
            [4, { max: 4 }],
          ];

          return values_.map(value => window.AmauiUtils.isValid('max', ...value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.isValid('max', ...value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(2).fill(true)));
      });

      to('is not max', async () => {
        const values_ = [
          [14, { max: 4 }],
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            [14, { max: 4 }],
          ];

          return values_.map(value => window.AmauiUtils.isValid('max', ...value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.isValid('max', ...value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(1).fill(false)));
      });

    });

    group('min-max', () => {

      to('is min-max', async () => {
        const values_ = [
          [1, { min: 1, max: 4 }],
          [3, { min: 1, max: 4 }],
          [4, { min: 1, max: 4 }],
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            [1, { min: 1, max: 4 }],
            [3, { min: 1, max: 4 }],
            [4, { min: 1, max: 4 }],
          ];

          return values_.map(value => window.AmauiUtils.isValid('min-max', ...value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.isValid('min-max', ...value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(3).fill(true)));
      });

      to('is not min-max', async () => {
        const values_ = [
          [-1, { min: 1, max: 4 }],
          [1, { min: 4, max: 4 }],
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            [-1, { min: 1, max: 4 }],
            [1, { min: 4, max: 4 }],
          ];

          return values_.map(value => window.AmauiUtils.isValid('min-max', ...value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.isValid('min-max', ...value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(2).fill(false)));
      });

    });

    group('same-origin', () => {

      to('is same-origin', async () => {
        const valueBrowsers = await evaluate((window: any) => window.AmauiUtils.isValid('same-origin', 'http://localhost:4000/about'), { browsers });

        valueBrowsers.forEach(value => assert(value).eq(true));
      });

      to('is not same-origin', async () => {
        const valueBrowsers = await evaluate((window: any) => window.AmauiUtils.isValid('same-origin', 'https://google.com'), { browsers });

        valueBrowsers.forEach(value => assert(value).eq(false));
      });

    });

    group('js-chunk', () => {

      to('is js-chunk', async () => {
        const values_ = [
          {
            __esModule: true,
            default: () => 140,
          },
          {
            __esModule: true,
            default: {},
          },
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            {
              __esModule: true,
              default: () => 140,
            },
            {
              __esModule: true,
              default: {},
            },
          ];

          return values_.map(value => window.AmauiUtils.isValid('js-chunk', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.isValid('js-chunk', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(2).fill(true)));
      });

      to('is not js-chunk', async () => {
        const values_ = [
          [1, 4, 3],
          { a: 4, c: 3 },
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            [1, 4, 3],
            { a: 4, c: 3 },
          ];

          return values_.map(value => window.AmauiUtils.isValid('js-chunk', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.isValid('js-chunk', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(2).fill(false)));
      });

    });

    group('http-method', () => {

      to('is http-method', async () => {
        const values_ = [
          'GET',
          'post',
          'PUT',
          'DELETE',
          'head',
          'OPTIONS',
          'patch',
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            'GET',
            'post',
            'PUT',
            'DELETE',
            'head',
            'OPTIONS',
            'patch',
          ];

          return values_.map(value => window.AmauiUtils.isValid('http-method', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.isValid('http-method', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(7).fill(true)));
      });

      to('is not http-method', async () => {
        const values_ = [
          1,
          'a',
          new Array(),
          null,
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            1,
            'a',
            new Array(),
            null,
          ];

          return values_.map(value => window.AmauiUtils.isValid('http-method', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.isValid('http-method', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(4).fill(false)));
      });

    });

    group('base64', () => {

      to('is base64', async () => {
        const values_ = [
          'SGVsbG8sIFdvcmxkIQ==',
          'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
          'UEsDBBQAAAAAANdY/VBQMVWPFgAAABYAAAALAAAAZm9vICgxKS50eHRXZWxjb21lIHRvIHRoZSBqdW5nbGUhUEsDBBQAAAAAAGtY/VBQMVWPFgAAABYAAAAHAAAAZm9vLnR4dFdlbGNvbWUgdG8gdGhlIGp1bmdsZSFQSwECFAAUAAAAAADXWP1QUDFVjxYAAAAWAAAACwAAAAAAAAABACAAAAAAAAAAZm9vICgxKS50eHRQSwECFAAUAAAAAABrWP1QUDFVjxYAAAAWAAAABwAAAAAAAAABACAAAAA/AAAAZm9vLnR4dFBLBQYAAAAAAgACAG4AAAB6AAAAAAA=',
          'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD///+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4Ug9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC',
          'iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIBAMAAAA2IaO4AAAAFVBMVEXk5OTn5+ft7e319fX29vb5+fn///++GUmVAAAALUlEQVQIHWNICnYLZnALTgpmMGYIFWYIZTA2ZFAzTTFlSDFVMwVyQhmAwsYMAKDaBy0axX/iAAAAAElFTkSuQmCC',
          'iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIBAMAAAA2IaO4AAAAFVBMVEXk5OTn5+ft7e319fX29vb5+fn///++GUmVAAAALUlEQVQIHWNICnYLZnALTgpmMGYIFWYIZTA2ZFAzTTFlSDFVMwVyQhmAwsYMAKDaBy0axX/iAAAAAElFTkSuQmCC   '
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            'SGVsbG8sIFdvcmxkIQ==',
            'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
            'UEsDBBQAAAAAANdY/VBQMVWPFgAAABYAAAALAAAAZm9vICgxKS50eHRXZWxjb21lIHRvIHRoZSBqdW5nbGUhUEsDBBQAAAAAAGtY/VBQMVWPFgAAABYAAAAHAAAAZm9vLnR4dFdlbGNvbWUgdG8gdGhlIGp1bmdsZSFQSwECFAAUAAAAAADXWP1QUDFVjxYAAAAWAAAACwAAAAAAAAABACAAAAAAAAAAZm9vICgxKS50eHRQSwECFAAUAAAAAABrWP1QUDFVjxYAAAAWAAAABwAAAAAAAAABACAAAAA/AAAAZm9vLnR4dFBLBQYAAAAAAgACAG4AAAB6AAAAAAA=',
            'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD///+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4Ug9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC',
            'iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIBAMAAAA2IaO4AAAAFVBMVEXk5OTn5+ft7e319fX29vb5+fn///++GUmVAAAALUlEQVQIHWNICnYLZnALTgpmMGYIFWYIZTA2ZFAzTTFlSDFVMwVyQhmAwsYMAKDaBy0axX/iAAAAAElFTkSuQmCC',
            'iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIBAMAAAA2IaO4AAAAFVBMVEXk5OTn5+ft7e319fX29vb5+fn///++GUmVAAAALUlEQVQIHWNICnYLZnALTgpmMGYIFWYIZTA2ZFAzTTFlSDFVMwVyQhmAwsYMAKDaBy0axX/iAAAAAElFTkSuQmCC   '
          ];

          return values_.map(value => window.AmauiUtils.isValid('base64', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.isValid('base64', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(6).fill(true)));
      });

      to('is not base64', async () => {
        const values_ = [
          '',
          '12301294821p[93123',
          '!@&IO!*@#3',
          `<script>alert('hi');</script>`,
          'PD94bWwgdmVyzeiBNMyw2djJoMThWNkgzeiIvPjwvZz4KPC9zdmc+Cgo=',
          '<!DOCTYPE%20html><html%20lang%3D"en"><head><title>Embedded%20Window<%2Ftitle><%2Fhead><body><h1>42<%2Fh1><%2Fbody><%2Fhtml>',
          'SGVsbG8sIFdvcmxkIQ%3D%3D',
          '%3Ch1%3EHello%2C%20World!%3C%2Fh1%3E',
          'A%20brief%20note'
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            '',
            '12301294821p[93123',
            '!@&IO!*@#3',
            `<script>alert('hi');</script>`,
            'PD94bWwgdmVyzeiBNMyw2djJoMThWNkgzeiIvPjwvZz4KPC9zdmc+Cgo=',
            '<!DOCTYPE%20html><html%20lang%3D"en"><head><title>Embedded%20Window<%2Ftitle><%2Fhead><body><h1>42<%2Fh1><%2Fbody><%2Fhtml>',
            'SGVsbG8sIFdvcmxkIQ%3D%3D',
            '%3Ch1%3EHello%2C%20World!%3C%2Fh1%3E',
            'A%20brief%20note'
          ];

          return values_.map(value => window.AmauiUtils.isValid('base64', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.isValid('base64', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(9).fill(false)));
      });

    });

    group('datauri', () => {

      to('is datauri', async () => {
        const values_ = [
          'data:,Hello%2C%20World%21',
          'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ==',
          'data:text/html,%3Ch1%3EHello%2C%20World%21%3C%2Fh1%3E',
          `data:text/html,<script>alert('hi');</script>`,
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
          'data:text/html;charset=utf-8,<!DOCTYPE%20html><html%20lang%3D"en"><head><title>Embedded%20Window<%2Ftitle><%2Fhead><body><h1>42<%2Fh1><%2Fbody><%2Fhtml>',
          'data:application/x-zip-compressed;base64,UEsDBBQAAAAAANdY/VBQMVWPFgAAABYAAAALAAAAZm9vICgxKS50eHRXZWxjb21lIHRvIHRoZSBqdW5nbGUhUEsDBBQAAAAAAGtY/VBQMVWPFgAAABYAAAAHAAAAZm9vLnR4dFdlbGNvbWUgdG8gdGhlIGp1bmdsZSFQSwECFAAUAAAAAADXWP1QUDFVjxYAAAAWAAAACwAAAAAAAAABACAAAAAAAAAAZm9vICgxKS50eHRQSwECFAAUAAAAAABrWP1QUDFVjxYAAAAWAAAABwAAAAAAAAABACAAAAA/AAAAZm9vLnR4dFBLBQYAAAAAAgACAG4AAAB6AAAAAAA=',
          'data:,A%20brief%20note',
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD///+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4Ug9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC',
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIBAMAAAA2IaO4AAAAFVBMVEXk5OTn5+ft7e319fX29vb5+fn///++GUmVAAAALUlEQVQIHWNICnYLZnALTgpmMGYIFWYIZTA2ZFAzTTFlSDFVMwVyQhmAwsYMAKDaBy0axX/iAAAAAElFTkSuQmCC',
          '   data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIBAMAAAA2IaO4AAAAFVBMVEXk5OTn5+ft7e319fX29vb5+fn///++GUmVAAAALUlEQVQIHWNICnYLZnALTgpmMGYIFWYIZTA2ZFAzTTFlSDFVMwVyQhmAwsYMAKDaBy0axX/iAAAAAElFTkSuQmCC   ',
          ' data:,Hello%2C%20World!',
          ' data:,Hello World!',
          ' data:text/html,%3Ch1%3EHello%2C%20World!%3C%2Fh1%3E',
          'data:,A%20brief%20note',
          'data:text/html;charset=US-ASCII,%3Ch1%3EHello!%3C%2Fh1%3E'
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            'data:,Hello%2C%20World%21',
            'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ==',
            'data:text/html,%3Ch1%3EHello%2C%20World%21%3C%2Fh1%3E',
            `data:text/html,<script>alert('hi');</script>`,
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
            'data:text/html;charset=utf-8,<!DOCTYPE%20html><html%20lang%3D"en"><head><title>Embedded%20Window<%2Ftitle><%2Fhead><body><h1>42<%2Fh1><%2Fbody><%2Fhtml>',
            'data:application/x-zip-compressed;base64,UEsDBBQAAAAAANdY/VBQMVWPFgAAABYAAAALAAAAZm9vICgxKS50eHRXZWxjb21lIHRvIHRoZSBqdW5nbGUhUEsDBBQAAAAAAGtY/VBQMVWPFgAAABYAAAAHAAAAZm9vLnR4dFdlbGNvbWUgdG8gdGhlIGp1bmdsZSFQSwECFAAUAAAAAADXWP1QUDFVjxYAAAAWAAAACwAAAAAAAAABACAAAAAAAAAAZm9vICgxKS50eHRQSwECFAAUAAAAAABrWP1QUDFVjxYAAAAWAAAABwAAAAAAAAABACAAAAA/AAAAZm9vLnR4dFBLBQYAAAAAAgACAG4AAAB6AAAAAAA=',
            'data:,A%20brief%20note',
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD///+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4Ug9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC',
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIBAMAAAA2IaO4AAAAFVBMVEXk5OTn5+ft7e319fX29vb5+fn///++GUmVAAAALUlEQVQIHWNICnYLZnALTgpmMGYIFWYIZTA2ZFAzTTFlSDFVMwVyQhmAwsYMAKDaBy0axX/iAAAAAElFTkSuQmCC',
            '   data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIBAMAAAA2IaO4AAAAFVBMVEXk5OTn5+ft7e319fX29vb5+fn///++GUmVAAAALUlEQVQIHWNICnYLZnALTgpmMGYIFWYIZTA2ZFAzTTFlSDFVMwVyQhmAwsYMAKDaBy0axX/iAAAAAElFTkSuQmCC   ',
            ' data:,Hello%2C%20World!',
            ' data:,Hello World!',
            ' data:text/html,%3Ch1%3EHello%2C%20World!%3C%2Fh1%3E',
            'data:,A%20brief%20note',
            'data:text/html;charset=US-ASCII,%3Ch1%3EHello!%3C%2Fh1%3E'
          ];

          return values_.map(value => window.AmauiUtils.isValid('datauri', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.isValid('datauri', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(16).fill(true)));
      });

      to('is not datauri', async () => {
        const values_ = [
          'dataxbase64',
          'data:HelloWorld',
          ' data:text/plain;base64,SGVsbG8sIFdvcmxkIQ%3D%3D',
          'data:text/html;charset=,%3Ch1%3EHello!%3C%2Fh1%3E',
          'data:text/html;charset,%3Ch1%3EHello!%3C%2Fh1%3E',
          'data:image/svg+xml;base64,PD94bWwgdmVyzeiBNMyw2djJoMThWNkgzeiIvPjwvZz4KPC9zdmc+Cgo=',
          'data:base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD///+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4Ug9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC',
          '',
          'http://asd.org',
          'base64',
          'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD///+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4Ug9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC'
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            'dataxbase64',
            'data:HelloWorld',
            ' data:text/plain;base64,SGVsbG8sIFdvcmxkIQ%3D%3D',
            'data:text/html;charset=,%3Ch1%3EHello!%3C%2Fh1%3E',
            'data:text/html;charset,%3Ch1%3EHello!%3C%2Fh1%3E',
            'data:image/svg+xml;base64,PD94bWwgdmVyzeiBNMyw2djJoMThWNkgzeiIvPjwvZz4KPC9zdmc+Cgo=',
            'data:base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD///+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4Ug9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC',
            '',
            'http://asd.org',
            'base64',
            'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD///+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4Ug9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC'
          ];

          return values_.map(value => window.AmauiUtils.isValid('datauri', value));
        }, { browsers });
        const valueNode = values_.map(value => AmauiUtils.isValid('datauri', value));
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(11).fill(false)));
      });

    });

  });

  group('isEnvironment', () => {

    group('browser', () => {

      to('is browser', async () => {
        const valueBrowsers = await evaluate((window: any) => window.AmauiUtils.isEnvironment('browser'), { browsers });

        valueBrowsers.forEach(value => assert(value).eq(true));
      });

      to('is not browser', async () => {
        const valueNode = AmauiUtils.isEnvironment('browser');

        assert(valueNode).eq(false);
      });

    });

    group('worker', () => {

      to('is worker', async () => {
        const valueWorkers = await evaluateWorker(() => typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope, { browsers: { chromium: browsers.chromium } });

        valueWorkers.forEach(value => assert(value).eq(true));
      });

      to('is not worker', async () => {
        const valueBrowsers = await evaluate((window: any) => window.AmauiUtils.isEnvironment('worker'), { browsers });
        const valueNode = AmauiUtils.isEnvironment('worker');
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eq(false));
      });

    });

    group('nodejs', () => {

      to('is nodejs', async () => {
        const valueNode = AmauiUtils.isEnvironment('nodejs');

        assert(valueNode).eq(true);
      });

      to('is not nodejs', async () => {
        const valueBrowsers = await evaluate((window: any) => window.AmauiUtils.isEnvironment('nodejs'), { browsers });

        valueBrowsers.forEach(value => assert(value).eq(false));
      });

    });

    group('localhost', () => {

      // We have no browsers localhost app atm
      // while playwright testing so we will use a dummy input
      // to the is method
      to('is localhost', async () => {
        const valueBrowsers = await evaluate((window: any) => window.AmauiUtils.isEnvironment('localhost', 'localhost'), { browsers });

        valueBrowsers.forEach(value => assert(value).eq(true));
      });

      to('is not localhost', async () => {
        const valueNode = AmauiUtils.isEnvironment('localhost');

        assert(valueNode).eq(false);
      });

    });

  });

  group('isOS', () => {

    group('mobile', () => {

      to('is mobile', async () => {
        const browser: IBrowser = await startBrowser('chromium', { context: { ...playwright.devices['Pixel 4'] } });

        const valueBrowsers = await evaluate((window: any) => window.AmauiUtils.isOS('mobile'), { browsers: { chromium: browser } });

        valueBrowsers.forEach(value => assert(value).eq(true));

        await browser.browser.close();
      });

      to('is not mobile', async () => {
        const valueNode = AmauiUtils.isOS('mobile');

        assert(valueNode).eq(false);
      });

    });

    group('mac', () => {

      to('is mac', async () => {
        const valueBrowsers = await evaluate((window: any) => window.AmauiUtils.isOS('mac'), { browsers: { webkit: browsers.webkit } });

        valueBrowsers.forEach(value => assert(value).eq(true));
      });

      to('is not mac', async () => {
        const valueNode = AmauiUtils.isOS('mac');

        assert(valueNode).eq(false);
      });

    });

    group('android', () => {

      to('is android', async () => {
        const browser: IBrowser = await startBrowser('chromium', { context: { ...playwright.devices['Pixel 4'] } });

        const valueBrowsers = await evaluate((window: any) => window.AmauiUtils.isOS('android'), { browsers: { chromium: browser } });

        valueBrowsers.forEach(value => assert(value).eq(true));

        await browser.browser.close();
      });

      to('is not android', async () => {
        const valueNode = AmauiUtils.isOS('android');

        assert(valueNode).eq(false);
      });

    });

    group('ios', () => {

      to('is ios', async () => {
        const browser: IBrowser = await startBrowser('chromium', { context: { ...playwright.devices['iPhone 13 Pro'] } });

        const valueBrowsers = await evaluate((window: any) => window.AmauiUtils.isOS('ios'), { browsers: { webkit: browser } });

        valueBrowsers.forEach(value => assert(value).eq(true));

        await browser.browser.close();
      });

      to('is not ios', async () => {
        const valueNode = AmauiUtils.isOS('ios');

        assert(valueNode).eq(false);
      });

    });

    group('windows', () => {

      to('is windows', async () => {
        const browser: IBrowser = await startBrowser('chromium', { context: { ...playwright.devices['Desktop Edge'] } });

        const valueBrowsers = await evaluate((window: any) => window.AmauiUtils.isOS('windows'), { browsers: { chromium: browser } });

        valueBrowsers.forEach(value => assert(value).eq(true));

        await browser.browser.close();
      });

      to('is not windows', async () => {
        const valueNode = AmauiUtils.isOS('windows');

        assert(valueNode).eq(false);
      });

    });

    group('linux', () => {

      to('is linux', async () => {
        const browser: IBrowser = await startBrowser('chromium', {
          context: {
            ...playwright.devices['Desktop Chrome'],
            userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
          },
        });

        const valueBrowsers = await evaluate((window: any) => window.AmauiUtils.isOS('linux'), { browsers: { chromium: browser } });

        valueBrowsers.forEach(value => assert(value).eq(true));

        await browser.browser.close();
      });

      to('is not linux', async () => {
        const valueNode = AmauiUtils.isOS('linux');

        assert(valueNode).eq(false);
      });

    });

  });

  group('isBrowser', () => {

    group('chrome', () => {

      to('is chrome', async () => {
        const browser: IBrowser = await startBrowser('chromium', { context: { ...playwright.devices['Desktop Chrome'] } });

        const valueBrowsers = await evaluate((window: any) => window.AmauiUtils.isBrowser('chrome'), { browsers: { chromium: browser } });

        valueBrowsers.forEach(value => assert(value).eq(true));

        await browser.browser.close();
      });

      to('is not chrome', async () => {
        const valueNode = AmauiUtils.isBrowser('chrome');

        assert(valueNode).eq(false);
      });

    });

    group('opera', () => {

      to('is opera', async () => {
        const browser: IBrowser = await startBrowser('chromium', {
          context: {
            ...playwright.devices['Desktop Chrome'],
            userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 OPR/81.0.4196.60',
          },
        });

        const valueBrowsers = await evaluate((window: any) => window.AmauiUtils.isBrowser('opera'), { browsers: { chromium: browser } });

        valueBrowsers.forEach(value => assert(value).eq(true));

        await browser.browser.close();
      });

      to('is not opera', async () => {
        const valueNode = AmauiUtils.isBrowser('opera');

        assert(valueNode).eq(false);
      });

    });

    group('firefox', () => {

      to('is firefox', async () => {
        const browser: IBrowser = await startBrowser('chromium', { context: { ...playwright.devices['Desktop Firefox'] } });

        const valueBrowsers = await evaluate((window: any) => window.AmauiUtils.isBrowser('firefox'), { browsers: { chromium: browser } });

        valueBrowsers.forEach(value => assert(value).eq(true));

        await browser.browser.close();
      });

      to('is not firefox', async () => {
        const valueNode = AmauiUtils.isBrowser('firefox');

        assert(valueNode).eq(false);
      });

    });

    group('safari', () => {

      to('is safari', async () => {
        const browser: IBrowser = await startBrowser('chromium', { context: { ...playwright.devices['Desktop Safari'] } });

        const valueBrowsers = await evaluate((window: any) => window.AmauiUtils.isBrowser('safari'), { browsers: { chromium: browser } });

        valueBrowsers.forEach(value => assert(value).eq(true));

        await browser.browser.close();
      });

      to('is not safari', async () => {
        const valueNode = AmauiUtils.isBrowser('safari');

        assert(valueNode).eq(false);
      });

    });

    group('edge-chromium', () => {

      to('is edge-chromium', async () => {
        const browser: IBrowser = await startBrowser('chromium', { context: { ...playwright.devices['Desktop Edge'] } });

        const valueBrowsers = await evaluate((window: any) => window.AmauiUtils.isBrowser('edge-chromium'), { browsers: { chromium: browser } });

        valueBrowsers.forEach(value => assert(value).eq(true));

        await browser.browser.close();
      });

      to('is not edge-chromium', async () => {
        const valueNode = AmauiUtils.isBrowser('edge-chromium');

        assert(valueNode).eq(false);
      });

    });

    group('edge', () => {

      to('is edge', async () => {
        const browser: IBrowser = await startBrowser('chromium', {
          context: {
            ...playwright.devices['Desktop Edge'],
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.55 Safari/537.36 Edg/96.0.1054.34',
          },
        });

        const valueBrowsers = await evaluate((window: any) => window.AmauiUtils.isBrowser('edge'), { browsers: { chromium: browser } });

        valueBrowsers.forEach(value => assert(value).eq(true));

        await browser.browser.close();
      });

      to('is not edge', async () => {
        const valueNode = AmauiUtils.isBrowser('edge');

        assert(valueNode).eq(false);
      });

    });

    group('ie', () => {

      to('is ie', async () => {
        const browser: IBrowser = await startBrowser('chromium', {
          context: {
            ...playwright.devices['Desktop Edge'],
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.55 Safari/537.36 Edg/96.0.1054.34',
          },
        });

        const valueBrowsers = await evaluate((window: any) => {
          // IE dummy data fixture
          window.document.documentMode = 7;

          return window.AmauiUtils.isBrowser('ie');
        }, { browsers: { chromium: browser } });

        valueBrowsers.forEach(value => assert(value).eq(true));

        await browser.browser.close();
      });

      to('is not ie', async () => {
        const valueNode = AmauiUtils.isBrowser('ie');

        assert(valueNode).eq(false);
      });

    });

  });

  group('isExists', () => {

    group('Intl', () => {

      to('is Intl', async () => {
        const valueBrowsers = await evaluate((window: any) => window.AmauiUtils.isExists('Intl'), { browsers });
        const valueNode = AmauiUtils.isExists('Intl');
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eq(true));
      });

    });

    group('crypto', () => {

      to('is crypto', async () => {
        const valueBrowsers = await evaluate((window: any) => window.AmauiUtils.isExists('crypto'), { browsers });

        valueBrowsers.forEach(value => assert(value).eq(true));
      });

      to('is not crypto', async () => {
        const valueNode = AmauiUtils.isExists('crypto');

        assert(valueNode).eq(false);
      });

    });

  });

  group('isResponsive', () => {

    group('mobile', () => {
      let browser: IBrowser;

      postTo(async () => await browser.browser.close());

      to('is mobile', async () => {
        browser = await startBrowser('chromium', { context: { ...playwright.devices['Pixel 4'] } });

        const valueBrowsers = await evaluate((window: any) => window.AmauiUtils.isResponsive('mobile'), { browsers: { chromium: browser } });

        valueBrowsers.forEach(value => assert(value).eq(true));
      });

      to('is not mobile', async () => {
        browser = await startBrowser('chromium', { context: { ...playwright.devices['Desktop Chrome'] } });

        const valueBrowsers = await evaluate((window: any) => window.AmauiUtils.isResponsive('mobile'), { browsers: { chromium: browser } });

        valueBrowsers.forEach(value => assert(value).eq(false));
      });

    });

    group('tablet', () => {
      let browser: IBrowser;

      postTo(async () => await browser.browser.close());

      to('is tablet', async () => {
        browser = await startBrowser('chromium', { context: { ...playwright.devices['iPad Pro 11'] } });

        const valueBrowsers = await evaluate((window: any) => window.AmauiUtils.isResponsive('tablet'), { browsers: { chromium: browser } });

        valueBrowsers.forEach(value => assert(value).eq(true));
      });

      to('is not tablet', async () => {
        browser = await startBrowser('chromium', { context: { ...playwright.devices['Desktop Chrome'] } });

        const valueBrowsers = await evaluate((window: any) => window.AmauiUtils.isResponsive('tablet'), { browsers: { chromium: browser } });

        valueBrowsers.forEach(value => assert(value).eq(false));
      });

    });

    group('laptop', () => {
      let browser: IBrowser;

      postTo(async () => await browser.browser.close());

      to('is laptop', async () => {
        browser = await startBrowser('chromium', { context: { ...playwright.devices['Desktop Chrome HiDPI'] } });

        const valueBrowsers = await evaluate((window: any) => window.AmauiUtils.isResponsive('laptop'), { browsers: { chromium: browser } });

        valueBrowsers.forEach(value => assert(value).eq(true));
      });

      to('is not laptop', async () => {
        browser = await startBrowser('chromium', { context: { ...playwright.devices['iPad Pro 11'] } });

        const valueBrowsers = await evaluate((window: any) => window.AmauiUtils.isResponsive('laptop'), { browsers: { chromium: browser } });

        valueBrowsers.forEach(value => assert(value).eq(false));
      });

    });

    group('desktop', () => {
      let browser: IBrowser;

      postTo(async () => await browser.browser.close());

      to('is desktop', async () => {
        browser = await startBrowser('chromium', { context: { ...playwright.devices['Desktop Chrome'], viewport: { width: 1920, height: 1024 } } });

        const valueBrowsers = await evaluate((window: any) => window.AmauiUtils.isResponsive('desktop'), { browsers: { chromium: browser } });

        valueBrowsers.forEach(value => assert(value).eq(true));
      });

      to('is not desktop', async () => {
        browser = await startBrowser('chromium', { context: { ...playwright.devices['Desktop Chrome HiDPI'] } });

        const valueBrowsers = await evaluate((window: any) => window.AmauiUtils.isResponsive('desktop'), { browsers: { chromium: browser } });

        valueBrowsers.forEach(value => assert(value).eq(false));
      });

    });

    group('tv', () => {
      let browser: IBrowser;

      postTo(async () => await browser.browser.close());

      to('is tv', async () => {
        browser = await startBrowser('chromium', { context: { ...playwright.devices['Desktop Chrome'], viewport: { width: 4400, height: 4400 } } });

        const valueBrowsers = await evaluate((window: any) => window.AmauiUtils.isResponsive('tv'), { browsers: { chromium: browser } });

        valueBrowsers.forEach(value => assert(value).eq(true));
      });

      to('is not tv', async () => {
        browser = await startBrowser('chromium', { context: { ...playwright.devices['Desktop Chrome'] } });

        const valueBrowsers = await evaluate((window: any) => window.AmauiUtils.isResponsive('tv'), { browsers: { chromium: browser } });

        valueBrowsers.forEach(value => assert(value).eq(false));
      });

    });

  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.AmauiUtils.polyfills();

      return [
        ('a' as any).is('string'),
        (4 as any).is('number'),
        (true as any).is('boolean'),
        ([] as any).is('array'),
        ({} as any).is('object'),
        (function a() { } as any).is('function'),
      ];
    }, { browsers });

    AmauiUtils.polyfills();

    const valueNode = [
      ('a' as any).is('string'),
      (4 as any).is('number'),
      (true as any).is('boolean'),
      ([] as any).is('array'),
      ({} as any).is('object'),
      (function a() { } as any).is('function'),
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql(new Array(6).fill(true)));
  });

});
