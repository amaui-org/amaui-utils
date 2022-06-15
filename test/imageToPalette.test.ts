/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { startBrowsers, IBrowsers, evaluate, closeBrowsers } from '../utils/js/test/utils';

group('@amaui/utils/imageToPalette', () => {
  let browsers: IBrowsers;

  pre(async () => browsers = await startBrowsers());

  post(async () => await closeBrowsers(browsers));

  to('imageToPalette', async () => {
    // Browser
    const valueBrowsers = await evaluate(async (window: any) => {
      return await window.AmauiUtils.imageToPalette('/utils/images/image.jpg');
    }, { browsers });

    const values = [...valueBrowsers];

    assert(values[0]).eql([
      'rgb(204, 165, 44)',
      'rgb(187, 217, 240)',
      'rgb(83, 121, 135)',
      'rgb(117, 185, 233)'
    ]);

    assert(values[1]).eql([
      'rgb(207, 168, 49)',
      'rgb(186, 217, 242)',
      'rgb(82, 118, 129)',
      'rgb(116, 185, 233)'
    ]);

    assert(values[2]).eql([
      'rgb(205, 166, 45)',
      'rgb(187, 217, 241)',
      'rgb(83, 121, 134)',
      'rgb(118, 185, 233)'
    ]);
  });

  group('options', () => {

    to('amount', async () => {
      // Browser
      const valueBrowsers = await evaluate(async (window: any) => {
        return await window.AmauiUtils.imageToPalette('/utils/images/image.jpg', { amount: 14 });
      }, { browsers });

      const values = [...valueBrowsers];

      assert(values[0]).eql([
        'rgb(191, 154, 61)',
        'rgb(227, 183, 66)',
        'rgb(180, 147, 21)',
        'rgb(213, 171, 23)',
        'rgb(188, 220, 245)',
        'rgb(207, 231, 248)',
        'rgb(174, 201, 223)',
        'rgb(178, 213, 240)',
        'rgb(42, 160, 223)',
        'rgb(106, 166, 211)',
        'rgb(66, 62, 55)',
        'rgb(121, 99, 58)',
        'rgb(126, 187, 233)',
        'rgb(141, 194, 235)'
      ]);

      assert(values[1]).eql([
        'rgb(196, 159, 72)',
        'rgb(238, 195, 86)',
        'rgb(179, 145, 17)',
        'rgb(217, 174, 22)',
        'rgb(200, 223, 241)',
        'rgb(205, 231, 249)',
        'rgb(164, 202, 234)',
        'rgb(177, 214, 242)',
        'rgb(42, 157, 218)',
        'rgb(105, 164, 209)',
        'rgb(61, 55, 46)',
        'rgb(121, 98, 45)',
        'rgb(126, 187, 233)',
        'rgb(141, 194, 235)'
      ]);

      assert(values[2]).eql([
        'rgb(193, 156, 62)',
        'rgb(231, 187, 71)',
        'rgb(179, 147, 22)',
        'rgb(214, 172, 23)',
        'rgb(188, 221, 245)',
        'rgb(208, 231, 248)',
        'rgb(174, 202, 224)',
        'rgb(181, 214, 241)',
        'rgb(43, 160, 223)',
        'rgb(102, 166, 213)',
        'rgb(64, 60, 53)',
        'rgb(121, 99, 57)',
        'rgb(127, 187, 234)',
        'rgb(142, 194, 235)'
      ]);
    });

    to('size', async () => {
      // Browser
      const valueBrowsers = await evaluate(async (window: any) => {
        return await window.AmauiUtils.imageToPalette('/utils/images/image.jpg', { size: 14 });
      }, { browsers });

      const values = [...valueBrowsers];

      assert(values[0]).eql([
        'rgb(96, 176, 229)',
        'rgb(174, 211, 240)',
        'rgb(182, 148, 37)',
        'rgb(135, 148, 142)'
      ]);

      assert(values[1]).eql([
        'rgb(113, 184, 233)',
        'rgb(188, 219, 243)',
        'rgb(145, 116, 26)',
        'rgb(131, 155, 144)'
      ]);

      assert(values[2]).eql([
        'rgb(114, 184, 233)',
        'rgb(188, 219, 243)',
        'rgb(162, 131, 33)',
        'rgb(118, 144, 141)'
      ]);
    });

    to('allowCrossOrigin', async () => {
      // Browser
      const valueBrowsers = await evaluate(async (window: any) => {
        return await window.AmauiUtils.imageToPalette('https://i.imgur.com/SHo6Fub.jpg', { allowCrossOrigin: true });
      }, { browsers });

      const values = [...valueBrowsers];

      assert(values[0]).eql([
        'rgb(154, 169, 196)',
        'rgb(186, 206, 220)',
        'rgb(28, 40, 79)',
        'rgb(74, 113, 167)'
      ]);

      assert(values[1]).eql([
        'rgb(154, 171, 199)',
        'rgb(192, 209, 223)',
        'rgb(27, 38, 76)',
        'rgb(74, 113, 169)'
      ]);

      assert(values[2]).eql([
        'rgb(155, 170, 198)',
        'rgb(188, 207, 221)',
        'rgb(29, 41, 78)',
        'rgb(74, 113, 168)'
      ]);
    });

  });

});
