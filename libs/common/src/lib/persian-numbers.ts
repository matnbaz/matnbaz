export const persianNumbers = (string: number | string) => {
  if (typeof string === 'number') return string.toLocaleString('fa');
  if (typeof string !== 'string') return '';

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
