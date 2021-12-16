const gradients = [
  'linear-gradient(to right, rgb(236, 72, 153), rgb(239, 68, 68), rgb(245, 158, 11))',
  'linear-gradient(to right, rgb(110, 231, 183), rgb(59, 130, 246), rgb(147, 51, 234))',
  'linear-gradient(to right, rgb(165, 180, 252), rgb(192, 132, 252))',
  'linear-gradient(to right, rgb(251, 113, 133), rgb(217, 70, 239), rgb(99, 102, 241))',
  'linear-gradient(to right, rgb(192, 38, 211), rgb(219, 39, 119))',
  'radial-gradient(at right center, rgb(56, 189, 248), rgb(49, 46, 129))',
  'linear-gradient(to right, #fc00ff, #00dbde)',
];
const alphabet = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

export const getGradientFromString = (input: string) => {
  const alphabetParts = Math.floor(26 / gradients.length);
  let remainingIndex = alphabet.indexOf(input[0]);
  let indexCount = -1;

  const chooseGradient = () => {
    if (indexCount + 1 >= gradients.length) return;
    remainingIndex -= alphabetParts;
    indexCount++;
    if (remainingIndex < 0) return;
    chooseGradient();
  };

  chooseGradient();

  return gradients[indexCount];
};
