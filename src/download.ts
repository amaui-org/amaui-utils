import isEnvironment from './isEnvironment';
import isValid from './isValid';

const download = (
  name: string,
  data: any,
  type = 'application/json'
): void => {
  if (isEnvironment('browser')) {
    const a = document.createElement('a');

    a.download = name;
    a.href = isValid('data-uri', data) ? data : `data:${type};charset=utf-8,${encodeURIComponent(data)}`;

    document.body.appendChild(a);

    // Trigger data download
    a.click();

    // Clean up
    a.remove();
  }
};

export default download;
