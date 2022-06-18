/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';
import AmauiNode from '@amaui/node';

import { evaluate, reset, utils } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/download', () => {

  post(() => reset());

  to('download', async () => {
    // Only testing in chromium, as
    // Firefox and Webkit have a popup for manual save file
    // on programatic automatic download made
    const [download] = await Promise.all([
      // Start waiting for the download
      utils.browsers.chromium.page.waitForEvent('download'),

      // Perform the action that initiates download
      evaluate((args: any) => {
        AmauiUtils.download('a.txt', args[1], 'text/plain');
      }, { browsers: { chromium: utils.browsers['chromium'] }, arguments: ['chromium'] }),
    ]);

    // Wait for the download process to complete
    const path = await download.path();

    assert(await AmauiNode.file.get(path)).eq('chromium');

    await AmauiNode.file.remove(path);
  });

});
