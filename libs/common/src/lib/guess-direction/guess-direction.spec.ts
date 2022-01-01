import { guessDirection } from './guess-direction';

describe('guessDirection', () => {
  it('should work', () => {
    expect(
      guessDirection('متن فارسی که باید راست‌چین تشخیص داده شود.')
    ).toEqual('RTL');

    expect(
      guessDirection('English text that should be determined as left-ro-right.')
    ).toEqual('LTR');

    expect(
      guessDirection(
        'This one is mixed up (قاطی‌شده), so should be RTL as a default.'
      )
    ).toEqual('RTL');
  });
});
