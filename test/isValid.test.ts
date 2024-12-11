/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as OnesyUtils from '../src';

group('@onesy/utils/isValid', () => {

  post(() => reset());

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

        return values_.map(value => window.OnesyUtils.isValid('date', value));
      });
      const valueNode = values_.map(value => OnesyUtils.isValid('date', value));
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

        return values_.map(value => window.OnesyUtils.isValid('date', value));
      });
      const valueNode = values_.map(value => OnesyUtils.isValid('date', value));
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql(new Array(5).fill(false)));
    });

  });

  group('uuid', () => {

    to('is uuid', async () => {
      const values_ = [
        OnesyUtils.getID(),
        OnesyUtils.getID(),
        OnesyUtils.getID(),
      ];

      const valueBrowsers = await evaluate((window: any) => {
        const values_ = [
          window.OnesyUtils.getID(),
          window.OnesyUtils.getID(),
          window.OnesyUtils.getID(),
        ];

        return values_.map(value => window.OnesyUtils.isValid('uuid', value));
      });
      const valueNode = values_.map(value => OnesyUtils.isValid('uuid', value));
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

        return values_.map(value => window.OnesyUtils.isValid('uuid', value));
      });
      const valueNode = values_.map(value => OnesyUtils.isValid('uuid', value));
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

        return values_.map(value => window.OnesyUtils.isValid('binary-string', value));
      });
      const valueNode = values_.map(value => OnesyUtils.isValid('binary-string', value));
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

        return values_.map(value => window.OnesyUtils.isValid('binary-string', value));
      });
      const valueNode = values_.map(value => OnesyUtils.isValid('binary-string', value));
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

        return values_.map(value => window.OnesyUtils.isValid('hexadecimal-string', value));
      });
      const valueNode = values_.map(value => OnesyUtils.isValid('hexadecimal-string', value));
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

        return values_.map(value => window.OnesyUtils.isValid('hexadecimal-string', value));
      });
      const valueNode = values_.map(value => OnesyUtils.isValid('hexadecimal-string', value));
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

        return values_.map(value => window.OnesyUtils.isValid('url', value));
      });
      const valueNode = values_.map(value => OnesyUtils.isValid('url', value));
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

        return values_.map(value => window.OnesyUtils.isValid('url', value));
      });
      const valueNode = values_.map(value => OnesyUtils.isValid('url', value));
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

        return values_.map(value => window.OnesyUtils.isValid('url-path', value));
      });
      const valueNode = values_.map(value => OnesyUtils.isValid('url-path', value));
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

        return values_.map(value => window.OnesyUtils.isValid('url-path', value));
      });
      const valueNode = values_.map(value => OnesyUtils.isValid('url-path', value));
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

        return values_.map(value => window.OnesyUtils.isValid('compare', ...value));
      });
      const valueNode = values_.map(value => OnesyUtils.isValid('compare', ...value));
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

        return values_.map(value => window.OnesyUtils.isValid('semver', value));
      });
      const valueNode = values_.map(value => OnesyUtils.isValid('semver', value));
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

        return values_.map(value => window.OnesyUtils.isValid('semver', value));
      });
      const valueNode = values_.map(value => OnesyUtils.isValid('semver', value));
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

        return values_.map(value => window.OnesyUtils.isValid('semver-compare', ...value));
      });
      const valueNode = values_.map(value => OnesyUtils.isValid('semver-compare', ...value));
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

        return values_.map(value => window.OnesyUtils.isValid('timestamp', value));
      });
      const valueNode = values_.map(value => OnesyUtils.isValid('timestamp', value));
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

        return values_.map(value => window.OnesyUtils.isValid('timestamp', value));
      });
      const valueNode = values_.map(value => OnesyUtils.isValid('timestamp', value));
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

        return values_.map(value => window.OnesyUtils.isValid('email', value));
      });
      const valueNode = values_.map(value => OnesyUtils.isValid('email', value));
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

        return values_.map(value => window.OnesyUtils.isValid('email', value));
      });
      const valueNode = values_.map(value => OnesyUtils.isValid('email', value));
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

        return values_.map(value => window.OnesyUtils.isValid('hash', value));
      });
      const valueNode = values_.map(value => OnesyUtils.isValid('hash', value));
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

        return values_.map(value => window.OnesyUtils.isValid('hash', value));
      });
      const valueNode = values_.map(value => OnesyUtils.isValid('hash', value));
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

        return values_.map(value => window.OnesyUtils.isValid('mobile', value));
      });
      const valueNode = values_.map(value => OnesyUtils.isValid('mobile', value));
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

        return values_.map(value => window.OnesyUtils.isValid('mobile', value));
      });
      const valueNode = values_.map(value => OnesyUtils.isValid('mobile', value));
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

        return values_.map(value => window.OnesyUtils.isValid('color-rgb', value));
      });
      const valueNode = values_.map(value => OnesyUtils.isValid('color-rgb', value));
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

        return values_.map(value => window.OnesyUtils.isValid('color-rgb', value));
      });
      const valueNode = values_.map(value => OnesyUtils.isValid('color-rgb', value));
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

        return values_.map(value => window.OnesyUtils.isValid('color-hex', value));
      });
      const valueNode = values_.map(value => OnesyUtils.isValid('color-hex', value));
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

        return values_.map(value => window.OnesyUtils.isValid('color-hex', value));
      });
      const valueNode = values_.map(value => OnesyUtils.isValid('color-hex', value));
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

        return values_.map(value => window.OnesyUtils.isValid('color-hsl', value));
      });
      const valueNode = values_.map(value => OnesyUtils.isValid('color-hsl', value));
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

        return values_.map(value => window.OnesyUtils.isValid('color-hsl', value));
      });
      const valueNode = values_.map(value => OnesyUtils.isValid('color-hsl', value));
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

        return values_.map(value => window.OnesyUtils.isValid('json', value));
      });
      const valueNode = values_.map(value => OnesyUtils.isValid('json', value));
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

        return values_.map(value => window.OnesyUtils.isValid('json', value));
      });
      const valueNode = values_.map(value => OnesyUtils.isValid('json', value));
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

        return values_.map(value => window.OnesyUtils.isValid('min', ...value));
      });
      const valueNode = values_.map(value => OnesyUtils.isValid('min', ...value));
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

        return values_.map(value => window.OnesyUtils.isValid('min', ...value));
      });
      const valueNode = values_.map(value => OnesyUtils.isValid('min', ...value));
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

        return values_.map(value => window.OnesyUtils.isValid('max', ...value));
      });
      const valueNode = values_.map(value => OnesyUtils.isValid('max', ...value));
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

        return values_.map(value => window.OnesyUtils.isValid('max', ...value));
      });
      const valueNode = values_.map(value => OnesyUtils.isValid('max', ...value));
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

        return values_.map(value => window.OnesyUtils.isValid('min-max', ...value));
      });
      const valueNode = values_.map(value => OnesyUtils.isValid('min-max', ...value));
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

        return values_.map(value => window.OnesyUtils.isValid('min-max', ...value));
      });
      const valueNode = values_.map(value => OnesyUtils.isValid('min-max', ...value));
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql(new Array(2).fill(false)));
    });

  });

  group('same-origin', () => {

    to('is same-origin', async () => {
      const valueBrowsers = await evaluate((window: any) => window.OnesyUtils.isValid('same-origin', 'http://localhost:4000/about'),);

      valueBrowsers.forEach(value => assert(value).eq(true));
    });

    to('is not same-origin', async () => {
      const valueBrowsers = await evaluate((window: any) => window.OnesyUtils.isValid('same-origin', 'https://google.com'),);

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

        return values_.map(value => window.OnesyUtils.isValid('js-chunk', value));
      });
      const valueNode = values_.map(value => OnesyUtils.isValid('js-chunk', value));
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

        return values_.map(value => window.OnesyUtils.isValid('js-chunk', value));
      });
      const valueNode = values_.map(value => OnesyUtils.isValid('js-chunk', value));
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

        return values_.map(value => window.OnesyUtils.isValid('http-method', value));
      });
      const valueNode = values_.map(value => OnesyUtils.isValid('http-method', value));
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

        return values_.map(value => window.OnesyUtils.isValid('http-method', value));
      });
      const valueNode = values_.map(value => OnesyUtils.isValid('http-method', value));
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

        return values_.map(value => window.OnesyUtils.isValid('base64', value));
      });
      const valueNode = values_.map(value => OnesyUtils.isValid('base64', value));
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

        return values_.map(value => window.OnesyUtils.isValid('base64', value));
      });
      const valueNode = values_.map(value => OnesyUtils.isValid('base64', value));
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

        return values_.map(value => window.OnesyUtils.isValid('datauri', value));
      });
      const valueNode = values_.map(value => OnesyUtils.isValid('datauri', value));
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

        return values_.map(value => window.OnesyUtils.isValid('datauri', value));
      });
      const valueNode = values_.map(value => OnesyUtils.isValid('datauri', value));
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql(new Array(11).fill(false)));
    });

  });

});
