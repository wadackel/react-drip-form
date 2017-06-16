import cancelEvent from '../cancelEvent';


describe('utils#createFieldProps()', () => {
  test('Should be cancel event', () => {
    const mock = {
      stopPropagation: jest.fn(),
      preventDefault: jest.fn(),
    };

    expect(mock.stopPropagation.mock.calls.length).toBe(0);
    expect(mock.preventDefault.mock.calls.length).toBe(0);

    cancelEvent(mock);

    expect(mock.stopPropagation.mock.calls.length).toBe(1);
    expect(mock.preventDefault.mock.calls.length).toBe(1);
  });


  test('Should not be cancel other than event object', () => {
    let mock = {
      stopPropagation: jest.fn(),
    };

    expect(mock.stopPropagation.mock.calls.length).toBe(0);
    cancelEvent(mock);
    expect(mock.stopPropagation.mock.calls.length).toBe(0);

    mock = {
      preventDefault: jest.fn(),
    };

    expect(mock.preventDefault.mock.calls.length).toBe(0);
    cancelEvent(mock);
    expect(mock.preventDefault.mock.calls.length).toBe(0);
  });
});
