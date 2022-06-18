import React from 'react';

import { isValid } from './is';
import getEnvironment from './getEnvironment';
import setObjectValue from './setObjectValue';

/**
 *
 * This improved lazy loading method is from learned lessons making an,
 * enterprise regular react app, and in some use cases server sending back an
 * index.html page for js chunk requested from the browser that no longer exists
 * on the server, where resource is being requested from.
 *
 * That usually happens after a new build, and
 * where user's browser cached react app index.html with
 * hardcoded js chunk versions inside is trying to request those
 * now overriden (no longer existent) js chunk files.
 *
 * And usually most react setup servers when they don't find a resource, by
 * default they return index.html file, so react can handle the routing
 * and other use cases and errors, and whatnot.
 *
 * And this method tries to check and make sure it is js chunk
 * that's being lazy loaded, and if that is not
 * the case, all cache is cleaned + app reloaded.
 */
const reactLazy = (import_: () => Promise<any>): React.LazyExoticComponent<React.ComponentType<any>> => (
  (React || window.React).lazy(async () => {
    try {
      const Component = await import_();

      if (!isValid('js-chunk', Component)) throw new Error(`Not a javascript module: ${Component}`);

      return Component;
    }
    catch (error) {
      console.error('React lazy import: ', error);

      const env = getEnvironment();

      if (env.AMAUI?.env === 'test') {
        if (!env.AMAUI?.test?.reactLazy?.logs) setObjectValue(env, 'AMAUI.test.reactLazy.logs', []);

        env.AMAUI.test.reactLazy.logs.push(error);
      }

      // Clean all cache + reload
      if (caches) {
        const names = await caches.keys();

        for (const name of names) await caches.delete(name);
      }

      if ((window as any).AMAUI?.env !== 'test') window.location.reload();
    }
  })
);

export default reactLazy;
