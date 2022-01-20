export const persianNumbers = (
  string: number | string,
  replaceManually = false
) => {
  if (typeof window === 'undefined') string = string.toString();
  if (typeof string === 'number' && !replaceManually)
    return string.toLocaleString('fa');
  string = string.toString();

  const map = {
    1: '۱',
    2: '۲',
    3: '۳',
    4: '۴',
    5: '۵',
    6: '۶',
    7: '۷',
    8: '۸',
    9: '۹',
    0: '۰',
  };

  return string.replace(/[1234567890]/g, (m) => map[m]);
};
