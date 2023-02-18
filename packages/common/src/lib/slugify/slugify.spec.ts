import { slugifyLanguage } from './slugify';

describe('slugifyLanguage', () => {
  it('should work', () => {
    expect(slugifyLanguage('objective c')).toEqual('objective-c');
  });

  it('should work for exceptional languages', () => {
    expect(slugifyLanguage('.Net')).toEqual('dotnet');
    expect(slugifyLanguage('Cms-2')).toEqual('cms-2');
    expect(slugifyLanguage('C#')).toEqual('csharp');
    expect(slugifyLanguage('C++')).toEqual('cplusplus');
    expect(slugifyLanguage('C--')).toEqual('cminusminus');
    expect(slugifyLanguage('C*')).toEqual('cstar');
  });
});
