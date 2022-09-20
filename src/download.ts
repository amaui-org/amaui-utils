import isEnvironment from './isEnvironment';

const download = (
  name: string,
  data: any,
  type = 'application/json'
): void => {
  if (isEnvironment('browser')) {
    const a = document.createElement('a');

    a.download = name;

    a.href = data.startsWith(`data:`) ? data : `data:${type};charset=utf-8,${encodeURIComponent(data)}`;

    document.body.appendChild(a);

    // Trigger data download
    a.click();

    // Clean up
    a.remove();
  }
};

export default download;
