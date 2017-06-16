// @flow
import isEvent from './isEvent';

const cancelEvent = (e: any): void => {
  if (isEvent(e)) {
    e.stopPropagation();
    e.preventDefault();
  }
};

export default cancelEvent;
