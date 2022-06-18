/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { evaluate, reset } from '../utils/js/test/utils';

group('@amaui/utils/element', () => {

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
        window.AmauiUtils.element(),
        window.AmauiUtils.element(14),
        window.AmauiUtils.element(null),
        window.AmauiUtils.element(true),
        window.AmauiUtils.element('#a14'),
        window.AmauiUtils.element(window),
        window.AmauiUtils.element(window.document),
        window.AmauiUtils.element(window.document.documentElement),
        window.AmauiUtils.element(window.document.body),
        window.AmauiUtils.element(window.document.head),
        window.AmauiUtils.element('#a1'),
        window.AmauiUtils.element(window.document.getElementById('a1')),
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
        window.AmauiUtils.element().parent(),
        window.AmauiUtils.element(14).parent(),
        window.AmauiUtils.element(null).parent(),
        window.AmauiUtils.element(true).parent(),
        window.AmauiUtils.element('#a14').parent(),
        window.AmauiUtils.element(window).parent(),
        window.AmauiUtils.element(window.document).parent(),
        window.AmauiUtils.element(window.document.documentElement).parent(),
        window.AmauiUtils.element(window.document.body).parent(),
        window.AmauiUtils.element(window.document.head).parent(),
        window.AmauiUtils.element('#a1').parent(),
        window.AmauiUtils.element(window.document.getElementById('a1')).parent(),
        window.AmauiUtils.element('#a2').parent(),
        window.AmauiUtils.element('#a3').parent(),
        window.AmauiUtils.element('#a4').parent(),
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
          window.AmauiUtils.element().parents(),
          window.AmauiUtils.element(14).parents(),
          window.AmauiUtils.element(null).parents(),
          window.AmauiUtils.element(true).parents(),
          window.AmauiUtils.element('#a14').parents(),
          window.AmauiUtils.element(window).parents(),
          window.AmauiUtils.element(window.document).parents(),
          window.AmauiUtils.element(window.document.documentElement).parents(),
          window.AmauiUtils.element(window.document.body).parents(),
          window.AmauiUtils.element(window.document.head).parents(),
          window.AmauiUtils.element('#a1').parents(),
          window.AmauiUtils.element(window.document.getElementById('a1')).parents(),
          window.AmauiUtils.element('#a2').parents(),
          window.AmauiUtils.element('#a3').parents(),
          window.AmauiUtils.element('#a4').parents(),
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
          window.AmauiUtils.element().parents(),
          window.AmauiUtils.element(14).parents(),
          window.AmauiUtils.element(null).parents(),
          window.AmauiUtils.element('#a1').parents(),
          window.AmauiUtils.element('#a1').parents(undefined),
          window.AmauiUtils.element('#a1').parents(14),
          window.AmauiUtils.element('#a1').parents(true),
          window.AmauiUtils.element('#a1').parents([]),
          window.AmauiUtils.element(window.document.getElementById('a1')).parents([]),
          window.AmauiUtils.element('#a1').parents(['[data-a]']),
          window.AmauiUtils.element('#a1').parents(['[a]', '[data-a]']),
          window.AmauiUtils.element('#a1').parents(['[a]', '[ad]']),
          window.AmauiUtils.element('#a1').parents(['[a1]', '[a14]']),
          window.AmauiUtils.element('#a2').parents(['[a]']),
          window.AmauiUtils.element('#a3').parents(['[a]']),
          window.AmauiUtils.element('#a4').parents(['[a]']),
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
          window.AmauiUtils.element('#a1').parents(),
          window.AmauiUtils.element('#a1').parents(['[a]', '[data-a]', '[data-ad]']),
          window.AmauiUtils.element('#a1').parents(['[a]', '[data-a]', '[data-ad]'], 'some'),
          window.AmauiUtils.element('#a1').parents(['div', '[a]'], 'every'),
          window.AmauiUtils.element('#a1').parents(['[a]', '[data-a]', '[data-ad]'], 'every'),
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
          window.AmauiUtils.element().nearest(['div']),
          window.AmauiUtils.element(14).nearest(['div']),
          window.AmauiUtils.element(null).nearest(['div']),
          window.AmauiUtils.element(true).nearest(['div']),
          window.AmauiUtils.element('#a14').nearest(['div']),
          window.AmauiUtils.element(window).nearest(['div']),
          window.AmauiUtils.element(window.document).nearest(['div']),
          window.AmauiUtils.element(window.document.documentElement).nearest(['div']),
          window.AmauiUtils.element(window.document.body).nearest(['div']),
          window.AmauiUtils.element(window.document.head).nearest(['div']),
          window.AmauiUtils.element('#a1').nearest(['div']),
          window.AmauiUtils.element(window.document.getElementById('a1')).nearest(['div']),
          window.AmauiUtils.element('#a2').nearest(['div']),
          window.AmauiUtils.element('#a3').nearest(['div']),
          window.AmauiUtils.element('#a4').nearest(['div']),
          window.AmauiUtils.element('body > div').nearest(['div']),
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
          window.AmauiUtils.element().nearest(),
          window.AmauiUtils.element(14).nearest(),
          window.AmauiUtils.element(null).nearest(),
          window.AmauiUtils.element('#a1').nearest(),
          window.AmauiUtils.element('#a1').nearest(undefined),
          window.AmauiUtils.element('#a1').nearest(14),
          window.AmauiUtils.element('#a1').nearest(true),
          window.AmauiUtils.element('#a1').nearest([]),
          window.AmauiUtils.element(window.document.getElementById('a1')).nearest([]),
          window.AmauiUtils.element('#a1').nearest(['[data-a]']),
          window.AmauiUtils.element('#a1').nearest(['[a]', '[data-a]']),
          window.AmauiUtils.element('#a1').nearest(['[a]', '[ad]']),
          window.AmauiUtils.element('#a1').nearest(['[a1]', '[a14]']),
          window.AmauiUtils.element('#a2').nearest(['[a]']),
          window.AmauiUtils.element('#a3').nearest(['[a]']),
          window.AmauiUtils.element('#a4').nearest(['[a]']),
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
          window.AmauiUtils.element('#a1').nearest(),
          window.AmauiUtils.element('#a1').nearest(['[a]', '[data-a]', '[data-ad]']),
          window.AmauiUtils.element('#a1').nearest(['[a]', '[data-a]', '[data-ad]'], 'some'),
          window.AmauiUtils.element('#a1').nearest(['div', '[a]'], 'every'),
          window.AmauiUtils.element('#a1').nearest(['[a]', '[data-a]', '[data-ad]'], 'every'),
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
          window.AmauiUtils.element().furthest(['div']),
          window.AmauiUtils.element(14).furthest(['div']),
          window.AmauiUtils.element(null).furthest(['div']),
          window.AmauiUtils.element(true).furthest(['div']),
          window.AmauiUtils.element('#a14').furthest(['div']),
          window.AmauiUtils.element(window).furthest(['div']),
          window.AmauiUtils.element(window.document).furthest(['div']),
          window.AmauiUtils.element(window.document.documentElement).furthest(['div']),
          window.AmauiUtils.element(window.document.body).furthest(['div']),
          window.AmauiUtils.element(window.document.head).furthest(['div']),
          window.AmauiUtils.element('#a1').furthest(['div']),
          window.AmauiUtils.element(window.document.getElementById('a1')).furthest(['div']),
          window.AmauiUtils.element('#a2').furthest(['div']),
          window.AmauiUtils.element('#a3').furthest(['div']),
          window.AmauiUtils.element('#a4').furthest(['div']),
          window.AmauiUtils.element('body > div').furthest(['div']),
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
          window.AmauiUtils.element().furthest(),
          window.AmauiUtils.element(14).furthest(),
          window.AmauiUtils.element(null).furthest(),
          window.AmauiUtils.element('#a1').furthest(),
          window.AmauiUtils.element('#a1').furthest(undefined),
          window.AmauiUtils.element('#a1').furthest(14),
          window.AmauiUtils.element('#a1').furthest(true),
          window.AmauiUtils.element('#a1').furthest([]),
          window.AmauiUtils.element(window.document.getElementById('a1')).furthest([]),
          window.AmauiUtils.element('#a1').furthest(['[data-a]']),
          window.AmauiUtils.element('#a1').furthest(['[a]', '[data-a]']),
          window.AmauiUtils.element('#a1').furthest(['[a]', '[ad]']),
          window.AmauiUtils.element('#a1').furthest(['[a1]', '[a14]']),
          window.AmauiUtils.element('#a2').furthest(['[a]']),
          window.AmauiUtils.element('#a3').furthest(['[a]']),
          window.AmauiUtils.element('#a4').furthest(['[a]']),
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
          window.AmauiUtils.element('#a1').furthest(),
          window.AmauiUtils.element('#a1').furthest(['[a]', '[data-a]', '[data-ad]']),
          window.AmauiUtils.element('#a1').furthest(['[a]', '[data-a]', '[data-ad]'], 'some'),
          window.AmauiUtils.element('#a1').furthest(['div', '[a]'], 'every'),
          window.AmauiUtils.element('#a1').furthest(['[a]', '[data-a]', '[data-ad]'], 'every'),
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
          window.AmauiUtils.element().hasParent(['div']),
          window.AmauiUtils.element(14).hasParent(['div']),
          window.AmauiUtils.element(null).hasParent(['div']),
          window.AmauiUtils.element(true).hasParent(['div']),
          window.AmauiUtils.element('#a14').hasParent(['div']),
          window.AmauiUtils.element(window).hasParent(['div']),
          window.AmauiUtils.element(window.document).hasParent(['div']),
          window.AmauiUtils.element(window.document.documentElement).hasParent(['div']),
          window.AmauiUtils.element(window.document.body).hasParent(['div']),
          window.AmauiUtils.element(window.document.head).hasParent(['div']),
          window.AmauiUtils.element('#a1').hasParent(['div']),
          window.AmauiUtils.element(window.document.getElementById('a1')).hasParent(['div']),
          window.AmauiUtils.element('#a2').hasParent(['div']),
          window.AmauiUtils.element('#a3').hasParent(['div']),
          window.AmauiUtils.element('#a4').hasParent(['div']),
          window.AmauiUtils.element('body > div').hasParent(['div']),
          window.AmauiUtils.element('body > div').hasParent(['div#a4']),
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
            window.AmauiUtils.element().hasParent(['div'], true),
            window.AmauiUtils.element(14).hasParent(['div'], true),
            window.AmauiUtils.element(null).hasParent(['div'], true),
            window.AmauiUtils.element(true).hasParent(['div'], true),
            window.AmauiUtils.element('#a14').hasParent(['div'], true),
            window.AmauiUtils.element(window).hasParent(['div'], true),
            window.AmauiUtils.element(window.document).hasParent(['div'], true),
            window.AmauiUtils.element(window.document.documentElement).hasParent(['div'], true),
            window.AmauiUtils.element(window.document.body).hasParent(['div'], true),
            window.AmauiUtils.element(window.document.head).hasParent(['div'], true),
            window.AmauiUtils.element('#a1').hasParent(['div'], true),
            window.AmauiUtils.element(window.document.getElementById('a1')).hasParent(['div'], true),
            window.AmauiUtils.element('#a2').hasParent(['div'], true),
            window.AmauiUtils.element('#a3').hasParent(['div'], true),
            window.AmauiUtils.element('#a4').hasParent(['div'], true),
            window.AmauiUtils.element('body > div').hasParent(['div'], true),
            window.AmauiUtils.element('body > div').hasParent(['div#a4'], true),
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
            window.AmauiUtils.element().hasParent(['div'], false),
            window.AmauiUtils.element(14).hasParent(['div'], false),
            window.AmauiUtils.element(null).hasParent(['div'], false),
            window.AmauiUtils.element(true).hasParent(['div'], false),
            window.AmauiUtils.element('#a14').hasParent(['div'], false),
            window.AmauiUtils.element(window).hasParent(['div'], false),
            window.AmauiUtils.element(window.document).hasParent(['div'], false),
            window.AmauiUtils.element(window.document.documentElement).hasParent(['div'], false),
            window.AmauiUtils.element(window.document.body).hasParent(['div'], false),
            window.AmauiUtils.element(window.document.head).hasParent(['div'], false),
            window.AmauiUtils.element('#a1').hasParent(['div'], false),
            window.AmauiUtils.element(window.document.getElementById('a1')).hasParent(['div'], false),
            window.AmauiUtils.element('#a2').hasParent(['div'], false),
            window.AmauiUtils.element('#a3').hasParent(['div'], false),
            window.AmauiUtils.element('#a4').hasParent(['div'], false),
            window.AmauiUtils.element('body > div').hasParent(['div'], false),
            window.AmauiUtils.element('body > div').hasParent(['div#a4'], false),
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
          window.AmauiUtils.element('#a1').hasParent(),
          window.AmauiUtils.element('#a1').hasParent(['[a]', '[data-a]', '[data-ad]']),
          window.AmauiUtils.element('#a1').hasParent(['[a]', '[data-a]', '[data-ad]'], true, 'some'),
          window.AmauiUtils.element('#a1').hasParent(['div', '[a]'], 'every'),
          window.AmauiUtils.element('#a1').hasParent(['[a]', '[data-a]', '[data-ad]'], true, 'every'),
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
          window.AmauiUtils.element().hasParents(),
          window.AmauiUtils.element().hasParents(undefined),
          window.AmauiUtils.element().hasParents(14),
          window.AmauiUtils.element().hasParents(null),
          window.AmauiUtils.element().hasParents([]),
          window.AmauiUtils.element(14).hasParents(['div', window.document.querySelector('div#a4'), 'body', 'html']),
          window.AmauiUtils.element(null).hasParents(['div', window.document.querySelector('div#a4'), 'body', 'html']),
          window.AmauiUtils.element(true).hasParents(['div', window.document.querySelector('div#a4'), 'body', 'html']),
          window.AmauiUtils.element('#a14').hasParents(['div', window.document.querySelector('div#a4'), 'body', 'html']),
          window.AmauiUtils.element(window).hasParents(['div', window.document.querySelector('div#a4'), 'body', 'html']),
          window.AmauiUtils.element(window.document).hasParents(['div', window.document.querySelector('div#a4'), 'body', 'html']),
          window.AmauiUtils.element(window.document.documentElement).hasParents(['div', window.document.querySelector('div#a4'), 'body', 'html']),
          window.AmauiUtils.element(window.document.body).hasParents(['div', window.document.querySelector('div#a4'), 'body', 'html']),
          window.AmauiUtils.element(window.document.head).hasParents(['div', window.document.querySelector('div#a4'), 'body', 'html']),
          window.AmauiUtils.element('#a1').hasParents([window.document.querySelector('div#a4'), 'div', 'body', 'html']),
          window.AmauiUtils.element(window.document.getElementById('a1')).hasParents(['div', window.document.querySelector('div#a4'), 'body', 'html']),
          window.AmauiUtils.element('#a2').hasParents(['div', window.document.querySelector('div#a4'), 'body', 'html']),
          window.AmauiUtils.element('#a3').hasParents(['div', window.document.querySelector('div#a4'), 'body', 'html']),
          window.AmauiUtils.element('#a4').hasParents(['div', window.document.querySelector('div#a4'), 'body', 'html']),
          window.AmauiUtils.element('body > div').hasParents(['div', window.document.querySelector('div#a4'), 'body', 'html']),
          window.AmauiUtils.element('body > div').hasParents(['div', 'div#a14']),
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
            window.AmauiUtils.element().hasParents(),
            window.AmauiUtils.element().hasParents(undefined, true),
            window.AmauiUtils.element().hasParents(14, true),
            window.AmauiUtils.element().hasParents(null, true),
            window.AmauiUtils.element().hasParents([], true),
            window.AmauiUtils.element(14).hasParents(['div', window.document.querySelector('div#a4', true), 'body', 'html'], true),
            window.AmauiUtils.element(null).hasParents(['div', window.document.querySelector('div#a4', true), 'body', 'html'], true),
            window.AmauiUtils.element(true).hasParents(['div', window.document.querySelector('div#a4', true), 'body', 'html'], true),
            window.AmauiUtils.element('#a14').hasParents(['div', window.document.querySelector('div#a4', true), 'body', 'html'], true),
            window.AmauiUtils.element(window).hasParents(['div', window.document.querySelector('div#a4', true), 'body', 'html'], true),
            window.AmauiUtils.element(window.document).hasParents(['div', window.document.querySelector('div#a4', true), 'body', 'html'], true),
            window.AmauiUtils.element(window.document.documentElement).hasParents(['div', window.document.querySelector('div#a4', true), 'body', 'html'], true),
            window.AmauiUtils.element(window.document.body).hasParents(['div', window.document.querySelector('div#a4', true), 'body', 'html'], true),
            window.AmauiUtils.element(window.document.head).hasParents(['div', window.document.querySelector('div#a4', true), 'body', 'html'], true),
            window.AmauiUtils.element('#a1').hasParents([window.document.querySelector('div#a4', true), 'div', 'body', 'html'], true),
            window.AmauiUtils.element(window.document.getElementById('a1')).hasParents(['div', window.document.querySelector('div#a4', true), 'body', 'html'], true),
            window.AmauiUtils.element('#a2').hasParents(['div', window.document.querySelector('div#a4', true), 'body', 'html'], true),
            window.AmauiUtils.element('#a3').hasParents(['div', window.document.querySelector('div#a4', true), 'body', 'html'], true),
            window.AmauiUtils.element('#a4').hasParents(['div', window.document.querySelector('div#a4', true), 'body', 'html'], true),
            window.AmauiUtils.element('body > div').hasParents(['div', window.document.querySelector('div#a4', true), 'body', 'html'], true),
            window.AmauiUtils.element('body > div').hasParents(['div', 'div#a14'], true),
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
            window.AmauiUtils.element().hasParents(),
            window.AmauiUtils.element().hasParents(undefined, false),
            window.AmauiUtils.element().hasParents(14, false),
            window.AmauiUtils.element().hasParents(null, false),
            window.AmauiUtils.element().hasParents([], false),
            window.AmauiUtils.element().hasParents(['div', window.document.querySelector('div#a4'), 'body', 'html'], false),
            window.AmauiUtils.element(14).hasParents(['div', window.document.querySelector('div#a4'), 'body', 'html'], false),
            window.AmauiUtils.element(null).hasParents(['div', window.document.querySelector('div#a4'), 'body', 'html'], false),
            window.AmauiUtils.element(true).hasParents(['div', window.document.querySelector('div#a4'), 'body', 'html'], false),
            window.AmauiUtils.element('#a14').hasParents(['div', window.document.querySelector('div#a4'), 'body', 'html'], false),
            window.AmauiUtils.element(window).hasParents(['div', window.document.querySelector('div#a4'), 'body', 'html'], false),
            window.AmauiUtils.element(window.document).hasParents(['div', window.document.querySelector('div#a4'), 'body', 'html'], false),
            window.AmauiUtils.element(window.document.documentElement).hasParents(['div', window.document.querySelector('div#a4'), 'body', 'html'], false),
            window.AmauiUtils.element(window.document.body).hasParents(['div', window.document.querySelector('div#a4'), 'body', 'html'], false),
            window.AmauiUtils.element(window.document.head).hasParents(['div', window.document.querySelector('div#a4'), 'body', 'html'], false),
            window.AmauiUtils.element('#a1').hasParents([window.document.querySelector('div#a4'), 'div', 'body', 'html'], false),
            window.AmauiUtils.element(window.document.getElementById('a1')).hasParents(['div', window.document.querySelector('div#a4'), 'body', 'html'], false),
            window.AmauiUtils.element('#a2').hasParents(['div', window.document.querySelector('div#a4'), 'body', 'html'], false),
            window.AmauiUtils.element('#a3').hasParents(['div', window.document.querySelector('div#a4'), 'body', 'html'], false),
            window.AmauiUtils.element('#a4').hasParents(['div', window.document.querySelector('div#a4'), 'body', 'html'], false),
            window.AmauiUtils.element('body > div').hasParents(['div', window.document.querySelector('div#a4'), 'body', 'html'], false),
            window.AmauiUtils.element('body > div').hasParents(['div', 'div#a14'], false),
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
          window.AmauiUtils.element('#a1').hasParents(),
          window.AmauiUtils.element('#a1').hasParents(['[a]', '[data-a]', '[data-ad]']),
          window.AmauiUtils.element('#a1').hasParents(['[a]', '[data-a]', '[data-ad]'], true, 'some'),
          window.AmauiUtils.element('#a1').hasParents(['div', '[a]'], 'every'),
          window.AmauiUtils.element('#a1').hasParents(['[a]', '[data-a]', '[data-ad]'], true, 'every'),
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
