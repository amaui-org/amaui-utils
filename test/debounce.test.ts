/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';
import { spy } from 'sinon';

import { evaluate, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/debounce', () => {

  post(() => reset());

  to('debounce', async () => {
    const valueBrowsers = await evaluate(async (window: any) => {
      const method = window.sinon.spy();
      const debounceMethod = window.AmauiUtils.debounce(method);

      for (const _ of new Array(4)) {
        for (const __ of new Array(14)) debounceMethod('a');

        await window.AmauiUtils.wait(170);
      }

      return [method.callCount, method.args];
    });

    const method = spy();
    const debounceMethod = AmauiUtils.debounce(method);

    for (const _ of new Array(4)) {
      for (const __ of new Array(14)) debounceMethod('a');

      await AmauiUtils.wait(170);
    }

    const valueNode = [method.callCount, method.args];
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      4,
      [['a'], ['a'], ['a'], ['a']],
    ]));
  });

  to('clear', async () => {
    const valueBrowsers = await evaluate(async (window: any) => {
      const method = window.sinon.spy();
      const debounceMethod = window.AmauiUtils.debounce(method);

      debounceMethod('a');

      debounceMethod.clear();

      await window.AmauiUtils.wait(170);

      return [method.callCount, method.args];
    });

    const method = spy();
    const debounceMethod = AmauiUtils.debounce(method);

    debounceMethod('a');

    debounceMethod.clear();

    await AmauiUtils.wait(170);

    const valueNode = [method.callCount, method.args];
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      0,
      [],
    ]));
  });

});
