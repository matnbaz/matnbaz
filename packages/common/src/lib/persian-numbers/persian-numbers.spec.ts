import { persianNumbers } from './persian-numbers';

describe('persianNumbers', () => {
  it('should work', () => {
    expect(persianNumbers('87')).toEqual('۸۷');
  });

  it('should work with strings with numbers', () => {
    expect(persianNumbers("The bite of '87")).toEqual("The bite of '۸۷");
  });
});
