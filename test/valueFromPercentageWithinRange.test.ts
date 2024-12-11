/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as OnesyUtils from '../src';

group('@onesy/utils/valueFromPercentageWithinRange', () => {

  post(() => reset());

  to('valueFromPercentageWithinRange', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        [70, -140, 742, 0, 100]
      ].map(item => window.OnesyUtils.valueFromPercentageWithinRange(...item));

      return values_;
    });

    const valueNode = [
      [70, -140, 742, 0, 100]
    ].map((item: [number, number, number, number]) => OnesyUtils.valueFromPercentageWithinRange(...item));

    const values = [...valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      477.4
    ]));
  });

});
