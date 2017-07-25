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
  static defaultProps = {
    screenSize: 'xs',
  };

  props: Props;

  renderMobile() {
    return false;
  }

  textTitle() {
    const { product, print } = this.props;
    return (
      print.TITLE.replace('%s', product.title)
    );
  }

  renderDesktop() {
    const { print } = this.props;

    const styles = {
      backgroundImage: `url('${require('../../../../assets/media/images/bg-imprima.png')}')`,
      backgroundSize: 'cover',
    };

    return (
      <section className="container-printiProduct" style={styles}>
        <h4 className="printiProduct-title">{this.textTitle()}</h4>
        <div className="box-btn-printiProduct">
          <Link className="btn-default btn-primary btn-lg" to="{'settingsPageLink'}">
          configure aqui
          </Link>
        </div>
        <p className="fnt-text">{print.QUESTIONS}</p>
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

export default PrintiProductBlock;
