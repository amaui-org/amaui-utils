/* tslint:disable: no-shadowed-variable */
import path from 'path';

import { assert } from '@amaui/test';
import AmauiNode from '@amaui/node';

import { startBrowsers, IBrowsers, evaluate, closeBrowsers, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/hashFile', () => {
  let browsers: IBrowsers;
  const filePath = path.resolve(__dirname, '../LICENSE');
  let value_: any;

  pre(async () => {
    browsers = await startBrowsers();

    for (const [index, name] of Object.keys(browsers).entries()) {
      const browser = browsers[name];

      // Note that Promise.all prevents a race condition
      // between clicking and waiting for the file chooser.
      const [_, fileChooser] = await Promise.all([
        // Add the input element
        evaluate((window: any) => {
          const input = window.document.createElement('input');

          input.type = 'file';
          input.id = 'a';

          window.document.body.appendChild(input);
        }, { browsers: { [name]: browser } }),
        // It is important to call waitForEvent before click to set up waiting.
        browser.page.waitForEvent('filechooser'),
        // Opens the file chooser.
        browser.page.locator('#a').click(),
      ]);

      await fileChooser.setFiles(filePath);
    }
  });

  post(async () => {
    await closeBrowsers(browsers);

    reset();
  });

  to('hashFile', async () => {
    const valueBrowsers = await evaluate(async (window: any) => {
      const input = window.document.getElementById('a') as HTMLInputElement;
      const file = input.files[0];

      return [
        await window.AmauiUtils.hashFile(file),
      ];
    }, { browsers });
    const valueNode = [
      await AmauiUtils.hashFile(await AmauiNode.file.get(filePath, false)),
    ];
    const values = [...valueBrowsers];

    // For polyfill addition assertion
    value_ = valueNode;

    values.forEach(value => assert(value).eql(valueNode));

    assert(AmauiUtils.isValid('hash', valueNode[0])).eq(true);
  });

  group('options', () => {

    to('withPrefix', async () => {
      const valueBrowsers = await evaluate(async (window: any) => {
        const input = window.document.getElementById('a') as HTMLInputElement;
        const file = input.files[0];

        return [
          await window.AmauiUtils.hashFile(file, { withPrefix: true }),
          await window.AmauiUtils.hashFile(file, { withPrefix: false }),
        ];
      }, { browsers });

      const file = await AmauiNode.file.get(filePath, false);

      const valueNode = [
        await AmauiUtils.hashFile(file, { withPrefix: true }),
        await AmauiUtils.hashFile(file, { withPrefix: false }),
      ];
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql(valueNode));

      assert(valueNode[0].length).eq(66);
      assert(valueNode[1].length).eq(64);
    });

  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate(async (window: any) => {
      window.AmauiUtils.polyfills();

      const input = window.document.getElementById('a') as HTMLInputElement;
      const file = input.files[0];

      return [
        await (file as any).hash(),
      ];
    }, { browsers });

    const values = [...valueBrowsers];

    values.forEach(value => assert(value).eql(value_));
  });

});
