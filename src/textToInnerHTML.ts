import Try from './try';

const textToInnerHTML = (value: any = '') => Try(() => (decodeURIComponent(value) as any).replaceAll('&nbsp;', ' '));

export default textToInnerHTML;
