import isBrowser from './isBrowser';
import isOS from './isOS';
import getCountry from './getCountry';
import { ICountry } from './countries';

interface IUserIPandLocation {
  ip_address: string;
  country_code: string;
}

interface IUserOSandBrowser {
  browser: {
    name: string;
    version: string;
    major_version: string;
    agent: string;
    language: string;
  };
  os: {
    platform: string;
  };
}

interface UserLocalInfo extends IUserOSandBrowser {
  ip_address: string;
  country: ICountry;
}

export const getUserIPandLocation = async (): Promise<IUserIPandLocation> => {
  try {
    let data: any = await fetch(`https://www.cloudflare.com/cdn-cgi/trace`);

    data = await data.text();

    const items = data.split('\n');

    const ip_address = items.find((item: string | string[]) => item.indexOf('ip') === 0).slice(3);
    const country_code = items.find((item: string | string[]) => item.indexOf('loc') === 0).slice(4);

    return {
      ip_address,
      country_code,
    };
  }
  catch (error) {
    console.log(error);
  }
};

export const getUserOSandBrowser = (): IUserOSandBrowser => {
  const result: any = {};
  const meta = {
    os: ['mac', 'ios', 'windows', 'linux'],
    browser: ['chrome', 'opera', 'safari', 'firefox', 'edge-chromium', 'edge', 'ie'],
  };

  meta.os.forEach(item => {
    if (isOS(item)) result['os'] = item;
  });
  meta.browser.forEach(item => {
    if (isBrowser(item)) result['browser'] = item;
  });

  switch (result.browser) {
    case 'chrome':
      result['version'] = navigator.userAgent.split('Chrome/')[1].split(' ')[0];
      break;

    case 'firefox':
      result['version'] = navigator.userAgent.split('Firefox/')[1];
      break;

    case 'opera':
      result['version'] = navigator.userAgent.split('OPR/')[1];
      break;

    case 'safari':
      result['version'] = navigator.userAgent.split('Safari/')[1];
      break;

    case 'edge-chromium':
      result['version'] = navigator.userAgent.split('Edg/')[1];
      break;

    case 'edge':
      result['version'] = navigator.userAgent.split('Edg/')[1];
      break;

    case 'ie':
      result['version'] = (
        (navigator.userAgent.indexOf('MSIE 10') > -1 && '10') ||
        (navigator.userAgent.indexOf('rv:11') > -1 && '11') ||
        '1'
      );
      break;

    default:
      break;
  }

  return {
    browser: {
      name: result.browser,
      version: result.version,
      major_version: result.version?.split('.')[0],
      agent: navigator.userAgent,
      language: navigator.language,
    },
    os: {
      platform: result.os,
    },
  };
};

const getUserLocalInfo = async (): Promise<UserLocalInfo> => {
  const IPandLocation = await getUserIPandLocation();

  const country = getCountry(IPandLocation.country_code);
  const osAndBrowser = getUserOSandBrowser();

  return {
    ip_address: IPandLocation.ip_address,
    country,
    ...osAndBrowser,
  };
};

export default getUserLocalInfo;
