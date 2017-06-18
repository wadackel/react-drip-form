import { Validator as _Validator } from 'drip-form-validator';
import { Validator, dripForm, dripFormField } from '../';


describe('exports', () => {
  test('Should be module exports', () => {
    expect(Validator).toEqual(_Validator);
    expect(typeof dripForm).toBe('function');
    expect(typeof dripFormField).toBe('function');
  });
});
