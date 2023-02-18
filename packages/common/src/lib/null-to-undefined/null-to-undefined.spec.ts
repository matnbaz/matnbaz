import { nullToUndefined } from './null-to-undefined';

describe('nullToUndefined', () => {
  it('should work', () => {
    expect(nullToUndefined('non null value')).toEqual('non null value');
    expect(nullToUndefined(null)).toEqual(undefined);
    expect(nullToUndefined(1, (value) => ({ target: value }))).toEqual({
      target: 1,
    });
    expect(nullToUndefined(null, (value) => ({ target: value }))).toEqual(
      undefined
    );
  });
});
