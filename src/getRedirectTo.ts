
const getRedirectTo = (value: string = undefined): string => encodeURIComponent(value !== undefined ? value : `${window.location.pathname}${window.location.search}`);

export default getRedirectTo;
