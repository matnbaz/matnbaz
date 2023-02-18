import { Color } from '../models/color.model';

export const createColorObject = (color: string): Color => {
  return {
    hexString: color,
  };
};

export function colorHexToDecimal(hex: string) {
  const chunks = [];
  let tmp, i;
  hex = hex.substr(1);
  if (hex.length === 3) {
    tmp = hex.split('');
    for (i = 0; i < 3; i++) {
      chunks.push(parseInt(tmp[i] + '' + tmp[i], 16));
    }
  } else if (hex.length === 6) {
    tmp = hex.match(/.{2}/g);
    for (i = 0; i < 3; i++) {
      chunks.push(parseInt(tmp[i], 16));
    }
  } else {
    throw new Error("'" + hex + "' is not a valid hex format");
  }

  return chunks;
}
