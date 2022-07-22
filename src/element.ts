import is from './is';
import isEnvironment from './isEnvironment';
import Try from './try';

export type TArrayMethod = 'every' | 'some';

export interface IElementObject {
  value?: Element;

  parent?: () => Element;
  parents?: (selectors?: Array<string | Element>, arrayMethod?: TArrayMethod) => Array<Element>;

  nearest?: (selector?: Array<string | Element>, arrayMethod?: TArrayMethod) => Element;
  furthest?: (selector?: Array<string | Element>, arrayMethod?: TArrayMethod) => Element;

  hasParent?: (selector: Array<string | Element>, grandparents?: boolean, arrayMethod?: TArrayMethod) => boolean;
  hasParents?: (selector: Array<string | Element>, unique?: boolean, arrayMethod?: TArrayMethod) => boolean;
}

function element(value: string | Element): IElementObject {
  const object: IElementObject = {};

  object.value = value as Element;

  if (is('string', value)) object.value = window.document.querySelector(value as string);

  if (!is('element', object.value)) delete object.value;

  const matches = (value_ = object.value) => {
    const method = is('element', value_) && (value_.matches || value_['webkitMatchesSelector'] || value_['mozMatchesSelector'] || value_['oMatchesSelector'] || value_['msMatchesSelector']);

    if (!method) return () => false;

    return method.bind(value_);
  };

  // Static
  // Mathces
  (element as any).matches = matches;

  // Parent
  object.parent = function (): Element {
    if (this.value && isEnvironment('browser') && this.value.parentNode) return this.value.parentNode as Element;
  };

  // Parents
  object.parents = function (selectors?: Array<string | Element>, arrayMethod = 'some'): Array<Element> {
    const parents = [];
    let parent = this.value;

    while (parent && (parent as unknown as Document) !== document) {
      parent = element(parent).parent();

      if (
        parent &&
        (
          !(selectors?.length) ||
          selectors[arrayMethod] && selectors[arrayMethod](item => Try(() => matches(parent)(item)))
        )
      ) parents.push(parent);
    }

    return parents;
  };

  // Nearest
  object.nearest = function (selectors: Array<string | Element>, arrayMethod = 'some'): Element {
    // Value matches
    // return itself in that use case
    if (
      !(selectors?.length) ||
      selectors[arrayMethod] && selectors[arrayMethod](item => Try(() => matches(this.value)(item)))
    ) return this.value;

    let parent = this.value;

    while (parent && (parent as unknown as Document) !== document) {
      parent = element(parent).parent();

      if (
        parent &&
        (
          !(selectors?.length) ||
          selectors[arrayMethod] && selectors[arrayMethod](item => Try(() => matches(parent)(item)))
        )
      ) return parent;
    }
  };

  // Furthest
  object.furthest = function (selectors: Array<string | Element>, arrayMethod = 'some'): Element {
    const parents = this.parents(selectors, arrayMethod);

    return parents[parents.length - 1];
  };

  // hasParent
  object.hasParent = function (selectors: Array<string | Element>, grandparents = true, arrayMethod = 'some'): boolean {
    let parent = this.value;

    if (!grandparents) return (
      !(selectors?.length) ||
      selectors[arrayMethod] && selectors[arrayMethod](item => Try(() => matches(this.parent())(item)))
    );

    while (parent && (parent as unknown as Document) !== document) {
      parent = element(parent).parent();

      if (
        parent &&
        (
          !(selectors?.length) ||
          selectors[arrayMethod] && selectors[arrayMethod](item => Try(() => matches(parent)(item)))
        )
      ) return true;
    }

    return false;
  };

  // hasParents
  // If unique is true, sort selectors argument by most specifc first
  // and lowest specificty last for the most proper result
  object.hasParents = function (selectors: Array<string | Element>, unique = true, arrayMethod = 'some'): boolean {
    if (!selectors?.length) return !!this.parent();

    const parents = this.parents();

    return !!(
      this.value &&
      (
        (selectors?.length) &&
        (
          selectors[arrayMethod] && selectors[arrayMethod](selector => {
            const index = parents.findIndex((item: Element) => is('string', selector) ? Try(() => matches(item)(selector)) : item === selector);

            if (index > -1) {
              if (unique) parents.splice(index, 1);

              return true;
            }

            return false;
          })
        )
      )
    );
  };

  return object;
}

export default element;
