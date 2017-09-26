// @flow
import React from 'react';
import Breadcrumbs from 'components/Breadcrumbs';
import { Link } from 'react-router-dom';

type Props = {
  screenSize: string,
};

export class ArtProposalContent extends React.Component {
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

export default ArtProposalContent;
