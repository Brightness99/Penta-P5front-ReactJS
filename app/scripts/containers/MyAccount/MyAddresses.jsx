// @flow
import React from 'react';
import Breadcrumbs from 'components/Breadcrumbs';
import SVG from 'react-inlinesvg';
import Collapse, { Panel } from 'rc-collapse';
import { Link } from 'react-router-dom';
import { CodeBar, CheckIcon, Receipt, ExclamationMark, CloseIcon, Warning, Change, Archive, CalendarIcon, Plus, PencilIcon, TrashIcon, Address } from 'components/Icons';

type Props = {
  screenSize: string,
};

type State = {
  isExpanded: boolean,
};

export class MyAddresses extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isExpanded: false,
    };
  }

  static defaultProps = {
    screenSize: 'xs',
  };

  props: Props;
  state: State;

  AccordionClose = <SVG src={require('assets/media/svg/icon_accordionclose.svg')} key="accordion-closed" />;

  AccordionOpen = <SVG src={require('assets/media/svg/icon_accordionopen.svg')} key="accordion-open" />;

  renderMobile() {
    const { isExpanded } = this.state;
    const headerDelivery = (<div className="header-accordion">
      {isExpanded ? this.AccordionClose : this.AccordionOpen}
      <h4 className="title-addresses">Endereços de entrega</h4>
    </div>);
    const headerCollection = (<div className="header-accordion">
      {isExpanded ? this.AccordionClose : this.AccordionOpen}
      <h4 className="title-addresses">Endereços de cobrança</h4>
    </div>);
    return (
      <section className="container-myaddresses">
        <div className="container">
          <h2 className="title-myAddresses">Minha conta</h2>
          <h3 className="subtitle-myAddresses">Meus endereços</h3>
          <div>
            <Collapse
              onChange={this.handleExpand}
            >
              <Panel
                header={headerDelivery}
                headerClass="app__footer__links-header"
                showArrow={false}
              >
                <div>
                  <div className="box-addressDelivery">
                    <div>
                      <div className="headerTitle-address">
                        <div>
                          <h5>Minha Casa</h5>
                        </div>
                        <div className="text-edit">
                          <Link to="#"><i><PencilIcon /></i></Link>
                        </div>
                        <div className="text-delete">
                          <Link to="#"><i><TrashIcon /></i></Link>
                        </div>
                      </div>
                      <div className="details-address">
                        <div className="details">
                          <p className="firstDetail">Nome</p>
                          <p className="secondDetail">Diogo Capelo</p>
                        </div>
                        <div className="details">
                          <p className="firstDetail">Endereço</p>
                          <p className="secondDetail">Av. Brigadeiro Faria Lima, 1451 - Apt 102 Torre Pequim - Cocala</p>
                        </div>
                        <div className="details">
                          <p className="firstDetail">Cidade/UF</p>
                          <p className="secondDetail">Guarulhos/SP</p>
                        </div>
                        <div className="details">
                          <p className="firstDetail">CEP</p>
                          <p className="secondDetail">07130-000</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div>
                        <div className="headerTitle-address">
                          <div>
                            <h5>Casa da mãe</h5>
                          </div>
                          <div className="text-edit">
                            <Link to="#"><i><PencilIcon /></i></Link>
                          </div>
                          <div className="text-delete">
                            <Link to="#"><i><TrashIcon /></i></Link>
                          </div>
                        </div>
                        <div className="details-address">
                          <div className="details">
                            <p className="firstDetail">Nome</p>
                            <p className="secondDetail">Diogo Capelo</p>
                          </div>
                          <div className="details">
                            <p className="firstDetail">Endereço</p>
                            <p className="secondDetail">Av. Brigadeiro Faria Lima, 1451 - Apt 102 Torre Pequim - Cocala</p>
                          </div>
                          <div className="details">
                            <p className="firstDetail">Cidade/UF</p>
                            <p className="secondDetail">Guarulhos/SP</p>
                          </div>
                          <div className="details">
                            <p className="firstDetail">CEP</p>
                            <p className="secondDetail">07130-000</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="btn-addresses--mobile">
                    <Link to="#" className="btn-default btn-quarter fnt-bold btn-lg"><i><Address /></i>Novo endereço</Link>
                  </div>
                </div>
              </Panel>
            </Collapse>
          </div>

          <div>
            <Collapse
              onChange={this.handleExpand}
            >
              <Panel
                header={headerCollection}
                headerClass="app__footer__links-header"
                showArrow={false}
              >
                <div>
                  <div className="box-addressDelivery">
                    <div>
                      <div className="headerTitle-address">
                        <div>
                          <h5>Minha Casa</h5>
                        </div>
                        <div className="text-edit">
                          <Link to="#"><i><PencilIcon /></i></Link>
                        </div>
                        <div className="text-delete">
                          <Link to="#"><i><TrashIcon /></i></Link>
                        </div>
                      </div>
                      <div className="details-address">
                        <div className="details">
                          <p className="firstDetail">Nome</p>
                          <p className="secondDetail">Diogo Capelo</p>
                        </div>
                        <div className="details">
                          <p className="firstDetail">Endereço</p>
                          <p className="secondDetail">Av. Brigadeiro Faria Lima, 1451 - Apt 102 Torre Pequim - Cocala</p>
                        </div>
                        <div className="details">
                          <p className="firstDetail">Cidade/UF</p>
                          <p className="secondDetail">Guarulhos/SP</p>
                        </div>
                        <div className="details">
                          <p className="firstDetail">CEP</p>
                          <p className="secondDetail">07130-000</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div>
                        <div className="headerTitle-address">
                          <div>
                            <h5>Casa da mãe</h5>
                          </div>
                          <div className="text-edit">
                            <Link to="#"><i><PencilIcon /></i></Link>
                          </div>
                          <div className="text-delete">
                            <Link to="#"><i><TrashIcon /></i></Link>
                          </div>
                        </div>
                        <div className="details-address">
                          <div className="details">
                            <p className="firstDetail">Nome</p>
                            <p className="secondDetail">Diogo Capelo</p>
                          </div>
                          <div className="details">
                            <p className="firstDetail">Endereço</p>
                            <p className="secondDetail">Av. Brigadeiro Faria Lima, 1451 - Apt 102 Torre Pequim - Cocala</p>
                          </div>
                          <div className="details">
                            <p className="firstDetail">Cidade/UF</p>
                            <p className="secondDetail">Guarulhos/SP</p>
                          </div>
                          <div className="details">
                            <p className="firstDetail">CEP</p>
                            <p className="secondDetail">07130-000</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="btn-addresses--mobile">
                    <Link to="#" className="btn-default btn-quarter fnt-bold btn-lg"><i><Address /></i>Novo endereço</Link>
                  </div>
                </div>
              </Panel>
            </Collapse>
          </div>
        </div>
      </section>
    );
  }

  renderDesktop() {
    const { isExpanded } = this.state;
    const headerDelivery = (<div className="header-accordion">
      {isExpanded ? this.AccordionClose : this.AccordionOpen}
      <h4 className="title-addresses">Endereços de entrega</h4>
    </div>);
    const headerCollection = (<div className="header-accordion">
      {isExpanded ? this.AccordionClose : this.AccordionOpen}
      <h4 className="title-addresses">Endereços de cobrança</h4>
    </div>);
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
        title: 'Meus pedidos',
        url: '/meus-pedidos',
      },
      {
        title: 'Pedido nº483.093',
      },
    ];
    return (
      <section className="container-myaddresses">
        <Breadcrumbs links={breadcrumb} />
        <h2>Minha conta</h2>
        <h3 className="subtitle-myAddresses">Meus endereços</h3>

        <div>
          <Collapse
            onChange={this.handleExpand}
          >
            <Panel
              header={headerDelivery}
              headerClass="app__footer__links-header"
              showArrow={false}
            >
              <div>
                <div className="box-addressDelivery">
                  <div>
                    <div className="headerTitle-address">
                      <div>
                        <h5>Minha Casa</h5>
                      </div>
                      <div className="text-edit">
                        <Link to="#"><i><PencilIcon /></i>Editar</Link>
                      </div>
                      <div className="text-delete">
                        <Link to="#"><i><TrashIcon /></i>Excluir</Link>
                      </div>
                    </div>
                    <div className="details-address">
                      <div className="details">
                        <p className="firstDetail">Nome</p>
                        <p className="secondDetail">Diogo Capelo</p>
                      </div>
                      <div className="details">
                        <p className="firstDetail">Endereço</p>
                        <p className="secondDetail">Av. Brigadeiro Faria Lima, 1451 - Apt 102 Torre Pequim - Cocala</p>
                      </div>
                      <div className="details">
                        <p className="firstDetail">Cidade/UF</p>
                        <p className="secondDetail">Guarulhos/SP</p>
                      </div>
                      <div className="details">
                        <p className="firstDetail">CEP</p>
                        <p className="secondDetail">07130-000</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <div className="headerTitle-address">
                        <div>
                          <h5>Casa da mãe</h5>
                        </div>
                        <div className="text-edit">
                          <Link to="#"><i><PencilIcon /></i>Editar</Link>
                        </div>
                        <div className="text-delete">
                          <Link to="#"><i><TrashIcon /></i>Excluir</Link>
                        </div>
                      </div>
                      <div className="details-address">
                        <div className="details">
                          <p className="firstDetail">Nome</p>
                          <p className="secondDetail">Diogo Capelo</p>
                        </div>
                        <div className="details">
                          <p className="firstDetail">Endereço</p>
                          <p className="secondDetail">Av. Brigadeiro Faria Lima, 1451 - Apt 102 Torre Pequim - Cocala</p>
                        </div>
                        <div className="details">
                          <p className="firstDetail">Cidade/UF</p>
                          <p className="secondDetail">Guarulhos/SP</p>
                        </div>
                        <div className="details">
                          <p className="firstDetail">CEP</p>
                          <p className="secondDetail">07130-000</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="box-addNewAddress">
                    <Link to="#">
                      <i><Plus /></i>
                    </Link>
                  </div>
                </div>
              </div>
            </Panel>
          </Collapse>
        </div>

        <div>
          <Collapse
            onChange={this.handleExpand}
          >
            <Panel
              header={headerCollection}
              headerClass="app__footer__links-header"
              showArrow={false}
            >
              <div>
                <div className="box-addressDelivery">
                  <div>
                    <div className="headerTitle-address">
                      <div>
                        <h5>Minha Casa</h5>
                      </div>
                      <div className="text-edit">
                        <Link to="#"><i><PencilIcon /></i>Editar</Link>
                      </div>
                      <div className="text-delete">
                        <Link to="#"><i><TrashIcon /></i>Excluir</Link>
                      </div>
                    </div>
                    <div className="details-address">
                      <div className="details">
                        <p className="firstDetail">Nome</p>
                        <p className="secondDetail">Diogo Capelo</p>
                      </div>
                      <div className="details">
                        <p className="firstDetail">Endereço</p>
                        <p className="secondDetail">Av. Brigadeiro Faria Lima, 1451 - Apt 102 Torre Pequim - Cocala</p>
                      </div>
                      <div className="details">
                        <p className="firstDetail">Cidade/UF</p>
                        <p className="secondDetail">Guarulhos/SP</p>
                      </div>
                      <div className="details">
                        <p className="firstDetail">CEP</p>
                        <p className="secondDetail">07130-000</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <div className="headerTitle-address">
                        <div>
                          <h5>Casa da mãe</h5>
                        </div>
                        <div className="text-edit">
                          <Link to="#"><i><PencilIcon /></i>Editar</Link>
                        </div>
                        <div className="text-delete">
                          <Link to="#"><i><TrashIcon /></i>Excluir</Link>
                        </div>
                      </div>
                      <div className="details-address">
                        <div className="details">
                          <p className="firstDetail">Nome</p>
                          <p className="secondDetail">Diogo Capelo</p>
                        </div>
                        <div className="details">
                          <p className="firstDetail">Endereço</p>
                          <p className="secondDetail">Av. Brigadeiro Faria Lima, 1451 - Apt 102 Torre Pequim - Cocala</p>
                        </div>
                        <div className="details">
                          <p className="firstDetail">Cidade/UF</p>
                          <p className="secondDetail">Guarulhos/SP</p>
                        </div>
                        <div className="details">
                          <p className="firstDetail">CEP</p>
                          <p className="secondDetail">07130-000</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="box-addNewAddress">
                    <Link to="#">
                      <i><Plus /></i>
                    </Link>
                  </div>
                </div>
              </div>
            </Panel>
          </Collapse>
        </div>
      </section>
    );
  }

  render() {
    const { screenSize } = this.props;

    return ['xs', 'is', 'sm', 'ix', 'md', 'im'].includes(screenSize)
      ? this.renderMobile()
      : this.renderDesktop();
  }
}

export default MyAddresses;
