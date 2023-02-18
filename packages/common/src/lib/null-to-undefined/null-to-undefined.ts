export const nullToUndefined = <T>(
  value: T,
  callback: (value: T) => any = (value) => value
) => (value ? callback(value) : undefined);
