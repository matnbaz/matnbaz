import slugify from "slugify";

slugify.extend({
  "#": "sharp",
  "+": "plus",
  ".": "dot",
  "*": "star",
});

const languageMap: Record<string, string> = {
  "c--": "cminusminus",
};

export const slugifyLanguage = (text: string) =>
  languageMap[text.toLowerCase()] ?? slugify(text.toLowerCase());
