import { DateObject } from '../models/date.model';

export const createDateObject = (date: Date): DateObject => {
  return {
    original: date,
  };
};
