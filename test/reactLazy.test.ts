/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { evaluate, reset } from '../utils/js/test/utils';

group('@amaui/utils/reactLazy', () => {

  post(() => reset());

  to('reactLazy', async () => {
    const valueBrowsers = await evaluate(async (window: any) => {
      window.AMAUI = {
        env: 'test',
      };

      const A = window.React.createElement('a');

      const lazy: any = window.AmauiUtils.reactLazy(() => Promise.resolve({ __esModule: true, default: A }));

      try {
        await lazy._init(lazy._payload);
      } catch (error) { }

      return [
        lazy
      ];
    });

    const values = [...valueBrowsers];

    values.forEach(value => assert(value).eql([
      {
        "_payload": {
          "_status": 1,
          "_result": {
            "__esModule": true,
            "default": {
              "type": "a",
              "key": null,
              "ref": null,
              "props": {},
              "_owner": null
            }
          }
        }
      }
    ]));
  });

  to('invalid import', async () => {
    const valueBrowsers = await evaluate(async (window: any) => {
      window.AMAUI = {
        env: 'test',
      };

      await caches.open('a');

      const lazy: any = window.AmauiUtils.reactLazy(() => Promise.resolve({ a: '4' }));

      try {
        lazy._init(lazy._payload);
      } catch (error) { }

      await window.AmauiUtils.wait(400);

      return [
        window.AMAUI.test?.reactLazy.logs.length,
        (await caches.keys()).length,
      ];
    });

    const values = [...valueBrowsers];

    values.forEach(value => assert(value).eql([
      1,
      0,
    ]));
  });

});
