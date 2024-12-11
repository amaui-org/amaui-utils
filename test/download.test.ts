/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';
import OnesyNode from '@onesy/node';

import { evaluate, reset, utils } from '../utils/js/test/utils';

import * as OnesyUtils from '../src';

group('@onesy/utils/download', () => {

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
        OnesyUtils.download('a.txt', args[1], 'text/plain');
      }, { browsers: { chromium: utils.browsers['chromium'] }, arguments: ['chromium'] }),
    ]);

    // Wait for the download process to complete
    const path = await download.path();

    assert(await OnesyNode.file.get(path)).eq('chromium');

    await OnesyNode.file.remove(path);
  });

});
