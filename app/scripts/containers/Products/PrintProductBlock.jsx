// @flow
import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  className: string,
  locale: {},
  button?: typeof React.Component,
  screenSize: string,
  products: {},
  product: {},
  print: {},
};

export class PrintiProductBlock extends React.Component {

  props: Props;

  textTitle() {
    const { product, print } = this.props;
    return (
      print.TITLE.replace('%s', product.title)
    );
  }

  render() {
    const { print } = this.props;

    const styles = {
      backgroundImage: `url('${require('../../../../assets/media/images/bg-imprima.png')}')`,
      backgroundSize: 'cover',
    };

    return (
      <div className="container">
        <section className="container-printiProduct" style={styles}>
          <h4 className="printiProduct-title">{this.textTitle()}</h4>
          <div className="box-btn-printiProduct">
            <Link className="btn-default btn-primary btn-lg" to="{'settingsPageLink'}">
            configure este produto
            </Link>
          </div>
          <p className="fnt-text">{print.QUESTIONS}</p>
        </section>
      </div>  
    );
  }

}

export default PrintiProductBlock;
