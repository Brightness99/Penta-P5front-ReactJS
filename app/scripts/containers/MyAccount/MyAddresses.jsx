// @flow
import React from 'react';
import Breadcrumbs from 'components/Breadcrumbs';
import SVG from 'react-inlinesvg';
import Collapse, { Panel } from 'rc-collapse';
import { Link } from 'react-router-dom';
import Loading from 'components/Loading';
import { CodeBar, CheckIcon, Receipt, ExclamationMark, CloseIcon, Warning, Change, Archive, CalendarIcon, Plus, PencilIcon, TrashIcon, AddressIcon } from 'components/Icons';
import { accountAddressCreate, accountAddressDelete, accountAddressFetch } from 'actions';
import { connect } from 'react-redux';

type Props = {
  screenSize: string,
  dispatch: () => {},
  account: {},
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

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(accountAddressFetch());
  }

  props: Props;
  state: State;

  AccordionClose = <SVG src={require('assets/media/svg/icon_accordionclose.svg')} key="accordion-closed" />;

  AccordionOpen = <SVG src={require('assets/media/svg/icon_accordionopen.svg')} key="accordion-open" />;

  handleCreateAddress = () => {
    const { dispatch } = this.props;

    const dataToCreate = {
      type: 'billing',
      receiver_name: 'Adam Holman',
      zipcode: '01419-002',
      city: 'São Paulo',
      neighborhood: 'Cerqueira César',
      state: 'SP',
      street: 'Alameda Santos',
      number: '2131',
      additional_address: null
    };

    //dispatch(accountAddressCreate(dataToCreate));
  }

  handleDeleteAddress = (id) => {
    const { dispatch } = this.props;

    dispatch(accountAddressDelete({
      id: id.toString()
    }));
  }

  renderDesktopItems(type) {

    const { account } = this.props;

    if (account.addresses.isLoaded && !account.addresses.isRunning) {
      return account.addresses[type].map((item) => {
        return (
          <div key={item.id.toString()}>
            <div className="headerTitle-address">
              <div>
                <h5>{item.receiver_name}</h5>
              </div>
              <div className="text-edit">
                <Link to="#"><i><PencilIcon /></i>Editar</Link>
              </div>
              <div className="text-delete" onClick={() => this.handleDeleteAddress(item.id)}>
                <Link to="#"><i><TrashIcon /></i>Excluir</Link>
              </div>
            </div>
            <div className="details-address">
              <div className="details">
                <p className="firstDetail">Nome</p>
                <p className="secondDetail">{item.receiver_name}</p>
              </div>
              <div className="details">
                <p className="firstDetail">Endereço</p>
                <p className="secondDetail">{item.additional_address} {item.street}</p>
              </div>
              <div className="details">
                <p className="firstDetail">Cidade/UF</p>
                <p className="secondDetail">{item.city}/{item.state}</p>
              </div>
              <div className="details">
                <p className="firstDetail">CEP</p>
                <p className="secondDetail">{item.zipcode}</p>
              </div>
            </div>
          </div>
        );
      });
    }

    return (
      <Loading />
    );
  }

  renderMobileItems(type) {
    const { account } = this.props;

    if (account.addresses.isLoaded && !account.addresses.isRunning) {
      return account.addresses[type].map((item) => {
        return (
          <div className="box-addressDelivery" key={item.id.toString()}>
            <div>
              <div className="headerTitle-address">
                <div>
                  <h5>{item.receiver_name}</h5>
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
                  <p className="secondDetail">{item.receiver_name}</p>
                </div>
                <div className="details">
                  <p className="firstDetail">Endereço</p>
                  <p className="secondDetail">{item.additional_address} {item.street}</p>
                </div>
                <div className="details">
                  <p className="firstDetail">Cidade/UF</p>
                  <p className="secondDetail">{item.city}/{item.state}</p>
                </div>
                <div className="details">
                  <p className="firstDetail">CEP</p>
                  <p className="secondDetail">{item.zipcode}</p>
                </div>
              </div>
            </div>
          </div>
        );
      });
    }

    return (
      <Loading />
    );
  }

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
                  {this.renderMobileItems('shipping')}
                  <div className="btn-addresses--mobile">
                    <Link to="#" className="btn-default btn-quarter fnt-bold btn-lg"><i><AddressIcon /></i>Novo endereço</Link>
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
                  {this.renderMobileItems('billing')}
                  <div className="btn-addresses--mobile">
                    <Link to="#" className="btn-default btn-quarter fnt-bold btn-lg"><i><AddressIcon /></i>Novo endereço</Link>
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
    const { account } = this.props;
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
    let shippingItems = account.shipping ? this.renderDesktopItems(account.shipping) : {};
    let billingItems = account.billing ? this.renderDesktopItems(account.billing) : {};

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
                  {this.renderDesktopItems('shipping')}
                  <div className="box-addNewAddress">
                    <Link to="#" onClick={this.handleCreateAddress}>
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
                  {this.renderDesktopItems('billing')}
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

function mapStateToProps(state) {
  return {
    account: state.account,
  };
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAddresses);

