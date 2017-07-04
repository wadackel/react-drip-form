/* eslint-disable react/prop-types */
/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';

export const TabPanel = ({ id, children, ...rest }) => (
  <div {...rest}>
    {children}
  </div>
);

export class Tab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 'app',
    };
  }

  render() {
    const { children, current } = this.props;

    const panels = React.Children.map(children, (child) => {
      if (child.type.displayName !== 'TabPanel') {
        return child;
      }

      const style = {
        display: 'none',
      };

      if (current === child.props.id) {
        style.display = 'block';
      }

      return React.cloneElement(child, {
        ...child.props,
        style: {
          ...(child.props.style || {}),
          ...style,
        },
      });
    });

    return (
      <div>{panels}</div>
    );
  }
}
