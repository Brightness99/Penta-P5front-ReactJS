// @flow

import React from 'react';

type Props = {
  children: any,
  active: boolean,
  key: string,
  itemId: number,
  handleClick: () => {},
  onChange: () => {},
  icon: string,
};

const AccordionItem = (props: Props) => {
  const { children, active, key, handleClick, itemId, icon } = props;

  if (!Array.isArray(children)) {
    return (
      <div className="mol-accordion-item">
        {children}
      </div>
    );
  }

  return (
    <div
      className="mol-accordion-item"
      key={key}
      ref={(item) => this.item = item} // eslint-disable-line no-return-assign
    >
      {
        children.map((part) => React.cloneElement(
          part,
          {
            handleClick,
            ...part.props,
            active,
            key: `${part.type.displayName}-${itemId}`,
            value: itemId,
            icon,
          },
          part.props.children
        ))
      }
    </div>
  );
};

export default AccordionItem;

