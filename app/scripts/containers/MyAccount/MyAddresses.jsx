// @flow
import React from 'react';
import swal from 'sweetalert2';
import { shouldComponentUpdate, isMobile } from 'utils/helpers';
import Collapse, { Panel } from 'rc-collapse';
import Loading from 'components/Loading';
import Modal from 'components/Modal';
import { CheckBox } from 'components/Input';
import { AccordionMinusIcon, AccordionPlusIcon, Plus, PencilIcon, TrashIcon, AddressIcon } from 'components/Icons';
import { accountAddressDelete, accountAddressFetch, accountAddressFormReset, accountSenderAddressRequest } from 'actions';
import { connect } from 'react-redux';
import AddressFormModal from './AddressFormModal';

type Props = {
  screenSize: string,
  dispatch: () => {},
  account: {},
  locale: {},
  setBreadcrumbs: () => void,
};

type State = {
  isExpanded: {
    shipping: false,
    billing: false,
    sender: false,
  },
  openAddressModal: boolean,
  type: string,
  isRequest: boolean,
  selectedAddress: Object,
};

export class MyAddresses extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isExpanded: false,
      openAddressModal: false,
      type: '',
      selectedAddress: null,
      isRequest: false,
      id: null,
    };
  }

  shouldComponentUpdate = shouldComponentUpdate;

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(accountAddressFetch());
    this.handleBreadcrumbs();
  }

  componentWillReceiveProps(nextProps) {
    const { account } = nextProps;
    const { dispatch } = this.props;

    if (!account.addresses.isAddressDeleting && account.addresses.isAddressDeletingCalled) {
      dispatch(accountAddressFormReset());
      if (account.addresses.error) {
        swal({
          title: account.addresses.error.message,
          type: 'error',
          confirmButtonColor: '#2cac57',
          confirmButtonText: 'OK',
          showCancelButton: false,
        });
      } else {
        swal({
          title: 'Removido com sucesso.',
          type: 'success',
          confirmButtonColor: '#2cac57',
          confirmButtonText: 'OK',
          showCancelButton: false,
        });
      }
    }
  }

  static props: Props;

  static state: State;

  handleBreadcrumbs = () => {
    const { setBreadcrumbs } = this.props;

    if (typeof setBreadcrumbs === 'function') {
      setBreadcrumbs([
        {
          title: 'Meus Endereços',
        },
      ]);
    }
  };

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
    this.setState({
      openAddressModal: true,
      selectedAddress: null,
      type,
    });
  };

  handleEditAddress = (type, selectedAddress) => {
    this.setState({
      openAddressModal: true,
      selectedAddress,
      type,
    });
  };

  handleDeleteAddress = (ev) => {
    const { dispatch } = this.props;
    this.setState({
      id: ev.currentTarget.value,
    });

    swal({
      title: 'Você tem certeza?',
      text: 'A remoção do endereço não afeta pedidos em aberto',
      type: 'warning',
      confirmButtonColor: '#2cac57',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      showCancelButton: true,
      reverseButtons: true,
    }).then(() => {
      dispatch(accountAddressDelete(this.state.id));
    });
  };

  handleCloseModal = () => {
    this.setState({ openAddressModal: false });
  };

  handleIsRequestChanged = (event) => {
    this.setState({
      isRequest: event.target.checked,
    });
  };

  handleRequest = () => {
    const { dispatch } = this.props;
    dispatch(accountSenderAddressRequest());
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
              onClick={() => { this.handleEditAddress(item.type, item); }}
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

  renderSenderAddressSection = () => {
    const { account: { addresses, custom_sender_address } } = this.props;
    const { isRequest } = this.state;
    switch (custom_sender_address) {
      case '0':
        return (<div className="box-addressRequest">
          <label>
            <CheckBox
              checked={isRequest}
              onChange={this.handleIsRequestChanged}
            />
            <span className="sender-address-check-box-label">
              Quero ter o endereço de remetente personalizado<br />
              <span>(Nosso departamento analisará o seu pedido. Você pode verificar o status da aprovação em Minha conta > Meus endereços).</span>
            </span>
          </label>
          <div className="mol-checkout-pane-footer">
            <button onClick={this.handleRequest} disabled={!isRequest} className="atm-send-button">Salvar</button>
          </div>
        </div>);
      case '1':
        return (<div className="box-addressDelivery">
          {this.renderItems(addresses.sender)}
          {this.renderAddButton('sender')}
        </div>);
      case '2':
        return (<div className="box-addressRequest">
          Sua solicitação de ter endereço de remetente personalizado foi enviada para o departamento da Printi! Aguarde a resposta da sua solicitação.
        </div>);
      case '3':
        return (<div className="box-addressRequest">
          Infelizmente sua solicitação de endereço do remetente personalizado não foi autorizada.
        </div>);
      default:
        return null;
    }
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
      <div key="senderItems">
        <Collapse
          onChange={() => this.handleExpand('sender')}
        >
          <Panel
            header={(
              <div className="header-accordion">
                <div className="sender-address-icon">
                  {isExpanded.sender ? <AccordionMinusIcon /> : <AccordionPlusIcon />}
                </div>
                <div>
                  <h4 className="title-addresses">Endereço de remetente customizado</h4>
                  <div>O endereço de remetente poderá ser um endereço de sua escolha ao invés do endereço da Printi.</div>
                </div>
              </div>
            )}
            headerClass="app__footer__links-header"
            showArrow={false}
          >
            <div>
              {this.renderSenderAddressSection()}
            </div>
          </Panel>
        </Collapse>
      </div>,
    ];
  }

  render() {
    const { account: { addresses } } = this.props;
    const { openAddressModal, type, selectedAddress } = this.state;

    return (
      <section className="container-myaddresses">
        {openAddressModal &&
        <Modal handleCloseModal={this.handleCloseModal}>
          <AddressFormModal type={type} onCloseModal={this.handleCloseModal} address={selectedAddress} isNew={!selectedAddress} />
        </Modal>}
        <h3 className="subtitle-myAddresses">Meus endereços</h3>
        {!addresses.isLoaded || addresses.isLoading ? <Loading /> : this.renderPage()}
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    account: state.account,
    locale: state.locale.translate.account.my_register_data,
    screenSize: state.app.screenSize,
  };
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAddresses);

