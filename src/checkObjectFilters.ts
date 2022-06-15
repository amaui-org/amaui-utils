import { is, isValid } from './is';
import getObjectValue from './getObjectValue';
import { IFilter } from './models';

const checkObjectFilters = (value: object, filters: Array<IFilter> = [], operator: 'or' | 'and' = 'or'): boolean => {
  // If there are no filters,
  // it means that the check passes,
  // as there is nothing to filter
  if (
    !filters ||
    (!is('array', filters) || !filters.length)
  ) return true;

  const result = filters[operator === 'or' ? 'some' : 'every'](filter => {
    const valueObject = getObjectValue(value, filter.field);

    // If value doesn't exists (it is undefined),
    // and operator is of not-* type in that use case
    // any value is not undefined thus this check's true
    if (
      valueObject === undefined &&
      filter.operator.indexOf('not-') === 0
    ) return true;

    return isValid('compare', undefined, { valueA: valueObject, valueB: filter.value, operator: filter.operator });
  });

  return result;
};

export default checkObjectFilters;
