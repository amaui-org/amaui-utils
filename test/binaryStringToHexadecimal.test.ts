/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { startBrowsers, IBrowsers, evaluate, closeBrowsers, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/binaryStringToHexadecimal', () => {
  let browsers: IBrowsers;

  pre(async () => browsers = await startBrowsers());

  post(async () => {
    await closeBrowsers(browsers);

    reset();
  });

  to('binaryStringToHexadecimal', async () => {
    const values_ = [
      AmauiUtils.binaryStringToHexadecimal(''),
      AmauiUtils.binaryStringToHexadecimal(undefined),
      AmauiUtils.binaryStringToHexadecimal(new Array() as any),
      AmauiUtils.binaryStringToHexadecimal('1010'),
      AmauiUtils.binaryStringToHexadecimal('10100100010011'),
      AmauiUtils.binaryStringToHexadecimal('1010010001001010101110101010010101010111010101001010101011101010011101000100'),
      AmauiUtils.binaryStringToHexadecimal('0'),
      AmauiUtils.binaryStringToHexadecimal('00'),
      AmauiUtils.binaryStringToHexadecimal('000'),
      AmauiUtils.binaryStringToHexadecimal('0000'),
      AmauiUtils.binaryStringToHexadecimal('00000'),
      AmauiUtils.binaryStringToHexadecimal('000000'),
      AmauiUtils.binaryStringToHexadecimal('0000000'),
      AmauiUtils.binaryStringToHexadecimal('1'),
      AmauiUtils.binaryStringToHexadecimal('01'),
      AmauiUtils.binaryStringToHexadecimal('001'),
      AmauiUtils.binaryStringToHexadecimal('0001'),
      AmauiUtils.binaryStringToHexadecimal('00001'),
      AmauiUtils.binaryStringToHexadecimal('000001'),
      AmauiUtils.binaryStringToHexadecimal('0000001'),
      AmauiUtils.binaryStringToHexadecimal('00000001'),
      AmauiUtils.binaryStringToHexadecimal('10'),
      AmauiUtils.binaryStringToHexadecimal('101'),
      AmauiUtils.binaryStringToHexadecimal('1001'),
      AmauiUtils.binaryStringToHexadecimal('10001'),
      AmauiUtils.binaryStringToHexadecimal('100001'),
      AmauiUtils.binaryStringToHexadecimal('1000001'),
      AmauiUtils.binaryStringToHexadecimal('10000001'),
      AmauiUtils.binaryStringToHexadecimal('100000001'),
      AmauiUtils.binaryStringToHexadecimal('1000000001'),
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        window.AmauiUtils.binaryStringToHexadecimal(''),
        window.AmauiUtils.binaryStringToHexadecimal(undefined),
        window.AmauiUtils.binaryStringToHexadecimal(new Array() as any),
        window.AmauiUtils.binaryStringToHexadecimal('1010'),
        window.AmauiUtils.binaryStringToHexadecimal('10100100010011'),
        window.AmauiUtils.binaryStringToHexadecimal('1010010001001010101110101010010101010111010101001010101011101010011101000100'),
        window.AmauiUtils.binaryStringToHexadecimal('0'),
        window.AmauiUtils.binaryStringToHexadecimal('00'),
        window.AmauiUtils.binaryStringToHexadecimal('000'),
        window.AmauiUtils.binaryStringToHexadecimal('0000'),
        window.AmauiUtils.binaryStringToHexadecimal('00000'),
        window.AmauiUtils.binaryStringToHexadecimal('000000'),
        window.AmauiUtils.binaryStringToHexadecimal('0000000'),
        window.AmauiUtils.binaryStringToHexadecimal('1'),
        window.AmauiUtils.binaryStringToHexadecimal('01'),
        window.AmauiUtils.binaryStringToHexadecimal('001'),
        window.AmauiUtils.binaryStringToHexadecimal('0001'),
        window.AmauiUtils.binaryStringToHexadecimal('00001'),
        window.AmauiUtils.binaryStringToHexadecimal('000001'),
        window.AmauiUtils.binaryStringToHexadecimal('0000001'),
        window.AmauiUtils.binaryStringToHexadecimal('00000001'),
        window.AmauiUtils.binaryStringToHexadecimal('10'),
        window.AmauiUtils.binaryStringToHexadecimal('101'),
        window.AmauiUtils.binaryStringToHexadecimal('1001'),
        window.AmauiUtils.binaryStringToHexadecimal('10001'),
        window.AmauiUtils.binaryStringToHexadecimal('100001'),
        window.AmauiUtils.binaryStringToHexadecimal('1000001'),
        window.AmauiUtils.binaryStringToHexadecimal('10000001'),
        window.AmauiUtils.binaryStringToHexadecimal('100000001'),
        window.AmauiUtils.binaryStringToHexadecimal('1000000001'),
      ];

      return values_;
    }, { browsers });
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
      window.AmauiUtils.polyfills();

      return [
        ('10100100010011' as any).binaryStringToHexadecimal(),
      ];
    }, { browsers });

    AmauiUtils.polyfills();

    const valueNode = [
      ('10100100010011' as any).binaryStringToHexadecimal(),
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      '02a443',
    ]));
  });

});
