import { is, isEnvironment } from './is';
import getQueryParams from './getQueryParams';

const updateQueryParams = (value = {}, override = true): void => {
  if (isEnvironment('browser')) {
    const queryParams = getQueryParams();

    if (is('object', value)) Object.keys(value).forEach(key => {
      const newParamValue = value[key];

      if (
        (!queryParams.hasOwnProperty(key) || override) &&
        newParamValue !== undefined
      ) queryParams[key] = encodeURIComponent(newParamValue);

      if (
        override &&
        queryParams.hasOwnProperty(key) &&
        newParamValue === undefined
      ) delete queryParams[key];
    });

    const queryParamsString = Object.keys(queryParams).map(key => `${encodeURIComponent(key)}=${queryParams[key]}`).join('&');

    window.history.replaceState(null, null, `?${queryParamsString}`);
  }
};

export default updateQueryParams;
