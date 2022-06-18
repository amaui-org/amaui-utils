/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { evaluate, reset } from '../utils/js/test/utils';

group('@amaui/utils/getUserLocalInfo', () => {

  post(() => reset());

  to('getUserLocalInfo', async () => {
    const valueBrowsers = await evaluate(async (window: any) => await window.AmauiUtils.getUserLocalInfo(),);
    const values = [...valueBrowsers];

    values.forEach((browser: any) => {
      assert(browser.ip_address).to.be.a('string');
      assert(browser.os.platform).to.be.a('string');
      assert(Object.keys(browser.country)).eql(['flag', 'name', 'full_name', 'sovereignty', 'alpha-2', 'alpha-3', 'numeric', 'subdivision', 'tlds']);

      delete browser.ip_address;
      delete browser.os;
      delete browser.country;
    });

    assert(values[0]).eql({
      browser: {
        name: 'chrome',
        version: '98.0.4695.0',
        major_version: '98',
        agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/98.0.4695.0 Safari/537.36',
        language: 'en-US'
      },
    });

    assert(values[1]).eql({
      browser: {
        name: 'firefox',
        version: '94.0',
        major_version: '94',
        agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0',
        language: 'en-US'
      },
    });

    assert(values[2]).eql({
      browser: {
        name: 'safari',
        version: '605.1.15',
        major_version: '605',
        agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Safari/605.1.15',
        language: 'en-GB'
      },
    });
  });

});
