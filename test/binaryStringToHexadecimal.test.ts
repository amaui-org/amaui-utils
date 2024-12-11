/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as OnesyUtils from '../src';

group('@onesy/utils/binaryStringToHexadecimal', () => {

  post(() => reset());

  to('binaryStringToHexadecimal', async () => {
    const values_ = [
      OnesyUtils.binaryStringToHexadecimal(''),
      OnesyUtils.binaryStringToHexadecimal(undefined),
      OnesyUtils.binaryStringToHexadecimal(new Array() as any),
      OnesyUtils.binaryStringToHexadecimal('1010'),
      OnesyUtils.binaryStringToHexadecimal('10100100010011'),
      OnesyUtils.binaryStringToHexadecimal('1010010001001010101110101010010101010111010101001010101011101010011101000100'),
      OnesyUtils.binaryStringToHexadecimal('0'),
      OnesyUtils.binaryStringToHexadecimal('00'),
      OnesyUtils.binaryStringToHexadecimal('000'),
      OnesyUtils.binaryStringToHexadecimal('0000'),
      OnesyUtils.binaryStringToHexadecimal('00000'),
      OnesyUtils.binaryStringToHexadecimal('000000'),
      OnesyUtils.binaryStringToHexadecimal('0000000'),
      OnesyUtils.binaryStringToHexadecimal('1'),
      OnesyUtils.binaryStringToHexadecimal('01'),
      OnesyUtils.binaryStringToHexadecimal('001'),
      OnesyUtils.binaryStringToHexadecimal('0001'),
      OnesyUtils.binaryStringToHexadecimal('00001'),
      OnesyUtils.binaryStringToHexadecimal('000001'),
      OnesyUtils.binaryStringToHexadecimal('0000001'),
      OnesyUtils.binaryStringToHexadecimal('00000001'),
      OnesyUtils.binaryStringToHexadecimal('10'),
      OnesyUtils.binaryStringToHexadecimal('101'),
      OnesyUtils.binaryStringToHexadecimal('1001'),
      OnesyUtils.binaryStringToHexadecimal('10001'),
      OnesyUtils.binaryStringToHexadecimal('100001'),
      OnesyUtils.binaryStringToHexadecimal('1000001'),
      OnesyUtils.binaryStringToHexadecimal('10000001'),
      OnesyUtils.binaryStringToHexadecimal('100000001'),
      OnesyUtils.binaryStringToHexadecimal('1000000001'),
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        window.OnesyUtils.binaryStringToHexadecimal(''),
        window.OnesyUtils.binaryStringToHexadecimal(undefined),
        window.OnesyUtils.binaryStringToHexadecimal(new Array() as any),
        window.OnesyUtils.binaryStringToHexadecimal('1010'),
        window.OnesyUtils.binaryStringToHexadecimal('10100100010011'),
        window.OnesyUtils.binaryStringToHexadecimal('1010010001001010101110101010010101010111010101001010101011101010011101000100'),
        window.OnesyUtils.binaryStringToHexadecimal('0'),
        window.OnesyUtils.binaryStringToHexadecimal('00'),
        window.OnesyUtils.binaryStringToHexadecimal('000'),
        window.OnesyUtils.binaryStringToHexadecimal('0000'),
        window.OnesyUtils.binaryStringToHexadecimal('00000'),
        window.OnesyUtils.binaryStringToHexadecimal('000000'),
        window.OnesyUtils.binaryStringToHexadecimal('0000000'),
        window.OnesyUtils.binaryStringToHexadecimal('1'),
        window.OnesyUtils.binaryStringToHexadecimal('01'),
        window.OnesyUtils.binaryStringToHexadecimal('001'),
        window.OnesyUtils.binaryStringToHexadecimal('0001'),
        window.OnesyUtils.binaryStringToHexadecimal('00001'),
        window.OnesyUtils.binaryStringToHexadecimal('000001'),
        window.OnesyUtils.binaryStringToHexadecimal('0000001'),
        window.OnesyUtils.binaryStringToHexadecimal('00000001'),
        window.OnesyUtils.binaryStringToHexadecimal('10'),
        window.OnesyUtils.binaryStringToHexadecimal('101'),
        window.OnesyUtils.binaryStringToHexadecimal('1001'),
        window.OnesyUtils.binaryStringToHexadecimal('10001'),
        window.OnesyUtils.binaryStringToHexadecimal('100001'),
        window.OnesyUtils.binaryStringToHexadecimal('1000001'),
        window.OnesyUtils.binaryStringToHexadecimal('10000001'),
        window.OnesyUtils.binaryStringToHexadecimal('100000001'),
        window.OnesyUtils.binaryStringToHexadecimal('1000000001'),
      ];

      return values_;
    });
    const valueNode = values_;
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      '',
      undefined,
      undefined,
      '00a',
      '02a443',
      '00a44abaa55754aaea744',
      '020',
      '1200',
      '13000',
      '000',
      '0200',
      '12000',
      '130000',
      '021',
      '1201',
      '13001',
      '001',
      '0201',
      '12001',
      '130001',
      '0001',
      '022',
      '025',
      '009',
      '0281',
      '12801',
      '138001',
      '0081',
      '02801',
      '128001'
    ]));
  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.OnesyUtils.polyfills();

      return [
        ('10100100010011' as any).binaryStringToHexadecimal(),
      ];
    });

    OnesyUtils.polyfills();

    const valueNode = [
      ('10100100010011' as any).binaryStringToHexadecimal(),
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      '02a443',
    ]));
  });

});
