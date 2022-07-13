
export default function isExists(
  type: string
) {
  switch (type) {
    case 'Intl':
      return typeof Intl !== 'undefined';

    default:
      return false;
  }
}
