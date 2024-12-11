/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as OnesyUtils from '../src';

group('@onesy/utils/to', () => {

  post(() => reset());

  group('string', async () => {

    to('arraybuffer', async () => {
      const values_ = [
        OnesyUtils.to('', 'arraybuffer'),
        OnesyUtils.to('a', 'arraybuffer'),
        OnesyUtils.to('a a a a', 'arraybuffer'),
      ];

      const valueBrowsers = await evaluate((window: any) => {
        const values_ = [
          window.OnesyUtils.to('', 'arraybuffer'),
          window.OnesyUtils.to('a', 'arraybuffer'),
          window.OnesyUtils.to('a a a a', 'arraybuffer'),
        ];

        return values_.map((value: ArrayBuffer) => [window.OnesyUtils.to(value, 'string'), value instanceof ArrayBuffer]);
      });
      const valueNode = values_.map((value: ArrayBuffer) => [OnesyUtils.to(value, 'string'), value instanceof ArrayBuffer]);
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
        OnesyUtils.to(OnesyUtils.to('', 'base64'), 'string'),
        OnesyUtils.to(OnesyUtils.to('a', 'base64'), 'string'),
        OnesyUtils.to(OnesyUtils.to('a a a a', 'base64'), 'string'),
        OnesyUtils.to('/pMAC+dOnX8daPKS+UVibVE7rifssjoAC5Eo25UeRS4ADcYWifd/kpYyisTahf7PuXFoqK1BWDdOqJ3XE/bx5zCW7ObcaoncjhB7v+FaFby3LDdOfC0V9r9YUnK7Mksl8cVb3PR5LS0ACxWoK1+RorPoOHKVr9YUnK73Pduqt3kg508uJjUS4Kvybla0STdpJvyA53gbLI0cx2Mqlu+3gbQax5JVnkXB8Cr3PRyHAAGy0akr7EqC0KzJLJfObcaon7GPyDOwtE7rR+Tr4lQX26czwjWlYWicKnGF4N0+5+YoPBwACp6tfkaKwtE/aondcTrlYVMAAxxUahfwNun3PbdWg5DKS+v1V2MAC9crAAqYGZJZL+53SKyyvclFnYGD6YrP6VJfbl7wmntItZK3gtYAByK/INQV7ncjAAvCccVG5LpXUAA=', 'string'),
      ];

      const valueBrowsers = await evaluate((window: any) => {
        const values_ = [
          window.OnesyUtils.to(window.OnesyUtils.to('', 'base64'), 'string'),
          window.OnesyUtils.to(window.OnesyUtils.to('a', 'base64'), 'string'),
          window.OnesyUtils.to(window.OnesyUtils.to('a a a a', 'base64'), 'string'),
          window.OnesyUtils.to('/pMAC+dOnX8daPKS+UVibVE7rifssjoAC5Eo25UeRS4ADcYWifd/kpYyisTahf7PuXFoqK1BWDdOqJ3XE/bx5zCW7ObcaoncjhB7v+FaFby3LDdOfC0V9r9YUnK7Mksl8cVb3PR5LS0ACxWoK1+RorPoOHKVr9YUnK73Pduqt3kg508uJjUS4Kvybla0STdpJvyA53gbLI0cx2Mqlu+3gbQax5JVnkXB8Cr3PRyHAAGy0akr7EqC0KzJLJfObcaon7GPyDOwtE7rR+Tr4lQX26czwjWlYWicKnGF4N0+5+YoPBwACp6tfkaKwtE/aondcTrlYVMAAxxUahfwNun3PbdWg5DKS+v1V2MAC9crAAqYGZJZL+53SKyyvclFnYGD6YrP6VJfbl7wmntItZK3gtYAByK/INQV7ncjAAvCccVG5LpXUAA=', 'string'),
        ];

        return values_;
      });
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
        OnesyUtils.to(OnesyUtils.to('', 'datauri'), 'string'),
        OnesyUtils.to(OnesyUtils.to('a', 'datauri'), 'string'),
        OnesyUtils.to(OnesyUtils.to('a a a a', 'datauri'), 'string'),
      ];

      const valueBrowsers = await evaluate((window: any) => {
        const values_ = [
          window.OnesyUtils.to(window.OnesyUtils.to('', 'datauri'), 'string'),
          window.OnesyUtils.to(window.OnesyUtils.to('a', 'datauri'), 'string'),
          window.OnesyUtils.to(window.OnesyUtils.to('a a a a', 'datauri'), 'string'),
        ];

        return values_;
      });
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

        return values_.map(value => OnesyUtils.to(value, 'string'));
      });
      const valueNode = values_.map(value => OnesyUtils.to(value, 'string'));
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        '',
        'a',
        'a a a a',
      ]));
    });

    to('other', async () => {
      const values_ = [
        OnesyUtils.to('a', 'string'),
        OnesyUtils.to(4, 'string'),
        OnesyUtils.to(true, 'string'),
        OnesyUtils.to(undefined, 'string'),
        OnesyUtils.to(new Map(), 'string'),
        OnesyUtils.to(function a() { }, 'string'),
        OnesyUtils.to(null, 'string'),
      ];

      const valueBrowsers = await evaluate((window: any) => {
        const values_ = [
          window.OnesyUtils.to('a', 'string'),
          window.OnesyUtils.to(4, 'string'),
          window.OnesyUtils.to(true, 'string'),
          window.OnesyUtils.to(undefined, 'string'),
          window.OnesyUtils.to(new Map(), 'string'),
          window.OnesyUtils.to(function a() { }, 'string'),
          window.OnesyUtils.to(null, 'string'),
        ];

        return values_;
      });
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
        OnesyUtils.to('', 'arraybuffer'),
        OnesyUtils.to('a', 'arraybuffer'),
        OnesyUtils.to('a a a a', 'arraybuffer'),
      ];

      const valueBrowsers = await evaluate((window: any) => {
        const values_ = [
          window.OnesyUtils.to('', 'arraybuffer'),
          window.OnesyUtils.to('a', 'arraybuffer'),
          window.OnesyUtils.to('a a a a', 'arraybuffer'),
        ];

        return values_.map((value: ArrayBuffer) => [window.OnesyUtils.to(value, 'string'), value instanceof ArrayBuffer, value.byteLength]);
      });
      const valueNode = values_.map((value: ArrayBuffer) => [OnesyUtils.to(value, 'string'), value instanceof ArrayBuffer, value.byteLength]);
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
        OnesyUtils.to(OnesyUtils.to('', 'base64'), 'arraybuffer'),
        OnesyUtils.to(OnesyUtils.to('a', 'base64'), 'arraybuffer'),
        OnesyUtils.to(OnesyUtils.to('a a a a', 'base64'), 'arraybuffer'),
      ];

      const valueBrowsers = await evaluate((window: any) => {
        const values_ = [
          window.OnesyUtils.to(window.OnesyUtils.to('', 'base64'), 'arraybuffer'),
          window.OnesyUtils.to(window.OnesyUtils.to('a', 'base64'), 'arraybuffer'),
          window.OnesyUtils.to(window.OnesyUtils.to('a a a a', 'base64'), 'arraybuffer'),
        ];

        return values_.map((value: ArrayBuffer) => [window.OnesyUtils.to(window.OnesyUtils.to(value, 'string'), 'string'), value instanceof ArrayBuffer]);
      });
      const valueNode = values_.map((value: ArrayBuffer) => [OnesyUtils.to(OnesyUtils.to(value, 'string'), 'string'), value instanceof ArrayBuffer]);
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
        OnesyUtils.to(OnesyUtils.to('', 'datauri'), 'arraybuffer'),
        OnesyUtils.to(OnesyUtils.to('a', 'datauri'), 'arraybuffer'),
        OnesyUtils.to(OnesyUtils.to('a a a a', 'datauri'), 'arraybuffer'),
      ];

      const valueBrowsers = await evaluate((window: any) => {
        const values_ = [
          window.OnesyUtils.to(window.OnesyUtils.to('', 'datauri'), 'arraybuffer'),
          window.OnesyUtils.to(window.OnesyUtils.to('a', 'datauri'), 'arraybuffer'),
          window.OnesyUtils.to(window.OnesyUtils.to('a a a a', 'datauri'), 'arraybuffer'),
        ];

        return values_.map((value: ArrayBuffer) => [window.OnesyUtils.to(window.OnesyUtils.to(value, 'string'), 'string'), value instanceof ArrayBuffer]);
      });
      const valueNode = values_.map((value: ArrayBuffer) => [OnesyUtils.to(OnesyUtils.to(value, 'string'), 'string'), value instanceof ArrayBuffer]);
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
        OnesyUtils.to(OnesyUtils.to('', 'buffer'), 'arraybuffer'),
        OnesyUtils.to(OnesyUtils.to('a', 'buffer'), 'arraybuffer'),
        OnesyUtils.to(OnesyUtils.to('a a a a', 'buffer'), 'arraybuffer'),
      ];

      const valueNode = values_.map((value: ArrayBuffer) => [OnesyUtils.to(value, 'string'), value instanceof ArrayBuffer, value.byteLength]);
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
        OnesyUtils.to(OnesyUtils.to('', 'arraybuffer'), 'arraybuffer'),
        OnesyUtils.to(OnesyUtils.to('a', 'arraybuffer'), 'arraybuffer'),
        OnesyUtils.to(OnesyUtils.to('a a a a', 'arraybuffer'), 'arraybuffer'),
      ];

      const valueBrowsers = await evaluate((window: any) => {
        const values_ = [
          window.OnesyUtils.to(window.OnesyUtils.to('', 'arraybuffer'), 'arraybuffer'),
          window.OnesyUtils.to(window.OnesyUtils.to('a', 'arraybuffer'), 'arraybuffer'),
          window.OnesyUtils.to(window.OnesyUtils.to('a a a a', 'arraybuffer'), 'arraybuffer'),
        ];

        return values_.map((value: ArrayBuffer) => [window.OnesyUtils.to(value, 'string'), value instanceof ArrayBuffer]);
      });
      const valueNode = values_.map((value: ArrayBuffer) => [OnesyUtils.to(value, 'string'), value instanceof ArrayBuffer]);
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
        OnesyUtils.to('', 'base64'),
        OnesyUtils.to('a', 'base64'),
        OnesyUtils.to('a a a a', 'base64'),
      ];

      const valueBrowsers = await evaluate((window: any) => {
        const values_ = [
          window.OnesyUtils.to('', 'base64'),
          window.OnesyUtils.to('a', 'base64'),
          window.OnesyUtils.to('a a a a', 'base64'),
        ];

        return values_.map((value: ArrayBuffer) => [window.OnesyUtils.to(value, 'string'), window.OnesyUtils.isValid('base64', value)]);
      });
      const valueNode = values_.map((value: ArrayBuffer) => [OnesyUtils.to(value, 'string'), OnesyUtils.isValid('base64', value)]);
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
        OnesyUtils.to(OnesyUtils.to('', 'base64'), 'base64'),
        OnesyUtils.to(OnesyUtils.to('a', 'base64'), 'base64'),
        OnesyUtils.to(OnesyUtils.to('a a a a', 'base64'), 'base64'),
      ];

      const valueBrowsers = await evaluate((window: any) => {
        const values_ = [
          window.OnesyUtils.to(window.OnesyUtils.to('', 'base64'), 'base64'),
          window.OnesyUtils.to(window.OnesyUtils.to('a', 'base64'), 'base64'),
          window.OnesyUtils.to(window.OnesyUtils.to('a a a a', 'base64'), 'base64'),
        ];

        return values_.map((value: ArrayBuffer) => [window.OnesyUtils.to(value, 'string'), window.OnesyUtils.isValid('base64', value)]);
      });
      const valueNode = values_.map((value: ArrayBuffer) => [OnesyUtils.to(value, 'string'), OnesyUtils.isValid('base64', value)]);
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
        OnesyUtils.to('', 'datauri'),
        OnesyUtils.to('a', 'datauri'),
        OnesyUtils.to('a a a a', 'datauri'),
      ];

      const valueBrowsers = await evaluate((window: any) => {
        const values_ = [
          window.OnesyUtils.to('', 'datauri'),
          window.OnesyUtils.to('a', 'datauri'),
          window.OnesyUtils.to('a a a a', 'datauri'),
        ];

        return values_.map((value: ArrayBuffer) => [window.OnesyUtils.to(value, 'string'), window.OnesyUtils.isValid('datauri', value)]);
      });
      const valueNode = values_.map((value: ArrayBuffer) => [OnesyUtils.to(value, 'string'), OnesyUtils.isValid('datauri', value)]);
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
        OnesyUtils.to(OnesyUtils.to('', 'datauri'), 'datauri'),
        OnesyUtils.to(OnesyUtils.to('a', 'datauri'), 'datauri'),
        OnesyUtils.to(OnesyUtils.to('a a a a', 'datauri'), 'datauri'),
      ];

      const valueBrowsers = await evaluate((window: any) => {
        const values_ = [
          window.OnesyUtils.to(window.OnesyUtils.to('', 'datauri'), 'datauri'),
          window.OnesyUtils.to(window.OnesyUtils.to('a', 'datauri'), 'datauri'),
          window.OnesyUtils.to(window.OnesyUtils.to('a a a a', 'datauri'), 'datauri'),
        ];

        return values_.map((value: ArrayBuffer) => [window.OnesyUtils.to(value, 'string'), window.OnesyUtils.isValid('datauri', value)]);
      });
      const valueNode = values_.map((value: ArrayBuffer) => [OnesyUtils.to(value, 'string'), OnesyUtils.isValid('datauri', value)]);
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
      assert(OnesyUtils.to('a', 'blob')).eq(undefined);
    });

    to('base64', async () => {
      const valueBrowsers = await evaluate(async (window: any) => {
        const values_: any = [
          window.OnesyUtils.to(window.OnesyUtils.to('', 'base64'), 'blob'),
          window.OnesyUtils.to(window.OnesyUtils.to('a', 'base64'), 'blob'),
          window.OnesyUtils.to(window.OnesyUtils.to('a a a a', 'base64'), 'blob'),
        ];

        for (const [index, value] of values_.entries()) values_[index] = [value && window.OnesyUtils.to(await value.arrayBuffer(), 'string'), value instanceof Blob];

        return values_;
      });
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
          window.OnesyUtils.to(window.OnesyUtils.to('', 'datauri'), 'blob'),
          window.OnesyUtils.to(window.OnesyUtils.to('a', 'datauri'), 'blob'),
          window.OnesyUtils.to(window.OnesyUtils.to('a a a a', 'datauri'), 'blob'),
        ];

        for (const [index, value] of values_.entries()) values_[index] = [window.OnesyUtils.to(await value.arrayBuffer(), 'string'), value instanceof Blob];

        return values_;
      });
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
          window.OnesyUtils.to('', 'blob'),
          window.OnesyUtils.to('a', 'blob'),
          window.OnesyUtils.to('a a a a', 'blob'),
        ];

        for (const [index, value] of values_.entries()) values_[index] = [value && window.OnesyUtils.to(await value.text(), 'string'), value instanceof Blob];

        return values_;
      });
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
          window.OnesyUtils.to(window.OnesyUtils.to('', 'blob'), 'blob'),
          window.OnesyUtils.to(window.OnesyUtils.to('a', 'blob'), 'blob'),
          window.OnesyUtils.to(window.OnesyUtils.to('a a a a', 'blob'), 'blob'),
        ];

        for (const [index, value] of values_.entries()) values_[index] = [value && window.OnesyUtils.to(await value.text(), 'string'), value instanceof Blob];

        return values_;
      });
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
      const valueBrowsers = await evaluate(async (window: any) => window.OnesyUtils.to('a', 'buffer'),);
      const values = [...valueBrowsers];

      values.forEach(value => assert(value).eq(undefined));
    });

    to('string', async () => {
      const values_ = [
        OnesyUtils.to('', 'buffer'),
        OnesyUtils.to('a', 'buffer'),
        OnesyUtils.to('a a a a', 'buffer'),
      ];

      const valueNode = values_.map((value: Buffer) => [OnesyUtils.to(value, 'string'), value instanceof Buffer, value.length]); const values = [valueNode];

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
        OnesyUtils.to(OnesyUtils.to('', 'base64'), 'buffer'),
        OnesyUtils.to(OnesyUtils.to('a', 'base64'), 'buffer'),
        OnesyUtils.to(OnesyUtils.to('a a a a', 'base64'), 'buffer'),
      ];

      const valueNode = values_.map((value: Buffer) => [OnesyUtils.to(OnesyUtils.to(value, 'string'), 'string'), value instanceof Buffer, value.length]);
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
        OnesyUtils.to(OnesyUtils.to('', 'datauri'), 'buffer'),
        OnesyUtils.to(OnesyUtils.to('a', 'datauri'), 'buffer'),
        OnesyUtils.to(OnesyUtils.to('a a a a', 'datauri'), 'buffer'),
      ];

      const valueNode = values_.map((value: Buffer) => [OnesyUtils.to(OnesyUtils.to(value, 'string'), 'string'), value instanceof Buffer, value.length]);
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
        OnesyUtils.to(OnesyUtils.to('', 'buffer'), 'buffer'),
        OnesyUtils.to(OnesyUtils.to('a', 'buffer'), 'buffer'),
        OnesyUtils.to(OnesyUtils.to('a a a a', 'buffer'), 'buffer'),
      ];

      const valueNode = values_.map((value: Buffer) => [OnesyUtils.to(value, 'string'), value instanceof Buffer, value.length]); const values = [valueNode];

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
        OnesyUtils.to(4, 'buffer'),
        OnesyUtils.to(new Map(), 'buffer'),
        OnesyUtils.to(null, 'buffer'),
      ];

      const valueNode = values_.map((value: Buffer) => [OnesyUtils.to(value, 'string'), value instanceof Buffer, value.length]);
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
          window.OnesyUtils.to(undefined, 'size'),
          window.OnesyUtils.to('a', 'size'),
          window.OnesyUtils.to('aaa', 'size'),
          window.OnesyUtils.to(`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at ultricies metus, sit amet imperdiet justo. Nunc gravida enim at turpis sagittis, ut posuere neque luctus. Curabitur faucibus ante sed leo malesuada, in molestie lorem fringilla. Nunc ex tellus, aliquet ut ultricies eu, dignissim id lectus. In nec ornare odio, nec gravida dolor. Cras accumsan accumsan cursus. Proin lobortis dui ligula, sed porttitor purus malesuada et. Proin a magna purus. Donec non eleifend diam.

Etiam ut congue est, et dictum sem. Nullam pharetra ex eget augue ornare, molestie consectetur augue mattis. Fusce vel eros id elit aliquam pulvinar. Mauris nec pharetra magna. Maecenas eu interdum lectus. Fusce elementum elit sit amet ligula fermentum, vel fermentum enim facilisis. Sed bibendum sed elit sed ullamcorper. Morbi in ultricies ipsum. Duis non libero nisl. Vestibulum posuere, dolor sed fermentum aliquet, ipsum risus tempor ligula, ac elementum nibh leo sit amet felis. Curabitur vel velit vel eros lobortis consectetur. Integer a placerat mi. Nam sodales imperdiet leo vel dapibus. Ut lacinia blandit ipsum, a rutrum metus pretium in.

Aenean maximus placerat metus, sed molestie sem porta vehicula. Praesent tristique urna vel sodales luctus. Morbi id accumsan tortor. Aenean augue dolor, bibendum et lectus eget, hendrerit convallis nibh. In non urna leo. Aliquam erat volutpat. Ut eu leo quis leo blandit ultricies. Vestibulum laoreet, elit ac dignissim pulvinar, lectus arcu lacinia quam, vel vulputate tellus nunc sit amet quam. Nulla quis ipsum vel quam feugiat viverra. Pellentesque tincidunt in mauris eget interdum. Quisque posuere odio dui, sit amet semper diam ultrices a. Quisque at ante nec dolor sollicitudin porttitor.

Nullam accumsan et elit vel mattis. Pellentesque finibus est et eros tincidunt, in porttitor sapien efficitur. Ut vel est enim. Maecenas posuere augue sed mauris volutpat, ut eleifend dui scelerisque. Nunc pulvinar vitae dui vel ullamcorper. Morbi metus lorem, ornare molestie vulputate sit amet, imperdiet at velit. Fusce quis sollicitudin magna. Phasellus eu pharetra ex, id ornare augue. Cras feugiat justo id eros mollis rhoncus eget sed sapien. Mauris sit amet iaculis lacus.`, 'size'),
        ];

        return values_;
      });

      const values_ = [
        OnesyUtils.to(undefined, 'size'),
        OnesyUtils.to('a', 'size'),
        OnesyUtils.to('aaa', 'size'),
        OnesyUtils.to(`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at ultricies metus, sit amet imperdiet justo. Nunc gravida enim at turpis sagittis, ut posuere neque luctus. Curabitur faucibus ante sed leo malesuada, in molestie lorem fringilla. Nunc ex tellus, aliquet ut ultricies eu, dignissim id lectus. In nec ornare odio, nec gravida dolor. Cras accumsan accumsan cursus. Proin lobortis dui ligula, sed porttitor purus malesuada et. Proin a magna purus. Donec non eleifend diam.

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
        OnesyUtils.to(undefined, 'size-format'),
        OnesyUtils.to('a', 'size-format'),
        OnesyUtils.to('1', 'size-format'),
        OnesyUtils.to('14', 'size-format'),
        OnesyUtils.to('140', 'size-format'),
        OnesyUtils.to('1404', 'size-format'),
        OnesyUtils.to('14040', 'size-format'),
        OnesyUtils.to('1404040', 'size-format'),
        OnesyUtils.to('140404040', 'size-format'),
        OnesyUtils.to('14040404040', 'size-format'),
        OnesyUtils.to('1404040404040', 'size-format'),
        OnesyUtils.to('140404040404040', 'size-format'),
        OnesyUtils.to('14040404040404040', 'size-format'),
        OnesyUtils.to('1404040404040404040', 'size-format'),
        OnesyUtils.to('140404040404040404040', 'size-format'),
        OnesyUtils.to('14040404040404040404040', 'size-format'),
        OnesyUtils.to('1404040404040404040404040', 'size-format'),
      ];

      const valueBrowsers = await evaluate((window: any) => {
        const values_ = [
          window.OnesyUtils.to(undefined, 'size-format'),
          window.OnesyUtils.to('a', 'size-format'),
          window.OnesyUtils.to('1', 'size-format'),
          window.OnesyUtils.to('14', 'size-format'),
          window.OnesyUtils.to('140', 'size-format'),
          window.OnesyUtils.to('1404', 'size-format'),
          window.OnesyUtils.to('14040', 'size-format'),
          window.OnesyUtils.to('1404040', 'size-format'),
          window.OnesyUtils.to('140404040', 'size-format'),
          window.OnesyUtils.to('14040404040', 'size-format'),
          window.OnesyUtils.to('1404040404040', 'size-format'),
          window.OnesyUtils.to('140404040404040', 'size-format'),
          window.OnesyUtils.to('14040404040404040', 'size-format'),
          window.OnesyUtils.to('1404040404040404040', 'size-format'),
          window.OnesyUtils.to('140404040404040404040', 'size-format'),
          window.OnesyUtils.to('14040404040404040404040', 'size-format'),
          window.OnesyUtils.to('1404040404040404040404040', 'size-format'),
        ];

        return values_;
      });
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
        OnesyUtils.to(-1, 'size-format'),
        OnesyUtils.to(0, 'size-format'),
        OnesyUtils.to(1, 'size-format'),
        OnesyUtils.to(14, 'size-format'),
        OnesyUtils.to(140, 'size-format'),
        OnesyUtils.to(1404, 'size-format'),
        OnesyUtils.to(14040, 'size-format'),
        OnesyUtils.to(1404040, 'size-format'),
        OnesyUtils.to(140404040, 'size-format'),
        OnesyUtils.to(14040404040, 'size-format'),
        OnesyUtils.to(1404040404040, 'size-format'),
        OnesyUtils.to(140404040404040, 'size-format'),
        OnesyUtils.to(14040404040404040, 'size-format'),
        OnesyUtils.to(1404040404040404040, 'size-format'),
        OnesyUtils.to(140404040404040404040, 'size-format'),
        OnesyUtils.to(14040404040404040404040, 'size-format'),
        OnesyUtils.to(1404040404040404040404040, 'size-format'),
      ];

      const valueBrowsers = await evaluate((window: any) => {
        const values_ = [
          window.OnesyUtils.to(-1, 'size-format'),
          window.OnesyUtils.to(0, 'size-format'),
          window.OnesyUtils.to(1, 'size-format'),
          window.OnesyUtils.to(14, 'size-format'),
          window.OnesyUtils.to(140, 'size-format'),
          window.OnesyUtils.to(1404, 'size-format'),
          window.OnesyUtils.to(14040, 'size-format'),
          window.OnesyUtils.to(1404040, 'size-format'),
          window.OnesyUtils.to(140404040, 'size-format'),
          window.OnesyUtils.to(14040404040, 'size-format'),
          window.OnesyUtils.to(1404040404040, 'size-format'),
          window.OnesyUtils.to(140404040404040, 'size-format'),
          window.OnesyUtils.to(14040404040404040, 'size-format'),
          window.OnesyUtils.to(1404040404040404040, 'size-format'),
          window.OnesyUtils.to(140404040404040404040, 'size-format'),
          window.OnesyUtils.to(14040404040404040404040, 'size-format'),
          window.OnesyUtils.to(1404040404040404040404040, 'size-format'),
        ];

        return values_;
      });
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
        OnesyUtils.to('', 'byte-size'),
        OnesyUtils.to('a', 'byte-size'),
        OnesyUtils.to(`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis efficitur neque non rhoncus pellentesque. Nam magna nisl, dignissim non mollis eget, faucibus eget diam. Vivamus pharetra nec orci sed laoreet. Nulla consectetur tortor non rhoncus ultricies. Aliquam semper gravida lacus a iaculis. Quisque volutpat facilisis velit, vel place mi empor vita. Curabitur id gravida mi, vitae rerit dui. Aliquam ut molestie nisi, ut molestie lectus.`, 'byte-size'),
      ];

      const valueBrowsers = await evaluate((window: any) => {
        const values_ = [
          window.OnesyUtils.to('', 'byte-size'),
          window.OnesyUtils.to('a', 'byte-size'),
          window.OnesyUtils.to(`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis efficitur neque non rhoncus pellentesque. Nam magna nisl, dignissim non mollis eget, faucibus eget diam. Vivamus pharetra nec orci sed laoreet. Nulla consectetur tortor non rhoncus ultricies. Aliquam semper gravida lacus a iaculis. Quisque volutpat facilisis velit, vel place mi empor vita. Curabitur id gravida mi, vitae rerit dui. Aliquam ut molestie nisi, ut molestie lectus.`, 'byte-size'),
        ];

        return values_;
      });
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
        OnesyUtils.to(Buffer.from([]), 'byte-size'),
        OnesyUtils.to(Buffer.from([1, 4, 1]), 'byte-size'),
        OnesyUtils.to(Buffer.from([1, 4]), 'byte-size'),
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
        OnesyUtils.to(new Uint8Array(), 'byte-size'),
        OnesyUtils.to(new Uint8Array([1, 4, 1]), 'byte-size'),
        OnesyUtils.to(new Uint16Array([1, 4]), 'byte-size'),
      ];

      const valueBrowsers = await evaluate((window: any) => {
        const values_ = [
          window.OnesyUtils.to(new Uint8Array(), 'byte-size'),
          window.OnesyUtils.to(new Uint8Array([1, 4, 1]), 'byte-size'),
          window.OnesyUtils.to(new Uint16Array([1, 4]), 'byte-size'),
        ];

        return values_;
      });
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
      window.OnesyUtils.polyfills();

      return [
        ('a' as any).to('string'),
        (4 as any).to('string'),
        (true as any).to('string'),
      ];
    });

    OnesyUtils.polyfills();

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
