export const nullToUndefined = <T>(value: T, callback = (value) => value) =>
  value ? callback(value) : undefined;
