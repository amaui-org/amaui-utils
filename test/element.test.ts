/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { evaluate, reset } from '../utils/js/test/utils';

group('@onesy/utils/element', () => {

  pre(async () => {
    await evaluate((window: any) => {
      window.document.body.innerHTML = '';

      const div = window.document.createElement('div');

      div.innerHTML = `
        <div id='a4' a>
          <p id='a3' data-ad>
            <span id='a2' data-a>
              <a id='a1'>
                a
              </a>
            </span>
          </p>
        </div>
      `;

      window.document.body.append(div);
    });

  });

  post(() => reset());

  to('value', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const value = [
        window.OnesyUtils.element(),
        window.OnesyUtils.element(14),
        window.OnesyUtils.element(null),
        window.OnesyUtils.element(true),
        window.OnesyUtils.element('#a14'),
        window.OnesyUtils.element(window),
        window.OnesyUtils.element(window.document),
        window.OnesyUtils.element(window.document.documentElement),
        window.OnesyUtils.element(window.document.body),
        window.OnesyUtils.element(window.document.head),
        window.OnesyUtils.element('#a1'),
        window.OnesyUtils.element(window.document.getElementById('a1')),
      ];

      return value.map(item => item.value).map(item => item && (item.tagName.toLowerCase() + item.id));
    });
    const values = [...valueBrowsers];

    values.forEach(value => assert(value).eql([
      ...new Array(7).fill(undefined),
      'html',
      'body',
      'head',
      'aa1',
      'aa1',
    ]));
  });

  to('parent', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const value = [
        window.OnesyUtils.element().parent(),
        window.OnesyUtils.element(14).parent(),
        window.OnesyUtils.element(null).parent(),
        window.OnesyUtils.element(true).parent(),
        window.OnesyUtils.element('#a14').parent(),
        window.OnesyUtils.element(window).parent(),
        window.OnesyUtils.element(window.document).parent(),
        window.OnesyUtils.element(window.document.documentElement).parent(),
        window.OnesyUtils.element(window.document.body).parent(),
        window.OnesyUtils.element(window.document.head).parent(),
        window.OnesyUtils.element('#a1').parent(),
        window.OnesyUtils.element(window.document.getElementById('a1')).parent(),
        window.OnesyUtils.element('#a2').parent(),
        window.OnesyUtils.element('#a3').parent(),
        window.OnesyUtils.element('#a4').parent(),
      ];

      return value.map(item => item && (item.nodeName?.toLowerCase() + (item.id || '')));
    });
    const values = [...valueBrowsers];

    values.forEach(value => assert(value).eql([
      ...new Array(7).fill(undefined),
      '#document',
      ...new Array(2).fill('html'),
      ...new Array(2).fill('spana2'),
      'pa3',
      'diva4',
      'div'
    ]));
  });

  group('parents', () => {

    to('parents', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const value = [
          window.OnesyUtils.element().parents(),
          window.OnesyUtils.element(14).parents(),
          window.OnesyUtils.element(null).parents(),
          window.OnesyUtils.element(true).parents(),
          window.OnesyUtils.element('#a14').parents(),
          window.OnesyUtils.element(window).parents(),
          window.OnesyUtils.element(window.document).parents(),
          window.OnesyUtils.element(window.document.documentElement).parents(),
          window.OnesyUtils.element(window.document.body).parents(),
          window.OnesyUtils.element(window.document.head).parents(),
          window.OnesyUtils.element('#a1').parents(),
          window.OnesyUtils.element(window.document.getElementById('a1')).parents(),
          window.OnesyUtils.element('#a2').parents(),
          window.OnesyUtils.element('#a3').parents(),
          window.OnesyUtils.element('#a4').parents(),
        ];

        return value.map(item => item && item.map(item_ => item_.nodeName?.toLowerCase() + (item_.id || '')));
      });
      const values = [...valueBrowsers];

      values.forEach(value => assert(value).eql([
        ...new Array(7).fill([]),
        ['#document'],
        ['html', '#document'],
        ['html', '#document'],
        ['spana2', 'pa3', 'diva4', 'div', 'body', 'html', '#document'],
        ['spana2', 'pa3', 'diva4', 'div', 'body', 'html', '#document'],
        ['pa3', 'diva4', 'div', 'body', 'html', '#document'],
        ['diva4', 'div', 'body', 'html', '#document'],
        ['div', 'body', 'html', '#document']
      ]));
    });

    to('selectors', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const value = [
          window.OnesyUtils.element().parents(),
          window.OnesyUtils.element(14).parents(),
          window.OnesyUtils.element(null).parents(),
          window.OnesyUtils.element('#a1').parents(),
          window.OnesyUtils.element('#a1').parents(undefined),
          window.OnesyUtils.element('#a1').parents(14),
          window.OnesyUtils.element('#a1').parents(true),
          window.OnesyUtils.element('#a1').parents([]),
          window.OnesyUtils.element(window.document.getElementById('a1')).parents([]),
          window.OnesyUtils.element('#a1').parents(['[data-a]']),
          window.OnesyUtils.element('#a1').parents(['[a]', '[data-a]']),
          window.OnesyUtils.element('#a1').parents(['[a]', '[ad]']),
          window.OnesyUtils.element('#a1').parents(['[a1]', '[a14]']),
          window.OnesyUtils.element('#a2').parents(['[a]']),
          window.OnesyUtils.element('#a3').parents(['[a]']),
          window.OnesyUtils.element('#a4').parents(['[a]']),
        ];

        return value.map(item => item && item.map(item_ => item_.nodeName?.toLowerCase() + (item_.id || '')));
      });
      const values = [...valueBrowsers];

      values.forEach(value => assert(value).eql([
        ...new Array(3).fill([]),
        ...new Array(6).fill(['spana2', 'pa3', 'diva4', 'div', 'body', 'html', '#document']),
        ['spana2'],
        ['spana2', 'diva4'],
        ['diva4'],
        ...new Array(1).fill([]),
        ['diva4'],
        ['diva4'],
        ...new Array(1).fill([]),
      ]));
    });

    to('arrayMethod', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const value = [
          window.OnesyUtils.element('#a1').parents(),
          window.OnesyUtils.element('#a1').parents(['[a]', '[data-a]', '[data-ad]']),
          window.OnesyUtils.element('#a1').parents(['[a]', '[data-a]', '[data-ad]'], 'some'),
          window.OnesyUtils.element('#a1').parents(['div', '[a]'], 'every'),
          window.OnesyUtils.element('#a1').parents(['[a]', '[data-a]', '[data-ad]'], 'every'),
        ];

        return value.map(item => item && item.map(item_ => item_.nodeName?.toLowerCase() + (item_.id || '')));
      });
      const values = [...valueBrowsers];

      values.forEach(value => assert(value).eql([
        ['spana2', 'pa3', 'diva4', 'div', 'body', 'html', '#document'],
        ['spana2', 'pa3', 'diva4'],
        ['spana2', 'pa3', 'diva4'],
        ['diva4'],
        []
      ]));
    });

  });

  group('nearest', () => {

    to('nearest', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const value = [
          window.OnesyUtils.element().nearest(['div']),
          window.OnesyUtils.element(14).nearest(['div']),
          window.OnesyUtils.element(null).nearest(['div']),
          window.OnesyUtils.element(true).nearest(['div']),
          window.OnesyUtils.element('#a14').nearest(['div']),
          window.OnesyUtils.element(window).nearest(['div']),
          window.OnesyUtils.element(window.document).nearest(['div']),
          window.OnesyUtils.element(window.document.documentElement).nearest(['div']),
          window.OnesyUtils.element(window.document.body).nearest(['div']),
          window.OnesyUtils.element(window.document.head).nearest(['div']),
          window.OnesyUtils.element('#a1').nearest(['div']),
          window.OnesyUtils.element(window.document.getElementById('a1')).nearest(['div']),
          window.OnesyUtils.element('#a2').nearest(['div']),
          window.OnesyUtils.element('#a3').nearest(['div']),
          window.OnesyUtils.element('#a4').nearest(['div']),
          window.OnesyUtils.element('body > div').nearest(['div']),
        ];

        return value.map(item => item && item.nodeName?.toLowerCase() + (item.id || ''));
      });
      const values = [...valueBrowsers];

      values.forEach(value => assert(value).eql([
        ...new Array(10).fill(undefined),
        ...new Array(5).fill('diva4'),
        'div'
      ]));
    });

    to('selectors', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const value = [
          window.OnesyUtils.element().nearest(),
          window.OnesyUtils.element(14).nearest(),
          window.OnesyUtils.element(null).nearest(),
          window.OnesyUtils.element('#a1').nearest(),
          window.OnesyUtils.element('#a1').nearest(undefined),
          window.OnesyUtils.element('#a1').nearest(14),
          window.OnesyUtils.element('#a1').nearest(true),
          window.OnesyUtils.element('#a1').nearest([]),
          window.OnesyUtils.element(window.document.getElementById('a1')).nearest([]),
          window.OnesyUtils.element('#a1').nearest(['[data-a]']),
          window.OnesyUtils.element('#a1').nearest(['[a]', '[data-a]']),
          window.OnesyUtils.element('#a1').nearest(['[a]', '[ad]']),
          window.OnesyUtils.element('#a1').nearest(['[a1]', '[a14]']),
          window.OnesyUtils.element('#a2').nearest(['[a]']),
          window.OnesyUtils.element('#a3').nearest(['[a]']),
          window.OnesyUtils.element('#a4').nearest(['[a]']),
        ];

        return value.map(item => item && item.nodeName?.toLowerCase() + (item.id || ''));
      });
      const values = [...valueBrowsers];

      values.forEach(value => assert(value).eql([
        ...new Array(3).fill(undefined),
        ...new Array(6).fill('aa1'),
        ...new Array(2).fill('spana2'),
        'diva4',
        undefined,
        ...new Array(3).fill('diva4'),
      ]));
    });

    to('arrayMethod', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const value = [
          window.OnesyUtils.element('#a1').nearest(),
          window.OnesyUtils.element('#a1').nearest(['[a]', '[data-a]', '[data-ad]']),
          window.OnesyUtils.element('#a1').nearest(['[a]', '[data-a]', '[data-ad]'], 'some'),
          window.OnesyUtils.element('#a1').nearest(['div', '[a]'], 'every'),
          window.OnesyUtils.element('#a1').nearest(['[a]', '[data-a]', '[data-ad]'], 'every'),
        ];

        return value.map(item => item && item.nodeName?.toLowerCase() + (item.id || ''));
      });
      const values = [...valueBrowsers];

      values.forEach(value => assert(value).eql([
        'aa1',
        'spana2',
        'spana2',
        'diva4',
        undefined
      ]));
    });

  });

  group('furthest', () => {

    to('furthest', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const value = [
          window.OnesyUtils.element().furthest(['div']),
          window.OnesyUtils.element(14).furthest(['div']),
          window.OnesyUtils.element(null).furthest(['div']),
          window.OnesyUtils.element(true).furthest(['div']),
          window.OnesyUtils.element('#a14').furthest(['div']),
          window.OnesyUtils.element(window).furthest(['div']),
          window.OnesyUtils.element(window.document).furthest(['div']),
          window.OnesyUtils.element(window.document.documentElement).furthest(['div']),
          window.OnesyUtils.element(window.document.body).furthest(['div']),
          window.OnesyUtils.element(window.document.head).furthest(['div']),
          window.OnesyUtils.element('#a1').furthest(['div']),
          window.OnesyUtils.element(window.document.getElementById('a1')).furthest(['div']),
          window.OnesyUtils.element('#a2').furthest(['div']),
          window.OnesyUtils.element('#a3').furthest(['div']),
          window.OnesyUtils.element('#a4').furthest(['div']),
          window.OnesyUtils.element('body > div').furthest(['div']),
        ];

        return value.map(item => item && item.nodeName?.toLowerCase() + (item.id || ''));
      });
      const values = [...valueBrowsers];

      values.forEach(value => assert(value).eql([
        ...new Array(10).fill(undefined),
        ...new Array(5).fill('div'),
        undefined
      ]));
    });

    to('selectors', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const value = [
          window.OnesyUtils.element().furthest(),
          window.OnesyUtils.element(14).furthest(),
          window.OnesyUtils.element(null).furthest(),
          window.OnesyUtils.element('#a1').furthest(),
          window.OnesyUtils.element('#a1').furthest(undefined),
          window.OnesyUtils.element('#a1').furthest(14),
          window.OnesyUtils.element('#a1').furthest(true),
          window.OnesyUtils.element('#a1').furthest([]),
          window.OnesyUtils.element(window.document.getElementById('a1')).furthest([]),
          window.OnesyUtils.element('#a1').furthest(['[data-a]']),
          window.OnesyUtils.element('#a1').furthest(['[a]', '[data-a]']),
          window.OnesyUtils.element('#a1').furthest(['[a]', '[ad]']),
          window.OnesyUtils.element('#a1').furthest(['[a1]', '[a14]']),
          window.OnesyUtils.element('#a2').furthest(['[a]']),
          window.OnesyUtils.element('#a3').furthest(['[a]']),
          window.OnesyUtils.element('#a4').furthest(['[a]']),
        ];

        return value.map(item => item && item.nodeName?.toLowerCase() + (item.id || ''));
      });
      const values = [...valueBrowsers];

      values.forEach(value => assert(value).eql([
        ...new Array(3).fill(undefined),
        ...new Array(6).fill('#document'),
        'spana2',
        ...new Array(2).fill('diva4'),
        undefined,
        ...new Array(2).fill('diva4'),
        undefined,
      ]));
    });

    to('arrayMethod', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const value = [
          window.OnesyUtils.element('#a1').furthest(),
          window.OnesyUtils.element('#a1').furthest(['[a]', '[data-a]', '[data-ad]']),
          window.OnesyUtils.element('#a1').furthest(['[a]', '[data-a]', '[data-ad]'], 'some'),
          window.OnesyUtils.element('#a1').furthest(['div', '[a]'], 'every'),
          window.OnesyUtils.element('#a1').furthest(['[a]', '[data-a]', '[data-ad]'], 'every'),
        ];

        return value.map(item => item && item.nodeName?.toLowerCase() + (item.id || ''));
      });
      const values = [...valueBrowsers];

      values.forEach(value => assert(value).eql([
        '#document',
        ...new Array(3).fill('diva4'),
        undefined
      ]));
    });

  });

  group('hasParent', () => {

    to('hasParent', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const value = [
          window.OnesyUtils.element().hasParent(['div']),
          window.OnesyUtils.element(14).hasParent(['div']),
          window.OnesyUtils.element(null).hasParent(['div']),
          window.OnesyUtils.element(true).hasParent(['div']),
          window.OnesyUtils.element('#a14').hasParent(['div']),
          window.OnesyUtils.element(window).hasParent(['div']),
          window.OnesyUtils.element(window.document).hasParent(['div']),
          window.OnesyUtils.element(window.document.documentElement).hasParent(['div']),
          window.OnesyUtils.element(window.document.body).hasParent(['div']),
          window.OnesyUtils.element(window.document.head).hasParent(['div']),
          window.OnesyUtils.element('#a1').hasParent(['div']),
          window.OnesyUtils.element(window.document.getElementById('a1')).hasParent(['div']),
          window.OnesyUtils.element('#a2').hasParent(['div']),
          window.OnesyUtils.element('#a3').hasParent(['div']),
          window.OnesyUtils.element('#a4').hasParent(['div']),
          window.OnesyUtils.element('body > div').hasParent(['div']),
          window.OnesyUtils.element('body > div').hasParent(['div#a4']),
        ];

        return value;
      });
      const values = [...valueBrowsers];

      values.forEach(value => assert(value).eql([
        ...new Array(10).fill(false),
        ...new Array(5).fill(true),
        ...new Array(2).fill(false),
      ]));
    });

    group('grandparents', () => {

      to('true', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          const value = [
            window.OnesyUtils.element().hasParent(['div'], true),
            window.OnesyUtils.element(14).hasParent(['div'], true),
            window.OnesyUtils.element(null).hasParent(['div'], true),
            window.OnesyUtils.element(true).hasParent(['div'], true),
            window.OnesyUtils.element('#a14').hasParent(['div'], true),
            window.OnesyUtils.element(window).hasParent(['div'], true),
            window.OnesyUtils.element(window.document).hasParent(['div'], true),
            window.OnesyUtils.element(window.document.documentElement).hasParent(['div'], true),
            window.OnesyUtils.element(window.document.body).hasParent(['div'], true),
            window.OnesyUtils.element(window.document.head).hasParent(['div'], true),
            window.OnesyUtils.element('#a1').hasParent(['div'], true),
            window.OnesyUtils.element(window.document.getElementById('a1')).hasParent(['div'], true),
            window.OnesyUtils.element('#a2').hasParent(['div'], true),
            window.OnesyUtils.element('#a3').hasParent(['div'], true),
            window.OnesyUtils.element('#a4').hasParent(['div'], true),
            window.OnesyUtils.element('body > div').hasParent(['div'], true),
            window.OnesyUtils.element('body > div').hasParent(['div#a4'], true),
          ];

          return value;
        });
        const values = [...valueBrowsers];

        values.forEach(value => assert(value).eql([
          ...new Array(10).fill(false),
          ...new Array(5).fill(true),
          ...new Array(2).fill(false),
        ]));
      });

      to('false', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          const value = [
            window.OnesyUtils.element().hasParent(['div'], false),
            window.OnesyUtils.element(14).hasParent(['div'], false),
            window.OnesyUtils.element(null).hasParent(['div'], false),
            window.OnesyUtils.element(true).hasParent(['div'], false),
            window.OnesyUtils.element('#a14').hasParent(['div'], false),
            window.OnesyUtils.element(window).hasParent(['div'], false),
            window.OnesyUtils.element(window.document).hasParent(['div'], false),
            window.OnesyUtils.element(window.document.documentElement).hasParent(['div'], false),
            window.OnesyUtils.element(window.document.body).hasParent(['div'], false),
            window.OnesyUtils.element(window.document.head).hasParent(['div'], false),
            window.OnesyUtils.element('#a1').hasParent(['div'], false),
            window.OnesyUtils.element(window.document.getElementById('a1')).hasParent(['div'], false),
            window.OnesyUtils.element('#a2').hasParent(['div'], false),
            window.OnesyUtils.element('#a3').hasParent(['div'], false),
            window.OnesyUtils.element('#a4').hasParent(['div'], false),
            window.OnesyUtils.element('body > div').hasParent(['div'], false),
            window.OnesyUtils.element('body > div').hasParent(['div#a4'], false),
          ];

          return value;
        });
        const values = [...valueBrowsers];

        values.forEach(value => assert(value).eql([
          ...new Array(13).fill(false),
          ...new Array(2).fill(true),
          ...new Array(2).fill(false),
        ]));
      });

    });

    to('arrayMethod', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const value = [
          window.OnesyUtils.element('#a1').hasParent(),
          window.OnesyUtils.element('#a1').hasParent(['[a]', '[data-a]', '[data-ad]']),
          window.OnesyUtils.element('#a1').hasParent(['[a]', '[data-a]', '[data-ad]'], true, 'some'),
          window.OnesyUtils.element('#a1').hasParent(['div', '[a]'], 'every'),
          window.OnesyUtils.element('#a1').hasParent(['[a]', '[data-a]', '[data-ad]'], true, 'every'),
        ];

        return value;
      });
      const values = [...valueBrowsers];

      values.forEach(value => assert(value).eql([
        ...new Array(4).fill(true),
        ...new Array(1).fill(false),
      ]));
    });

  });

  group('hasParents', () => {

    to('hasParents', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const value = [
          window.OnesyUtils.element().hasParents(),
          window.OnesyUtils.element().hasParents(undefined),
          window.OnesyUtils.element().hasParents(14),
          window.OnesyUtils.element().hasParents(null),
          window.OnesyUtils.element().hasParents([]),
          window.OnesyUtils.element(14).hasParents(['div', window.document.querySelector('div#a4'), 'body', 'html']),
          window.OnesyUtils.element(null).hasParents(['div', window.document.querySelector('div#a4'), 'body', 'html']),
          window.OnesyUtils.element(true).hasParents(['div', window.document.querySelector('div#a4'), 'body', 'html']),
          window.OnesyUtils.element('#a14').hasParents(['div', window.document.querySelector('div#a4'), 'body', 'html']),
          window.OnesyUtils.element(window).hasParents(['div', window.document.querySelector('div#a4'), 'body', 'html']),
          window.OnesyUtils.element(window.document).hasParents(['div', window.document.querySelector('div#a4'), 'body', 'html']),
          window.OnesyUtils.element(window.document.documentElement).hasParents(['div', window.document.querySelector('div#a4'), 'body', 'html']),
          window.OnesyUtils.element(window.document.body).hasParents(['div', window.document.querySelector('div#a4'), 'body', 'html']),
          window.OnesyUtils.element(window.document.head).hasParents(['div', window.document.querySelector('div#a4'), 'body', 'html']),
          window.OnesyUtils.element('#a1').hasParents([window.document.querySelector('div#a4'), 'div', 'body', 'html']),
          window.OnesyUtils.element(window.document.getElementById('a1')).hasParents(['div', window.document.querySelector('div#a4'), 'body', 'html']),
          window.OnesyUtils.element('#a2').hasParents(['div', window.document.querySelector('div#a4'), 'body', 'html']),
          window.OnesyUtils.element('#a3').hasParents(['div', window.document.querySelector('div#a4'), 'body', 'html']),
          window.OnesyUtils.element('#a4').hasParents(['div', window.document.querySelector('div#a4'), 'body', 'html']),
          window.OnesyUtils.element('body > div').hasParents(['div', window.document.querySelector('div#a4'), 'body', 'html']),
          window.OnesyUtils.element('body > div').hasParents(['div', 'div#a14']),
        ];

        return value;
      });
      const values = [...valueBrowsers];

      values.forEach(value => assert(value).eql([
        ...new Array(12).fill(false),
        ...new Array(8).fill(true),
        ...new Array(1).fill(false),
      ]));
    });

    group('unique', () => {

      to('true', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          const value = [
            window.OnesyUtils.element().hasParents(),
            window.OnesyUtils.element().hasParents(undefined, true),
            window.OnesyUtils.element().hasParents(14, true),
            window.OnesyUtils.element().hasParents(null, true),
            window.OnesyUtils.element().hasParents([], true),
            window.OnesyUtils.element(14).hasParents(['div', window.document.querySelector('div#a4', true), 'body', 'html'], true),
            window.OnesyUtils.element(null).hasParents(['div', window.document.querySelector('div#a4', true), 'body', 'html'], true),
            window.OnesyUtils.element(true).hasParents(['div', window.document.querySelector('div#a4', true), 'body', 'html'], true),
            window.OnesyUtils.element('#a14').hasParents(['div', window.document.querySelector('div#a4', true), 'body', 'html'], true),
            window.OnesyUtils.element(window).hasParents(['div', window.document.querySelector('div#a4', true), 'body', 'html'], true),
            window.OnesyUtils.element(window.document).hasParents(['div', window.document.querySelector('div#a4', true), 'body', 'html'], true),
            window.OnesyUtils.element(window.document.documentElement).hasParents(['div', window.document.querySelector('div#a4', true), 'body', 'html'], true),
            window.OnesyUtils.element(window.document.body).hasParents(['div', window.document.querySelector('div#a4', true), 'body', 'html'], true),
            window.OnesyUtils.element(window.document.head).hasParents(['div', window.document.querySelector('div#a4', true), 'body', 'html'], true),
            window.OnesyUtils.element('#a1').hasParents([window.document.querySelector('div#a4', true), 'div', 'body', 'html'], true),
            window.OnesyUtils.element(window.document.getElementById('a1')).hasParents(['div', window.document.querySelector('div#a4', true), 'body', 'html'], true),
            window.OnesyUtils.element('#a2').hasParents(['div', window.document.querySelector('div#a4', true), 'body', 'html'], true),
            window.OnesyUtils.element('#a3').hasParents(['div', window.document.querySelector('div#a4', true), 'body', 'html'], true),
            window.OnesyUtils.element('#a4').hasParents(['div', window.document.querySelector('div#a4', true), 'body', 'html'], true),
            window.OnesyUtils.element('body > div').hasParents(['div', window.document.querySelector('div#a4', true), 'body', 'html'], true),
            window.OnesyUtils.element('body > div').hasParents(['div', 'div#a14'], true),
          ];

          return value;
        });
        const values = [...valueBrowsers];

        values.forEach(value => assert(value).eql([
          ...new Array(12).fill(false),
          ...new Array(8).fill(true),
          ...new Array(1).fill(false),
        ]));
      });

      to('false', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          const value = [
            window.OnesyUtils.element().hasParents(),
            window.OnesyUtils.element().hasParents(undefined, false),
            window.OnesyUtils.element().hasParents(14, false),
            window.OnesyUtils.element().hasParents(null, false),
            window.OnesyUtils.element().hasParents([], false),
            window.OnesyUtils.element().hasParents(['div', window.document.querySelector('div#a4'), 'body', 'html'], false),
            window.OnesyUtils.element(14).hasParents(['div', window.document.querySelector('div#a4'), 'body', 'html'], false),
            window.OnesyUtils.element(null).hasParents(['div', window.document.querySelector('div#a4'), 'body', 'html'], false),
            window.OnesyUtils.element(true).hasParents(['div', window.document.querySelector('div#a4'), 'body', 'html'], false),
            window.OnesyUtils.element('#a14').hasParents(['div', window.document.querySelector('div#a4'), 'body', 'html'], false),
            window.OnesyUtils.element(window).hasParents(['div', window.document.querySelector('div#a4'), 'body', 'html'], false),
            window.OnesyUtils.element(window.document).hasParents(['div', window.document.querySelector('div#a4'), 'body', 'html'], false),
            window.OnesyUtils.element(window.document.documentElement).hasParents(['div', window.document.querySelector('div#a4'), 'body', 'html'], false),
            window.OnesyUtils.element(window.document.body).hasParents(['div', window.document.querySelector('div#a4'), 'body', 'html'], false),
            window.OnesyUtils.element(window.document.head).hasParents(['div', window.document.querySelector('div#a4'), 'body', 'html'], false),
            window.OnesyUtils.element('#a1').hasParents([window.document.querySelector('div#a4'), 'div', 'body', 'html'], false),
            window.OnesyUtils.element(window.document.getElementById('a1')).hasParents(['div', window.document.querySelector('div#a4'), 'body', 'html'], false),
            window.OnesyUtils.element('#a2').hasParents(['div', window.document.querySelector('div#a4'), 'body', 'html'], false),
            window.OnesyUtils.element('#a3').hasParents(['div', window.document.querySelector('div#a4'), 'body', 'html'], false),
            window.OnesyUtils.element('#a4').hasParents(['div', window.document.querySelector('div#a4'), 'body', 'html'], false),
            window.OnesyUtils.element('body > div').hasParents(['div', window.document.querySelector('div#a4'), 'body', 'html'], false),
            window.OnesyUtils.element('body > div').hasParents(['div', 'div#a14'], false),
          ];

          return value;
        });
        const values = [...valueBrowsers];

        values.forEach(value => assert(value).eql([
          ...new Array(13).fill(false),
          ...new Array(8).fill(true),
          ...new Array(1).fill(false),
        ]));
      });

    });

    to('arrayMethod', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const value = [
          window.OnesyUtils.element('#a1').hasParents(),
          window.OnesyUtils.element('#a1').hasParents(['[a]', '[data-a]', '[data-ad]']),
          window.OnesyUtils.element('#a1').hasParents(['[a]', '[data-a]', '[data-ad]'], true, 'some'),
          window.OnesyUtils.element('#a1').hasParents(['div', '[a]'], 'every'),
          window.OnesyUtils.element('#a1').hasParents(['[a]', '[data-a]', '[data-ad]'], true, 'every'),
        ];

        return value;
      });
      const values = [...valueBrowsers];

      values.forEach(value => assert(value).eql([
        ...new Array(5).fill(true),
      ]));
    });

  });

});
