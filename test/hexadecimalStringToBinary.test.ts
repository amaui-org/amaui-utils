/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { startBrowsers, IBrowsers, evaluate, closeBrowsers, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/hexadecimalStringToBinary', () => {
  let browsers: IBrowsers;

  pre(async () => browsers = await startBrowsers());

  post(async () => {
    await closeBrowsers(browsers);

    reset();
  });

  to('hexadecimalStringToBinary', async () => {
    const values_ = [
      AmauiUtils.hexadecimalStringToBinary(''),
      AmauiUtils.hexadecimalStringToBinary(undefined),
      AmauiUtils.hexadecimalStringToBinary(new Array() as any),
      AmauiUtils.hexadecimalStringToBinary('00a'),
      AmauiUtils.hexadecimalStringToBinary('02a443'),
      AmauiUtils.hexadecimalStringToBinary('00a44abaa55754aaea744'),
      AmauiUtils.hexadecimalStringToBinary('020'),
      AmauiUtils.hexadecimalStringToBinary('1200'),
      AmauiUtils.hexadecimalStringToBinary('13000'),
      AmauiUtils.hexadecimalStringToBinary('000'),
      AmauiUtils.hexadecimalStringToBinary('0200'),
      AmauiUtils.hexadecimalStringToBinary('12000'),
      AmauiUtils.hexadecimalStringToBinary('130000'),
      AmauiUtils.hexadecimalStringToBinary('021'),
      AmauiUtils.hexadecimalStringToBinary('1201'),
      AmauiUtils.hexadecimalStringToBinary('13001'),
      AmauiUtils.hexadecimalStringToBinary('001'),
      AmauiUtils.hexadecimalStringToBinary('0201'),
      AmauiUtils.hexadecimalStringToBinary('12001'),
      AmauiUtils.hexadecimalStringToBinary('130001'),
      AmauiUtils.hexadecimalStringToBinary('0001'),
      AmauiUtils.hexadecimalStringToBinary('022'),
      AmauiUtils.hexadecimalStringToBinary('025'),
      AmauiUtils.hexadecimalStringToBinary('009'),
      AmauiUtils.hexadecimalStringToBinary('0281'),
      AmauiUtils.hexadecimalStringToBinary('12801'),
      AmauiUtils.hexadecimalStringToBinary('138001'),
      AmauiUtils.hexadecimalStringToBinary('0081'),
      AmauiUtils.hexadecimalStringToBinary('02801'),
      AmauiUtils.hexadecimalStringToBinary('128001'),
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        window.AmauiUtils.hexadecimalStringToBinary(''),
        window.AmauiUtils.hexadecimalStringToBinary(undefined),
        window.AmauiUtils.hexadecimalStringToBinary(new Array() as any),
        window.AmauiUtils.hexadecimalStringToBinary('00a'),
        window.AmauiUtils.hexadecimalStringToBinary('02a443'),
        window.AmauiUtils.hexadecimalStringToBinary('00a44abaa55754aaea744'),
        window.AmauiUtils.hexadecimalStringToBinary('020'),
        window.AmauiUtils.hexadecimalStringToBinary('1200'),
        window.AmauiUtils.hexadecimalStringToBinary('13000'),
        window.AmauiUtils.hexadecimalStringToBinary('000'),
        window.AmauiUtils.hexadecimalStringToBinary('0200'),
        window.AmauiUtils.hexadecimalStringToBinary('12000'),
        window.AmauiUtils.hexadecimalStringToBinary('130000'),
        window.AmauiUtils.hexadecimalStringToBinary('021'),
        window.AmauiUtils.hexadecimalStringToBinary('1201'),
        window.AmauiUtils.hexadecimalStringToBinary('13001'),
        window.AmauiUtils.hexadecimalStringToBinary('001'),
        window.AmauiUtils.hexadecimalStringToBinary('0201'),
        window.AmauiUtils.hexadecimalStringToBinary('12001'),
        window.AmauiUtils.hexadecimalStringToBinary('130001'),
        window.AmauiUtils.hexadecimalStringToBinary('0001'),
        window.AmauiUtils.hexadecimalStringToBinary('022'),
        window.AmauiUtils.hexadecimalStringToBinary('025'),
        window.AmauiUtils.hexadecimalStringToBinary('009'),
        window.AmauiUtils.hexadecimalStringToBinary('0281'),
        window.AmauiUtils.hexadecimalStringToBinary('12801'),
        window.AmauiUtils.hexadecimalStringToBinary('138001'),
        window.AmauiUtils.hexadecimalStringToBinary('0081'),
        window.AmauiUtils.hexadecimalStringToBinary('02801'),
        window.AmauiUtils.hexadecimalStringToBinary('128001'),
      ];

      return values_;
    }, { browsers });
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
      window.AmauiUtils.polyfills();

      return [
        ('02a443' as any).hexadecimalStringToBinary(),
      ];
    }, { browsers });

    AmauiUtils.polyfills();

    const valueNode = [
      ('02a443' as any).hexadecimalStringToBinary(),
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      '10100100010011',
    ]));
  });

});
