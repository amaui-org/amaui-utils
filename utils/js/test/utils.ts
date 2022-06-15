/* tslint:disable: no-shadowed-variable */
import playwright, { chromium, webkit, firefox } from 'playwright';

import * as AmauiUtils from '../../../src';

export type TMethod = (...args: any[]) => any;

export type TType = 'chromium' | 'firefox' | 'webkit';

export type TPlaywrightJSHandle = playwright.JSHandle<any>;

export interface IOptions {
  browser?: playwright.LaunchOptions;
  context?: playwright.BrowserContextOptions;
  page?: playwright.Page;
}

export interface IBrowser {
  browser?: playwright.Browser;
  context?: playwright.BrowserContext;
  page?: playwright.Page;
}

export interface IBrowsers<T = IBrowser> {
  chromium?: T;
  firefox?: T;
  webkit?: T;
}

type TOpen = ['browser'?, 'context'?, 'page'?];

export const reset = () => {
  const values = [String, Number, Boolean, Array, Object, Function, ...(AmauiUtils.is('browser') ? [Blob, File] : [])];

  values.forEach(value => Object.keys(value.prototype).forEach(key => { if (AmauiUtils[key]) delete value.prototype[key]; }));
};

export const startBrowser = (
  type: TType = 'chromium',
  options: IOptions = { context: { acceptDownloads: true } },
  open: TOpen = ['browser', 'context', 'page'],
  evaluateOptions: IEvaluateOptions = { online: true }
): Promise<IBrowser> => {
  return new Promise(async (resolve, reject) => {
    try {
      const result: {
        browser?: playwright.Browser;
        context?: playwright.BrowserContext;
        page?: playwright.Page;
      } = {};

      let browser = chromium;

      if (type === 'firefox') browser = firefox;
      if (type === 'webkit') browser = webkit;

      result['browser'] = await browser.launch(options.browser);

      if (open.indexOf('context') > -1) result['context'] = await result['browser'].newContext(options.context);

      // Add permissions to the context
      await result['context'].grantPermissions([]);

      if (open.indexOf('page') > -1) {
        result['page'] = await result['context'].newPage();

        // So we don't get empty html page
        if (
          !options?.context?.offline &&
          !evaluateOptions.noGoTo
        ) await result['page'].goto(`http://localhost:4000?q=a`, { waitUntil: 'domcontentloaded' });

        if (!evaluateOptions?.online) result['context'].setOffline(true);
      }

      return resolve(result);
    }
    catch (error) {
      console.error(error);

      throw error;
    }
  });
};

export const startBrowsers = (
  browsers: IBrowsers<boolean> = { chromium: true, firefox: true, webkit: true },
  options?: IOptions,
  open: TOpen = ['browser', 'context', 'page'],
  evaluateOptions?: IEvaluateOptions
): Promise<IBrowsers> => {
  return new Promise(async (resolve, reject) => {
    const result: IBrowsers = {};

    for (const browser of Object.keys(browsers).filter(item => browsers[item])) {
      result[browser] = await startBrowser((browser as TType), options, open, evaluateOptions);
    }

    return resolve(result);
  });
};

export const page = async (method: (page: playwright.Page) => any, browsers: IBrowsers): Promise<any> => {
  if (browsers && method) {
    for (const key of Object.keys(browsers)) {
      const browser = browsers[key] as IBrowser;

      if (browser.page) await method(browser.page);
    }
  }
};

// Evaluate run in all browsers
interface IEvaluateOptions {
  browsers?: IBrowsers;
  preEvaluate?: (value: IBrowser) => any;
  postEvaluate?: (value: IBrowser) => any;
  pre?: TMethod;
  post?: TMethod;
  arguments?: any[];
  noScripts?: boolean;
  noGoTo?: boolean;
  online?: boolean;
}

export const evaluate = async (
  method: TMethod,
  options: IEvaluateOptions = {}
): Promise<any> => {
  const responses = [];

  for (const key of Object.keys(options.browsers)) {
    const browser: IBrowser = options.browsers[key];

    const window = await browser.page.evaluateHandle(() => window);

    const args = options.arguments?.length ? [window, ...options.arguments] : window;

    if (options.preEvaluate) await options.preEvaluate(browser);

    if (options.pre) await browser.page.evaluateHandle(options.pre, args);

    const response = await browser.page.evaluateHandle(method, args);

    if (options.post) await browser.page.evaluateHandle(options.post, args);

    if (options.postEvaluate) await options.postEvaluate(browser);

    responses.push(await response.jsonValue());
  }

  return responses;
};

export const evaluateWorker = async (
  method: TMethod,
  options: IEvaluateOptions = {}
): Promise<any> => {
  const responses = [];

  for (const key of Object.keys(options.browsers)) {
    const browser: IBrowser = options.browsers[key];

    const page = browser.page;

    const window = await browser.page.evaluateHandle(() => window);

    await page.evaluate((window: any) => new window.Worker('./worker.js'), window);

    await page.waitForEvent('worker');

    const workers = page.workers();

    const worker = workers[0];

    const args = options.arguments;

    if (worker) {
      if (options.pre) await worker.evaluate(options.pre, args);

      const response = await worker.evaluate(method, args);

      if (options.post) await worker.evaluate(options.post, args);

      responses.push(response);
    }
  }

  return responses;
};

// Evaluate run in all browsers and nodejs
export const evaluateAll = async (
  method: TMethod,
  options: IEvaluateOptions = {}
): Promise<any> => {
  return [
    await method(),
    ...await evaluate(method, options),
  ];
};

export const closeBrowser = async (browser: IBrowser, name?: string): Promise<void> => {
  if (browser?.browser) {
    await browser.browser.close();
  }
};

export const closeBrowsers = async (browsers: IBrowsers): Promise<void> => {
  if (browsers) for (const browser of Object.keys(browsers)) await closeBrowser(browsers[browser], browser);
};
