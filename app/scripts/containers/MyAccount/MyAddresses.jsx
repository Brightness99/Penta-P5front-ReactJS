// @flow
import React from 'react';
import Breadcrumbs from 'components/Breadcrumbs';
import { shouldComponentUpdate, isMobile } from 'utils/helpers';
import Collapse, { Panel } from 'rc-collapse';
import Loading from 'components/Loading';
import Modal from 'components/Modal';
import { AccordionMinusIcon, AccordionPlusIcon, Plus, PencilIcon, TrashIcon, AddressIcon } from 'components/Icons';
import { accountAddressDelete, accountAddressFetch, accountAddressFormReset } from 'actions';
import { connect } from 'react-redux';
import AddressFormModal from './AddressFormModal';

type Props = {
  screenSize: string,
  dispatch: () => {},
  account: {},
};

type State = {
  isExpanded: {
    shipping: false,
    billing: false,
  },
  createAddressModal: boolean,
  type: string,
};

export class MyAddresses extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isExpanded: false,
      createAddressModal: false,
      type: '',
    };
  }

  shouldComponentUpdate = shouldComponentUpdate;

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(accountAddressFetch());
  }

  static props: Props;

  static state: State;

  handleExpand = (pane) => {
    const { isExpanded } = this.state;

    this.setState({
      isExpanded: {
        ...isExpanded,
        [pane]: !isExpanded[pane],
      },
    });
  };

  handleCreateAddress = (type) => {
    const { dispatch } = this.props;

    dispatch(accountAddressFormReset());

    this.setState({
      createAddressModal: true,
      type,
    });

  };

  handleDeleteAddress = (ev) => {
    const { dispatch } = this.props;

    dispatch(accountAddressDelete(ev.currentTarget.value));
  };

  handleCloseModal = () => {
    this.setState({ createAddressModal: false });
  };

  renderAddButton(addressType) {
    const { screenSize } = this.props;

    if (isMobile(screenSize)) {
      return (
        <div className="btn-addresses--mobile">
          <button
            className="atm-button-transparent"
            value={addressType}
            onClick={() => this.handleCreateAddress(addressType)}
          >
            <AddressIcon />Novo endereço
          </button>
        </div>
      );
    }

    return (
      <button
        className="box-addNewAddress"
        value={addressType}
        onClick={() => this.handleCreateAddress(addressType)}
      >
        <i><Plus /></i>
      </button>
    );
  }

  renderItems(addresses) {
    const { screenSize } = this.props;

    if (!addresses) {
      return null;
    }

    return addresses.map((item) => (
      <div key={item.id}>
        <div className="headerTitle-address">
          <div>
            <h5>{item.receiver_name}</h5>
          </div>
          <div className="text-edit">
            <button
              value={item.id}
            >
              <PencilIcon />
              {!isMobile(screenSize) && 'Editar'}
            </button>
          </div>
          <div className="text-delete">
            <button
              value={item.id}
              onClick={this.handleDeleteAddress}
            >
              <TrashIcon />
              {!isMobile(screenSize) && 'Excluir'}
            </button>
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
    ));
  }

  renderPage() {
    const { isExpanded } = this.state;
    const { account: { addresses } } = this.props;

    return [
      <div key="shippingItems">
        <Collapse
          onChange={() => this.handleExpand('shipping')}
        >
          <Panel
            header={(
              <div className="header-accordion">
                {isExpanded.shipping ? <AccordionMinusIcon /> : <AccordionPlusIcon />}
                <h4 className="title-addresses">Endereços de entrega</h4>
              </div>
            )}
            headerClass="app__footer__links-header"
            showArrow={false}
          >
            <div>
              <div className="box-addressDelivery">
                {this.renderItems(addresses.shipping)}
                {this.renderAddButton('shipping')}
              </div>
            </div>
          </Panel>
        </Collapse>
      </div>,
      <div key="billingItems">
        <Collapse
          onChange={() => this.handleExpand('billing')}
        >
          <Panel
            header={(
              <div className="header-accordion">
                {isExpanded.billing ? <AccordionMinusIcon /> : <AccordionPlusIcon />}
                <h4 className="title-addresses">Endereços de cobrança</h4>
              </div>
            )}
            headerClass="app__footer__links-header"
            showArrow={false}
          >
            <div>
              <div className="box-addressDelivery">
                {this.renderItems(addresses.billing)}
                {this.renderAddButton('billing')}
              </div>
            </div>
          </Panel>
        </Collapse>
      </div>,
    ];
  }

  render() {
    const { screenSize, account: { addresses } } = this.props;
    const { createAddressModal, type } = this.state;

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
      },
    ];

    return (
      <section className="container-myaddresses">
        {createAddressModal &&
        <Modal handleCloseModal={this.handleCloseModal}>
          <AddressFormModal type={type} onCloseModal={this.handleCloseModal} />
        </Modal>}
        {isMobile(screenSize) && <Breadcrumbs links={breadcrumb} />}
        <h2>Minha conta</h2>
        <h3 className="subtitle-myAddresses">Meus endereços</h3>
        {!addresses.isLoaded || addresses.isLoading ? <Loading /> : this.renderPage()}
      </section>
    );
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

