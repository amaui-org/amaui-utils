/* tslint:disable: no-shadowed-variable */
import path from 'path';

import { assert } from '@onesy/test';
import OnesyNode from '@onesy/node';

import { evaluate, reset, utils } from '../utils/js/test/utils';

import * as OnesyUtils from '../src';

group('@onesy/utils/hashFile', () => {
  const filePath = path.resolve(__dirname, '../LICENSE');
  let value_: any;

  pre(async () => {
    for (const [index, name] of Object.keys(utils.browsers).entries()) {
      const browser = utils.browsers[name];

      // Note that Promise.all prevents a race condition
      // between clicking and waiting for the file chooser.
      const [_, fileChooser] = await Promise.all([
        // Add the input element
        evaluate((window: any) => {
          const input = window.document.createElement('input');

          input.type = 'file';
          input.id = 'a';

          if (!window.document.getElementById('a')) window.document.body.appendChild(input);
        }, { browsers: { [name]: browser } }),
        // It is important to call waitForEvent before click to set up waiting.
        browser.page.waitForEvent('filechooser'),
        // Opens the file chooser.
        browser.page.locator('#a').click(),
      ]);

      await fileChooser.setFiles(filePath);
    }
  });

  post(() => reset());

  to('hashFile', async () => {
    const valueBrowsers = await evaluate(async (window: any) => {
      const input = window.document.getElementById('a') as HTMLInputElement;
      const file = input.files[0];

      return [
        await window.OnesyUtils.hashFile(file),
      ];
    });
    const valueNode = [
      await OnesyUtils.hashFile(await OnesyNode.file.get(filePath, false)),
    ];
    const values = [...valueBrowsers];

    // For polyfill addition assertion
    value_ = valueNode;

    values.forEach(value => assert(value).eql(valueNode));

    assert(OnesyUtils.isValid('hash', valueNode[0])).eq(true);
  });

  group('options', () => {

    to('withPrefix', async () => {
      const valueBrowsers = await evaluate(async (window: any) => {
        const input = window.document.getElementById('a') as HTMLInputElement;
        const file = input.files[0];

        return [
          await window.OnesyUtils.hashFile(file, { withPrefix: true }),
          await window.OnesyUtils.hashFile(file, { withPrefix: false }),
        ];
      });

      const file = await OnesyNode.file.get(filePath, false);

      const valueNode = [
        await OnesyUtils.hashFile(file, { withPrefix: true }),
        await OnesyUtils.hashFile(file, { withPrefix: false }),
      ];
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql(valueNode));

      assert(valueNode[0].length).eq(66);
      assert(valueNode[1].length).eq(64);
    });

  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate(async (window: any) => {
      window.OnesyUtils.polyfills();

      const input = window.document.getElementById('a') as HTMLInputElement;
      const file = input.files[0];

      return [
        await (file as any).hash(),
      ];
    });

    const values = [...valueBrowsers];

    values.forEach(value => assert(value).eql(value_));
  });

});
