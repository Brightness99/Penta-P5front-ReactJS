// @flow
import React from 'react';
import Breadcrumbs from 'components/Breadcrumbs';
import { Link } from 'react-router-dom';
import { CodeBar, CheckIcon, Receipt, ExclamationMark, CloseIcon, Warning, Change, Archive, CalendarIcon, ArrowCarousel, PencilIcon, TrashIcon } from 'components/Icons';

type Props = {
  screenSize: string,
};

export class Cloud extends React.Component {
  static defaultProps = {
    screenSize: 'xs',
  };

  static props: Props;

  render() {
    return (
      <p className="testando">cloud</p>
    );
  }
}

export default Cloud;
