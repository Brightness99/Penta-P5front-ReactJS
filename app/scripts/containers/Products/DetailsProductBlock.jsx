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
  props: Props;

  render() {
    const { product } = this.props;

    return (
      <section className="container-detailsProduct">
        <h4 className="detailsProduct-title">Detalhes do produto</h4>
        <div className="box-detailsProduct">
          <h5 className="detailsProduct-subtitle">{product.template_title1}</h5>
          <div className="fnt-text" dangerouslySetInnerHTML={{ __html: product.template_teaser1 }} />
        </div>
        <div className="box-detailsProduct">
          <h5 className="detailsProduct-subtitle">{product.template_title2}</h5>
          <div className="fnt-text" dangerouslySetInnerHTML={{ __html: product.template_teaser2 }} />
        </div>
      </section>
    );
  }
}

export default DetailsProductBlock;
