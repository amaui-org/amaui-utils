/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as OnesyUtils from '../src';

group('@onesy/utils/hslToRgbPure', () => {

  post(() => reset());

  to('hslToRgbPure', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        [192, 45, 78]
      ].map(item => window.OnesyUtils.hslToRgbPure(...item));

      return values_;
    });

    const valueNode = [
      [192, 45, 78]
    ].map((item: [number, number, number]) => OnesyUtils.hslToRgbPure(...item));

    const values = [...valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      [174, 214, 224]
    ]));
  });

});
