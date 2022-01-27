export const limitWords = (text: string, maxLength = 256) => {
  // return the original string if the length is less than max length
  if (text.length <= maxLength) return text;

  // trim the string to the maximum length
  let trimmedString = text.substr(0, maxLength);

  // re-trim if we are in the middle of a word so it wo-...
  trimmedString = trimmedString.substr(
    0,
    Math.min(trimmedString.length, trimmedString.lastIndexOf(' '))
  );

  return trimmedString.length > 0 ? trimmedString + '...' : null;
};
