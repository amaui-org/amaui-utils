
export type TIsExistsType = 'Intl';

export default function isExists(
  type: TIsExistsType
) {
  switch (type) {
    case 'Intl':
      return typeof Intl !== 'undefined';

    default:
      return false;
  }
}
