/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import React from 'react';

import { evaluate, reset } from '../utils/js/test/utils';

import * as OnesyUtils from '../src';

group('@onesy/utils/is', () => {

  post(() => reset());

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

        return values_.map(value => window.OnesyUtils.is('string', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('string', value));
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

        return values_.map(value => window.OnesyUtils.is('string', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('string', value));
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

        return values_.map(value => window.OnesyUtils.is('number', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('number', value));
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

        return values_.map(value => window.OnesyUtils.is('number', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('number', value));
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

        return values_.map(value => window.OnesyUtils.is('boolean', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('boolean', value));
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

        return values_.map(value => window.OnesyUtils.is('boolean', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('boolean', value));
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

        return values_.map(value => window.OnesyUtils.is('array', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('array', value));
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

        return values_.map(value => window.OnesyUtils.is('array', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('array', value));
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

        return values_.map(value => window.OnesyUtils.is('object', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('object', value));
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

        return values_.map(value => window.OnesyUtils.is('object', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('object', value));
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

        return values_.map(value => window.OnesyUtils.is('object-like', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('object-like', value));
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

        return values_.map(value => window.OnesyUtils.is('object-like', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('object-like', value));
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

        return values_.map(value => window.OnesyUtils.is('class', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('class', value));
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

        return values_.map(value => window.OnesyUtils.is('class', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('class', value));
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

        return values_.map(value => window.OnesyUtils.is('function', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('function', value));
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

        return values_.map(value => window.OnesyUtils.is('function', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('function', value));
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

        return values_.map(value => window.OnesyUtils.is('async', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('async', value));
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

        return values_.map(value => window.OnesyUtils.is('async', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('async', value));
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

        return values_.map(value => window.OnesyUtils.is('map', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('map', value));
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

        return values_.map(value => window.OnesyUtils.is('map', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('map', value));
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

        return values_.map(value => window.OnesyUtils.is('weakmap', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('weakmap', value));
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

        return values_.map(value => window.OnesyUtils.is('weakmap', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('weakmap', value));
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

        return values_.map(value => window.OnesyUtils.is('set', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('set', value));
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

        return values_.map(value => window.OnesyUtils.is('set', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('set', value));
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

        return values_.map(value => window.OnesyUtils.is('weakset', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('weakset', value));
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

        return values_.map(value => window.OnesyUtils.is('weakset', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('weakset', value));
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

        return values_.map(value => window.OnesyUtils.is('promise', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('promise', value));
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

        return values_.map(value => window.OnesyUtils.is('promise', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('promise', value));
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

        return values_.map(value => window.OnesyUtils.is('int8array', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('int8array', value));
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

        return values_.map(value => window.OnesyUtils.is('int8array', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('int8array', value));
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

        return values_.map(value => window.OnesyUtils.is('uint8array', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('uint8array', value));
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

        return values_.map(value => window.OnesyUtils.is('uint8array', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('uint8array', value));
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

        return values_.map(value => window.OnesyUtils.is('uint8clampedarray', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('uint8clampedarray', value));
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

        return values_.map(value => window.OnesyUtils.is('uint8clampedarray', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('uint8clampedarray', value));
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

        return values_.map(value => window.OnesyUtils.is('int16array', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('int16array', value));
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

        return values_.map(value => window.OnesyUtils.is('int16array', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('int16array', value));
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

        return values_.map(value => window.OnesyUtils.is('uint16array', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('uint16array', value));
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

        return values_.map(value => window.OnesyUtils.is('uint16array', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('uint16array', value));
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

        return values_.map(value => window.OnesyUtils.is('int32array', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('int32array', value));
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

        return values_.map(value => window.OnesyUtils.is('int32array', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('int32array', value));
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

        return values_.map(value => window.OnesyUtils.is('uint32array', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('uint32array', value));
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

        return values_.map(value => window.OnesyUtils.is('uint32array', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('uint32array', value));
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

        return values_.map(value => window.OnesyUtils.is('float32array', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('float32array', value));
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

        return values_.map(value => window.OnesyUtils.is('float32array', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('float32array', value));
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

        return values_.map(value => window.OnesyUtils.is('float64array', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('float64array', value));
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

        return values_.map(value => window.OnesyUtils.is('float64array', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('float64array', value));
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

        return values_.map(value => window.OnesyUtils.is('bigint64array', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('bigint64array', value));
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

        return values_.map(value => window.OnesyUtils.is('bigint64array', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('bigint64array', value));
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

        return values_.map(value => window.OnesyUtils.is('biguint64array', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('biguint64array', value));
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

        return values_.map(value => window.OnesyUtils.is('biguint64array', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('biguint64array', value));
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

        return values_.map(value => window.OnesyUtils.is('typedarray', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('typedarray', value));
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

        return values_.map(value => window.OnesyUtils.is('typedarray', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('typedarray', value));
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

        return values_.map(value => window.OnesyUtils.is('dataview', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('dataview', value));
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

        return values_.map(value => window.OnesyUtils.is('dataview', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('dataview', value));
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

        return values_.map(value => window.OnesyUtils.is('arraybuffer', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('arraybuffer', value));
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

        return values_.map(value => window.OnesyUtils.is('arraybuffer', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('arraybuffer', value));
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

      const valueNode = values_.map(value => OnesyUtils.is('sharedarraybuffer', value));
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

        return values_.map(value => window.OnesyUtils.is('sharedarraybuffer', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('sharedarraybuffer', value));
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

        return values_.map(value => window.OnesyUtils.is('symbol', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('symbol', value));
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

        return values_.map(value => window.OnesyUtils.is('symbol', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('symbol', value));
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

        return values_.map(value => window.OnesyUtils.is('error', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('error', value));
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

        return values_.map(value => window.OnesyUtils.is('error', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('error', value));
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

        return values_.map(value => window.OnesyUtils.is('date', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('date', value));
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

        return values_.map(value => window.OnesyUtils.is('date', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('date', value));
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

        return values_.map(value => window.OnesyUtils.is('regexp', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('regexp', value));
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

        return values_.map(value => window.OnesyUtils.is('regexp', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('regexp', value));
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql(new Array(5).fill(false)));
    });

  });

  group('arguments', () => {

    to('is arguments', async () => {
      const values_ = [
        (function a() { return OnesyUtils.is('arguments', arguments); })(),
      ];

      const valueBrowsers = await evaluate((window: any) => {
        const values_ = [
          (function a() { return window.OnesyUtils.is('arguments', arguments); })(),
        ];

        return values_;
      });
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

        return values_.map(value => window.OnesyUtils.is('arguments', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('arguments', value));
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

        return values_.map(value => window.OnesyUtils.is('null', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('null', value));
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

        return values_.map(value => window.OnesyUtils.is('null', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('null', value));
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

        return values_.map(value => window.OnesyUtils.is('undefined', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('undefined', value));
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

        return values_.map(value => window.OnesyUtils.is('undefined', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('undefined', value));
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

        return values_.map(value => window.OnesyUtils.is('blob', value));
      });
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

        return values_.map(value => window.OnesyUtils.is('blob', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('blob', value));
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql(new Array(4).fill(false)));
    });

  });

  group('buffer', () => {

    to('is buffer', async () => {
      const values_ = [
        Buffer.from('a'),
      ];

      const valueNode = values_.map(value => OnesyUtils.is('buffer', value));
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

        return values_.map(value => window.OnesyUtils.is('buffer', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('buffer', value));
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

        return values_.map(value => window.OnesyUtils.is('element', ...value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('element', ...value));

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

        return values_.map(value => window.OnesyUtils.is('element', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('element', value));
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
          ...values_.map(value => window.OnesyUtils.is('simple', value)),
        ];
      });
      const valueNode = [
        ...values_.map(value => OnesyUtils.is('simple', value)),
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

        return values_.map(value => window.OnesyUtils.is('simple', ...value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('simple', ...value));
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

        return values_.map(value => window.OnesyUtils.is('not-array-object', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('not-array-object', value));
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

        return values_.map(value => window.OnesyUtils.is('not-array-object', value));
      });
      const valueNode = values_.map(value => OnesyUtils.is('not-array-object', value));
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql(new Array(2).fill(false)));
    });

  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.OnesyUtils.polyfills();

      return [
        ('a' as any).is('string'),
        (4 as any).is('number'),
        (true as any).is('boolean'),
        ([] as any).is('array'),
        ({} as any).is('object'),
        (function a() { } as any).is('function'),
      ];
    });

    OnesyUtils.polyfills();

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
