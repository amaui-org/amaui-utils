/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { startBrowsers, IBrowsers, evaluate, closeBrowsers, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/to', () => {
  let browsers: IBrowsers;

  pre(async () => browsers = await startBrowsers());

  post(async () => {
    await closeBrowsers(browsers);

    reset();
  });

  group('string', async () => {

    to('arraybuffer', async () => {
      const values_ = [
        AmauiUtils.to('', 'arraybuffer'),
        AmauiUtils.to('a', 'arraybuffer'),
        AmauiUtils.to('a a a a', 'arraybuffer'),
      ];

      const valueBrowsers = await evaluate((window: any) => {
        const values_ = [
          window.AmauiUtils.to('', 'arraybuffer'),
          window.AmauiUtils.to('a', 'arraybuffer'),
          window.AmauiUtils.to('a a a a', 'arraybuffer'),
        ];

        return values_.map((value: ArrayBuffer) => [window.AmauiUtils.to(value, 'string'), value instanceof ArrayBuffer]);
      }, { browsers });
      const valueNode = values_.map((value: ArrayBuffer) => [AmauiUtils.to(value, 'string'), value instanceof ArrayBuffer]);
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        [
          '',
          true,
        ],
        [
          'a',
          true,
        ],
        [
          'a a a a',
          true,
        ],
      ]));
    });

    to('base64', async () => {
      const values_ = [
        AmauiUtils.to(AmauiUtils.to('', 'base64'), 'string'),
        AmauiUtils.to(AmauiUtils.to('a', 'base64'), 'string'),
        AmauiUtils.to(AmauiUtils.to('a a a a', 'base64'), 'string'),
        AmauiUtils.to('/pMAC+dOnX8daPKS+UVibVE7rifssjoAC5Eo25UeRS4ADcYWifd/kpYyisTahf7PuXFoqK1BWDdOqJ3XE/bx5zCW7ObcaoncjhB7v+FaFby3LDdOfC0V9r9YUnK7Mksl8cVb3PR5LS0ACxWoK1+RorPoOHKVr9YUnK73Pduqt3kg508uJjUS4Kvybla0STdpJvyA53gbLI0cx2Mqlu+3gbQax5JVnkXB8Cr3PRyHAAGy0akr7EqC0KzJLJfObcaon7GPyDOwtE7rR+Tr4lQX26czwjWlYWicKnGF4N0+5+YoPBwACp6tfkaKwtE/aondcTrlYVMAAxxUahfwNun3PbdWg5DKS+v1V2MAC9crAAqYGZJZL+53SKyyvclFnYGD6YrP6VJfbl7wmntItZK3gtYAByK/INQV7ncjAAvCccVG5LpXUAA=', 'string'),
      ];

      const valueBrowsers = await evaluate((window: any) => {
        const values_ = [
          window.AmauiUtils.to(window.AmauiUtils.to('', 'base64'), 'string'),
          window.AmauiUtils.to(window.AmauiUtils.to('a', 'base64'), 'string'),
          window.AmauiUtils.to(window.AmauiUtils.to('a a a a', 'base64'), 'string'),
          window.AmauiUtils.to('/pMAC+dOnX8daPKS+UVibVE7rifssjoAC5Eo25UeRS4ADcYWifd/kpYyisTahf7PuXFoqK1BWDdOqJ3XE/bx5zCW7ObcaoncjhB7v+FaFby3LDdOfC0V9r9YUnK7Mksl8cVb3PR5LS0ACxWoK1+RorPoOHKVr9YUnK73Pduqt3kg508uJjUS4Kvybla0STdpJvyA53gbLI0cx2Mqlu+3gbQax5JVnkXB8Cr3PRyHAAGy0akr7EqC0KzJLJfObcaon7GPyDOwtE7rR+Tr4lQX26czwjWlYWicKnGF4N0+5+YoPBwACp6tfkaKwtE/aondcTrlYVMAAxxUahfwNun3PbdWg5DKS+v1V2MAC9crAAqYGZJZL+53SKyyvclFnYGD6YrP6VJfbl7wmntItZK3gtYAByK/INQV7ncjAAvCccVG5LpXUAA=', 'string'),
        ];

        return values_;
      }, { browsers });
      const valueNode = values_;
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        '',
        'a',
        'a a a a',
        `þ\x93\x00\vçN\x9D\x7F\x1Dhò\x92ùEbmQ;®'ì²:\x00\v\x91(Û\x95\x1EE.\x00\rÆ\x16\x89÷\x7F\x92\x962\x8AÄÚ\x85þÏ¹qh¨­AX7N¨\x9D×\x13öñç0\x96ìæÜj\x89Ü\x8E\x10{¿áZ\x15¼·,7N|-\x15ö¿XRr»2K%ñÅ[Üôy--\x00\v\x15¨+_\x91¢³è8r\x95¯Ö\x14\x9C®÷=Ûª·y çO.&5\x12à«ònV´I7i&ü\x80çx\x1B,\x8D\x1CÇc*\x96ï·\x81´\x1AÇ\x92U\x9EEÁð*÷=\x1C\x87\x00\x01²Ñ©+ìJ\x82Ð¬É,\x97ÎmÆ¨\x9F±\x8FÈ3°´NëGäëâT\x17Û§3Â5¥ah\x9C*q\x85àÝ>çæ(<\x1C\x00\n\x9E­~F\x8AÂÑ?j\x89Ýq:åaS\x00\x03\x1CTj\x17ð6é÷=·V\x83\x90ÊKëõWc\x00\v×+\x00\n\x98\x19\x92Y/îwH¬²½ÉE\x9D\x81\x83é\x8AÏéR_n^ð\x9A{Hµ\x92·\x82Ö\x00\x07"¿ Ô\x15îw#\x00\vÂqÅFäºWP\x00`,
      ]));
    });

    to('datauri', async () => {
      const values_ = [
        AmauiUtils.to(AmauiUtils.to('', 'datauri'), 'string'),
        AmauiUtils.to(AmauiUtils.to('a', 'datauri'), 'string'),
        AmauiUtils.to(AmauiUtils.to('a a a a', 'datauri'), 'string'),
      ];

      const valueBrowsers = await evaluate((window: any) => {
        const values_ = [
          window.AmauiUtils.to(window.AmauiUtils.to('', 'datauri'), 'string'),
          window.AmauiUtils.to(window.AmauiUtils.to('a', 'datauri'), 'string'),
          window.AmauiUtils.to(window.AmauiUtils.to('a a a a', 'datauri'), 'string'),
        ];

        return values_;
      }, { browsers });
      const valueNode = values_;
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        '',
        'a',
        'a a a a',
      ]));
    });

    to('string', async () => {
      const values_ = [
        '',
        'a',
        'a a a a',
      ];

      const valueBrowsers = await evaluate((window: any) => {
        const values_ = [
          '',
          'a',
          'a a a a',
        ];

        return values_.map(value => AmauiUtils.to(value, 'string'));
      }, { browsers });
      const valueNode = values_.map(value => AmauiUtils.to(value, 'string'));
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        '',
        'a',
        'a a a a',
      ]));
    });

    to('other', async () => {
      const values_ = [
        AmauiUtils.to('a', 'string'),
        AmauiUtils.to(4, 'string'),
        AmauiUtils.to(true, 'string'),
        AmauiUtils.to(undefined, 'string'),
        AmauiUtils.to(new Map(), 'string'),
        AmauiUtils.to(function a() { }, 'string'),
        AmauiUtils.to(null, 'string'),
      ];

      const valueBrowsers = await evaluate((window: any) => {
        const values_ = [
          window.AmauiUtils.to('a', 'string'),
          window.AmauiUtils.to(4, 'string'),
          window.AmauiUtils.to(true, 'string'),
          window.AmauiUtils.to(undefined, 'string'),
          window.AmauiUtils.to(new Map(), 'string'),
          window.AmauiUtils.to(function a() { }, 'string'),
          window.AmauiUtils.to(null, 'string'),
        ];

        return values_;
      }, { browsers });
      const valueNode = values_;
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        'a',
        '4',
        'true',
        'undefined',
        '{}',
        'function a() { }',
        'null'
      ]));
    });

  });

  group('arraybuffer', async () => {

    to('string', async () => {
      const values_ = [
        AmauiUtils.to('', 'arraybuffer'),
        AmauiUtils.to('a', 'arraybuffer'),
        AmauiUtils.to('a a a a', 'arraybuffer'),
      ];

      const valueBrowsers = await evaluate((window: any) => {
        const values_ = [
          window.AmauiUtils.to('', 'arraybuffer'),
          window.AmauiUtils.to('a', 'arraybuffer'),
          window.AmauiUtils.to('a a a a', 'arraybuffer'),
        ];

        return values_.map((value: ArrayBuffer) => [window.AmauiUtils.to(value, 'string'), value instanceof ArrayBuffer, value.byteLength]);
      }, { browsers });
      const valueNode = values_.map((value: ArrayBuffer) => [AmauiUtils.to(value, 'string'), value instanceof ArrayBuffer, value.byteLength]);
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        [
          '',
          true,
          0,
        ],
        [
          'a',
          true,
          2,
        ],
        [
          'a a a a',
          true,
          14,
        ],
      ]));
    });

    to('base64', async () => {
      const values_ = [
        AmauiUtils.to(AmauiUtils.to('', 'base64'), 'arraybuffer'),
        AmauiUtils.to(AmauiUtils.to('a', 'base64'), 'arraybuffer'),
        AmauiUtils.to(AmauiUtils.to('a a a a', 'base64'), 'arraybuffer'),
      ];

      const valueBrowsers = await evaluate((window: any) => {
        const values_ = [
          window.AmauiUtils.to(window.AmauiUtils.to('', 'base64'), 'arraybuffer'),
          window.AmauiUtils.to(window.AmauiUtils.to('a', 'base64'), 'arraybuffer'),
          window.AmauiUtils.to(window.AmauiUtils.to('a a a a', 'base64'), 'arraybuffer'),
        ];

        return values_.map((value: ArrayBuffer) => [window.AmauiUtils.to(window.AmauiUtils.to(value, 'string'), 'string'), value instanceof ArrayBuffer]);
      }, { browsers });
      const valueNode = values_.map((value: ArrayBuffer) => [AmauiUtils.to(AmauiUtils.to(value, 'string'), 'string'), value instanceof ArrayBuffer]);
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        [
          '',
          true,
        ],
        [
          'a',
          true,
        ],
        [
          'a a a a',
          true,
        ],
      ]));
    });

    to('datauri', async () => {
      const values_ = [
        AmauiUtils.to(AmauiUtils.to('', 'datauri'), 'arraybuffer'),
        AmauiUtils.to(AmauiUtils.to('a', 'datauri'), 'arraybuffer'),
        AmauiUtils.to(AmauiUtils.to('a a a a', 'datauri'), 'arraybuffer'),
      ];

      const valueBrowsers = await evaluate((window: any) => {
        const values_ = [
          window.AmauiUtils.to(window.AmauiUtils.to('', 'datauri'), 'arraybuffer'),
          window.AmauiUtils.to(window.AmauiUtils.to('a', 'datauri'), 'arraybuffer'),
          window.AmauiUtils.to(window.AmauiUtils.to('a a a a', 'datauri'), 'arraybuffer'),
        ];

        return values_.map((value: ArrayBuffer) => [window.AmauiUtils.to(window.AmauiUtils.to(value, 'string'), 'string'), value instanceof ArrayBuffer]);
      }, { browsers });
      const valueNode = values_.map((value: ArrayBuffer) => [AmauiUtils.to(AmauiUtils.to(value, 'string'), 'string'), value instanceof ArrayBuffer]);
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        [
          '',
          true,
        ],
        [
          'a',
          true,
        ],
        [
          'a a a a',
          true,
        ],
      ]));
    });

    to('buffer', async () => {
      const values_ = [
        AmauiUtils.to(AmauiUtils.to('', 'buffer'), 'arraybuffer'),
        AmauiUtils.to(AmauiUtils.to('a', 'buffer'), 'arraybuffer'),
        AmauiUtils.to(AmauiUtils.to('a a a a', 'buffer'), 'arraybuffer'),
      ];

      const valueNode = values_.map((value: ArrayBuffer) => [AmauiUtils.to(value, 'string'), value instanceof ArrayBuffer, value.byteLength]);
      const values = [valueNode];

      values.forEach(value => assert(value).eql([
        [
          '',
          true,
          0,
        ],
        [
          'a',
          true,
          2,
        ],
        [
          'a a a a',
          true,
          14,
        ],
      ]));
    });

    to('arraybuffer', async () => {
      const values_ = [
        AmauiUtils.to(AmauiUtils.to('', 'arraybuffer'), 'arraybuffer'),
        AmauiUtils.to(AmauiUtils.to('a', 'arraybuffer'), 'arraybuffer'),
        AmauiUtils.to(AmauiUtils.to('a a a a', 'arraybuffer'), 'arraybuffer'),
      ];

      const valueBrowsers = await evaluate((window: any) => {
        const values_ = [
          window.AmauiUtils.to(window.AmauiUtils.to('', 'arraybuffer'), 'arraybuffer'),
          window.AmauiUtils.to(window.AmauiUtils.to('a', 'arraybuffer'), 'arraybuffer'),
          window.AmauiUtils.to(window.AmauiUtils.to('a a a a', 'arraybuffer'), 'arraybuffer'),
        ];

        return values_.map((value: ArrayBuffer) => [window.AmauiUtils.to(value, 'string'), value instanceof ArrayBuffer]);
      }, { browsers });
      const valueNode = values_.map((value: ArrayBuffer) => [AmauiUtils.to(value, 'string'), value instanceof ArrayBuffer]);
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        [
          '',
          true,
        ],
        [
          'a',
          true,
        ],
        [
          'a a a a',
          true,
        ],
      ]));
    });

  });

  group('base64', () => {

    to('string', async () => {
      const values_ = [
        AmauiUtils.to('', 'base64'),
        AmauiUtils.to('a', 'base64'),
        AmauiUtils.to('a a a a', 'base64'),
      ];

      const valueBrowsers = await evaluate((window: any) => {
        const values_ = [
          window.AmauiUtils.to('', 'base64'),
          window.AmauiUtils.to('a', 'base64'),
          window.AmauiUtils.to('a a a a', 'base64'),
        ];

        return values_.map((value: ArrayBuffer) => [window.AmauiUtils.to(value, 'string'), window.AmauiUtils.isValid('base64', value)]);
      }, { browsers });
      const valueNode = values_.map((value: ArrayBuffer) => [AmauiUtils.to(value, 'string'), AmauiUtils.isValid('base64', value)]);
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        [
          '',
          false,
        ],
        [
          'a',
          true,
        ],
        [
          'a a a a',
          true,
        ],
      ]));
    });

    to('base64', async () => {
      const values_ = [
        AmauiUtils.to(AmauiUtils.to('', 'base64'), 'base64'),
        AmauiUtils.to(AmauiUtils.to('a', 'base64'), 'base64'),
        AmauiUtils.to(AmauiUtils.to('a a a a', 'base64'), 'base64'),
      ];

      const valueBrowsers = await evaluate((window: any) => {
        const values_ = [
          window.AmauiUtils.to(window.AmauiUtils.to('', 'base64'), 'base64'),
          window.AmauiUtils.to(window.AmauiUtils.to('a', 'base64'), 'base64'),
          window.AmauiUtils.to(window.AmauiUtils.to('a a a a', 'base64'), 'base64'),
        ];

        return values_.map((value: ArrayBuffer) => [window.AmauiUtils.to(value, 'string'), window.AmauiUtils.isValid('base64', value)]);
      }, { browsers });
      const valueNode = values_.map((value: ArrayBuffer) => [AmauiUtils.to(value, 'string'), AmauiUtils.isValid('base64', value)]);
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        [
          '',
          false,
        ],
        [
          'a',
          true,
        ],
        [
          'a a a a',
          true,
        ],
      ]));
    });

  });

  group('datauri', () => {

    to('string', async () => {
      const values_ = [
        AmauiUtils.to('', 'datauri'),
        AmauiUtils.to('a', 'datauri'),
        AmauiUtils.to('a a a a', 'datauri'),
      ];

      const valueBrowsers = await evaluate((window: any) => {
        const values_ = [
          window.AmauiUtils.to('', 'datauri'),
          window.AmauiUtils.to('a', 'datauri'),
          window.AmauiUtils.to('a a a a', 'datauri'),
        ];

        return values_.map((value: ArrayBuffer) => [window.AmauiUtils.to(value, 'string'), window.AmauiUtils.isValid('datauri', value)]);
      }, { browsers });
      const valueNode = values_.map((value: ArrayBuffer) => [AmauiUtils.to(value, 'string'), AmauiUtils.isValid('datauri', value)]);
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        [
          '',
          true,
        ],
        [
          'a',
          true,
        ],
        [
          'a a a a',
          true,
        ],
      ]));
    });

    to('datauri', async () => {
      const values_ = [
        AmauiUtils.to(AmauiUtils.to('', 'datauri'), 'datauri'),
        AmauiUtils.to(AmauiUtils.to('a', 'datauri'), 'datauri'),
        AmauiUtils.to(AmauiUtils.to('a a a a', 'datauri'), 'datauri'),
      ];

      const valueBrowsers = await evaluate((window: any) => {
        const values_ = [
          window.AmauiUtils.to(window.AmauiUtils.to('', 'datauri'), 'datauri'),
          window.AmauiUtils.to(window.AmauiUtils.to('a', 'datauri'), 'datauri'),
          window.AmauiUtils.to(window.AmauiUtils.to('a a a a', 'datauri'), 'datauri'),
        ];

        return values_.map((value: ArrayBuffer) => [window.AmauiUtils.to(value, 'string'), window.AmauiUtils.isValid('datauri', value)]);
      }, { browsers });
      const valueNode = values_.map((value: ArrayBuffer) => [AmauiUtils.to(value, 'string'), AmauiUtils.isValid('datauri', value)]);
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        [
          '',
          true,
        ],
        [
          'a',
          true,
        ],
        [
          'a a a a',
          true,
        ],
      ]));
    });

  });

  group('blob', async () => {

    to('nodejs', () => {
      assert(AmauiUtils.to('a', 'blob')).eq(undefined);
    });

    to('base64', async () => {
      const valueBrowsers = await evaluate(async (window: any) => {
        const values_: any = [
          window.AmauiUtils.to(window.AmauiUtils.to('', 'base64'), 'blob'),
          window.AmauiUtils.to(window.AmauiUtils.to('a', 'base64'), 'blob'),
          window.AmauiUtils.to(window.AmauiUtils.to('a a a a', 'base64'), 'blob'),
        ];

        for (const [index, value] of values_.entries()) values_[index] = [value && window.AmauiUtils.to(await value.arrayBuffer(), 'string'), value instanceof Blob];

        return values_;
      }, { browsers });
      const values = [...valueBrowsers];

      values.forEach(value => assert(value).eql([
        [
          '',
          true,
        ],
        [
          'a',
          true,
        ],
        [
          'a a a a',
          true,
        ],
      ]));
    });

    to('datauri', async () => {
      const valueBrowsers = await evaluate(async (window: any) => {
        const values_: any = [
          window.AmauiUtils.to(window.AmauiUtils.to('', 'datauri'), 'blob'),
          window.AmauiUtils.to(window.AmauiUtils.to('a', 'datauri'), 'blob'),
          window.AmauiUtils.to(window.AmauiUtils.to('a a a a', 'datauri'), 'blob'),
        ];

        for (const [index, value] of values_.entries()) values_[index] = [window.AmauiUtils.to(await value.arrayBuffer(), 'string'), value instanceof Blob];

        return values_;
      }, { browsers });
      const values = [...valueBrowsers];

      values.forEach(value => assert(value).eql([
        [
          '',
          true,
        ],
        [
          'a',
          true,
        ],
        [
          'a a a a',
          true,
        ],
      ]));
    });

    to('string', async () => {
      const valueBrowsers = await evaluate(async (window: any) => {
        const values_: any = [
          window.AmauiUtils.to('', 'blob'),
          window.AmauiUtils.to('a', 'blob'),
          window.AmauiUtils.to('a a a a', 'blob'),
        ];

        for (const [index, value] of values_.entries()) values_[index] = [value && window.AmauiUtils.to(await value.text(), 'string'), value instanceof Blob];

        return values_;
      }, { browsers });
      const values = [...valueBrowsers];

      values.forEach(value => assert(value).eql([
        [
          '',
          true,
        ],
        [
          'a',
          true,
        ],
        [
          'a a a a',
          true,
        ],
      ]));
    });

    to('blob', async () => {
      const valueBrowsers = await evaluate(async (window: any) => {
        const values_: any = [
          window.AmauiUtils.to(window.AmauiUtils.to('', 'blob'), 'blob'),
          window.AmauiUtils.to(window.AmauiUtils.to('a', 'blob'), 'blob'),
          window.AmauiUtils.to(window.AmauiUtils.to('a a a a', 'blob'), 'blob'),
        ];

        for (const [index, value] of values_.entries()) values_[index] = [value && window.AmauiUtils.to(await value.text(), 'string'), value instanceof Blob];

        return values_;
      }, { browsers });
      const values = [...valueBrowsers];

      values.forEach(value => assert(value).eql([
        [
          '',
          true,
        ],
        [
          'a',
          true,
        ],
        [
          'a a a a',
          true,
        ],
      ]));
    });

  });

  group('buffer', async () => {

    to('browser', async () => {
      const valueBrowsers = await evaluate(async (window: any) => window.AmauiUtils.to('a', 'buffer'), { browsers });
      const values = [...valueBrowsers];

      values.forEach(value => assert(value).eq(undefined));
    });

    to('string', async () => {
      const values_ = [
        AmauiUtils.to('', 'buffer'),
        AmauiUtils.to('a', 'buffer'),
        AmauiUtils.to('a a a a', 'buffer'),
      ];

      const valueNode = values_.map((value: Buffer) => [AmauiUtils.to(value, 'string'), value instanceof Buffer, value.length]); const values = [valueNode];

      values.forEach(value => assert(value).eql([
        [
          '',
          true,
          0,
        ],
        [
          'a',
          true,
          1,
        ],
        [
          'a a a a',
          true,
          7,
        ],
      ]));
    });

    to('base64', async () => {
      const values_ = [
        AmauiUtils.to(AmauiUtils.to('', 'base64'), 'buffer'),
        AmauiUtils.to(AmauiUtils.to('a', 'base64'), 'buffer'),
        AmauiUtils.to(AmauiUtils.to('a a a a', 'base64'), 'buffer'),
      ];

      const valueNode = values_.map((value: Buffer) => [AmauiUtils.to(AmauiUtils.to(value, 'string'), 'string'), value instanceof Buffer, value.length]);
      const values = [valueNode];

      values.forEach(value => assert(value).eql([
        [
          '',
          true,
          0,
        ],
        [
          'a',
          true,
          1,
        ],
        [
          'a a a a',
          true,
          7,
        ],
      ]));
    });

    to('datauri', async () => {
      const values_ = [
        AmauiUtils.to(AmauiUtils.to('', 'datauri'), 'buffer'),
        AmauiUtils.to(AmauiUtils.to('a', 'datauri'), 'buffer'),
        AmauiUtils.to(AmauiUtils.to('a a a a', 'datauri'), 'buffer'),
      ];

      const valueNode = values_.map((value: Buffer) => [AmauiUtils.to(AmauiUtils.to(value, 'string'), 'string'), value instanceof Buffer, value.length]);
      const values = [valueNode];

      values.forEach(value => assert(value).eql([
        [
          '',
          true,
          0,
        ],
        [
          'a',
          true,
          1,
        ],
        [
          'a a a a',
          true,
          7,
        ],
      ]));
    });

    to('buffer', async () => {
      const values_ = [
        AmauiUtils.to(AmauiUtils.to('', 'buffer'), 'buffer'),
        AmauiUtils.to(AmauiUtils.to('a', 'buffer'), 'buffer'),
        AmauiUtils.to(AmauiUtils.to('a a a a', 'buffer'), 'buffer'),
      ];

      const valueNode = values_.map((value: Buffer) => [AmauiUtils.to(value, 'string'), value instanceof Buffer, value.length]); const values = [valueNode];

      values.forEach(value => assert(value).eql([
        [
          '',
          true,
          0,
        ],
        [
          'a',
          true,
          1,
        ],
        [
          'a a a a',
          true,
          7,
        ],
      ]));
    });

    to('other', async () => {
      const values_ = [
        AmauiUtils.to(4, 'buffer'),
        AmauiUtils.to(new Map(), 'buffer'),
        AmauiUtils.to(null, 'buffer'),
      ];

      const valueNode = values_.map((value: Buffer) => [AmauiUtils.to(value, 'string'), value instanceof Buffer, value.length]);
      const values = [valueNode];

      values.forEach(value => assert(value).eql([
        [
          '4',
          true,
          1,
        ],
        [
          '{}',
          true,
          2,
        ],
        [
          'null',
          true,
          4,
        ],
      ]));
    });

  });

  group('size', () => {

    to('string', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const values_ = [
          window.AmauiUtils.to(undefined, 'size'),
          window.AmauiUtils.to('a', 'size'),
          window.AmauiUtils.to('aaa', 'size'),
          window.AmauiUtils.to(`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at ultricies metus, sit amet imperdiet justo. Nunc gravida enim at turpis sagittis, ut posuere neque luctus. Curabitur faucibus ante sed leo malesuada, in molestie lorem fringilla. Nunc ex tellus, aliquet ut ultricies eu, dignissim id lectus. In nec ornare odio, nec gravida dolor. Cras accumsan accumsan cursus. Proin lobortis dui ligula, sed porttitor purus malesuada et. Proin a magna purus. Donec non eleifend diam.

Etiam ut congue est, et dictum sem. Nullam pharetra ex eget augue ornare, molestie consectetur augue mattis. Fusce vel eros id elit aliquam pulvinar. Mauris nec pharetra magna. Maecenas eu interdum lectus. Fusce elementum elit sit amet ligula fermentum, vel fermentum enim facilisis. Sed bibendum sed elit sed ullamcorper. Morbi in ultricies ipsum. Duis non libero nisl. Vestibulum posuere, dolor sed fermentum aliquet, ipsum risus tempor ligula, ac elementum nibh leo sit amet felis. Curabitur vel velit vel eros lobortis consectetur. Integer a placerat mi. Nam sodales imperdiet leo vel dapibus. Ut lacinia blandit ipsum, a rutrum metus pretium in.

Aenean maximus placerat metus, sed molestie sem porta vehicula. Praesent tristique urna vel sodales luctus. Morbi id accumsan tortor. Aenean augue dolor, bibendum et lectus eget, hendrerit convallis nibh. In non urna leo. Aliquam erat volutpat. Ut eu leo quis leo blandit ultricies. Vestibulum laoreet, elit ac dignissim pulvinar, lectus arcu lacinia quam, vel vulputate tellus nunc sit amet quam. Nulla quis ipsum vel quam feugiat viverra. Pellentesque tincidunt in mauris eget interdum. Quisque posuere odio dui, sit amet semper diam ultrices a. Quisque at ante nec dolor sollicitudin porttitor.

Nullam accumsan et elit vel mattis. Pellentesque finibus est et eros tincidunt, in porttitor sapien efficitur. Ut vel est enim. Maecenas posuere augue sed mauris volutpat, ut eleifend dui scelerisque. Nunc pulvinar vitae dui vel ullamcorper. Morbi metus lorem, ornare molestie vulputate sit amet, imperdiet at velit. Fusce quis sollicitudin magna. Phasellus eu pharetra ex, id ornare augue. Cras feugiat justo id eros mollis rhoncus eget sed sapien. Mauris sit amet iaculis lacus.`, 'size'),
        ];

        return values_;
      }, { browsers });

      const values_ = [
        AmauiUtils.to(undefined, 'size'),
        AmauiUtils.to('a', 'size'),
        AmauiUtils.to('aaa', 'size'),
        AmauiUtils.to(`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at ultricies metus, sit amet imperdiet justo. Nunc gravida enim at turpis sagittis, ut posuere neque luctus. Curabitur faucibus ante sed leo malesuada, in molestie lorem fringilla. Nunc ex tellus, aliquet ut ultricies eu, dignissim id lectus. In nec ornare odio, nec gravida dolor. Cras accumsan accumsan cursus. Proin lobortis dui ligula, sed porttitor purus malesuada et. Proin a magna purus. Donec non eleifend diam.

Etiam ut congue est, et dictum sem. Nullam pharetra ex eget augue ornare, molestie consectetur augue mattis. Fusce vel eros id elit aliquam pulvinar. Mauris nec pharetra magna. Maecenas eu interdum lectus. Fusce elementum elit sit amet ligula fermentum, vel fermentum enim facilisis. Sed bibendum sed elit sed ullamcorper. Morbi in ultricies ipsum. Duis non libero nisl. Vestibulum posuere, dolor sed fermentum aliquet, ipsum risus tempor ligula, ac elementum nibh leo sit amet felis. Curabitur vel velit vel eros lobortis consectetur. Integer a placerat mi. Nam sodales imperdiet leo vel dapibus. Ut lacinia blandit ipsum, a rutrum metus pretium in.

Aenean maximus placerat metus, sed molestie sem porta vehicula. Praesent tristique urna vel sodales luctus. Morbi id accumsan tortor. Aenean augue dolor, bibendum et lectus eget, hendrerit convallis nibh. In non urna leo. Aliquam erat volutpat. Ut eu leo quis leo blandit ultricies. Vestibulum laoreet, elit ac dignissim pulvinar, lectus arcu lacinia quam, vel vulputate tellus nunc sit amet quam. Nulla quis ipsum vel quam feugiat viverra. Pellentesque tincidunt in mauris eget interdum. Quisque posuere odio dui, sit amet semper diam ultrices a. Quisque at ante nec dolor sollicitudin porttitor.

Nullam accumsan et elit vel mattis. Pellentesque finibus est et eros tincidunt, in porttitor sapien efficitur. Ut vel est enim. Maecenas posuere augue sed mauris volutpat, ut eleifend dui scelerisque. Nunc pulvinar vitae dui vel ullamcorper. Morbi metus lorem, ornare molestie vulputate sit amet, imperdiet at velit. Fusce quis sollicitudin magna. Phasellus eu pharetra ex, id ornare augue. Cras feugiat justo id eros mollis rhoncus eget sed sapien. Mauris sit amet iaculis lacus.`, 'size'),
      ];

      const valueNode = values_;

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        undefined,
        "1 Bytes",
        "3 Bytes",
        "2.16 KB"
      ]));
    });

  });

  group('size-format', () => {

    to('string', async () => {
      const values_ = [
        AmauiUtils.to(undefined, 'size-format'),
        AmauiUtils.to('a', 'size-format'),
        AmauiUtils.to('1', 'size-format'),
        AmauiUtils.to('14', 'size-format'),
        AmauiUtils.to('140', 'size-format'),
        AmauiUtils.to('1404', 'size-format'),
        AmauiUtils.to('14040', 'size-format'),
        AmauiUtils.to('1404040', 'size-format'),
        AmauiUtils.to('140404040', 'size-format'),
        AmauiUtils.to('14040404040', 'size-format'),
        AmauiUtils.to('1404040404040', 'size-format'),
        AmauiUtils.to('140404040404040', 'size-format'),
        AmauiUtils.to('14040404040404040', 'size-format'),
        AmauiUtils.to('1404040404040404040', 'size-format'),
        AmauiUtils.to('140404040404040404040', 'size-format'),
        AmauiUtils.to('14040404040404040404040', 'size-format'),
        AmauiUtils.to('1404040404040404040404040', 'size-format'),
      ];

      const valueBrowsers = await evaluate((window: any) => {
        const values_ = [
          window.AmauiUtils.to(undefined, 'size-format'),
          window.AmauiUtils.to('a', 'size-format'),
          window.AmauiUtils.to('1', 'size-format'),
          window.AmauiUtils.to('14', 'size-format'),
          window.AmauiUtils.to('140', 'size-format'),
          window.AmauiUtils.to('1404', 'size-format'),
          window.AmauiUtils.to('14040', 'size-format'),
          window.AmauiUtils.to('1404040', 'size-format'),
          window.AmauiUtils.to('140404040', 'size-format'),
          window.AmauiUtils.to('14040404040', 'size-format'),
          window.AmauiUtils.to('1404040404040', 'size-format'),
          window.AmauiUtils.to('140404040404040', 'size-format'),
          window.AmauiUtils.to('14040404040404040', 'size-format'),
          window.AmauiUtils.to('1404040404040404040', 'size-format'),
          window.AmauiUtils.to('140404040404040404040', 'size-format'),
          window.AmauiUtils.to('14040404040404040404040', 'size-format'),
          window.AmauiUtils.to('1404040404040404040404040', 'size-format'),
        ];

        return values_;
      }, { browsers });
      const valueNode = values_;
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        undefined,
        '0 Bytes',
        '1 Bytes',
        '14 Bytes',
        '140 Bytes',
        '1.37 KB',
        '13.71 KB',
        '1.34 MB',
        '133.9 MB',
        '13.08 GB',
        '1.28 TB',
        '127.7 TB',
        '12.47 PB',
        '1.22 EB',
        '121.78 EB',
        '11.89 ZB',
        '1.16 YB'
      ]));
    });

    to('number', async () => {
      const values_ = [
        AmauiUtils.to(-1, 'size-format'),
        AmauiUtils.to(0, 'size-format'),
        AmauiUtils.to(1, 'size-format'),
        AmauiUtils.to(14, 'size-format'),
        AmauiUtils.to(140, 'size-format'),
        AmauiUtils.to(1404, 'size-format'),
        AmauiUtils.to(14040, 'size-format'),
        AmauiUtils.to(1404040, 'size-format'),
        AmauiUtils.to(140404040, 'size-format'),
        AmauiUtils.to(14040404040, 'size-format'),
        AmauiUtils.to(1404040404040, 'size-format'),
        AmauiUtils.to(140404040404040, 'size-format'),
        AmauiUtils.to(14040404040404040, 'size-format'),
        AmauiUtils.to(1404040404040404040, 'size-format'),
        AmauiUtils.to(140404040404040404040, 'size-format'),
        AmauiUtils.to(14040404040404040404040, 'size-format'),
        AmauiUtils.to(1404040404040404040404040, 'size-format'),
      ];

      const valueBrowsers = await evaluate((window: any) => {
        const values_ = [
          window.AmauiUtils.to(-1, 'size-format'),
          window.AmauiUtils.to(0, 'size-format'),
          window.AmauiUtils.to(1, 'size-format'),
          window.AmauiUtils.to(14, 'size-format'),
          window.AmauiUtils.to(140, 'size-format'),
          window.AmauiUtils.to(1404, 'size-format'),
          window.AmauiUtils.to(14040, 'size-format'),
          window.AmauiUtils.to(1404040, 'size-format'),
          window.AmauiUtils.to(140404040, 'size-format'),
          window.AmauiUtils.to(14040404040, 'size-format'),
          window.AmauiUtils.to(1404040404040, 'size-format'),
          window.AmauiUtils.to(140404040404040, 'size-format'),
          window.AmauiUtils.to(14040404040404040, 'size-format'),
          window.AmauiUtils.to(1404040404040404040, 'size-format'),
          window.AmauiUtils.to(140404040404040404040, 'size-format'),
          window.AmauiUtils.to(14040404040404040404040, 'size-format'),
          window.AmauiUtils.to(1404040404040404040404040, 'size-format'),
        ];

        return values_;
      }, { browsers });
      const valueNode = values_;
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        '0 Bytes',
        '0 Bytes',
        '1 Bytes',
        '14 Bytes',
        '140 Bytes',
        '1.37 KB',
        '13.71 KB',
        '1.34 MB',
        '133.9 MB',
        '13.08 GB',
        '1.28 TB',
        '127.7 TB',
        '12.47 PB',
        '1.22 EB',
        '121.78 EB',
        '11.89 ZB',
        '1.16 YB'
      ]));
    });

  });

  group('byte-size', () => {

    to('string', async () => {
      const values_ = [
        AmauiUtils.to('', 'byte-size'),
        AmauiUtils.to('a', 'byte-size'),
        AmauiUtils.to(`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis efficitur neque non rhoncus pellentesque. Nam magna nisl, dignissim non mollis eget, faucibus eget diam. Vivamus pharetra nec orci sed laoreet. Nulla consectetur tortor non rhoncus ultricies. Aliquam semper gravida lacus a iaculis. Quisque volutpat facilisis velit, vel place mi empor vita. Curabitur id gravida mi, vitae rerit dui. Aliquam ut molestie nisi, ut molestie lectus.`, 'byte-size'),
      ];

      const valueBrowsers = await evaluate((window: any) => {
        const values_ = [
          window.AmauiUtils.to('', 'byte-size'),
          window.AmauiUtils.to('a', 'byte-size'),
          window.AmauiUtils.to(`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis efficitur neque non rhoncus pellentesque. Nam magna nisl, dignissim non mollis eget, faucibus eget diam. Vivamus pharetra nec orci sed laoreet. Nulla consectetur tortor non rhoncus ultricies. Aliquam semper gravida lacus a iaculis. Quisque volutpat facilisis velit, vel place mi empor vita. Curabitur id gravida mi, vitae rerit dui. Aliquam ut molestie nisi, ut molestie lectus.`, 'byte-size'),
        ];

        return values_;
      }, { browsers });
      const valueNode = values_;
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        0,
        1,
        440,
      ]));
    });

    to('buffer', async () => {
      const values_ = [
        AmauiUtils.to(Buffer.from([]), 'byte-size'),
        AmauiUtils.to(Buffer.from([1, 4, 1]), 'byte-size'),
        AmauiUtils.to(Buffer.from([1, 4]), 'byte-size'),
      ];

      const valueNode = values_;
      const values = [valueNode];

      values.forEach(value => assert(value).eql([
        0,
        3,
        2,
      ]));
    });

    to('typed array', async () => {
      const values_ = [
        AmauiUtils.to(new Uint8Array(), 'byte-size'),
        AmauiUtils.to(new Uint8Array([1, 4, 1]), 'byte-size'),
        AmauiUtils.to(new Uint16Array([1, 4]), 'byte-size'),
      ];

      const valueBrowsers = await evaluate((window: any) => {
        const values_ = [
          window.AmauiUtils.to(new Uint8Array(), 'byte-size'),
          window.AmauiUtils.to(new Uint8Array([1, 4, 1]), 'byte-size'),
          window.AmauiUtils.to(new Uint16Array([1, 4]), 'byte-size'),
        ];

        return values_;
      }, { browsers });
      const valueNode = values_;
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        0,
        3,
        4,
      ]));
    });

  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate(async (window: any) => {
      window.AmauiUtils.polyfills();

      return [
        ('a' as any).to('string'),
        (4 as any).to('string'),
        (true as any).to('string'),
      ];
    }, { browsers });

    AmauiUtils.polyfills();

    const valueNode = [
      ('a' as any).to('string'),
      (4 as any).to('string'),
      (true as any).to('string'),
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'a',
      '4',
      'true',
    ]));
  });

});
