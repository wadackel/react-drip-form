import getShallowFilteredValues from '../getShallowFilteredValues';


describe('utils#getShallowFilteredValues()', () => {
  test('Should be get shallow filtered values', () => {
    expect(getShallowFilteredValues({
      nul: null,
      und: undefined,
      empty: '',
      num: 0,
      num1: 1,
      str: 'string',
      arr: [],
      nest: {
        nul: null,
        und: undefined,
        empty: '',
      },
    })).toEqual({
      num: 0,
      num1: 1,
      str: 'string',
      arr: [],
      nest: {
        nul: null,
        und: undefined,
        empty: '',
      },
    });
  });
});
