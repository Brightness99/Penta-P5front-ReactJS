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
  warrantInformation: {},
  settingsPageLink: {},
  informations: {},
  categories: {},
  tutorials: {},
};

export class PrintiProductBlock extends React.Component {
  static defaultProps = {
    screenSize: 'xs',
  };

  props: Props;

  renderMobile() {
    return false;
  }

  renderDesktop() {
    const { product, warrantInformation, settingsPageLink, informations, categories, tutorials } = this.props;
    //informations é a parte de dicas, como utilizar ...
    //settingsPageLink é o link que vai para a página de configurações
    //warrantInformation
    //categories
    //console.log('product', product);
    //console.log('warrantInformation', warrantInformation);
    //console.log('settingsPageLink', settingsPageLink);
    //console.log('informações', informations);
    //console.log('categorias', categories);
    //console.log('tutorial', tutorials);

    const styles = {
      backgroundImage: `url('${require('../../../../assets/media/images/bg-imprima.png')}')`,
      backgroundSize: 'cover',
    };

    return (
      <section className="container-printiProduct" style={styles}>
        <h4 className="printiProduct-title">Imprima já o seu {product.title} pelo melhor preço</h4>
        <div className="box-btn-printiProduct">
          <button className="btn-default btn-primary btn-lg">
            <Link to="{'settingsPageLink'}">
            configure aqui
            </Link>
          </button>
        </div>
        <p className="fnt-text">Ainda tem dúvida? Ligue já (11) 4130-3799</p>
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
