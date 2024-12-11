/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as OnesyUtils from '../src';

group('@onesy/utils/hexadecimalStringToBinary', () => {

  post(() => reset());

  to('hexadecimalStringToBinary', async () => {
    const values_ = [
      OnesyUtils.hexadecimalStringToBinary(''),
      OnesyUtils.hexadecimalStringToBinary(undefined),
      OnesyUtils.hexadecimalStringToBinary(new Array() as any),
      OnesyUtils.hexadecimalStringToBinary('00a'),
      OnesyUtils.hexadecimalStringToBinary('02a443'),
      OnesyUtils.hexadecimalStringToBinary('00a44abaa55754aaea744'),
      OnesyUtils.hexadecimalStringToBinary('020'),
      OnesyUtils.hexadecimalStringToBinary('1200'),
      OnesyUtils.hexadecimalStringToBinary('13000'),
      OnesyUtils.hexadecimalStringToBinary('000'),
      OnesyUtils.hexadecimalStringToBinary('0200'),
      OnesyUtils.hexadecimalStringToBinary('12000'),
      OnesyUtils.hexadecimalStringToBinary('130000'),
      OnesyUtils.hexadecimalStringToBinary('021'),
      OnesyUtils.hexadecimalStringToBinary('1201'),
      OnesyUtils.hexadecimalStringToBinary('13001'),
      OnesyUtils.hexadecimalStringToBinary('001'),
      OnesyUtils.hexadecimalStringToBinary('0201'),
      OnesyUtils.hexadecimalStringToBinary('12001'),
      OnesyUtils.hexadecimalStringToBinary('130001'),
      OnesyUtils.hexadecimalStringToBinary('0001'),
      OnesyUtils.hexadecimalStringToBinary('022'),
      OnesyUtils.hexadecimalStringToBinary('025'),
      OnesyUtils.hexadecimalStringToBinary('009'),
      OnesyUtils.hexadecimalStringToBinary('0281'),
      OnesyUtils.hexadecimalStringToBinary('12801'),
      OnesyUtils.hexadecimalStringToBinary('138001'),
      OnesyUtils.hexadecimalStringToBinary('0081'),
      OnesyUtils.hexadecimalStringToBinary('02801'),
      OnesyUtils.hexadecimalStringToBinary('128001'),
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        window.OnesyUtils.hexadecimalStringToBinary(''),
        window.OnesyUtils.hexadecimalStringToBinary(undefined),
        window.OnesyUtils.hexadecimalStringToBinary(new Array() as any),
        window.OnesyUtils.hexadecimalStringToBinary('00a'),
        window.OnesyUtils.hexadecimalStringToBinary('02a443'),
        window.OnesyUtils.hexadecimalStringToBinary('00a44abaa55754aaea744'),
        window.OnesyUtils.hexadecimalStringToBinary('020'),
        window.OnesyUtils.hexadecimalStringToBinary('1200'),
        window.OnesyUtils.hexadecimalStringToBinary('13000'),
        window.OnesyUtils.hexadecimalStringToBinary('000'),
        window.OnesyUtils.hexadecimalStringToBinary('0200'),
        window.OnesyUtils.hexadecimalStringToBinary('12000'),
        window.OnesyUtils.hexadecimalStringToBinary('130000'),
        window.OnesyUtils.hexadecimalStringToBinary('021'),
        window.OnesyUtils.hexadecimalStringToBinary('1201'),
        window.OnesyUtils.hexadecimalStringToBinary('13001'),
        window.OnesyUtils.hexadecimalStringToBinary('001'),
        window.OnesyUtils.hexadecimalStringToBinary('0201'),
        window.OnesyUtils.hexadecimalStringToBinary('12001'),
        window.OnesyUtils.hexadecimalStringToBinary('130001'),
        window.OnesyUtils.hexadecimalStringToBinary('0001'),
        window.OnesyUtils.hexadecimalStringToBinary('022'),
        window.OnesyUtils.hexadecimalStringToBinary('025'),
        window.OnesyUtils.hexadecimalStringToBinary('009'),
        window.OnesyUtils.hexadecimalStringToBinary('0281'),
        window.OnesyUtils.hexadecimalStringToBinary('12801'),
        window.OnesyUtils.hexadecimalStringToBinary('138001'),
        window.OnesyUtils.hexadecimalStringToBinary('0081'),
        window.OnesyUtils.hexadecimalStringToBinary('02801'),
        window.OnesyUtils.hexadecimalStringToBinary('128001'),
      ];

      return values_;
    });
    const valueNode = values_;
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      '',
      undefined,
      undefined,
      '1010',
      '10100100010011',
      '1010010001001010101110101010010101010111010101001010101011101010011101000100',
      '0',
      '00',
      '000',
      '0000',
      '00000',
      '000000',
      '0000000',
      '1',
      '01',
      '001',
      '0001',
      '00001',
      '000001',
      '0000001',
      '00000001',
      '10',
      '101',
      '1001',
      '10001',
      '100001',
      '1000001',
      '10000001',
      '100000001',
      '1000000001'
    ]));
  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.OnesyUtils.polyfills();

      return [
        ('02a443' as any).hexadecimalStringToBinary(),
      ];
    });

    OnesyUtils.polyfills();

    const valueNode = [
      ('02a443' as any).hexadecimalStringToBinary(),
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      '10100100010011',
    ]));
  });

});
