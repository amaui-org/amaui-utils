/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as OnesyUtils from '../src';

group('@onesy/utils/rgbToHslPure', () => {

  post(() => reset());

  to('rgbToHslPure', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        [174, 214, 224]
      ].map(item => window.OnesyUtils.rgbToHslPure(...item));

      return values_;
    });

    const valueNode = [
      [174, 214, 224]
    ].map((item: [number, number, number]) => OnesyUtils.rgbToHslPure(...item));

    const values = [...valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      [192, 45, 78]
    ]));
  });

});
