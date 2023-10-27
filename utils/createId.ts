/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { ReactElement, ReactNode } from 'react';

function flatten(children: ReactNode): string {
  return React.Children.toArray(children).reduce((text: string, child: ReactNode) => {
    if (typeof child === 'string') {
      return text + child;
    }
    if (React.isValidElement(child)) {
      const childElement = child as ReactElement;
      return (
        text + (childElement.props.children ? flatten(childElement.props.children) : '')
      );
    }
    return text;
  }, '');
}

export default function createId(children: ReactNode): string {
  const text = flatten(children);
  return text.replace(/#/g, '').replace(/ /g, '-').toLowerCase();
}
