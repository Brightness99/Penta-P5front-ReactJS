// @flow

import React from 'react';

type Props = {
  children: any,
};

const AccordionItem = (props: Props) => {
  return (
    <div className="mol-accordion-item">
      {props.children}
    </div>
  );
};

export default AccordionItem;
