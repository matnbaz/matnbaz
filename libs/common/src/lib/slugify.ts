import slugify from 'slugify';

slugify.extend({
  '#': 'sharp',
  '+': 'plus',
  '.': 'dot',
  '*': 'star',
});

const languageMap = {
  'c--': 'cminusminus',
};

export const slugifyLanguage = (string) =>
  languageMap[string.toLowerCase()] || slugify(string.toLowerCase());
