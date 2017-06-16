import React from 'react';
import makeDisplayName from '../makeDisplayName';


const FunctionalComponent = () => (
  <span>Funtional Component</span>
);

// eslint-disable-next-line react/prefer-stateless-function
class ClassComponent extends React.Component {
  render() {
    return (
      <span>Class Component</span>
    );
  }
}


describe('utils#makeDisplayName()', () => {
  test('Should be make displayName', () => {
    expect(makeDisplayName(FunctionalComponent, 'test'))
      .toBe('test(FunctionalComponent)');

    expect(makeDisplayName(ClassComponent, 'test'))
      .toBe('test(ClassComponent)');

    expect(makeDisplayName(() => {}, 'test'))
      .toBe('test(Component)');

    expect(() => {
      makeDisplayName(null, '');
    }).toThrow();
  });
});
