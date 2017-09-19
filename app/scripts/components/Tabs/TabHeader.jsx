// @flow

import React from 'react';

type Props = {
  activeIndex: number,
  children: any,
  onClick: () => {},
};

const TabHeader = (props: Props) => {
  const { onClick, children, activeIndex } = props;

  const renderChildren = (child, tabIndex) => (
    React.cloneElement(
      child,
      {
        ...child.props,
        onClick,
        isTabActive: !Array.isArray(children) ? true : tabIndex === activeIndex,
        tabIndex,
      },
      child.props.children,
    )
  );

  return (
    <nav className="mol-tabs-header">
      {!Array.isArray(children)
        ? renderChildren(children, 0)
        : children.map((child, index) => renderChildren(child, index))
      }
    </nav>
  );
};

export default TabHeader;
