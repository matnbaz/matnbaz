import { humanlyReadableDate } from './humanly-readable-date';

describe('humanlyReadableDate', () => {
  it('should work', () => {
    expect(
      humanlyReadableDate(
        new Date('Thu Nov 25 2021 15:17:08 GMT+0330 (Iran Standard Time)')
      )
    ).toEqual('4 آذر 1400');
  });
});
