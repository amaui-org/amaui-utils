/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';
import OnesyNode from '@onesy/node';
import path from 'path';

import { evaluate, reset, utils } from '../utils/js/test/utils';

import * as OnesyUtils from '../src';

group('@onesy/utils/fileToValue', () => {

  post(() => reset());

  to('fileToValue', async () => {
    for (const name of Object.keys(utils.browsers)) {
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

      const filePath = path.resolve(__dirname, '../size-snapshot.json');

      await fileChooser.setFiles(filePath);

      const valueBrowser = await evaluate(async (window: any) => {
        const input = window.document.getElementById('a') as HTMLInputElement;
        const file = input.files[0];

        const values = [
          await window.OnesyUtils.fileToValue(file, 'text'),
          (await window.OnesyUtils.fileToValue(file, 'binary') as string).length,
          (await window.OnesyUtils.fileToValue(file, 'array-buffer') as ArrayBuffer).byteLength,
          await window.OnesyUtils.fileToValue(file, 'datauri'),
        ];

        return values;
      }, { browsers: { [name]: browser } });

      const fileValue = await OnesyNode.file.get(filePath) as string;

      assert(valueBrowser[0]).eql([
        fileValue,
        fileValue.length,
        fileValue.length,
        OnesyUtils.to(fileValue, 'datauri', { mime: 'application/json' }),
      ]);
    }
  });

  to('with polyfills additions', async () => {
    const filePath = path.resolve(__dirname, '../size-snapshot.json');

    const valueBrowsers = await evaluate(async (window: any) => {
      window.OnesyUtils.polyfills();

      const input = window.document.getElementById('a') as HTMLInputElement;
      const file = input.files[0];

      return await (file as any).toValue('text');
    });

    OnesyUtils.polyfills();

    const values = [...valueBrowsers];

    const fileValue = await OnesyNode.file.get(filePath) as string;

    values.forEach(value => assert(value === fileValue).eq(true));
  });

});
