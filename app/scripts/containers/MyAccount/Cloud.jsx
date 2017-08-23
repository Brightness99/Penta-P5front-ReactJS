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
    const breadcrumb = [
      {
        title: 'Home',
        url: '/',
      },
      {
        title: 'Minha conta',
        url: '/minha-conta',
      },
      {
        title: 'Cloud',
      },
    ];
    return (
      <div className="container-cloud">
        <Breadcrumbs links={breadcrumb} />
        <h2>Minha conta</h2>
        <h3 className="subtitle-cloud">cloud</h3>
        <div>
          <div>
            <label>Data inicial:</label>
            <input type="date" />
          </div>
          <div>  
            <label>Data final:</label>
            <input type="date" />
          </div>
        </div>
      </div>
    );
  }
}

export default Cloud;
