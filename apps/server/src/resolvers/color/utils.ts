import { Color } from '../../models/color.model';

export const createColorObject = (color: string): Color => {
  return {
    hexString: color,
  };
};
