export const normalizeTelegramUsername = (username: string) =>
  (username.startsWith('@') ? '' : '@') + username;
