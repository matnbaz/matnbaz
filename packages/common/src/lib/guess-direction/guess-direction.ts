export const guessDirection = (text: string) =>
  text.match(/[\u0600-\u06FF\uFB8A\u067E\u0686\u06AF\u200C\u200F]/g)
    ? 'RTL'
    : 'LTR';
