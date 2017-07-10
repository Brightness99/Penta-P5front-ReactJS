// @flow
import React from 'react';

type Props = {
  className: string,
  locale: {},
  button?: typeof React.Component,
  screenSize: string,
  product: {},
};

export class DetailsProductBlock extends React.Component {

  static defaultProps = {
    screenSize: 'xs',
  }

  props: Props;

  renderMobile() {
    return false;
  }

  renderDesktop() {
    const { product } = this.props;
    
    return (
      <section className="container-detailsProduct">
        <h4 className="detailsProduct-title">Detalhes do produto</h4>
        <div className="box-detailsProduct">
          <h5 className="detailsProduct-subtitle">{product.lp_title1}</h5>
          <div className="fnt-text" dangerouslySetInnerHTML={{ __html: product.lp_teaser1 }} />
        </div>
        <div className="box-detailsProduct">
          <h5 className="detailsProduct-subtitle">{product.lp_title2}</h5>
          <div className="fnt-text" dangerouslySetInnerHTML={{ __html: product.lp_teaser2 }} />
        </div>
      </section>
    );
  }

  render() {
    const { screenSize } = this.props;
    return (
      <div>
        {
          ['xs', 'is', 'sm', 'ix', 'md', 'im'].includes(screenSize)
            ? this.renderMobile()
            : this.renderDesktop()
        }
      </div>
    );
  }
}

export default DetailsProductBlock;
