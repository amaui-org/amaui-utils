/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as OnesyUtils from '../src';

group('@onesy/utils/percentageFromValueWithinRange', () => {

  post(() => reset());

  to('percentageFromValueWithinRange', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        [140, -114, 214, 0, 100]
      ].map(item => window.OnesyUtils.percentageFromValueWithinRange(...item));

      return values_;
    });

    const valueNode = [
      [140, -114, 214, 0, 100]
    ].map((item: [number, number, number, number]) => OnesyUtils.percentageFromValueWithinRange(...item));

    const values = [...valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      77.4390243902439
    ]));
  });

});
